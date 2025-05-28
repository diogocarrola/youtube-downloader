import yt_dlp
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python local_downloader.py <YouTube URL> [audio|video] [cookies.txt]")
        sys.exit(1)
    url = sys.argv[1]
    media_type = sys.argv[2] if len(sys.argv) > 2 else "video"
    cookies = sys.argv[3] if len(sys.argv) > 3 else None

    ydl_opts = {
        "format": "bestaudio/best" if media_type == "audio" else "bestvideo+bestaudio/best",
        "outtmpl": "%(title)s.%(ext)s",
        "noplaylist": True,
        "quiet": False,
        "no_warnings": False,
    }
    if cookies:
        ydl_opts["cookiefile"] = cookies

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == "__main__":
    main()