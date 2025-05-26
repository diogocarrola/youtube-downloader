const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');

async function download(type) {
  const url = document.getElementById('url').value;
  const status = document.getElementById('status');
  if (!ytdl.validateURL(url)) {
    status.textContent = 'Invalid URL!';
    return;
  }
  status.textContent = 'Downloading...';

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[\\/:*?"<>|]/g, '');
    const ext = type === 'audio' ? 'mp3' : 'mp4';
    const outputDir = path.join(__dirname, '..', 'downloads');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const output = path.join(outputDir, `${title}.${ext}`);
    const stream = ytdl(url, { quality: type === 'audio' ? 'highestaudio' : 'highestvideo' });
    stream.pipe(fs.createWriteStream(output));

    stream.on('end', () => {
      status.textContent = `Downloaded: ${title}.${ext}`;
    });

    stream.on('error', (err) => {
      status.textContent = 'Error: ' + err.message;
    });
  } catch (err) {
    status.textContent = 'Error: ' + err.message;
  }
}

window.download = download;