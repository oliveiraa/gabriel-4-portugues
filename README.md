# Trilha Encantada de Português

Site de estudo em português do Brasil para apoiar o 4º ano, usando os materiais da pasta `source_docs` como base para:

- trilhas de aprendizagem com lendas, estrutura narrativa e discurso direto/indireto
- galeria do material original
- teste com correção guiada por Gemini

## Rodando localmente

```bash
npm install
npm run dev
```

Se `localhost:3000` estiver ocupado por outro projeto, rode em outra porta:

```bash
npm run dev -- --port 3001
```

## Gemini

Crie um arquivo `.env.local` com uma das variáveis:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=...
```

ou

```bash
GEMINI_API_KEY=...
```

Sem a chave, a área de correção continua visível, mas a API retorna uma mensagem pedindo configuração.

## Estrutura principal

- `src/components/study/portuguese-study-hub.tsx`: interface principal
- `src/lib/study-content.ts`: trilhas, metas e perguntas
- `src/app/api/materials/[filename]/route.ts`: entrega as imagens da pasta `source_docs`
- `src/app/api/test-feedback/route.ts`: envia respostas para o Gemini e retorna a correção
