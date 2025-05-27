from fastapi import FastAPI, Query, Response
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://diogocarrola.github.io/youtube-downloader"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/download")
async def download(url: str = Query(...), type: str = Query("video")):
    if not url:
        return Response(content="Missing URL", status_code=400)
    ydl_opts = {
        "format": "bestaudio/best" if type == "audio" else "bestvideo+bestaudio/best",
        "outtmpl": "%(title)s.%(ext)s",
        "noplaylist": True,
        "quiet": True,
    }
    with tempfile.TemporaryDirectory() as tmpdir:
        ydl_opts["outtmpl"] = os.path.join(tmpdir, "%(title)s.%(ext)s")
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
        ext = filename.split('.')[-1]
        title = info.get("title", "download")
        with open(filename, "rb") as f:
            content = f.read()
        headers = {
            "Content-Disposition": f'attachment; filename="{title}.{ext}"'
        }
        return Response(content, headers=headers, media_type="application/octet-stream")