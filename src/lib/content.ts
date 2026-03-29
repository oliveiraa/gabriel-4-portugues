// ============================================
// CONTEÚDO COMPLETO - PORTUGUÊS 4º ANO
// 4 Lendas Indígenas + Conceitos Gramaticais
// ============================================

export type QuickCheck = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type StoryModule = {
  id: string;
  eyebrow: string;
  title: string;
  strapline: string;
  readingMission: string;
  adaptedReading: string[];
  centralIdea: string;
  textClues: string[];
  vocabulary: Array<{
    term: string;
    meaning: string;
  }>;
  narrativeMap: {
    personagem: string;
    cenario: string;
    problema: string;
    desfecho: string;
    narrador: string;
  };
  askAndThink: Array<{
    question: string;
    answer: string;
  }>;
  quickCheck: QuickCheck[];
  timeline?: string[]; // Eventos para ordenar
};

export type ConceptLesson = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  explanation: string[];
  exampleCards: Array<{
    label: string;
    value: string;
  }>;
  guidedPractice: Array<{
    prompt: string;
    answer: string;
  }>;
  quickCheck: QuickCheck[];
  interactive?: {
    type: "fill-in-blanks" | "matching" | "ordering";
    data: unknown;
  };
};

export type TestQuestion = {
  id: string;
  prompt: string;
  type: "textarea" | "multiple-choice";
  support: string;
  options?: string[];
  rubric: string[];
  maxScore: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
};

// ============================================
// 1. A ÍNDIA QUE AMAVA A LUA (págs 88-90)
// ============================================

const indiaLua: StoryModule = {
  id: "india-lua",
  eyebrow: "Leitura 1",
  title: "A índia que amava a Lua",
  strapline: "Uma história de amor tão grande que transformou uma jovem em flor.",
  readingMission: "Enquanto lê, descubra: quem é Lapuna, por que ela amava tanto a Lua e o que aconteceu com ela no final.",
  adaptedReading: [
    "Há muitos anos, em uma aldeia indígena do povo Tupi, vivia uma jovem chamada Lapuna. Ela era alegre e amava passear pela floresta, brincar nos rios e admirar as estrelas.",
    "Mas acima de tudo, Lapuna amava a Lua. Ela adorava ver o brilho prateado da Lua refletido na água dos rios. Sonhava em poder abraçar aquele astro tão lindo.",
    "Certa noite, Lapuna sentiu um desejo enorme de ficar perto da Lua. Ela entrou na lagoa e nadou, nadou, nadou em direção ao reflexo da Lua na água. Quanto mais nadava, mais o brilho parecia se aproximar.",
    "Lapuna nadou sem parar até ficar muito cansada. Com seu último fôlego, ela tentou tocar o brilho da Lua, mas não conseguiu. Lapuna se afogou na lagoa.",
    "A Lua, vendo o amor puro daquela jovem, ficou muito triste. Para honrar Lapuna, a Lua a transformou na vitória-régia, uma linda flor branca que flutua nas águas e só abre durante a noite, quando pode ver a Lua no céu."
  ],
  centralIdea: "A lenda mostra que o amor verdadeiro é capaz de transformar, e que a natureza tem formas mágicas de preservar esse amor.",
  textClues: [
    "Observe que Lapuna ama a natureza: rios, floresta, estrelas e, principalmente, a Lua.",
    "Perceba o desejo intenso de Lapuna de ficar perto da Lua - isso mostra o quanto ela amava.",
    "Repare na transformação mágica no final: a Lua transforma Lapuna em vitória-régia.",
    "A flor só abre à noite - esse detalhe mostra a conexão eterna entre Lapuna e a Lua."
  ],
  vocabulary: [
    { term: "aldeia", meaning: "Lugar onde vive uma comunidade indígena." },
    { term: "astro", meaning: "Corpo celestial brilhante, como a Lua, o Sol ou as estrelas." },
    { term: "lagoa", meaning: "Poço de água natural, menor que um lago." },
    { term: "vitória-régia", meaning: "Planta aquática com grandes folhas e flores brancas que flutuam na água." },
    { term: "transformação", meaning: "Mudança de uma forma para outra." }
  ],
  narrativeMap: {
    personagem: "Lapuna, uma jovem índia que amava a Lua.",
    cenario: "Uma aldeia Tupi e a floresta ao redor, especialmente uma lagoa.",
    problema: "Lapuna ama tanto a Lua que deseja abraçá-la, mas isso é impossível.",
    desfecho: "Lapuna se afoga tentando alcançar a Lua, mas é transformada na vitória-régia.",
    narrador: "Narrador em 3ª pessoa, que conta a história de Lapuna."
  },
  askAndThink: [
    {
      question: "Por que Lapuna nadou em direção ao reflexo da Lua?",
      answer: "Porque ela amava tanto a Lua que queria ficar perto dela, e o reflexo na água parecia um caminho para alcançá-la."
    },
    {
      question: "O que a transformação de Lapuna em vitória-régia representa?",
      answer: "Representa o amor eterno de Lapuna pela Lua. A flor só abre à noite para ver a Lua, como Lapuna sempre desejou."
    },
    {
      question: "Essa história é uma lenda ou um fato real? Como você sabe?",
      answer: "É uma lenda, porque tem elementos mágicos: a transformação de uma pessoa em flor e a Lua tendo sentimentos e poderes mágicos."
    }
  ],
  quickCheck: [
    {
      id: "india-q1",
      prompt: "Qual era o maior desejo de Lapuna?",
      options: [
        "Ficar rica",
        "Ficar perto da Lua",
        "Viajar para a cidade"
      ],
      correctIndex: 1,
      explanation: "Lapuna amava tanto a Lua que seu maior desejo era poder ficar perto dela."
    },
    {
      id: "india-q2",
      prompt: "No final da lenda, Lapuna se transforma em:",
      options: [
        "Um pássaro",
        "Uma árvore",
        "Uma flor (vitória-régia)"
      ],
      correctIndex: 2,
      explanation: "A Lua transformou Lapuna na vitória-régia, uma flor branca que flutua na água."
    }
  ],
  timeline: [
    "Lapuna vive na aldeia e ama a Lua",
    "Lapuna nada na lagoa em direção ao reflexo da Lua",
    "Lapuna se afoga por causa do cansaço",
    "A Lua transforma Lapuna em vitória-régia"
  ]
};

