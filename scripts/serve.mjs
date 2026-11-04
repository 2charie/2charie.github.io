import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const port = Number(process.argv[2] || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
http.createServer(async (req,res) => {
 try {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file = path.resolve(root,'.' + pathname);
  if(!file.startsWith(root + path.sep) && file !== root){res.writeHead(403);res.end();return;}
  if((await stat(file)).isDirectory()) file = path.join(file,'index.html');
  const data = await readFile(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});res.end(data);
 } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:' + port));
