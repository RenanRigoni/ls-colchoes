# L&S Colchões — catálogo (demo)

Catálogo online sem checkout para a L&S Colchões (Av. José Fonseca e Silva, 1.189, Jardim Patrícia, Uberlândia/MG). O cliente escolhe o produto e o tamanho, e o botão **Comprar pelo WhatsApp** abre a conversa com a loja já com nome, código de referência, tamanho, preço e link do produto.

Stack: Next.js 16 (App Router, `output: "export"`), React 19, Tailwind CSS 4, Vitest. Hospedagem: GitHub Pages. Base reaproveitada do catálogo da Fênix Colchões.

## Rodar

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:3000/ls-colchoes
npm test             # testes (mensagem do WhatsApp, preços, filtros, integridade do catálogo)
npm run build        # gera out/ (export estático) + postbuild
npm run preview      # serve out/ em http://localhost:4173/ls-colchoes/
```

## Onde mexer

| O quê | Arquivo |
|---|---|
| Produtos, preços, fotos | `src/data/produtos.ts` (formato = futura tabela do banco) |
| WhatsApp, endereço, horários | `src/data/loja.ts` |
| Categorias e marcas | `src/data/categorias.ts`, `src/data/marcas.ts` |
| Texto da mensagem do WhatsApp | `src/lib/whatsapp.ts` |
| Fotos | `public/produtos/<slug>/1.webp, 2.webp…` + `og.jpg` (1200×630, preview do link) |

Variáveis de ambiente (opcionais):
- `NEXT_PUBLIC_BASE_PATH`: prefixo do site (padrão `/ls-colchoes`; use `""` em domínio próprio)
- `NEXT_PUBLIC_SITE_URL`: URL pública usada nos links da mensagem e no Open Graph

## Origem dos dados
Produtos e preços vêm dos posts do Instagram da loja (@les_colchoes, maio a outubro de 2026). Fotos: oficiais dos fabricantes sempre que existem (ver `CREDITOS.md`). Em `produtos.ts`, cada variação está marcada:
- `// post`: preço publicado pela loja (à vista e 12x no cartão). Ofertas "até durar o estoque" podem ter mudado.
- `// ilustrativo`: o post não tinha preço (Fit Spring Pocket, Exclusivo Sleep, Expressive Pocket, conjunto solteiro espuma firme).
- Conjunto Ortobom molas + box baú: só a parcela (12x R$ 199) era pública; o à vista é estimado.

## Pendências para produção
- Confirmar com o dono: horário de funcionamento, preços atuais, textos da página Sobre e do FAQ.
- Pedir ao representante as fotos em alta das linhas exclusivas para lojista (Exclusive Foam, Fit Spring Pocket, Real Vision Black, Omega), que hoje usam recorte das artes.
- `scripts/postbuild-flatten-rsc.mjs` contorna um descompasso do Next 16.4 no export estático (prefetch de segmentos). Remover quando o Next corrigir.

## Fase 2 (se fechar)
Supabase (tabela `produtos` + Storage de fotos + login) e painel para o dono cadastrar produtos, deploy na Vercel com domínio próprio.