// ============================================
// 2. COMO O MILHO FOI DOADO AOS INDÍGENAS (págs 94-97)
// ============================================

const milho: StoryModule = {
  id: "milho",
  eyebrow: "Leitura 2",
  title: "Como o milho foi doado aos índios",
  strapline: "Um jovem guerreiro recebe um presente sagrado que mudou a vida de seu povo.",
  readingMission: "Acompanhe a jornada do jovem e descubra qual presente importante ele recebeu do Grande Espírito.",
  adaptedReading: [
    "Era uma vez um jovem índio de quinze anos que vivia com seus pais e irmãos. Ele era feliz e trabalhador, mas seu pai queria que ele se tornasse um guerreiro corajoso.",
    "Para isso, o jovem precisava passar por um rito de passagem: ficar sozinho na floresta por três dias, jejuando e refletindo sobre o Grande Espírito.",
    "No terceiro dia, bem fraco por causa do jejum, o jovem teve uma revelação. Um jovem de bela aparência, vestindo um manto verde e tendo penas na cabeça, apareceu para ele. Era o Grande Espírito disfarçado.",
    "O Grande Espírito disse: 'Meu caro amigo, ouvi suas preces. Escute-me e lute comigo. Amanhã, quando o sol nascer, retornarei e você precisará me derrotar em três desafios.'",
    "No dia seguinte, o jovem enfrentou o Grande Espírito em provas de força, agilidade e coragem. Embora fosse difícil, o jovem persistiu e venceu todos os desafios.",
    "Como recompensa, o Grande Espírito deu ao jovem sementes de uma planta desconhecida. 'Cultive esta planta com amor', disse ele. 'Ela dará alimento para seu povo para sempre.'",
    "O jovem retornou à aldeia e plantou as sementes. Nasceu o milho, que se tornou o alimento mais importante para os povos indígenas."
  ],
  centralIdea: "A lenda explica a origem do milho como um dom sagrado, recompensa da coragem e perseverança do jovem guerreiro.",
  textClues: [
    "Observe o rito de passagem: ficar sozinho na floresta por três dias.",
    "Perceba que o Grande Espírito testa o jovem com desafios antes de dar o presente.",
    "A planta desconhecida é o milho, que se tornou alimento essencial.",
    "A lenda ensina que é preciso esforço e coragem para conquistar coisas importantes."
  ],
  vocabulary: [
    { term: "rito de passagem", meaning: "Cerimônia ou desafio que marca a passagem de uma fase da vida para outra." },
    { term: "jejuar", meaning: "Ficar sem comer por um período, geralmente por motivos religiosos ou espirituais." },
    { term: "revelação", meaning: "Algo que é mostrado ou descoberto, muitas vezes de forma mágica." },
    { term: "manto", meaning: "Tipo de roupa comprida que cobre o corpo." },
    { term: "perseverança", meaning: "Continuar tentando mesmo quando as coisas são difíceis." }
  ],
  narrativeMap: {
    personagem: "Um jovem índio de 15 anos que quer se tornar guerreiro.",
    cenario: "A aldeia e a floresta onde o jovem faz seu rito de passagem.",
    problema: "O jovem precisa provar sua coragem no rito de passagem.",
    desfecho: "O jovem vence os desafios e recebe o milho como presente para seu povo.",
    narrador: "Narrador em 3ª pessoa."
  },
  askAndThink: [
    {
      question: "Por que o jovem precisou passar pelo rito de passagem?",
      answer: "Para provar que era corajoso e forte o suficiente para se tornar um guerreiro."
    },
    {
      question: "O que o Grande Espírito pediu em troca do milho?",
      answer: "Ele não pediu nada em troca, mas testou o jovem com desafios para ver se ele merecia o presente."
    },
    {
      question: "Qual é a importância do milho para os povos indígenas?",
      answer: "O milho se tornou o alimento mais importante, base da alimentação de muitos povos."
    }
  ],
  quickCheck: [
    {
      id: "milho-q1",
      prompt: "O que o jovem precisava fazer no rito de passagem?",
      options: [
        "Ficar três dias sozinho na floresta",
        "Caçar um animal grande",
        "Construir uma casa"
      ],
      correctIndex: 0,
      explanation: "O rito de passagem exigia que o jovem ficasse sozinho na floresta por três dias, jejuando e refletindo."
    },
    {
      id: "milho-q2",
      prompt: "Qual presente o Grande Espírito deu ao jovem?",
      options: [
        "Ouro e prata",
        "Sementes de milho",
        "Um arco e flecha mágicos"
      ],
      correctIndex: 1,
      explanation: "O Grande Espírito deu sementes de milho, que se tornaram alimento para o povo."
    }
  ],
  timeline: [
    "Jovem precisa fazer o rito de passagem",
    "Fica 3 dias sozinho na floresta",
    "Grande Espírito aparece e propõe desafios",
    "Jovem vence os três desafios",
    "Recebe as sementes de milho",
    "Planta o milho na aldeia"
  ]
};

// ============================================
// 3. O CANTO DA FLAUTA MÁGICA: O IRAPURU (pág 100) - REESCRITO
// ============================================

