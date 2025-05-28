from fastapi import FastAPI, Query, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import tempfile
import os
from pathlib import Path
import re
from typing import Optional

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://diogocarrola.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def validate_youtube_url(url: str) -> bool:
    """Validate YouTube URL format"""
    youtube_regex = (
        r'(https?://)?(www\.)?'
        '(youtube|youtu|youtube-nocookie)\.(com|be)/'
        '(watch\?v=|embed/|v/|.+\?v=)?([^&=%\?]{11})')
    return re.match(youtube_regex, url) is not None

def select_format(media_type: str, quality: Optional[str] = None) -> str:
    """Select the appropriate format based on type and quality"""
    if media_type == "audio":
        return "bestaudio/best"
    
    quality_map = {
        "hd": "bestvideo[height<=1080]+bestaudio/best",
        "4k": "bestvideo[height<=2160]+bestaudio/best",
        "best": "bestvideo+bestaudio/best"
    }
    return quality_map.get(quality, "bestvideo+bestaudio/best")

@app.get("/api/download")
async def download(
    url: str = Query(..., min_length=10),
    type: str = Query("video", regex="^(video|audio)$"),
    quality: Optional[str] = Query(None)
):
    # Validate URL
    if not validate_youtube_url(url):
        raise HTTPException(
            status_code=400,
            detail="Invalid YouTube URL"
        )

    try:
        ydl_opts = {
            "format": select_format(type, quality),
            "outtmpl": "%(title)s.%(ext)s",
            "noplaylist": True,
            "quiet": True,
            "no_warnings": True,
            "extract_flat": False,
        }

        with tempfile.TemporaryDirectory() as tmpdir:
            ydl_opts["outtmpl"] = os.path.join(tmpdir, "%(title)s.%(ext)s")
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                filename = ydl.prepare_filename(info)
            
            # Sanitize filename
            ext = Path(filename).suffix[1:]
            title = re.sub(r'[^\w\-_]', '_', info.get("title", "download"))
            
            with open(filename, "rb") as f:
                content = f.read()
            
            headers = {
                "Content-Disposition": f'attachment; filename="{title}.{ext}"',
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
            
            return Response(
                content,
                headers=headers,
                media_type="application/octet-stream"
            )

    except yt_dlp.DownloadError as e:
        raise HTTPException(
            status_code=400,
            detail=f"YouTube download error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/api/info")
async def get_video_info(url: str = Query(..., min_length=10)):
    """Optional endpoint to get video info before download"""
    if not validate_youtube_url(url):
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")
    
    try:
        with yt_dlp.YoutubeDL({'quiet': True}) as ydl:
            info = ydl.extract_info(url, download=False)
            return {
                "title": info.get('title'),
                "thumbnail": info.get('thumbnail'),
                "duration": info.get('duration'),
                "formats": [
                    {
                        "format_id": f.get('format_id'),
                        "ext": f.get('ext'),
                        "resolution": f.get('resolution'),
                        "filesize": f.get('filesize'),
                    }
                    for f in info.get('formats', [])
                ]
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))