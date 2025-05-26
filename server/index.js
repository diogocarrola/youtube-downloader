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
    res.header('Content-Disposition', `attachment; filename="${title}.${ext}"`);
    ytdl(url, { quality: type === 'audio' ? 'highestaudio' : 'highestvideo' })
      .on('error', (err) => {
        console.error('ytdl error:', err);
        res.status(500).send('ytdl error: ' + err.message);
      })
      .pipe(res);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));