# YouTube High-Quality Downloader

A user-friendly web application to download videos and audios from YouTube and YouTube Music in the best quality possible, with no ads.

## Features

- Download videos or audio from YouTube and YouTube Music
- Always selects the best available quality
- Simple and intuitive web interface
- No ads and free to use

## Getting Started

### Online Usage

1. Visit the [YouTube High-Quality Downloader frontend](https://diogocarrola.github.io/youtube-downloader).
2. Paste a YouTube or YouTube Music URL into the input field.
3. Click "Download Video" or "Download Audio".
4. The file will be downloaded directly to your device.

## How It Works

- The **frontend** is a React app hosted on GitHub Pages.
- The **backend** is a Node.js/Express server (using `ytdl-core`) hosted on Render.
- The React app sends your YouTube URL and download type (video/audio) to the backend.
- The backend fetches and streams the best quality video or audio file back to your browser for download.

## For Developers

### Key Dependencies

- [`react`](https://react.dev/) — Frontend framework
- [`gh-pages`](https://www.npmjs.com/package/gh-pages) — Deploy React app to GitHub Pages
- [`express`](https://expressjs.com/) — Backend server
- [`ytdl-core`](https://www.npmjs.com/package/ytdl-core) — YouTube video/audio downloader
- [`cors`](https://www.npmjs.com/package/cors) — Enable cross-origin requests

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.