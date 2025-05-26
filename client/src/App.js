import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = (type) => {
    if (!url) {
      setStatus("❗ Please enter a YouTube or YouTube Music URL.");
      return;
    }
    setStatus("⏳ Preparing download...");
    setDownloading(true);
    fetch(
      `https://youtube-downloader-cuxr.onrender.com/api/download?url=${encodeURIComponent(url)}&type=${type}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Download failed");
        return res.blob();
      })
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = type === "audio" ? "audio.mp3" : "video.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setStatus("✅ Download started!");
      })
      .catch(() => setStatus("❌ Download failed. Please check the URL and try again."))
      .finally(() => setDownloading(false));
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "3em auto",
        fontFamily: "system-ui, sans-serif",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 16px #0001",
        padding: "2em",
        border: "2px solid #e53935",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1em" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube Logo"
          style={{ height: "48px" }}
        />
      </div>
      <h1 style={{ textAlign: "center", color: "#e53935", fontWeight: 700 }}>
        YouTube High-Quality Downloader
      </h1>
      <p style={{ textAlign: "center", color: "#444" }}>
        Paste a YouTube or YouTube Music URL below and download the best quality video or audio.
      </p>
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75em",
          fontSize: "1em",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "1em",
        }}
        disabled={downloading}
      />
      <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
        <button
          onClick={() => handleDownload("video")}
          disabled={downloading}
          style={{
            padding: "0.75em 1.5em",
            fontSize: "1em",
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Download Video
        </button>
        <button
          onClick={() => handleDownload("audio")}
          disabled={downloading}
          style={{
            padding: "0.75em 1.5em",
            fontSize: "1em",
            background: "#282828",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Download Audio
        </button>
      </div>
      <div style={{ marginTop: "1.5em", textAlign: "center", minHeight: "2em" }}>
        {status}
      </div>
      <footer style={{ marginTop: "2em", textAlign: "center", fontSize: "0.9em", color: "#888" }}>
        <a href="https://github.com/diogocarrola/youtube-downloader" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;