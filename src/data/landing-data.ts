import mariaPhoto from "@/assets/testimonials/maria.jpg";
import carlosPhoto from "@/assets/testimonials/carlos.jpg";
import anaPhoto from "@/assets/testimonials/ana.jpg";

export type LandingData = {
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImageAlt: string;
  };
  howItWorks: Array<{ step: string; title: string; icon: string }>;
  targetAudience: Array<{ title: string; description: string; icon: string }>;
  benefits: Array<{ title: string; description: string; icon: string }>;
  plans: Array<{
    name: string;
    desc: string;
    price: string;
    highlight?: boolean;
    features: string[];
  }>;
  testimonials: Array<{
    name: string;
    age: number;
    condition: string;
    text: string;
    photo: { src: string; alt: string };
  }>;
  stats: Array<{ value: string; label: string }>;
  faq: Array<{ question: string; answer: string }>;
};

export const landingData: LandingData = {
  hero: {
    headline: "Dietas personalizadas para quem precisa de cuidado especial",
    subheadline: "Cardápios inteligentes para diabéticos, bariátricos, idosos e muito mais",
    ctaPrimary: "Conheça nossa plataforma",
    ctaSecondary: "Ver planos",
    heroImageAlt: "Pessoa idosa feliz usando celular",
  },
  howItWorks: [
    { step: "1", title: "Cadastre-se gratuitamente", icon: "UserPlus" },
    { step: "2", title: "Informe seus dados e morbidades", icon: "ClipboardList" },
    { step: "3", title: "Receba sua dieta personalizada", icon: "Calendar" },
    { step: "4", title: "Acompanhe sua evolução", icon: "TrendingUp" },
  ],
  targetAudience: [
    {
      title: "Bariátricos",
      description: "Cardápios alinhados ao seu momento e às suas necessidades.",
      icon: "Activity",
    },
    {
      title: "Diabéticos",
      description: "Sugestões práticas para manter o controle com mais tranquilidade.",
      icon: "Droplet",
    },
    {
      title: "Celíacos",
      description: "Opções sem glúten, com clareza e variedade.",
      icon: "Wheat",
    },
    {
      title: "Intolerantes à lactose",
      description: "Alternativas inteligentes sem abrir mão do sabor.",
      icon: "Milk",
    },
    {
      title: "Hipertensão",
      description: "Foco em escolhas mais leves e balanceadas.",
      icon: "Heart",
    },
    {
      title: "Obesidade",
      description: "Metas, progresso e plano estruturado para consistência.",
      icon: "Weight",
    },
    {
      title: "Terceira idade",
      description: "Alimentação com cuidado, conforto e simplicidade.",
      icon: "Users",
    },
    {
      title: "Diverticulite",
      description: "Sugestões e ajustes alimentares para reduzir desconfortos e manter rotina leve.",
      icon: "Nut",
    },
    {
      title: "Hipotireoidismo",
      description: "Planejamento alimentar com foco em consistência e hábitos saudáveis no longo prazo.",
      icon: "Activity",
    },
  ],
  benefits: [
    {
      title: "Dietas por morbidade",
      description: "Planos ajustados às suas condições e restrições.",
      icon: "FileText",
    },
    {
      title: "Cardápios semanais",
      description: "Organização e praticidade no dia a dia.",
      icon: "Calendar",
    },
    {
      title: "Download em PDF",
      description: "Baixe e compartilhe quando precisar.",
      icon: "Download",
    },
    {
      title: "Automação inteligente",
      description: "Geração de dietas com Agentes de IA específicos para cada morbidade",
      icon: "Sparkles",
    },
    {
      title: "IMC e peso",
      description: "Acompanhe indicadores ao longo do tempo.",
      icon: "Activity",
    },
    {
      title: "Metas e progresso",
      description: "Evolua com consistência e motivação.",
      icon: "TrendingUp",
    },
    {
      title: "Recomendações",
      description: "Sugestões claras para decisões melhores.",
      icon: "Lightbulb",
    },
    {
      title: "Ebooks e guias",
      description: "Conteúdos de apoio para sua jornada.",
      icon: "BookOpen",
    },
  ],
  plans: [
  {
    name: "Essencial",
    desc: "Indicado para quem tem apenas 01 morbidade",
    price: "49,90",
    features: [
      "Cardápio fixo gerado para 1 morbidade",
      "Cardápios favoritos",
      "Lista de compras",
      "Recomendações básicas",
      "01 Agente especialista",
      "Score de Evolução",
      "Download e Compartilhamento de PDFs"
    ],
  },
  {
    name: "Transformação",
    desc: "Indicado para quem tem comorbidades e precisa de um melhor acompanhamento",
    price: "99,90",
    highlight: true,
    features: [
      "Tudo do essencial +",
      "Cardápios semanais para comorbidades",
      "Multiplos Agentes",
      "Orquestrador de conflitos",
      "Assistente Nutricional",
      "Análise de Progresso IA",
      "Check-in Diário",
      "Ajustes Automáticos",
      "Menu Restaurante",
      "Relatórios de Evolução",
      "Acesso a Bibliotecas"
    ],
  }
],

  testimonials: [
    {
      name: "Maria S.",
      age: 63,
      condition: "Diabetes tipo 2",
      text: "Ficou muito mais fácil seguir a dieta no dia a dia. Os cardápios são claros e práticos.",
      photo: {
        src: mariaPhoto,
        alt: "Foto de Maria S., 63 anos",
      },
    },
    {
      name: "Carlos M.",
      age: 52,
      condition: "Pós-bariátrica",
      text: "Passei a me organizar melhor e a manter consistência. A visão semanal ajuda muito.",
      photo: {
        src: carlosPhoto,
        alt: "Foto de Carlos M., 52 anos",
      },
    },
    {
      name: "Ana R.",
      age: 38,
      condition: "Intolerância à lactose",
      text: "As substituições e recomendações me poupam tempo e reduzem erros na rotina.",
      photo: {
        src: anaPhoto,
        alt: "Foto de Ana R., 38 anos",
      },
    },
  ],
  stats: [
    { value: "+90%", label: "relatam mais facilidade" },
    { value: "+80%", label: "seguem a dieta corretamente" },
    { value: "+70%", label: "melhoram hábitos alimentares" },
  ],
  faq: [
    {
      question: "O DietCase é gratuito?",
      answer:
        "Você pode começar gratuitamente. Os planos pagos liberam recursos avançados e mais opções de personalização.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Sim. Você tem controle total e pode cancelar a qualquer momento (quando houver assinatura ativa).",
    },
    {
      question: "As dietas substituem um nutricionista?",
      answer:
        "Não. O DietCase é uma ferramenta de apoio e não substitui acompanhamento profissional.",
    },
    {
      question: "Posso mudar de plano?",
      answer:
        "Você pode realizar o upgrade para o plano Premium a qualquer momento para desbloquear todos os recursos. Note que, por políticas da plataforma, apenas upgrades são permitidos.",
    },
    {
      question: "Posso mudar meus dados depois?",
      answer:
        "Sim. Você poderá ajustar suas informações e preferências sempre que precisar.",
    },
    {
      question: "O sistema funciona para idosos?",
      answer:
        "Sim. A experiência foi pensada para ser simples e acessível, inclusive para a terceira idade.",
    },
  ],
};
