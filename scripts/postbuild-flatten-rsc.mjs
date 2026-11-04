// Next 16.4 + output: "export" grava os payloads de prefetch de segmentos aninhados como
// out/produtos/__next.produtos/__PAGE__.txt, mas o cliente pede out/produtos/__next.produtos.__PAGE__.txt.
// Sem a cópia "achatada" cada prefetch dá 404 (navegação continua funcionando, só fica mais lenta).
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../out");

async function arquivos(dir) {
  const itens = await readdir(dir, { withFileTypes: true });
  const listas = await Promise.all(
    itens.map((i) => (i.isDirectory() ? arquivos(path.join(dir, i.name)) : [path.join(dir, i.name)])),
  );
  return listas.flat();
}

async function varrer(dir) {
  let copiados = 0;
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (!item.isDirectory() || item.name === "_next") continue;
    const caminho = path.join(dir, item.name);
    if (item.name.startsWith("__next.")) {
      for (const arq of await arquivos(caminho)) {
        const plano = path.relative(dir, arq).split(path.sep).join(".");
        await copyFile(arq, path.join(dir, plano));
        copiados++;
      }
    } else {
      copiados += await varrer(caminho);
    }
  }
  return copiados;
}

console.log(`postbuild: ${await varrer(OUT)} payloads RSC achatados`);
