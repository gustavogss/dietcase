export interface ComorbidityRecipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  calories: number;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
}

export interface ComorbidityCombination {
  id: string;
  name: string;
  description: string;
  icon: string;
  recipes: ComorbidityRecipe[];
}

export const comorbidityCombinations: ComorbidityCombination[] = [
  {
    id: "obesidade-hipertensao",
    name: "Obesidade + Hipertensão",
    description: "Receitas para controle de peso e pressão arterial",
    icon: "Heart",
    recipes: [
      {
        id: "salmao-grelhado-legumes",
        title: "Salmão Grelhado com Legumes",
        description: "Fonte de ômega-3 com vegetais ricos em potássio",
        prepTime: "25 min",
        servings: "2 porções",
        calories: 280,
        ingredients: [
          "200g de filé de salmão",
          "1 berinjela média",
          "1 abobrinha média",
          "1 tomate",
          "2 colheres de sopa de azeite",
          "Limão, alho e ervas"
        ],
        instructions: [
          "Temperar o salmão com alho, limão e ervas",
          "Cortar os legumes em cubos",
          "Grelhar o salmão por 5 minutos de cada lado",
          "Saltear os legumes no azeite até ficarem macios",
          "Servir com salada verde"
        ],
        benefits: ["Controle da pressão", "Redução de peso", "Fonte de proteína magra"]
      },
      {
        id: "frango-com-quinoa",
        title: "Frango com Quinoa e Vegetais",
        description: "Refeição completa e balanceada",
        prepTime: "30 min",
        servings: "2 porções",
        calories: 320,
        ingredients: [
          "150g de peito de frango",
          "100g de quinoa",
          "Brócolis",
          "Cenoura",
          "Cebola",
          "1 colher de sopa de azeite"
        ],
        instructions: [
          "Cozinhar a quinoa conforme instruções da embalagem",
          "Cortar o frango em cubos e temperar com ervas",
          "Cozinhar o frango em uma frigideira antiaderente",
          "Cozinhar os vegetais no vapor",
          "Misturar tudo e servir"
        ],
        benefits: ["Alto teor de fibras", "Controle calórico", "Fonte de proteína"]
      }
    ]
  },
  {
    id: "terceira-idade-celiacos",
    name: "Terceira Idade + Celíacos",
    description: "Receitas sem glúten e de fácil digestão",
    icon: "Users",
    recipes: [
      {
        id: "sopa-legumes-sem-gluten",
        title: "Sopa Cremosa de Legumes",
        description: "Nutritiva e fácil de digerir",
        prepTime: "35 min",
        servings: "4 porções",
        calories: 180,
        ingredients: [
          "2 batatas doces",
          "2 cenouras",
          "1 abóbora pequena",
          "1 cebola",
          "2 dentes de alho",
          "500ml de caldo de galinha sem sal",
          "1 colher de sopa de azeite"
        ],
        instructions: [
          "Cortar todos os legumes em pedaços pequenos",
          "Refogar cebola e alho no azeite",
          "Adicionar os legumes e o caldo",
          "Cozinhar por 20 minutos até amolecer",
          "Bater no liquidificador até ficar cremoso",
          "Servir quente"
        ],
        benefits: ["Fácil digestão", "Sem glúten", "Rica em vitaminas"]
      },
      {
        id: "omelete-aveia",
        title: "Omelete de Aveia com Ervas",
        description: "Fonte de energia e proteína",
        prepTime: "15 min",
        servings: "1 porção",
        calories: 250,
        ingredients: [
          "2 ovos",
          "3 colheres de sopa de aveia sem glúten",
          "1/2 xícara de leite desnatado",
          "Ervas frescas",
          "1 colher de chá de azeite"
        ],
        instructions: [
          "Misturar aveia com leite e descansar 5 minutos",
          "Bater os ovos e adicionar as ervas",
          "Misturar os ovos com a aveia hidratada",
          "Cozinhar em frigideira antiaderente",
          "Dobrar e servir"
        ],
        benefits: ["Sem glúten", "Alto teor proteico", "Energia gradual"]
      }
    ]
  },
  {
    id: "obesidade-diverticulite",
    name: "Obesidade + Diverticulite",
    description: "Receitas ricas em fibras solúveis e baixo calóricas",
    icon: "Activity",
    recipes: [
      {
        id: "pure-abobora-linhaça",
        title: "Purê de Abóbora com Linhaça",
        description: "Suave para o sistema digestivo",
        prepTime: "20 min",
        servings: "2 porções",
        calories: 160,
        ingredients: [
          "300g de abóbora cabotiá",
          "1 colher de sopa de linhaça",
          "1 colher de café de canela",
          "200ml de água ou leite desnatado"
        ],
        instructions: [
          "Cozinhar a abóbora até ficar macia",
          "Amassar com garfo ou processador",
          "Adicionar linhaça e canela",
          "Ajustar consistência com água/leite",
          "Servir morno"
        ],
        benefits: ["Rica em fibras solúveis", "Baixa caloria", "Protetora intestinal"]
      },
      {
        id: "salada-feijao-branco",
        title: "Salada de Feijão Branco",
        description: "Fonte de proteína e fibras",
        prepTime: "25 min",
        servings: "2 porções",
        calories: 220,
        ingredients: [
          "1 xícara de feijão branco cozido",
          "Tomate cereja",
          "Pepino",
          "Cebola roxa",
          "1 colher de sopa de azeite",
          "Limão e ervas"
        ],
        instructions: [
          "Cozinhar o feijão branco até ficar macio",
          "Lavar bem os vegetais",
          "Misturar tudo em uma saladeira",
          "Temperar com azeite, limão e ervas",
          "Servir gelada"
        ],
        benefits: ["Alto teor de fibras", "Fonte de proteína vegetal", "Baixo índice glicêmico"]
      }
    ]
  },
  {
    id: "hipotiroidismo-terceira-idade",
    name: "Hipotiroidismo + Terceira Idade",
    description: "Receitas ricas em iodo e nutrientes essenciais",
    icon: "Activity",
    recipes: [
      {
        id: "bacalhau-brócolis",
        title: "Bacalhau com Brócolis",
        description: "Fonte de iodo e selênio",
        prepTime: "40 min",
        servings: "2 porções",
        calories: 290,
        ingredients: [
          "200g de bacalhau dessalgado",
          "1 brócolis médio",
          "1 batata média",
          "1 cebola",
          "2 dentes de alho",
          "Azeite e salsa"
        ],
        instructions: [
          "Deixar o bacalhau de molho por 24 horas",
          "Cozinhar o bacalhau e desfiar",
          "Cozinhar batata e brócolis no vapor",
          "Refogar cebola e alho",
          "Misturar tudo e temperar",
          "Servir quente"
        ],
        benefits: ["Fonte de iodo", "Rico em selênio", "Suporte tireoidiano"]
      },
      {
        id: "omelete-espinafre",
        title: "Omelete de Espinafre e Queijo",
        description: "Nutritiva e fácil de preparar",
        prepTime: "15 min",
        servings: "1 porção",
        calories: 240,
        ingredients: [
          "2 ovos",
          "1 xícara de espinafre cozido",
          "50g de queijo branco",
          "1 colher de chá de azeite"
        ],
        instructions: [
          "Bater os ovos com um pouco de sal",
          "Aquecer o azeite em frigideira",
          "Adicionar o espinafre e queijo",
          "Despejar os ovos e cozinhar",
          "Dobrar e servir"
        ],
        benefits: ["Fonte de ferro", "Rico em antioxidantes", "Proteína de qualidade"]
      }
    ]
  },
  {
    id: "diabetes-lactose",
    name: "Diabetes + Intolerância à Lactose",
    description: "Receitas sem lactose e controle glicêmico",
    icon: "Droplet",
    recipes: [
      {
        id: "vitamina-bebida-vegetal",
        title: "Vitamina de Bebida Vegetal e Frutas",
        description: "Nutritiva e sem lactose",
        prepTime: "10 min",
        servings: "1 porção",
        calories: 180,
        ingredients: [
          "1 xícara de bebida vegetal sem açúcar",
          "1/2 banana",
          "1/2 maçã",
          "1 colher de sopa de chia",
          "Canela a gosto"
        ],
        instructions: [
          "Liquidificar a fruta com a bebida vegetal",
          "Adicionar chia e misturar",
          "Polvilhar canela por cima",
          "Servir imediatamente"
        ],
        benefits: ["Sem lactose", "Baixo índice glicêmico", "Fonte de fibras"]
      },
      {
        id: "panquecas-aveia-banana",
        title: "Panquecas de Aveia com Banana",
        description: "Café da manhã nutritivo",
        prepTime: "20 min",
        servings: "2 porções",
        calories: 200,
        ingredients: [
          "1 xícara de aveia",
          "1 banana madura",
          "2 ovos",
          "1 colher de chá de fermento",
          "Canela",
          "Óleo de coco"
        ],
        instructions: [
          "Amassar a banana com um garfo",
          "Misturar aveia, ovos e fermento",
          "Aquecer óleo em frigideira",
          "Fazer as panquecas pequenas",
          "Servir com canela por cima"
        ],
        benefits: ["Sem lactose", "Controla glicose", "Energia sustentada"]
      }
    ]
  }
];