const irapuru: StoryModule = {
  id: "irapuru",
  eyebrow: "Leitura 3",
  title: "O canto da flauta mágica: o Irapuru",
  strapline: "Uma história de amor, perda e transformação que explica o canto mais bonito da floresta.",
  readingMission: "Descubra quem eram Catuboré e Mainá, o que aconteceu com eles e por que o Irapuru canta tão lindamente.",
  adaptedReading: [
    "Era uma vez um jovem índio chamado Catuboré. Ele tocava flauta tão lindamente que todos na aldeia paravam para ouvir. Catuboré amava Mainá, uma jovem da mesma aldeia, e tocava para ela todos os dias.",
    "Certo dia, enquanto Catuboré estava na floresta, uma cobra venenosa apareceu e o picou. O jovem tentou voltar à aldeia, mas o veneno era forte demais. Ele morreu antes de chegar.",
    "Mainá ficou desconsolada com a morte de Catuboré. Ela chorava todos os dias, sentindo muita saudade da música dele. A floresta ficou triste com o sofrimento de Mainá.",
    "Tupã, o deus do trovão, vendo tanto amor e tanta dor, decidiu fazer algo mágico. Ele transformou Catuboré no pássaro Irapuru, dando a ele o canto mais lindo do mundo.",
    "Desde então, o Irapuru canta na floresta para consolar Mainá. Seu canto é tão bonito que faz todos pararem para ouvir. A lenda diz que, quando ouvimos o Irapuru, estamos ouvindo Catuboré tocando sua flauta mágica para sua amada."
  ],
  centralIdea: "A lenda explica a origem do canto do Irapuru como uma transformação mágica do amor eterno de Catuboré por Mainá.",
  textClues: [
    "Catuboré tocava flauta lindamente - isso é importante para entender o canto do pássaro.",
    "A cobra venenosa causa a tragédia na história.",
    "Mainá sofre muito com a perda - isso motiva a transformação mágica.",
    "Tupã transforma Catuboré em pássaro para consolar Mainá.",
    "O canto do Irapuru é a continuação da música de Catuboré."
  ],
  vocabulary: [
    { term: "flauta", meaning: "Instrumento musical de sopro." },
    { term: "desconsolada", meaning: "Muito triste, sem consolo." },
    { term: "veneno", meaning: "Substância que machuca ou mata quando entra no corpo." },
    { term: "transformação", meaning: "Mudança de uma forma para outra." },
    { term: "consolar", meaning: "Ajudar alguém a se sentir menos triste." }
  ],
  narrativeMap: {
    personagem: "Catuboré, o jovem que tocava flauta, e Mainá, sua amada.",
    cenario: "A aldeia e a floresta onde viviam.",
    problema: "Catuboré morre picado por uma cobra, deixando Mainá desconsolada.",
    desfecho: "Tupã transforma Catuboré no Irapuru para consolar Mainá com seu canto.",
    narrador: "Narrador em 3ª pessoa."
  },
  askAndThink: [
    {
      question: "Por que o Irapuru tem o canto mais bonito da floresta?",
      answer: "Porque ele era Catuboré, que tocava flauta maravilhosamente. O canto do pássaro é a continuação da sua música."
    },
    {
      question: "Qual foi o papel de Tupã nesta lenda?",
      answer: "Tupã viu o sofrimento de Mainá e usou seus poderes mágicos para transformar Catuboré em pássaro, permitindo que ele continuasse presente através do canto."
    },
    {
      question: "Essa lenda é triste ou feliz? Explique.",
      answer: "É uma mistura: a morte de Catuboré é triste, mas a transformação em Irapuru traz consolo e mostra que o amor continua através da música."
    }
  ],
  quickCheck: [
    {
      id: "irapuru-q1",
      prompt: "Qual instrumento Catuboré tocava?",
      options: [
        "Violão",
        "Flauta",
        "Tambor"
      ],
      correctIndex: 1,
      explanation: "Catuboré tocava flauta lindamente, e por isso o Irapuru tem um canto tão especial."
    },
    {
      id: "irapuru-q2",
      prompt: "Quem transformou Catuboré em Irapuru?",
      options: [
        "O cacique",
        "Tupã",
        "A mãe de Catuboré"
      ],
      correctIndex: 1,
      explanation: "Tupã, o deus do trovão, transformou Catuboré no pássaro Irapuru para consolar Mainá."
    }
  ],
  timeline: [
    "Catuboré toca flauta para Mainá",
    "Cobra venenosa pica Catuboré",
    "Catuboré morre",
    "Mainá fica desconsolada",
    "Tupã transforma Catuboré em Irapuru",
    "Irapuru canta para consolar Mainá"
  ]
};

// ============================================
// 4. O CANTO QUE ENCANTA - O CURUPIRA (págs 101-103)
// ============================================

