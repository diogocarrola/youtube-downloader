# YouTube High-Quality Downloader

A user-friendly desktop application to download videos and audios from YouTube and YouTube Music in the best quality possible, with no ads.

## Features

- Download videos or audio from YouTube and YouTube Music
- Always selects the best available quality
- Simple, intuitive graphical interface
- No ads

## Getting Started

## Usage

1. Paste a YouTube or YouTube Music URL into the input field.
2. Click "Download Video" or "Download Audio".
3. The file will be saved in the `downloads` folder.

## Why Electron?

This project uses [Electron](https://www.electronjs.org/) to provide a modern, cross-platform desktop GUI. Electron lets us combine the power of Node.js (for downloading and file handling) with a responsive web-based interface, making the app easy to use and maintain.

---

## For Developers

### Project Structure

```
/src
  main.js        # Electron main process (app entry point)
/src/index.html  # GUI layout
/src/renderer.js # Renderer process (handles UI logic)
```

### Key Dependencies

- [`electron`](https://www.electronjs.org/) — Desktop app framework
- [`ytdl-core`](https://www.npmjs.com/package/ytdl-core) — YouTube video/audio downloader

### How it Works

- The Electron main process (`main.js`) creates a window and loads the GUI (`index.html`).
- The renderer process (`renderer.js`) handles user input, validates URLs, and uses `ytdl-core` to download the requested video or audio in the best available quality.
- Downloads are saved to the `downloads` folder.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.