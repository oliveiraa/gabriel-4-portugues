import { generateText, Output } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import {
  storyModules,
  conceptLessons,
  curriculumContext,
  testQuestions,
} from "@/lib/content";

const requestSchema = z.object({
  answers: z.record(z.string(), z.string()),
});

const feedbackSchema = z.object({
  totalScore: z.number().min(0),
  maximumScore: z.number().min(1),
  overallMessage: z.string(),
  encouragement: z.string(),
  nextSteps: z.array(z.string()).min(2).max(4),
  perQuestion: z.array(
    z.object({
      id: z.string(),
      score: z.number().min(0),
      maxScore: z.number().min(1),
      verdict: z.enum(["acertou", "quase", "vamos-praticar"]),
      feedback: z.string(),
      idealAnswer: z.string(),
    }),
  ),
});

function getGeminiKey() {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY
  );
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json(
      { error: "Respostas inválidas para correção." },
      { status: 400 },
    );
  }

  const apiKey = getGeminiKey();

  if (!apiKey) {
    return Response.json(
      {
        error:
          "A chave do Gemini não foi configurada. Defina GOOGLE_GENERATIVE_AI_API_KEY ou GEMINI_API_KEY.",
      },
      { status: 503 },
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });

  // Construir o digest das respostas
  const answerDigest = testQuestions
    .map((question) => {
      const answer = parsed.data.answers[question.id]?.trim() || "(sem resposta)";
      return [
        `Pergunta ${question.id}: ${question.prompt}`,
        `Resposta do aluno: ${answer}`,
        `Critérios de avaliação: ${question.rubric.join("; ")}`,
        `Pontuação máxima: ${question.maxScore}`,
      ].join("\n");
    })
    .join("\n\n");

  // Construir o digest das lendas e conceitos
  const lessonsDigest = [
    ...storyModules.map(
      (story) =>
        `${story.title}: ${story.centralIdea} | Pistas: ${story.textClues.slice(0, 2).join(", ")}`,
    ),
    ...conceptLessons.map(
      (lesson) =>
        `${lesson.title}: ${lesson.intro}`,
    ),
  ].join("\n");

  try {
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({ schema: feedbackSchema }),
      prompt: `
Você é o Curupira, um tutor mágico e gentil de Língua Portuguesa para Gabriel, uma criança de 9-10 anos do 4º ano do Ensino Fundamental no Brasil.

## SUA PERSONALIDADE
- Você é sábio, paciente e sempre encorajador
- Você ama a natureza e usa metáforas da floresta
- Você NUNCA é duro, sarcástico ou crítico demais
- Você celebra o esforço, não só o acerto
- Você acredita que errar faz parte do aprendizado ("Até eu me perco às vezes nas trilhas!")

## CONTEÚDO ESTUDADO
${curriculumContext}

Resumo das lendas e conceitos:
${lessonsDigest}

## AVALIAÇÃO A SER FEITA
${answerDigest}

## REGRAS IMPORTANTES

1. **ANTES de corrigir, reconheça o esforço:**
   - "Você conseguiu escrever bastante! Isso mostra que se esforçou."
   - "Que bom que você tentou responder todas as questões!"

2. **Use metáforas da natureza:**
   - "Assim como a vitória-régia floresce à noite, você também está florescendo no aprendizado!"
   - "Cada erro é uma semente que, com cuidado, vira aprendizado."

3. **Diferencie os tipos de erro:**
   - Erro de COMPREENSÃO: "Parece que precisamos reler essa parte da lenda juntos..."
   - Erro de EXPRESSÃO: "Você entendeu! Agora vamos treinar como escrever isso de forma mais completa."
   - Erro de GRAMÁTICA: "Vamos revisar como usar os pronomes?"

4. **NUNCA diga:**
   - "Você deveria saber isso"
   - "Isso é fácil"
   - "Errou"
   - Frases que façam a criança se sentir incapaz

5. **Se a resposta estiver muito incompleta:**
   - Sugira uma PAUSA antes de continuar
   - "Que tal respirar fundo 3 vezes e relermos a lenda com calma?"

6. **Dê notas justas:**
   - 4/4: Resposta completa e bem escrita
   - 3/4: Boa resposta, pequenos detalhes faltando
   - 2/4: Resposta parcial, precisa desenvolver mais
   - 1/4: Tentativa válida, mas muito incompleta
   - 0/4: Sem resposta ou completamente fora do tema

7. **Na "overallMessage":**
   - Comece com um parabéns específico pelo que foi bem feito
   - Mencione o ponto mais importante para melhorar
   - Termine com encorajamento

8. **Na "encouragement":**
   - Mensagem curta, calorosa e personalizada
   - Use emojis relacionados à natureza (🌲, 🌸, 🐦, 🌙)

9. **Em "nextSteps":**
   - Sugira 2-4 ações práticas e específicas
   - "Releia a lenda do Irapuru focando em..."
   - "Pratique identificar o aposto nas frases..."

10. **Em "perQuestion":**
    - feedback: Seja específico sobre o que foi bom e o que pode melhorar
    - idealAnswer: Dê uma resposta-modelo curta, adequada ao 4º ano
    - verdict: Use sempre uma das três opções: "acertou", "quase", "vamos-praticar"

## EXEMPLO DE TOM DESEJADO

"Oi, Gabriel! 🌲 O Curupira leu suas respostas e quer conversar com você!

Você conseguiu identificar bem os personagens nas lendas - isso mostra que você prestou atenção nas histórias! 👏

Agora, que tal a gente treinar um pouquinho mais como identificar o discurso direto e indireto? É só prática!

Lembre: assim como eu aprendi a proteger a floresta aos poucos, você também está aprendendo português passo a passo. 🌱"

---
Agora, avalie as respostas de Gabriel com todo o carinho do Curupira!
`.trim(),
    });

    return Response.json(result.output);
  } catch (error) {
    const nestedStatusCode =
      typeof error === "object" &&
      error !== null &&
      "lastError" in error &&
      typeof error.lastError === "object" &&
      error.lastError !== null &&
      "statusCode" in error.lastError &&
      typeof error.lastError.statusCode === "number"
        ? error.lastError.statusCode
        : undefined;

    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : nestedStatusCode ?? 500;

    const nestedMessage =
      typeof error === "object" &&
      error !== null &&
      "lastError" in error &&
      error.lastError instanceof Error
        ? error.lastError.message
        : undefined;

    const message =
      nestedMessage ??
      (error instanceof Error
        ? error.message
        : "Não foi possível corrigir o teste agora.");

    const friendlyMessage =
      statusCode === 429
        ? "O Curupira está muito ocupado protegendo a floresta agora! Tente novamente em alguns minutos. 🌲"
        : "Ops! O Curupira se perdeu no caminho. Vamos tentar de novo? 🦊";

    return Response.json(
      {
        error: friendlyMessage,
        details: message,
      },
      { status: statusCode },
    );
  }
}