const curupira: StoryModule = {
  id: "curupira",
  eyebrow: "Leitura 4",
  title: "O canto que encanta: o Curupira",
  strapline: "O guardião da floresta que protege os animais com seus pés virados para trás.",
  readingMission: "Descubra como o Curupira protege a mata e qual é a característica mágica que o ajuda nessa missão.",
  adaptedReading: [
    "Na floresta vive uma criatura mágica chamada Curupira. Ele tem cabelos cor de fogo, verde como as folhas, e uma característica muito especial: seus pés são virados para trás!",
    "O Curupira é o guardião da floresta. Ele protege todos os animais e plantas. Quando caçadores entram na mata para fazer mal, o Curupira age.",
    "Com seus pés virados para trás, ele deixa pegadas confusas. Os caçadores seguem as pegadas achando que vão encontrar o Curupira, mas ele os leva para bem longe, fazendo-os se perder.",
    "O Curupira também imita os sons dos animais para enganar os caçadores. Às vezes, ele faz o som de um animal ferido para atrair o caçador e levá-lo para um atoleiro.",
    "Mas o Curupira não é malvado. Ele só quer proteger a floresta. Quem entra na mata com respeito, sem machucar os bichos, não precisa ter medo do Curupira."
  ],
  centralIdea: "A lenda ensina que a natureza deve ser respeitada e que quem faz mal aos animais e à floresta acaba se dando mal.",
  textClues: [
    "Os pés virados para trás são a característica mágica mais importante do Curupira.",
    "Ele usa essa característica para confundir quem quer fazer mal à natureza.",
    "O Curupira protege, não ataca sem motivo.",
    "A lenda tem uma mensagem: respeite a natureza."
  ],
  vocabulary: [
    { term: "guardião", meaning: "Quem cuida e protege algo." },
    { term: "pegadas", meaning: "Marcas deixadas pelos pés no chão." },
    { term: "atoleiro", meaning: "Lugar de lama onde se pode ficar preso." },
    { term: "respeito", meaning: "Tratar bem, não machucar." },
    { term: "floresta", meaning: "Lugar com muitas árvores, plantas e animais." }
  ],
  narrativeMap: {
    personagem: "Curupira, ser mágico guardião da floresta.",
    cenario: "A floresta e seus caminhos.",
    problema: "Caçadores entram na mata para machucar animais.",
    desfecho: "Curupira confunde os caçadores com seus pés virados e os faz se perder.",
    narrador: "Narrador em 3ª pessoa."
  },
  askAndThink: [
    {
      question: "Por que os pés virados para trás são importantes na lenda?",
      answer: "Porque eles ajudam o Curupira a confundir os caçadores, deixando pegadas que vão para o lado oposto de onde ele realmente foi."
    },
    {
      question: "O Curupira é um personagem bom ou mau?",
      answer: "Ele é bom, porque protege a floresta e os animais. Só 'pega' quem está fazendo mal."
    },
    {
      question: "Qual a mensagem da lenda do Curupira?",
      answer: "Que devemos respeitar a natureza e não machucar os animais, senão podemos ter problemas."
    }
  ],
  quickCheck: [
    {
      id: "curupira-q1",
      prompt: "O que o Curupira protege?",
      options: [
        "A floresta e os animais",
        "A cidade e as pessoas",
        "O dinheiro e o ouro"
      ],
      correctIndex: 0,
      explanation: "O Curupira é o guardião da floresta e protege todos os animais e plantas."
    },
    {
      id: "curupira-q2",
      prompt: "Qual característica mágica ajuda o Curupira a confundir os caçadores?",
      options: [
        "Seus cabelos de fogo",
        "Seus pés virados para trás",
        "Sua voz forte"
      ],
      correctIndex: 1,
      explanation: "Os pés virados para trás fazem o Curupira deixar pegadas que vão para o lado oposto, confundindo quem tenta segui-lo."
    }
  ],
  timeline: [
    "Curupira vive na floresta como guardião",
    "Caçadores entram para machucar animais",
    "Curupira usa seus pés virados para confundir",
    "Caçadores se perdem na mata",
    "Animais e floresta ficam protegidos"
  ]
};

export const storyModules: StoryModule[] = [indiaLua, milho, irapuru, curupira];

// ============================================
// CONCEITOS GRAMATICAIS
// ============================================

// 1. ESTRUTURA DA NARRATIVA

const estruturaNarrativa: ConceptLesson = {
  id: "estrutura",
  eyebrow: "Conceito 1",
  title: "Partes de uma história",
  intro: "Toda história tem partes importantes. Quando você encontra essas partes, entender a história fica muito mais fácil!",
  explanation: [
    "O CENÁRIO é o lugar onde a história acontece. Pode ser uma floresta, uma aldeia, uma cidade... Nas lendas que lemos, o cenário é quase sempre a natureza.",
    "O PERSONAGEM é quem faz a história acontecer. É quem tem um problema para resolver. Nas lendas, os personagens são muitas vezes seres mágicos ou pessoas que vivem perto da natureza.",
    "O PROBLEMA (ou conflito) é o desafio que o personagem precisa enfrentar. Sem problema, não tem história! É o problema que deixa a gente curioso para saber o final.",
    "O DESFECHO é como a história termina. É a solução do problema. Nas lendas, o desfecho muitas vezes tem algo mágico.",
    "O NARRADOR é quem conta a história. Pode ser um narrador de fora (3ª pessoa: 'ele', 'ela') ou um personagem contando sua própria história (1ª pessoa: 'eu').",
    "A IDEIA CENTRAL é a mensagem mais importante da história. É o que o autor quer que a gente aprenda."
  ],
  exampleCards: [
    {
      label: "Cenário",
      value: "Na lenda da Lua: a aldeia Tupi e a lagoa. No Curupira: a floresta."
    },
    {
      label: "Personagem",
      value: "Lapuna (Lua), o jovem guerreiro (Milho), Catuboré (Irapuru), Curupira."
    },
    {
      label: "Problema",
      value: "Lapuna quer abraçar a Lua. Caçadores ameaçam a floresta."
    },
    {
      label: "Desfecho",
      value: "Lapuna vira flor. Curupira confunde os caçadores."
    },
    {
      label: "Narrador",
      value: "Todas as lendas têm narrador em 3ª pessoa."
    },
    {
      label: "Ideia Central",
      value: "A mensagem mais importante que a história quer ensinar."
    }
  ],
  guidedPractice: [
    {
      prompt: "Na lenda do milho, qual é o cenário?",
      answer: "A aldeia indígena e a floresta onde o jovem faz o rito de passagem."
    },
    {
      prompt: "Qual é o problema na lenda do Curupira?",
      answer: "Caçadores entram na floresta para machucar os animais."
    },
    {
      prompt: "As lendas que lemos têm narrador em qual pessoa?",
      answer: "3ª pessoa, porque um narrador de fora conta a história."
    }
  ],
  quickCheck: [
    {
      id: "estrutura-q1",
      prompt: "O lugar onde a história acontece chama-se:",
      options: ["Cenário", "Desfecho", "Narrador"],
      correctIndex: 0,
      explanation: "O cenário é o local onde a história se passa."
    },
    {
      id: "estrutura-q2",
      prompt: "O problema que o personagem precisa resolver é chamado de:",
      options: ["Ideia central", "Conflito", "Cenário"],
      correctIndex: 1,
      explanation: "O conflito (ou problema) é o desafio que o personagem enfrenta."
    },
    {
      id: "estrutura-q3",
      prompt: "Quando o narrador fala 'eu', está em:",
      options: ["1ª pessoa", "3ª pessoa", "2ª pessoa"],
      correctIndex: 0,
      explanation: "O narrador em 1ª pessoa fala 'eu', como se fosse o personagem."
    }
  ]
};

