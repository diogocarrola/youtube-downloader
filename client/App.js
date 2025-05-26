import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleDownload = (type) => {
    if (!url) {
      setStatus("Please enter a URL.");
      return;
    }
    setStatus("Preparing download...");
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
        setStatus("Download started!");
      })
      .catch(() => setStatus("Download failed."));
  };

  return (
    <div style={{ maxWidth: 500, margin: "2em auto", fontFamily: "sans-serif" }}>
      <h2>YouTube High-Quality Downloader</h2>
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "0.5em" }}
      />
      <br />
      <button onClick={() => handleDownload("video")}>Download Video</button>
      <button onClick={() => handleDownload("audio")}>Download Audio</button>
      <div>{status}</div>
    </div>
  );
}

export default App;