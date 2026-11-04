// Serve a pasta out/ sob o mesmo prefixo do GitHub Pages. Uso: node scripts/serve-out.mjs [porta]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/ls-colchoes";
const OUT = path.resolve(import.meta.dirname, "../out");
const PORTA = Number(process.argv[2] ?? 4173);
const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

async function arquivo(rel) {
  const alvo = path.join(OUT, rel);
  if (alvo !== OUT && !alvo.startsWith(OUT + path.sep)) return null;
  try {
    const s = await stat(alvo);
    return s.isDirectory() ? arquivo(path.join(rel, "index.html")) : alvo;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  let url;
  try {
    url = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }
  if (!url.startsWith(BASE)) {
    res.writeHead(302, { location: `${BASE}/` }).end();
    return;
  }
  const encontrado = await arquivo(url.slice(BASE.length) || "/");
  const final = encontrado ?? path.join(OUT, "404.html");
  res.writeHead(encontrado ? 200 : 404, { "content-type": TIPOS[path.extname(final)] ?? "application/octet-stream" });
  res.end(await readFile(final));
}).listen(PORTA, () => console.log(`http://localhost:${PORTA}${BASE}/`));