// 2. DISCURSO DIRETO E INDIRETO

const discurso: ConceptLesson = {
  id: "discurso",
  eyebrow: "Conceito 2",
  title: "Como as pessoas falam nas histórias",
  intro: "Quando lemos uma história, as personagens falam de duas formas diferentes. Vamos aprender a identificar cada uma!",
  explanation: [
    "DISCURSO DIRETO é quando a gente lê EXATAMENTE o que a pessoa falou. É como se a gente estivesse ouvindo a pessoa falar. Usamos dois-pontos, travessão ou aspas.",
    "Exemplo de discurso direto: O jovem disse: 'Vou vencer este desafio!'",
    "DISCURSO INDIRETO é quando o narrador CONTA o que a pessoa falou, usando outras palavras. A fala não aparece exatamente como foi dita.",
    "Exemplo de discurso indireto: O jovem disse que ia vencer o desafio.",
    "DICA: Se você vê aspas ou travessão antes da fala, é discurso direto. Se a frase começa com 'que', provavelmente é indireto."
  ],
  exampleCards: [
    {
      label: "Direto ✅",
      value: "Mainá disse: 'Sinto tanta saudade de Catuboré!'"
    },
    {
      label: "Indireto ✅",
      value: "Mainá disse que sentia muita saudade de Catuboré."
    },
    {
      label: "Pista do Direto 🔍",
      value: "Aspas, travessão, dois-pontos antes da fala."
    },
    {
      label: "Pista do Indireto 🔍",
      value: "Palavra 'que' conectando o verbo à fala."
    }
  ],
  guidedPractice: [
    {
      prompt: "Transforme em discurso indireto: Lapuna pensou: 'Quero abraçar a Lua.'",
      answer: "Lapuna pensou que queria abraçar a Lua."
    },
    {
      prompt: "Transforme em discurso direto: O Grande Espírito disse que o jovem era corajoso.",
      answer: "O Grande Espírito disse: 'Você é muito corajoso!'"
    },
    {
      prompt: "Esta frase está em discurso direto ou indireto? O Curupira avisou que os caçadores deveriam ir embora.",
      answer: "Discurso indireto, porque usa 'que' e não mostra a fala exata."
    }
  ],
  quickCheck: [
    {
      id: "discurso-q1",
      prompt: "Qual frase está em discurso DIRETO?",
      options: [
        "Lapuna disse que amava a Lua",
        "Lapuna disse: 'Amo a Lua!'",
        "Lapuna amava a Lua"
      ],
      correctIndex: 1,
      explanation: "Discurso direto mostra a fala exata da pessoa, com aspas ou travessão."
    },
    {
      id: "discurso-q2",
      prompt: "A frase 'O jovem contou que tinha medo' está em:",
      options: ["Direto", "Indireto", "Narrador em 1ª pessoa"],
      correctIndex: 1,
      explanation: "É discurso indireto porque o narrador está contando o que o jovem falou, não mostrando a fala exata."
    }
  ]
};

// 3. PRONOMES (NOVO CONTEÚDO)

