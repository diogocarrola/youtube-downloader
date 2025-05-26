const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'https://diogocarrola.github.io'
}));

app.get('/api/download', async (req, res) => {
  const { url, type } = req.query;
  if (!ytdl.validateURL(url)) {
    return res.status(400).send('Invalid URL');
  }
  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[\\/:*?"<>|]/g, '');
    const ext = type === 'audio' ? 'mp3' : 'mp4';
    const format = type === 'audio' ? 'highestaudio' : 'highestvideo';

    res.header('Content-Disposition', `attachment; filename="${title}.${ext}"`);

    const stream = ytdl(url, { quality: format });

    stream.on('error', (err) => {
      console.error('ytdl error:', err);
      if (!res.headersSent) {
        res.status(500).send('ytdl error: ' + err.message);
      } else {
        res.end();
      }
    });

    stream.pipe(res);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));