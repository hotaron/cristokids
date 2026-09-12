import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Rewrite helper: /assets/images/* -> /images/*
app.use((req, res, next) => {
  if (req.url.startsWith('/assets/images/')) {
    const filename = req.url.replace('/assets/images/', '');
    req.url = '/images/' + filename;
  }
  next();
});

// Rewrite helper: if .webp is requested but does not exist, check for .png
app.use((req, res, next) => {
  if (req.url.endsWith('.webp')) {
    const filePath = path.join(__dirname, req.url.split('?')[0]);
    if (!fs.existsSync(filePath)) {
      const pngPath = filePath.replace(/\.webp$/, '.png');
      if (fs.existsSync(pngPath)) {
        return res.sendFile(pngPath);
      }
    }
  }
  next();
});

// Serve static directory
app.use(express.static(__dirname));

// SPA fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