const pronomes: ConceptLesson = {
  id: "pronomes",
  eyebrow: "Conceito 3",
  title: "Pronomes: palavras que substituem nomes",
  intro: "Pronomes são palavrinhas especiais que usamos no lugar de nomes. Eles ajudam a não ficar repetindo a mesma palavra toda hora!",
  explanation: [
    "PRONOMES PESSOAIS são aqueles que indicam as pessoas. Eles podem ser: eu, tu, ele/ela, nós, vós, eles/elas.",
    "Exemplo: 'Catuboré tocava flauta' → 'Ele tocava flauta'. O 'ele' substituiu 'Catuboré'.",
    "PRONOMES POSSESSIVOS mostram que algo pertence a alguém. Eles são: meu, teu, seu, nosso, vosso, deles/delas.",
    "Exemplo: 'A flauta de Catuboré' → 'A sua flauta'. O 'sua' mostra que a flauta pertence a ele.",
    "PRONOMES DEMONSTRATIVOS apontam para as coisas. Eles são: este, esse, aquele, isto, isso, aquilo.",
    "Exemplo: 'Esta lenda é bonita' (perto de quem fala), 'Essa história' (perto de quem ouve), 'Aquela floresta' (longe dos dois)."
  ],
  exampleCards: [
    {
      label: "Pessoais 👤",
      value: "eu, tu, ele/ela, nós, vós, eles/elas"
    },
    {
      label: "Possessivos 🎒",
      value: "meu, teu, seu, nosso, vosso, deles"
    },
    {
      label: "Demonstrativos 👉",
      value: "este/esta (perto), esse/essa (perto de quem ouve), aquele/aquela (longe)"
    },
    {
      label: "Dica 💡",
      value: "Pronomes evitam repetição: 'Lapuna nadou. Lapuna cansou' → 'Lapuna nadou. Ela cansou.'"
    }
  ],
  guidedPractice: [
    {
      prompt: "Substitua o nome pelo pronome pessoal: 'O Curupira protege a floresta.'",
      answer: "Ele protege a floresta."
    },
    {
      prompt: "Use um pronome possessivo: 'A mãe de Lapuna ficou triste.'",
      answer: "A sua mãe ficou triste."
    },
    {
      prompt: "Qual pronome demonstrativo usar? '_____ lenda (que estou lendo agora) é bonita.'",
      answer: "Esta lenda é bonita. (porque está perto de quem fala)"
    }
  ],
  quickCheck: [
    {
      id: "pronomes-q1",
      prompt: "Qual é o pronome pessoal que substitui 'o jovem'?",
      options: ["Ela", "Ele", "Nós"],
      correctIndex: 1,
      explanation: "'Ele' é o pronome que substitui nomes masculinos como 'o jovem'."
    },
    {
      id: "pronomes-q2",
      prompt: "Qual pronome possessivo completa? 'Lapuna amava _____ mãe.'",
      options: ["minha", "sua", "nossa"],
      correctIndex: 1,
      explanation: "'Sua' é o pronome possessivo que indica que a mãe pertence a Lapuna."
    },
    {
      id: "pronomes-q3",
      prompt: "Qual pronome demonstrativo indica algo longe de todos?",
      options: ["Este", "Esse", "Aquele"],
      correctIndex: 2,
      explanation: "'Aquele/aquela' indica algo que está longe tanto de quem fala quanto de quem ouve."
    }
  ]
};

// 4. PONTUAÇÃO - APOSTO E VOCATIVO (NOVO CONTEÚDO)

const pontuacao: ConceptLesson = {
  id: "pontuacao",
  eyebrow: "Conceito 4",
  title: "Aposto e Vocativo",
  intro: "Vamos aprender duas formas especiais de dar mais informações ou chamar alguém numa frase. Elas usam vírgulas!",
  explanation: [
    "O APOSTO é uma explicação que damos sobre uma pessoa ou coisa. Ele vem depois do nome e está entre vírgulas. O aposto explica QUEM ou O QUÊ é a pessoa.",
    "Exemplo: 'Lapuna, a jovem índia, amava a Lua.' A parte 'a jovem índia' é o aposto - explica quem é Lapuna.",
    "Outro exemplo: 'Catuboré, o flautista, tocava todos os dias.' 'O flautista' explica quem era Catuboré.",
    "O VOCATIVO é quando chamamos alguém diretamente. Usamos vírgulas para separar o nome da pessoa do resto da frase.",
    "Exemplo: 'Curupira, proteja nossa floresta!' Estamos chamando o Curupira e pedindo algo a ele.",
    "Outro exemplo: 'Mainá, não chore mais.' Estamos falando diretamente com Mainá.",
    "DICA: Aposto explica quem é a pessoa. Vocativo é quando chamamos a pessoa para falar com ela."
  ],
  exampleCards: [
    {
      label: "Aposto ✏️",
      value: "'Tupã, o deus do trovão, transformou o jovem.' O aposto explica quem é Tupã."
    },
    {
      label: "Vocativo 📢",
      value: "'Jovem, escute meu conselho.' Estamos chamando o jovem para falar com ele."
    },
    {
      label: "Dica do Aposto 💡",
      value: "Pergunte: isso explica QUEM é a pessoa? Se sim, é aposto!"
    },
    {
      label: "Dica do Vocativo 💡",
      value: "Pergunte: estou CHAMANDO alguém? Se sim, é vocativo!"
    }
  ],
  guidedPractice: [
    {
      prompt: "Identifique o aposto: 'O Irapuru, o pássaro encantado, canta na floresta.'",
      answer: "'O pássaro encantado' é o aposto porque explica quem é o Irapuru."
    },
    {
      prompt: "Complete com vírgulas: 'Curupira ____ proteja os animais!'",
      answer: "'Curupira, proteja os animais!' É vocativo porque estamos chamando o Curupira."
    },
    {
      prompt: "Esta frase tem aposto ou vocativo? 'Lapuna, a índia, olhava para o céu.'",
      answer: "Tem aposto ('a índia') porque explica quem é Lapuna."
    }
  ],
  quickCheck: [
    {
      id: "pontuacao-q1",
      prompt: "Qual é o aposto na frase: 'Catuboré, o jovem flautista, amava Mainá.'?",
      options: [
        "Catuboré",
        "o jovem flautista",
        "amava Mainá"
      ],
      correctIndex: 1,
      explanation: "'O jovem flautista' é o aposto porque explica quem era Catuboré."
    },
    {
      id: "pontuacao-q2",
      prompt: "Na frase 'Grande Espírito, me ajude!', temos um:",
      options: ["Aposto", "Vocativo", "Cenário"],
      correctIndex: 1,
      explanation: "É vocativo porque estamos chamando diretamente o Grande Espírito."
    },
    {
      id: "pontuacao-q3",
      prompt: "Qual frase tem APOSTO?",
      options: [
        "Curupira, venha aqui!",
        "O Curupira, guardião da mata, protege os animais.",
        "Curupira! Olhe para mim!"
      ],
      correctIndex: 1,
      explanation: "A segunda opção tem aposto ('guardião da mata') que explica quem é o Curupira."
    }
  ]
};

export const conceptLessons: ConceptLesson[] = [estruturaNarrativa, discurso, pronomes, pontuacao];

// ============================================
// PERGUNTAS DO TESTE
// ============================================

