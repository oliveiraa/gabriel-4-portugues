"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  BookOpen, Brain, Compass, Flame, HelpCircle, Leaf, Lightbulb, Map, 
  MessageCircle, Music, Pause, Play, Sparkles, Star, Trophy, Volume2 
} from "lucide-react";
import { 
  storyModules, conceptLessons, reviewGame, testQuestions, 
  badges, comparisonCards, type StoryModule, type ConceptLesson, type Badge 
} from "@/lib/content";

// ============================================
// TIPOS
// ============================================

type FeedbackResponse = {
  totalScore: number;
  maximumScore: number;
  overallMessage: string;
  encouragement: string;
  nextSteps: string[];
  perQuestion: {
    id: string;
    score: number;
    maxScore: number;
    verdict: "acertou" | "quase" | "vamos-praticar";
    feedback: string;
    idealAnswer: string;
  }[];
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const storageKey = "gabriel-portugues-v3";

export function StudyHub() {
  // Estados principais
  const [activeStoryId, setActiveStoryId] = useState<string>(storyModules[0].id);
  const [activeConceptId, setActiveConceptId] = useState<string>(conceptLessons[0].id);
  const [completedStories, setCompletedStories] = useState<string[]>([]);
  const [completedConcepts, setCompletedConcepts] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showMascotMessage, setShowMascotMessage] = useState(true);
  const [activeTab, setActiveTab] = useState("leituras");

  // Carregar progresso do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedStories(parsed.completedStories ?? []);
        setCompletedConcepts(parsed.completedConcepts ?? []);
        setPracticeAnswers(parsed.practiceAnswers ?? {});
        setAnswers(parsed.answers ?? {});
        setEarnedBadges(parsed.earnedBadges ?? []);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, []);

  // Salvar progresso
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({
      completedStories,
      completedConcepts,
      practiceAnswers,
      answers,
      earnedBadges
    }));
  }, [completedStories, completedConcepts, practiceAnswers, answers, earnedBadges]);

  // Verificar conquistas
  useEffect(() => {
    const newBadges: string[] = [];
    
    // Primeira leitura
    if (completedStories.length >= 1 && !earnedBadges.includes("primeira-leitura")) {
      newBadges.push("primeira-leitura");
    }
    
    // Todas as leituras
    if (completedStories.length === storyModules.length && !earnedBadges.includes("todas-leituras")) {
      newBadges.push("todas-leituras");
    }
    
    // Detetive (5 acertos)
    const correctCount = Object.values(practiceAnswers).filter((idx, i) => {
      const question = reviewGame[i];
      return question && question.correctIndex === idx;
    }).length;
    if (correctCount >= 5 && !earnedBadges.includes("detetive")) {
      newBadges.push("detetive");
    }
    
    // Mestre dos conceitos
    if (completedConcepts.length === conceptLessons.length && !earnedBadges.includes("conceitos")) {
      newBadges.push("conceitos");
    }
    
    if (newBadges.length > 0) {
      setEarnedBadges(prev => [...prev, ...newBadges]);
    }
  }, [completedStories, completedConcepts, practiceAnswers, earnedBadges]);

  // Dados atuais
  const activeStory = storyModules.find(s => s.id === activeStoryId) ?? storyModules[0];
  const activeConcept = conceptLessons.find(c => c.id === activeConceptId) ?? conceptLessons[0];

  // Calcular progresso
  const progress = useMemo(() => {
    const storyProgress = completedStories.length / storyModules.length;
    const conceptProgress = completedConcepts.length / conceptLessons.length;
    const practiceTotal = reviewGame.length;
    const practiceProgress = Object.keys(practiceAnswers).length / practiceTotal;
    const testProgress = Object.values(answers).filter(a => a.trim().length > 0).length / testQuestions.length;
    
    return Math.round((storyProgress * 40) + (conceptProgress * 30) + (practiceProgress * 15) + (testProgress * 15));
  }, [completedStories, completedConcepts, practiceAnswers, answers]);

  // Estágio da floresta baseado no progresso
  const forestStage = useMemo(() => {
    if (progress < 20) return { label: "Plantando sementes 🌱", icon: "🌱", color: "text-amber-600" };
    if (progress < 40) return { label: "Broto aparecendo 🌿", icon: "🌿", color: "text-lime-600" };
    if (progress < 60) return { label: "Crescendo forte 🌳", icon: "🌳", color: "text-emerald-600" };
    if (progress < 80) return { label: "Floresta florindo 🌸", icon: "🌸", color: "text-pink-600" };
    return { label: "Guardião da mata 🏆", icon: "🏆", color: "text-amber-500" };
  }, [progress]);

  // Submeter teste
  async function submitForCorrection() {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch("/api/test-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Erro ao corrigir");
      
      setFeedback(data as FeedbackResponse);
      
      // Conquista: primeiro teste
      if (!earnedBadges.includes("primeiro-teste")) {
        setEarnedBadges(prev => [...prev, "primeiro-teste"]);
      }
      
      // Conquista: guardião
      if (progress >= 90 && !earnedBadges.includes("guardiao")) {
        setEarnedBadges(prev => [...prev, "guardiao"]);
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Erro ao corrigir");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      {/* Header com mascote */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              🌲
            </div>
            <div>
              <h1 className="font-bold text-xl text-emerald-900">Trilha Encantada</h1>
              <p className="text-sm text-emerald-600">Português 4º ano</p>
            </div>
          </div>
          
          {/* Floresta do progresso */}
          <div className="hidden sm:flex items-center gap-4 bg-emerald-50 px-4 py-2 rounded-full">
            <span className="text-2xl">{forestStage.icon}</span>
            <div className="w-32">
              <div className="flex justify-between text-xs mb-1">
                <span className={cn("font-medium", forestStage.color)}>{forestStage.label}</span>
              </div>
              <Progress value={progress} className="h-2 bg-emerald-200" />
            </div>
          </div>
        </div>
      </header>

      {/* Mascote com mensagem */}
      {showMascotMessage && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="text-4xl animate-bounce">🦊</div>
            <div className="flex-1">
              <p className="text-amber-900 font-medium">
                Olá, explorador! Sou o Curupira, guardião desta floresta do conhecimento. 
                Vou te acompanhar nessa jornada! 🌲
              </p>
              <p className="text-amber-700 text-sm mt-1">
                Leia as lendas, aprenda os conceitos e colete conquistas. Estamos juntos nessa!
              </p>
            </div>
            <button 
              onClick={() => setShowMascotMessage(false)}
              className="text-amber-600 hover:text-amber-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navegação */}
          <TabsList className="w-full flex-wrap justify-start gap-2 bg-white/50 p-2 rounded-2xl h-auto">
            <TabsTrigger value="leituras" className="rounded-xl px-4 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Lendas
            </TabsTrigger>
            <TabsTrigger value="conceitos" className="rounded-xl px-4 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Lightbulb className="w-4 h-4 mr-2" />
              Conceitos
            </TabsTrigger>
            <TabsTrigger value="pratica" className="rounded-xl px-4 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Compass className="w-4 h-4 mr-2" />
              Jogo Rápido
            </TabsTrigger>
            <TabsTrigger value="teste" className="rounded-xl px-4 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Teste
            </TabsTrigger>
            <TabsTrigger value="conquistas" className="rounded-xl px-4 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Conquistas
            </TabsTrigger>
          </TabsList>

          {/* ABA: LEITURAS */}
          <TabsContent value="leituras" className="space-y-6">
            <div className="grid lg:grid-cols-[280px_1fr] gap-6">
              {/* Lista de lendas */}
              <Card className="bg-white/70 border-emerald-100">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    Escolha uma lenda
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {storyModules.map((story, index) => (
                    <button
                      key={story.id}
                      onClick={() => setActiveStoryId(story.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all",
                        activeStoryId === story.id
                          ? "bg-emerald-100 border-2 border-emerald-300"
                          : "bg-emerald-50/50 hover:bg-emerald-100/50 border-2 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {completedStories.includes(story.id) ? "✅" : ["🌙", "🌽", "🐦", "🌲"][index]}
                        </span>
                        <div>
                          <p className="font-medium text-emerald-900 text-sm">{story.title}</p>
                          <p className="text-xs text-emerald-600">{story.eyebrow}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Conteúdo da lenda */}
              <div className="space-y-6">
                {/* Hero da lenda */}
                <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm mb-1">{activeStory.eyebrow}</p>
                        <h2 className="text-2xl font-bold mb-2">{activeStory.title}</h2>
                        <p className="text-emerald-100 text-sm">{activeStory.strapline}</p>
                      </div>
                      <div className="text-5xl">
                        {activeStory.id === "india-lua" && "🌙"}
                        {activeStory.id === "milho" && "🌽"}
                        {activeStory.id === "irapuru" && "🐦"}
                        {activeStory.id === "curupira" && "🌲"}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-3">
                      <Button
                        onClick={() => {
                          setCompletedStories(prev => 
                            prev.includes(activeStory.id) 
                              ? prev.filter(id => id !== activeStory.id)
                              : [...prev, activeStory.id]
                          );
                        }}
                        variant="secondary"
                        className={cn(
                          "rounded-full",
                          completedStories.includes(activeStory.id)
                            ? "bg-white text-emerald-700"
                            : "bg-emerald-500/50 text-white hover:bg-emerald-500/70"
                        )}
                      >
                        {completedStories.includes(activeStory.id) ? "✓ Lida" : "Marcar como lida"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Missão de leitura */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Compass className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-amber-900">Missão de leitura</p>
                      <p className="text-sm text-amber-700">{activeStory.readingMission}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Texto da lenda */}
                <Card className="bg-white border-emerald-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-emerald-600" />
                      A história
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-emerald max-w-none">
                      {activeStory.adaptedReading.map((paragraph, idx) => (
                        <p key={idx} className="text-gray-700 leading-relaxed mb-4 text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Mapa da narrativa */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-900">
                      <Map className="w-5 h-5 text-purple-600" />
                      Mapa da narrativa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <MapCard label="Personagem" value={activeStory.narrativeMap.personagem} color="bg-blue-100 text-blue-800" />
                      <MapCard label="Cenário" value={activeStory.narrativeMap.cenario} color="bg-green-100 text-green-800" />
                      <MapCard label="Problema" value={activeStory.narrativeMap.problema} color="bg-red-100 text-red-800" />
                      <MapCard label="Desfecho" value={activeStory.narrativeMap.desfecho} color="bg-amber-100 text-amber-800" />
                      <MapCard label="Narrador" value={activeStory.narrativeMap.narrador} color="bg-purple-100 text-purple-800" />
                    </div>
                  </CardContent>
                </Card>

                {/* Vocabulário */}
                <Card className="bg-white border-emerald-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      Palavras importantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeStory.vocabulary.map((item) => (
                        <div key={item.term} className="bg-emerald-50 p-3 rounded-lg">
                          <p className="font-semibold text-emerald-900">{item.term}</p>
                          <p className="text-sm text-emerald-700">{item.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Perguntas para pensar */}
                <Card className="bg-white border-emerald-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-emerald-600" />
                      Pense sobre a história
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {activeStory.askAndThink.map((item, idx) => (
                        <AccordionItem key={idx} value={`q-${idx}`} className="border-emerald-100">
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="text-emerald-900">{item.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-emerald-700 bg-emerald-50/50 p-3 rounded-lg">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Quiz rápido da lenda */}
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-900">
                      <Compass className="w-5 h-5 text-amber-600" />
                      Teste rápido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeStory.quickCheck.map((question, idx) => {
                      const selected = practiceAnswers[question.id];
                      const isCorrect = selected === question.correctIndex;
                      const hasAnswered = selected !== undefined;

                      return (
                        <div key={question.id} className="bg-white p-4 rounded-xl border border-amber-200">
                          <p className="font-medium text-amber-900 mb-3">{idx + 1}. {question.prompt}</p>
                          <div className="space-y-2">
                            {question.options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  if (!hasAnswered) {
                                    setPracticeAnswers(prev => ({ ...prev, [question.id]: optIdx }));
                                  }
                                }}
                                disabled={hasAnswered}
                                className={cn(
                                  "w-full text-left p-3 rounded-lg border-2 transition-all",
                                  hasAnswered && optIdx === question.correctIndex
                                    ? "border-green-400 bg-green-50"
                                    : hasAnswered && optIdx === selected
                                    ? "border-red-300 bg-red-50"
                                    : "border-amber-200 hover:border-amber-300 bg-white"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {hasAnswered && (
                            <div className={cn(
                              "mt-3 p-3 rounded-lg text-sm",
                              isCorrect ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                            )}>
                              {isCorrect ? "🎉 " : "💡 "}{question.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ABA: CONCEITOS */}
          <TabsContent value="conceitos" className="space-y-6">
            <div className="grid lg:grid-cols-[280px_1fr] gap-6">
              <Card className="bg-white/70 border-emerald-100">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                    Escolha um conceito
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {conceptLessons.map((concept) => (
                    <button
                      key={concept.id}
                      onClick={() => setActiveConceptId(concept.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all",
                        activeConceptId === concept.id
                          ? "bg-emerald-100 border-2 border-emerald-300"
                          : "bg-emerald-50/50 hover:bg-emerald-100/50 border-2 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {completedConcepts.includes(concept.id) ? "✅" : "💡"}
                        </span>
                        <div>
                          <p className="font-medium text-emerald-900 text-sm">{concept.title}</p>
                          <p className="text-xs text-emerald-600">{concept.eyebrow}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-violet-600 to-purple-700 text-white border-0">
                  <CardContent className="p-6">
                    <p className="text-violet-200 text-sm mb-1">{activeConcept.eyebrow}</p>
                    <h2 className="text-2xl font-bold">{activeConcept.title}</h2>
                    <p className="text-violet-100 mt-2">{activeConcept.intro}</p>
                    
                    <Button
                      onClick={() => {
                        setCompletedConcepts(prev => 
                          prev.includes(activeConcept.id) 
                            ? prev.filter(id => id !== activeConcept.id)
                            : [...prev, activeConcept.id]
                        );
                      }}
                      variant="secondary"
                      className={cn(
                        "mt-4 rounded-full",
                        completedConcepts.includes(activeConcept.id)
                          ? "bg-white text-violet-700"
                          : "bg-violet-500/50 text-white hover:bg-violet-500/70"
                      )}
                    >
                      {completedConcepts.includes(activeConcept.id) ? "✓ Estudado" : "Marcar como estudado"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-emerald-100">
                  <CardHeader>
                    <CardTitle>Explicação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeConcept.explanation.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 leading-relaxed">{paragraph}</p>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Exemplos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeConcept.exampleCards.map((card, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-amber-200">
                          <p className="font-semibold text-amber-900 mb-1">{card.label}</p>
                          <p className="text-sm text-amber-700">{card.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-emerald-100">
                  <CardHeader>
                    <CardTitle>Prática guiada</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeConcept.guidedPractice.map((item, idx) => (
                      <div key={idx} className="bg-emerald-50 p-4 rounded-xl">
                        <p className="font-medium text-emerald-900 mb-2">{item.prompt}</p>
                        <Accordion type="single" collapsible>
                          <AccordionItem value={`answer-${idx}`} className="border-0">
                            <AccordionTrigger className="text-sm text-emerald-600 hover:no-underline py-0">
                              Ver resposta
                            </AccordionTrigger>
                            <AccordionContent className="text-emerald-700 pt-2">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Teste rápido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeConcept.quickCheck.map((question, idx) => {
                      const selected = practiceAnswers[question.id];
                      const isCorrect = selected === question.correctIndex;
                      const hasAnswered = selected !== undefined;

                      return (
                        <div key={question.id} className="bg-white p-4 rounded-xl border border-blue-200">
                          <p className="font-medium text-blue-900 mb-3">{idx + 1}. {question.prompt}</p>
                          <div className="space-y-2">
                            {question.options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  if (!hasAnswered) {
                                    setPracticeAnswers(prev => ({ ...prev, [question.id]: optIdx }));
                                  }
                                }}
                                disabled={hasAnswered}
                                className={cn(
                                  "w-full text-left p-3 rounded-lg border-2 transition-all",
                                  hasAnswered && optIdx === question.correctIndex
                                    ? "border-green-400 bg-green-50"
                                    : hasAnswered && optIdx === selected
                                    ? "border-red-300 bg-red-50"
                                    : "border-blue-200 hover:border-blue-300 bg-white"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {hasAnswered && (
                            <div className={cn(
                              "mt-3 p-3 rounded-lg text-sm",
                              isCorrect ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            )}>
                              {isCorrect ? "🎉 " : "💡 "}{question.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ABA: JOGO RÁPIDO */}
          <TabsContent value="pratica" className="space-y-6">
            <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🎮</div>
                  <div>
                    <h2 className="text-2xl font-bold">Jogo Rápido</h2>
                    <p className="text-amber-100">Teste seus conhecimentos sobre todas as lendas!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {reviewGame.map((question, idx) => {
                const selected = practiceAnswers[question.id];
                const isCorrect = selected === question.correctIndex;
                const hasAnswered = selected !== undefined;

                return (
                  <Card key={question.id} className={cn(
                    "border-2 transition-all",
                    hasAnswered && isCorrect ? "border-green-300 bg-green-50/30" : "border-amber-200"
                  )}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <span className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0",
                          hasAnswered 
                            ? isCorrect ? "bg-green-500 text-white" : "bg-red-400 text-white"
                            : "bg-amber-200 text-amber-800"
                        )}>
                          {hasAnswered ? (isCorrect ? "✓" : "✕") : idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-4">{question.prompt}</p>
                          <div className="grid sm:grid-cols-3 gap-2">
                            {question.options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  if (!hasAnswered) {
                                    setPracticeAnswers(prev => ({ ...prev, [question.id]: optIdx }));
                                  }
                                }}
                                disabled={hasAnswered}
                                className={cn(
                                  "p-3 rounded-lg border-2 text-sm text-left transition-all",
                                  hasAnswered && optIdx === question.correctIndex
                                    ? "border-green-500 bg-green-100 text-green-900"
                                    : hasAnswered && optIdx === selected
                                    ? "border-red-400 bg-red-100 text-red-900"
                                    : "border-gray-200 hover:border-amber-300 bg-white"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {hasAnswered && (
                            <div className={cn(
                              "mt-4 p-3 rounded-lg text-sm",
                              isCorrect ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                            )}>
                              {isCorrect ? "🎉 Acertou! " : "💡 "}{question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ABA: TESTE */}
          <TabsContent value="teste" className="space-y-6">
            <Card className="bg-gradient-to-br from-violet-600 to-purple-700 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">📝</div>
                  <div>
                    <h2 className="text-2xl font-bold">Teste de Português</h2>
                    <p className="text-violet-100">Responda com calma. O Curupira vai revisar suas respostas!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-[1fr_400px] gap-6">
              <div className="space-y-6">
                {testQuestions.map((question, idx) => (
                  <Card key={question.id} className="border-violet-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </span>
                          {question.prompt}
                        </CardTitle>
                        <span className="text-sm text-violet-600 font-medium">{question.maxScore} pts</span>
                      </div>
                      <CardDescription>{question.support}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {question.type === "multiple-choice" ? (
                        <div className="space-y-2">
                          {question.options?.map((option) => (
                            <button
                              key={option}
                              onClick={() => setAnswers(prev => ({ ...prev, [question.id]: option }))}
                              className={cn(
                                "w-full text-left p-3 rounded-lg border-2 transition-all",
                                answers[question.id] === option
                                  ? "border-violet-500 bg-violet-50"
                                  : "border-gray-200 hover:border-violet-300 bg-white"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <Textarea
                          value={answers[question.id] ?? ""}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                          placeholder="Escreva sua resposta aqui..."
                          className="min-h-32 border-gray-200 focus:border-violet-400"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}

                <div className="flex items-center gap-4">
                  <Button
                    onClick={submitForCorrection}
                    disabled={isSubmitting}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl"
                  >
                    {isSubmitting ? "🤖 O Curupira está corrigindo..." : "📝 Enviar para correção"}
                  </Button>
                  {submitError && (
                    <p className="text-red-600 text-sm">{submitError}</p>
                  )}
                </div>
              </div>

              {/* Painel de feedback */}
              <div>
                <Card className="sticky top-24 border-violet-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-violet-600" />
                      Feedback do Curupira
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feedback ? (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white p-4 rounded-xl">
                          <p className="text-violet-200 text-sm">Resultado</p>
                          <p className="text-3xl font-bold">{feedback.totalScore}/{feedback.maximumScore}</p>
                        </div>
                        
                        <div className="bg-violet-50 p-4 rounded-xl">
                          <p className="text-violet-900 text-sm leading-relaxed">{feedback.overallMessage}</p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                          <p className="text-amber-800 text-sm">{feedback.encouragement}</p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 mb-2">Próximos passos:</p>
                          <ul className="space-y-1">
                            {feedback.nextSteps.map((step, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-violet-500">•</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator />

                        <ScrollArea className="h-64">
                          <div className="space-y-3">
                            {feedback.perQuestion.map((item) => (
                              <div key={item.id} className="bg-gray-50 p-3 rounded-lg text-sm">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-gray-900">
                                    Questão {testQuestions.findIndex(q => q.id === item.id) + 1}
                                  </span>
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full text-xs",
                                    item.verdict === "acertou" ? "bg-green-100 text-green-800" :
                                    item.verdict === "quase" ? "bg-amber-100 text-amber-800" :
                                    "bg-red-100 text-red-800"
                                  )}>
                                    {item.score}/{item.maxScore}
                                  </span>
                                </div>
                                <p className="text-gray-600">{item.feedback}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <div className="text-6xl mb-4">🦊</div>
                        <p>Responda as questões e envie para o Curupira corrigir!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ABA: CONQUISTAS */}
          <TabsContent value="conquistas" className="space-y-6">
            <Card className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🏆</div>
                  <div>
                    <h2 className="text-2xl font-bold">Suas Conquistas</h2>
                    <p className="text-amber-100">
                      Você tem {earnedBadges.length} de {badges.length} conquistas!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => {
                const isEarned = earnedBadges.includes(badge.id);
                return (
                  <Card 
                    key={badge.id} 
                    className={cn(
                      "transition-all",
                      isEarned 
                        ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300" 
                        : "bg-gray-50 border-gray-200 opacity-60"
                    )}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={cn(
                        "text-5xl mb-3",
                        isEarned ? "" : "grayscale"
                      )}>
                        {badge.icon}
                      </div>
                      <h3 className={cn(
                        "font-bold mb-1",
                        isEarned ? "text-amber-900" : "text-gray-600"
                      )}>
                        {badge.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      {isEarned ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                          <Trophy className="w-3 h-3" />
                          Conquistado!
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">{badge.condition}</span>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

// ============================================
// COMPONENTES AUXILIARES
// ============================================

function MapCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={cn("p-3 rounded-xl", color.replace("text-", "bg-").replace("800", "100").replace("900", "100"))}>
      <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", color)}>{label}</p>
      <p className={cn("text-sm", color)}>{value}</p>
    </div>
  );
}
