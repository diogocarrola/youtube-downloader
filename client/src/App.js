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
      `https://youtube-downloader-yj25.onrender.com/api/download?url=${encodeURIComponent(url)}&type=${type}`
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
        Paste a YouTube or YouTube Music URL below and download the best quality video or audio.<br />
        <span style={{ color: "#e53935", fontWeight: 500 }}>
          Only public, unrestricted videos are supported online.<br />
          For restricted/private/age-gated videos, use <a
            href="https://github.com/diogocarrola/youtube-downloader#downloading-restrictedprivate-videos-local-tool"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#e53935", textDecoration: "underline", fontWeight: 500 }}
          >this</a>.
        </span>
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Paste YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75em",
            fontSize: "1em",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1em",
          }}
          disabled={downloading}
        />
      </div>
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
      <footer
        style={{
          marginTop: "2em",
          textAlign: "center",
          fontSize: "1em",
          color: "#282828",
          borderTop: "1px solid #e0e0e0",
          paddingTop: "1em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <span>View source code on&nbsp;</span>
        <a
          href="https://github.com/diogocarrola/youtube-downloader"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center" }}
          title="GitHub Repository"
        >
          <img
            src={require("./github-mark.svg").default}
            alt="GitHub Octocat"
            style={{ height: "24px", verticalAlign: "middle" }}
          />
        </a>
      </footer>
    </div>
  );
}

export default App;