export const testQuestions: TestQuestion[] = [
  {
    id: "q1",
    prompt: "Explique com suas palavras o que é uma lenda e cite uma característica que aparece nas lendas que você leu.",
    type: "textarea",
    support: "Use palavras simples e lembre do que torna uma lenda diferente de uma notícia ou história real.",
    rubric: [
      "Explica que a lenda é uma narrativa tradicional/popular",
      "Cita pelo menos uma característica fantástica ou mágica",
      "Mostra compreensão global do gênero"
    ],
    maxScore: 4
  },
  {
    id: "q2",
    prompt: "Na lenda da índia que amava a Lua, por que Lapuna nadou em direção ao reflexo da Lua?",
    type: "multiple-choice",
    support: "Pense no desejo de Lapuna.",
    options: [
      "Porque ela queria fugir da aldeia",
      "Porque ela amava tanto a Lua que queria ficar perto dela",
      "Porque estava com calor e queria nadar"
    ],
    rubric: ["Identifica corretamente a motivação de Lapuna"],
    maxScore: 2
  },
  {
    id: "q3",
    prompt: "Escolha uma das quatro lendas e diga: quem é o personagem principal, onde a história acontece (cenário) e qual é a ideia central.",
    type: "textarea",
    support: "Você pode escolher qualquer uma das quatro lendas.",
    rubric: [
      "Identifica corretamente o personagem principal",
      "Aponta o cenário correto",
      "Explica a ideia central com clareza"
    ],
    maxScore: 4
  },
  {
    id: "q4",
    prompt: "Transforme esta fala em discurso indireto: O jovem guerreiro disse: 'Vou vencer todos os desafios.'",
    type: "textarea",
    support: "Use uma frase em que o narrador conte o que o jovem falou.",
    rubric: [
      "Transforma corretamente para discurso indireto",
      "Mantém o sentido da frase original",
      "Usa estrutura adequada como 'disse que...'"
    ],
    maxScore: 4
  },
  {
    id: "q5",
    prompt: "Identifique o pronome na frase e diga qual tipo é (pessoal, possessivo ou demonstrativo): 'Ela amava sua flauta.'",
    type: "textarea",
    support: "Procure as palavras que substituem nomes ou mostram posse.",
    rubric: [
      "Identifica 'ela' como pronome pessoal",
      "Identifica 'sua' como pronome possessivo",
      "Explica a função de cada um"
    ],
    maxScore: 4
  },
  {
    id: "q6",
    prompt: "Na frase 'Curupira, guardião da floresta, protege os animais', qual é o aposto? Por que ele é um aposto?",
    type: "textarea",
    support: "Lembre: aposto explica quem é a pessoa.",
    rubric: [
      "Identifica 'guardião da floresta' como aposto",
      "Explica que o aposto dá informações sobre quem é o Curupira",
      "Mostra compreensão da função do aposto"
    ],
    maxScore: 4
  },
  {
    id: "q7",
    prompt: "Cite uma semelhança e uma diferença entre duas lendas que você leu.",
    type: "textarea",
    support: "Pense nos personagens, no elemento mágico e na relação com a natureza.",
    rubric: [
      "Aponta uma semelhança verdadeira entre as lendas",
      "Aponta uma diferença verdadeira",
      "Escreve a resposta com clareza"
    ],
    maxScore: 4
  }
];

// ============================================
// SISTEMA DE CONQUISTAS (BADGES)
// ============================================

export const badges: Badge[] = [
  {
    id: "primeira-leitura",
    name: "Leitor Iniciante",
    description: "Leu sua primeira lenda",
    icon: "📖",
    condition: "Completar a primeira leitura"
  },
  {
    id: "todas-leituras",
    name: "Explorador de Lendas",
    description: "Leu todas as quatro lendas",
    icon: "🗺️",
    condition: "Completar todas as leituras"
  },
  {
    id: "detetive",
    name: "Detetive de Pistas",
    description: "Acertou 5 questões no jogo rápido",
    icon: "🔍",
    condition: "Acertar 5 questões no quiz"
  },
  {
    id: "persistente",
    name: "Persistente",
    description: "Errou mas tentou de novo",
    icon: "💪",
    condition: "Errar uma questão e acertar na segunda tentativa"
  },
  {
    id: "conceitos",
    name: "Mestre dos Conceitos",
    description: "Estudou todos os conceitos gramaticais",
    icon: "🧠",
    condition: "Completar todas as lições de conceitos"
  },
  {
    id: "primeiro-teste",
    name: "Desbravador",
    description: "Fez o teste pela primeira vez",
    icon: "📝",
    condition: "Submeter o teste uma vez"
  },
  {
    id: "guardiao",
    name: "Guardião da Mata",
    description: "Completou todo o conteúdo do site",
    icon: "🏆",
    condition: "Completar 100% do conteúdo"
  }
];

// ============================================
// JOGO RÁPIDO (QUESTÕES MISTAS)
// ============================================

