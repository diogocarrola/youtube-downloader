# 🎬 YouTube High-Quality Downloader

A user-friendly web application to download videos and audios from YouTube and YouTube Music in the best quality possible, with no ads.

## Quick Start (Online)

1. **Go to:** [https://diogocarrola.github.io/youtube-downloader](https://diogocarrola.github.io/youtube-downloader)
2. **Paste** a YouTube or YouTube Music URL.
3. **Click** "Download Video" or "Download Audio".

> **Note:**  
> Only public, unrestricted videos are supported online.  
> For restricted/private/age-gated videos, see [Local Download Tool](#downloading-restrictedprivate-videos-local-tool).

## How It Works

- **Frontend:** React app (GitHub Pages)
- **Backend:** FastAPI + yt-dlp (Render)
- **Process:**  
  1. You submit a YouTube URL.
  2. The backend fetches and streams the best quality video/audio.
  3. The file is downloaded directly to your device.

## Downloading Restricted/Private Videos (Local Tool)

Some videos require authentication (age-restricted, private, etc).  
To download these, you need to run the local tool on your own computer:

1. **Export your YouTube cookies** as `cookies.txt` ([yt-dlp FAQ](https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp)).
2. **Place the `cookies.txt` file in the `/server` directory** (next to `local_downloader.py`), or provide the full path to the file.
3. **Run the tool:**
   ```bash
   cd server
   python local_downloader.py "<YouTube URL>" [audio|video] [cookies.txt]
   ```
   - Example for video:  
     `python local_downloader.py "https://youtube.com/watch?v=..." video cookies.txt`
   - Example for audio:  
     `python local_downloader.py "https://youtube.com/watch?v=..." audio cookies.txt`

> **Important:**  
> For video downloads, you must have [ffmpeg](https://ffmpeg.org/download.html) installed and available in your system PATH.
>  - On Linux: `sudo apt install ffmpeg`
>  - On Mac: `brew install ffmpeg`
>  - On Windows: [Download here](https://ffmpeg.org/download.html)

## 👩‍💻 For Developers

- **Frontend:** `/client` (React)
- **Backend:** `/server` (FastAPI + yt-dlp)
- **Deploy:**  
  - Frontend: GitHub Pages  
  - Backend: Render

### Key Dependencies

- [`react`](https://react.dev/)
- [`fastapi`](https://fastapi.tiangolo.com/)
- [`yt-dlp`](https://github.com/yt-dlp/yt-dlp)
- [`uvicorn`](https://www.uvicorn.org/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.