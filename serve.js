import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 4173;
const DIST_DIR = join(__dirname, 'dist', 'public');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
};

const indexHtml = readFileSync(join(DIST_DIR, 'index.html'));

const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

    // Remove query strings
    filePath = filePath.split('?')[0];

    const ext = extname(filePath);

    // If the file exists, serve it directly
    if (ext && existsSync(filePath)) {
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const file = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(file);
        return;
    }

    // For all other routes, serve index.html (SPA fallback)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