export const reviewGame: QuickCheck[] = [
  // Questões sobre a Índia que amava a Lua
  {
    id: "review-india-1",
    prompt: "Qual era o maior desejo de Lapuna?",
    options: ["Ficar rica", "Ficar perto da Lua", "Ser cacique"],
    correctIndex: 1,
    explanation: "Lapuna amava tanto a Lua que seu maior desejo era poder ficar perto dela."
  },
  {
    id: "review-india-2",
    prompt: "No final da lenda, Lapuna se transforma em:",
    options: ["Um pássaro", "Uma árvore", "Uma flor (vitória-régia)"],
    correctIndex: 2,
    explanation: "A Lua transformou Lapuna na vitória-régia, uma flor branca que flutua na água."
  },
  // Questões sobre o Milho
  {
    id: "review-milho-1",
    prompt: "Quem deu o milho como presente ao jovem?",
    options: ["O cacique", "O Grande Espírito", "Sua mãe"],
    correctIndex: 1,
    explanation: "O Grande Espírito deu as sementes de milho como recompensa pela coragem do jovem."
  },
  {
    id: "review-milho-2",
    prompt: "O jovem precisou passar por quantos desafios?",
    options: ["Um", "Dois", "Três"],
    correctIndex: 2,
    explanation: "O jovem enfrentou e venceu três desafios para provar sua coragem."
  },
  // Questões sobre o Irapuru
  {
    id: "review-irapuru-1",
    prompt: "Qual instrumento Catuboré tocava?",
    options: ["Violão", "Flauta", "Tambor"],
    correctIndex: 1,
    explanation: "Catuboré tocava flauta lindamente, e por isso o Irapuru tem um canto tão especial."
  },
  {
    id: "review-irapuru-2",
    prompt: "Por que Tupã transformou Catuboré em pássaro?",
    options: [
      "Para castigar Mainá",
      "Para consolar Mainá",
      "Porque Catuboré pediu"
    ],
    correctIndex: 1,
    explanation: "Tupã transformou Catuboré no Irapuru para que seu canto consolasse Mainá da saudade."
  },
  // Questões sobre o Curupira
  {
    id: "review-curupira-1",
    prompt: "O que o Curupira protege?",
    options: ["A floresta e os animais", "A cidade", "O ouro"],
    correctIndex: 0,
    explanation: "O Curupira é o guardião da floresta e protege todos os animais e plantas."
  },
  {
    id: "review-curupira-2",
    prompt: "Como os pés do Curupira são?",
    options: ["Grandes", "Virados para trás", "Rápidos"],
    correctIndex: 1,
    explanation: "Os pés virados para trás fazem o Curupira deixar pegadas confusas."
  },
  // Questões sobre conceitos
  {
    id: "review-conceito-1",
    prompt: "O lugar onde a história acontece é o:",
    options: ["Cenário", "Desfecho", "Personagem"],
    correctIndex: 0,
    explanation: "O cenário é o local onde a história se passa."
  },
  {
    id: "review-conceito-2",
    prompt: "Qual frase está em discurso DIRETO?",
    options: [
      "Ela disse que ia sair",
      "Ela disse: 'Vou sair!'",
      "Ela foi sair"
    ],
    correctIndex: 1,
    explanation: "Discurso direto mostra a fala exata da pessoa, com aspas."
  },
  {
    id: "review-conceito-3",
    prompt: "Em 'O Curupira, guardião da mata, protege os animais', 'guardião da mata' é:",
    options: ["Vocativo", "Aposto", "Cenário"],
    correctIndex: 1,
    explanation: "É o aposto porque explica quem é o Curupira."
  },
  {
    id: "review-conceito-4",
    prompt: "Qual é o pronome possessivo em 'Lapuna amava sua mãe'?",
    options: ["Lapuna", "amava", "sua"],
    correctIndex: 2,
    explanation: "'Sua' é o pronome possessivo que mostra que a mãe pertence a Lapuna."
  }
];

// ============================================
// OUTROS DADOS
// ============================================

export const studyRoutine = [
  "Escolha uma lenda para começar",
  "Leia com calma e preste atenção nos personagens",
  "Use o mapa da narrativa para organizar as ideias",
  "Faça o jogo rápido para testar sua memória",
  "Estude os conceitos gramaticais",
  "Tente o teste quando se sentir pronto"
];

export const weeklyGoals = [
  "Ler duas lendas com atenção",
  "Explicar com suas palavras o que aconteceu em cada lenda",
  "Acertar pelo menos 5 questões no jogo rápido",
  "Entender a diferença entre discurso direto e indireto",
  "Saber identificar pronomes nas frases"
];

export const comparisonCards = [
  {
    title: "Lapuna",
    points: [
      "Amava a Lua de coração puro",
      "Foi transformada em vitória-régia",
      "Mensagem: amor verdadeiro transforma"
    ]
  },
  {
    title: "O Jovem Guerreiro",
    points: [
      "Queria provar sua coragem",
      "Recebeu o milho como recompensa",
      "Mensagem: perseverança é recompensada"
    ]
  },
  {
    title: "Catuboré",
    points: [
      "Tocava flauta maravilhosamente",
      "Foi transformado em Irapuru",
      "Mensagem: amor continua através da música"
    ]
  },
  {
    title: "Curupira",
    points: [
      "Tem pés virados para trás",
      "Protege a floresta dos caçadores",
      "Mensagem: a natureza deve ser respeitada"
    ]
  }
];

export const curriculumContext = `
Conteúdos-base:
- Lendas e contos ancestrais indígenas: "A índia que amava a Lua", "Como o milho foi doado aos indígenas", "O canto da flauta mágica: o Irapuru", "O canto que encanta"
- Compreensão global e ideia central
- Estrutura narrativa: cenário, personagem central, conflito e desfecho
- Ponto de vista do narrador em 1ª e 3ª pessoa
- Discurso direto e indireto
- Pronomes pessoais, possessivos e demonstrativos
- Pontuação: aposto e vocativo
- Leitura guiada com foco nas lendas indígenas
`.trim();

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export function getStoryById(id: string): StoryModule | undefined {
  return storyModules.find(story => story.id === id);
}

export function getConceptById(id: string): ConceptLesson | undefined {
  return conceptLessons.find(concept => concept.id === id);
}

export function getQuestionById(id: string): TestQuestion | undefined {
  return testQuestions.find(q => q.id === id);
}

export function getBadgeById(id: string): Badge | undefined {
  return badges.find(b => b.id === id);
}

export const totalContent = {
  stories: storyModules.length,
  concepts: conceptLessons.length,
  questions: testQuestions.length,
  badges: badges.length
};
