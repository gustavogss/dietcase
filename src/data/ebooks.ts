export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  consumption_guide: string[];
}

export type Category =
  | 'Bariatrica'
  | 'Diabetes'
  | 'Hipertensao'
  | 'Obesidade'
  | 'Hipotiroidismo'
  | 'Diverticulite'
  | 'Celiacos'
  | 'IntoleranciaLactose'
  | 'TerceiraIdade';

export type BariatricPhase = 'Liquida' | 'Pastosa' | 'Solida';

export interface EbookCollection {
  id: string;
  title: string;
  category: Category;
  phase?: BariatricPhase | 'Aguda' | 'Remissão' | 'Ganho de Músculo' | 'de Sustentação' | 'Cardiovascular';
  tags: string[];
  recipes: Recipe[];
}

export const ebookCollections: EbookCollection[] = [

  {
    id: 'bar-liquida',
    title: 'Bariátrica: Fase Líquida Restrita',
    category: 'Bariatrica',
    phase: 'Liquida',
    tags: ['Coado Obrigatório', 'Digestibilidade Máxima', 'Hidratação'],
    recipes: [
      {
        title: 'Caldo Clarificado de Frango',
        description: 'Leve, nutritivo e ideal para os primeiros dias.',
        ingredients: ['Peito de frango', '1 litro de água', 'Cenoura', 'Cebola'],
        instructions: [
          'Cozinhe todos os ingredientes por 30 minutos.',
          'Retire os sólidos.',
          'Coe completamente em peneira fina ou pano limpo.',
          'Leve à geladeira e remova qualquer gordura sólida.'
        ],
        consumption_guide: [
          'Consumir morno.',
          'Pequenos goles.',
          'Obrigatoriamente coado.'
        ]
      },
      {
        title: 'Sopa Líquida de Abóbora',
        description: 'Reconfortante e suave para o estômago.',
        ingredients: ['Abóbora', 'Água'],
        instructions: [
          'Cozinhe a abóbora até ficar bem macia.',
          'Bata no liquidificador.',
          'Coe totalmente antes de servir.'
        ],
        consumption_guide: ['Sem fibras.', 'Textura totalmente líquida.', 'Consumir devagar.']
      },
      {
        title: 'Shake Proteico Neutro',
        description: 'Ajuda a manter a ingestão de proteína.',
        ingredients: ['1 scoop whey isolado', '200ml leite desnatado ou vegetal'],
        instructions: [
          'Misture ou bata até ficar homogêneo.',
          'Se necessário, coe para garantir ausência de grumos.'
        ],
        consumption_guide: ['Beber lentamente.', 'Até 150ml por vez.', 'Sem canudo.']
      },
      {
        title: 'Gelatina Proteica',
        description: 'Sobremesa leve e funcional.',
        ingredients: ['Gelatina incolor', 'Água morna', 'Whey neutro'],
        instructions: [
          'Dissolva a gelatina.',
          'Misture o whey.',
          'Leve à geladeira até firmar.'
        ],
        consumption_guide: ['Deixar dissolver na boca.', 'Porções pequenas.']
      },
      {
        title: 'Chá de Camomila com Colágeno',
        description: 'Calmante e proteico.',
        ingredients: ['Chá de camomila', 'Colágeno hidrolisado'],
        instructions: [
          'Prepare o chá.',
          'Misture o colágeno até dissolver totalmente.',
          'Coe se necessário.'
        ],
        consumption_guide: ['Morno.', 'Sem açúcar.', 'Coado.']
      },
      {
        title: 'Caldo de Carne Magra',
        description: 'Fonte leve de ferro e proteína.',
        ingredients: ['Carne magra', 'Água'],
        instructions: [
          'Cozinhe por 40 minutos.',
          'Coe completamente.',
          'Retire gordura superficial.'
        ],
        consumption_guide: ['Pequenos goles.', 'Sem resíduos sólidos.']
      },
      {
        title: 'Água de Coco Dilúida',
        description: 'Reposição leve de eletrólitos.',
        ingredients: ['Água de coco', 'Água filtrada'],
        instructions: ['Misture 50% de cada.'],
        consumption_guide: ['Beber devagar.', 'Sem exceder volume recomendado.']
      },
      {
        title: 'Sopa Líquida de Cenoura',
        description: 'Fonte leve de vitamina A.',
        ingredients: ['Cenoura', 'Água'],
        instructions: [
          'Cozinhe até ficar muito macia.',
          'Bata e coe completamente.'
        ],
        consumption_guide: ['Totalmente lisa.', 'Sem fibras.']
      },
      {
        title: 'Isotônico Natural Caseiro',
        description: 'Hidratação leve pós-cirúrgica.',
        ingredients: ['Água', 'Gotas de limão', 'Pitadas mínimas de sal'],
        instructions: ['Misture bem até dissolver.'],
        consumption_guide: ['Pequenos goles.', 'Sem exageros.']
      },
      {
        title: 'Suco de Maçã Coado',
        description: 'Fonte leve de energia.',
        ingredients: ['Maçã cozida', 'Água'],
        instructions: [
          'Cozinhe a maçã.',
          'Bata com água.',
          'Coe completamente.'
        ],
        consumption_guide: ['Sem fibras.', 'Consumir devagar.']
      }
    ]
  },

  {
    id: 'bar-pastosa',
    title: 'Bariátrica: Fase Pastosa Moderada',
    category: 'Bariatrica',
    phase: 'Pastosa',
    tags: ['Textura Homogênea', 'Alta Proteína'],
    recipes: [
      {
        title: 'Purê de Frango com Abóbora',
        description: 'Proteína magra com textura ideal.',
        ingredients: ['Frango cozido', 'Abóbora cozida', 'Azeite'],
        instructions: [
          'Bata até formar creme homogêneo.',
          'Ajuste com caldo morno.'
        ],
        consumption_guide: ['Pequenas colheradas.', 'Mastigar mesmo pastoso.']
      },
      {
        title: 'Creme de Ricota com Atum',
        description: 'Proteico e leve.',
        ingredients: ['Ricota', 'Atum natural'],
        instructions: ['Misture até virar pasta uniforme.'],
        consumption_guide: ['Porção pequena.']
      },
      {
        title: 'Ovos Cremosos',
        description: 'Alta biodisponibilidade proteica.',
        ingredients: ['Ovos'],
        instructions: ['Cozinhar em fogo baixo até textura macia.'],
        consumption_guide: ['Devagar.', 'Sem líquidos junto.']
      },
      {
        title: 'Purê de Carne Magra',
        description: 'Fonte rica em ferro.',
        ingredients: ['Carne magra cozida'],
        instructions: ['Processar até textura homogênea.'],
        consumption_guide: ['Colheradas pequenas.']
      },
      {
        title: 'Creme de Lentilha',
        description: 'Proteína vegetal suave.',
        ingredients: ['Lentilha cozida'],
        instructions: ['Bater até ficar lisa.'],
        consumption_guide: ['Sem pedaços.']
      },
      {
        title: 'Purê de Mandioquinha com Frango',
        description: 'Fonte leve de energia.',
        ingredients: ['Mandioquinha', 'Frango'],
        instructions: ['Processar até uniforme.'],
        consumption_guide: ['Devagar.']
      },
      {
        title: 'Creme de Peixe',
        description: 'Proteína leve e digestiva.',
        ingredients: ['Peixe cozido'],
        instructions: ['Bater até textura pastosa.'],
        consumption_guide: ['Sem espinhas.']
      },
      {
        title: 'Purê de Couve-Flor',
        description: 'Baixo carboidrato.',
        ingredients: ['Couve-flor cozida'],
        instructions: ['Amassar até homogêneo.'],
        consumption_guide: ['Textura uniforme.']
      },
      {
        title: 'Homus Pastoso',
        description: 'Fonte vegetal de proteína.',
        ingredients: ['Grão-de-bico cozido'],
        instructions: ['Processar até virar creme.'],
        consumption_guide: ['Pequena quantidade.']
      },
      {
        title: 'Creme de Espinafre com Frango',
        description: 'Rico em ferro e proteína.',
        ingredients: ['Espinafre cozido', 'Frango'],
        instructions: ['Bater até homogêneo.'],
        consumption_guide: ['Devagar.']
      }
    ]
  },

  {
    id: 'bar-solida',
    title: 'Bariátrica: Fase Sólida Manter',
    category: 'Bariatrica',
    phase: 'Solida',
    tags: ['Controle de Porção', 'Proteína Prioritária'],
    recipes: [
      {
        title: 'Frango Grelhado com Legumes',
        description: 'Refeição equilibrada.',
        ingredients: ['Frango', 'Abobrinha', 'Cenoura'],
        instructions: ['Grelhar frango.', 'Assar legumes.'],
        consumption_guide: ['Mastigar 20 vezes.', 'Evitar líquidos junto.']
      },
      {
        title: 'Peixe Assado com Brócolis',
        description: 'Leve e nutritivo.',
        ingredients: ['Tilápia', 'Brócolis'],
        instructions: ['Assar até macio.'],
        consumption_guide: ['Pequena porção.']
      },
      {
        title: 'Carne Magra Grelhada',
        description: 'Fonte de ferro.',
        ingredients: ['Patinho'],
        instructions: ['Grelhar bem.'],
        consumption_guide: ['Mastigação lenta.']
      },
      {
        title: 'Omelete com Espinafre',
        description: 'Proteína prática.',
        ingredients: ['Ovos', 'Espinafre'],
        instructions: ['Preparar omelete.'],
        consumption_guide: ['Devagar.']
      },
      {
        title: 'Salada Proteica com Frango',
        description: 'Fibras e proteína.',
        ingredients: ['Frango', 'Folhas verdes'],
        instructions: ['Montar salada.'],
        consumption_guide: ['Priorizar proteína.']
      },
      {
        title: 'Atum Natural com Legumes',
        description: 'Prático e nutritivo.',
        ingredients: ['Atum', 'Legumes cozidos'],
        instructions: ['Misturar e servir.'],
        consumption_guide: ['Sem maionese.']
      },
      {
        title: 'Tofu Grelhado',
        description: 'Proteína vegetal.',
        ingredients: ['Tofu'],
        instructions: ['Grelhar até dourar.'],
        consumption_guide: ['Porção controlada.']
      },
      {
        title: 'Camarão Salteado',
        description: 'Alta proteína.',
        ingredients: ['Camarão'],
        instructions: ['Saltear rapidamente.'],
        consumption_guide: ['Evitar molhos gordurosos.']
      },
      {
        title: 'Hambúrguer Caseiro Magro',
        description: 'Sem gordura excessiva.',
        ingredients: ['Carne magra'],
        instructions: ['Grelhar sem óleo.'],
        consumption_guide: ['Sem pão.']
      },
      {
        title: 'Ovos Cozidos',
        description: 'Simples e eficiente.',
        ingredients: ['Ovos'],
        instructions: ['Cozinhar por 8 minutos.'],
        consumption_guide: ['Comer devagar.']
      }
    ]
  },

  {
    id: 'cond-diabetes-detalhado',
    title: 'Diabetes: Controle Glicêmico Estratégico',
    category: 'Diabetes',
    tags: ['Baixo Índice Glicêmico', 'Rico em Fibras', 'Controle de Carboidrato'],
    recipes: [
      {
        title: 'Panqueca de Aveia com Canela e Proteína',
        description: 'Opção de café da manhã com carboidrato de absorção lenta, fibras solúveis e proteína para reduzir picos glicêmicos.',
        ingredients: [
          '2 colheres de sopa de aveia em flocos finos',
          '1 ovo',
          '1 colher de sopa de iogurte natural sem açúcar',
          'Canela a gosto'
        ],
        instructions: [
          'Misture todos os ingredientes até formar uma massa homogênea.',
          'Aqueça frigideira antiaderente em fogo baixo.',
          'Despeje a massa e cozinhe por cerca de 2 minutos de cada lado.',
          'Sirva sem adição de açúcar ou mel.'
        ],
        consumption_guide: [
          'Combinar com fonte de proteína extra se necessário.',
          'Evitar caldas ou frutas muito doces.',
          'Ideal para café da manhã.'
        ]
      },
      {
        title: 'Salada Morna de Grão-de-Bico com Frango',
        description: 'Combinação de proteína magra e fibras que auxiliam na estabilidade glicêmica.',
        ingredients: [
          '1/2 xícara de grão-de-bico cozido',
          '100g de frango grelhado em cubos',
          'Tomate picado',
          'Azeite extra virgem'
        ],
        instructions: [
          'Cozinhe o grão-de-bico até ficar macio.',
          'Grelhe o frango até dourar.',
          'Misture todos os ingredientes e finalize com azeite.'
        ],
        consumption_guide: [
          'Consumir no almoço.',
          'Controlar porção do grão-de-bico.',
          'Evitar adicionar molhos industrializados.'
        ]
      },
      {
        title: 'Arroz Integral com Brócolis e Alho',
        description: 'Fonte de carboidrato complexo com fibras que retardam a absorção da glicose.',
        ingredients: [
          '1/2 xícara de arroz integral',
          'Brócolis picado',
          'Alho picado'
        ],
        instructions: [
          'Cozinhe o arroz integral conforme instruções.',
          'Refogue o alho levemente.',
          'Adicione o brócolis no vapor ao arroz pronto.'
        ],
        consumption_guide: [
          'Manter porção controlada.',
          'Sempre combinar com proteína magra.'
        ]
      },
      {
        title: 'Omelete Funcional de Espinafre',
        description: 'Refeição de baixo carboidrato rica em proteína e ferro.',
        ingredients: [
          '2 ovos',
          'Espinafre refogado',
          'Fio de azeite'
        ],
        instructions: [
          'Bata levemente os ovos.',
          'Refogue o espinafre.',
          'Adicione os ovos e cozinhe em fogo baixo.'
        ],
        consumption_guide: [
          'Ideal para jantar leve.',
          'Evitar pães refinados como acompanhamento.'
        ]
      },
      {
        title: 'Iogurte Natural com Chia e Morango',
        description: 'Combinação de proteína, gordura boa e fibras solúveis.',
        ingredients: [
          '1 pote de iogurte natural sem açúcar',
          '1 colher de sopa de chia',
          '2 morangos picados'
        ],
        instructions: [
          'Misture todos os ingredientes.',
          'Deixe a chia hidratar por 10 minutos antes de consumir.'
        ],
        consumption_guide: [
          'Excelente para lanche da tarde.',
          'Não adicionar açúcar.'
        ]
      },
      {
        title: 'Peixe Assado com Abobrinha',
        description: 'Fonte de proteína magra e baixo índice glicêmico.',
        ingredients: [
          '1 filé de peixe',
          'Abobrinha em rodelas',
          'Ervas naturais'
        ],
        instructions: [
          'Tempere com ervas.',
          'Asse por 20 minutos até ficar macio.',
          'Sirva com abobrinha levemente grelhada.'
        ],
        consumption_guide: [
          'Evitar molhos prontos.',
          'Boa opção para jantar.'
        ]
      },
      {
        title: 'Sopa de Lentilha com Legumes',
        description: 'Fonte de proteína vegetal e fibras para controle glicêmico.',
        ingredients: [
          'Lentilha',
          'Cenoura',
          'Abobrinha',
          'Alho'
        ],
        instructions: [
          'Cozinhe a lentilha até ficar macia.',
          'Adicione legumes picados.',
          'Cozinhe até ficarem macios.'
        ],
        consumption_guide: [
          'Evitar adicionar batata.',
          'Porção moderada.'
        ]
      },
      {
        title: 'Salada de Quinoa Proteica',
        description: 'Proteína vegetal completa com fibras.',
        ingredients: [
          '1/2 xícara de quinoa cozida',
          'Pepino',
          'Tomate',
          'Azeite'
        ],
        instructions: [
          'Cozinhe a quinoa.',
          'Misture com os vegetais.',
          'Finalize com azeite.'
        ],
        consumption_guide: [
          'Controlar porção.',
          'Combinar com proteína animal se possível.'
        ]
      },
      {
        title: 'Maçã com Pasta de Amendoim Natural',
        description: 'Combinação que reduz o pico glicêmico da fruta.',
        ingredients: [
          '1 maçã pequena',
          '1 colher de pasta de amendoim 100%'
        ],
        instructions: [
          'Fatie a maçã.',
          'Passe pequena quantidade de pasta.'
        ],
        consumption_guide: [
          'Consumir como lanche.',
          'Não exceder a quantidade de pasta.'
        ]
      },
      {
        title: 'Frango Grelhado com Couve Refogada',
        description: 'Baixo carboidrato e alta proteína.',
        ingredients: [
          'Peito de frango',
          'Couve fatiada',
          'Alho'
        ],
        instructions: [
          'Grelhe o frango até dourar.',
          'Refogue a couve rapidamente.',
          'Sirva juntos.'
        ],
        consumption_guide: [
          'Priorizar proteína no prato.',
          'Ideal para almoço.'
        ]
      }
    ]
  },
  {
    id: 'cond-hipertensao-detalhado',
    title: 'Hipertensão: Estratégia Alimentar com Baixo Sódio',
    category: 'Hipertensao',
    tags: ['Baixo Sódio', 'Rico em Potássio', 'Saúde Cardiovascular'],
    recipes: [
      {
        title: 'Salada de Folhas com Abacate e Limão',
        description: 'Rica em potássio e gorduras monoinsaturadas que auxiliam na saúde cardiovascular.',
        ingredients: [
          'Folhas verdes variadas',
          '1/2 abacate em cubos',
          'Suco de limão',
          'Azeite extra virgem'
        ],
        instructions: [
          'Higienize bem as folhas.',
          'Misture com abacate.',
          'Tempere apenas com limão e azeite.'
        ],
        consumption_guide: [
          'Não adicionar sal.',
          'Consumir fresca.'
        ]
      },
      {
        title: 'Peixe Grelhado com Ervas Naturais',
        description: 'Fonte de ômega-3 que auxilia na redução da inflamação.',
        ingredients: [
          'Filé de peixe',
          'Alecrim',
          'Alho',
          'Azeite'
        ],
        instructions: [
          'Tempere com ervas.',
          'Grelhe em fogo médio até ficar macio.'
        ],
        consumption_guide: [
          'Evitar sal refinado.',
          'Ideal para jantar.'
        ]
      },
      {
        title: 'Sopa Natural de Abóbora',
        description: 'Leve, rica em antioxidantes e naturalmente baixa em sódio.',
        ingredients: [
          'Abóbora',
          'Água',
          'Alho'
        ],
        instructions: [
          'Cozinhe até amolecer.',
          'Bata até formar creme.'
        ],
        consumption_guide: [
          'Sem caldos prontos.',
          'Pode adicionar ervas naturais.'
        ]
      },
      {
        title: 'Arroz Integral com Cenoura e Cúrcuma',
        description: 'Carboidrato complexo rico em fibras com ação antioxidante da cúrcuma.',
        ingredients: [
          '1/2 xícara de arroz integral',
          '1/2 cenoura ralada',
          '1 pitada de cúrcuma',
          'Alho'
        ],
        instructions: [
          'Cozinhe o arroz integral normalmente.',
          'Refogue o alho levemente.',
          'Adicione a cenoura e a cúrcuma ao arroz já cozido.',
          'Misture bem antes de servir.'
        ],
        consumption_guide: [
          'Evitar adicionar sal extra.',
          'Manter porção moderada.'
        ]
      },
      {
        title: 'Frango Grelhado com Brócolis no Vapor',
        description: 'Proteína magra combinada com vegetal rico em potássio.',
        ingredients: [
          '120g de peito de frango',
          '1 xícara de brócolis',
          'Ervas naturais'
        ],
        instructions: [
          'Tempere o frango com ervas e alho.',
          'Grelhe até dourar completamente.',
          'Cozinhe o brócolis no vapor por 5 minutos.'
        ],
        consumption_guide: [
          'Não utilizar sal refinado.',
          'Ideal para almoço.'
        ]
      },
      {
        title: 'Salada de Beterraba com Azeite',
        description: 'A beterraba auxilia na vasodilatação devido ao teor de nitratos naturais.',
        ingredients: [
          '1 beterraba cozida',
          '1 fio de azeite',
          'Limão'
        ],
        instructions: [
          'Cozinhe a beterraba até ficar macia.',
          'Fatie ou corte em cubos.',
          'Tempere com limão e azeite.'
        ],
        consumption_guide: [
          'Consumir fresca.',
          'Evitar sal.'
        ]
      },
      {
        title: 'Lentilha com Ervas Aromáticas',
        description: 'Fonte de proteína vegetal e fibras, auxiliando na saúde vascular.',
        ingredients: [
          '1/2 xícara de lentilha',
          'Louro',
          'Salsa',
          'Alho'
        ],
        instructions: [
          'Cozinhe a lentilha até ficar macia.',
          'Adicione ervas frescas ao final.',
          'Misture delicadamente.'
        ],
        consumption_guide: [
          'Não utilizar embutidos na preparação.',
          'Porção moderada.'
        ]
      },
      {
        title: 'Omelete com Tomate e Orégano',
        description: 'Fonte de proteína com antioxidantes naturais do tomate.',
        ingredients: [
          '2 ovos',
          '1 tomate picado',
          'Orégano'
        ],
        instructions: [
          'Bata levemente os ovos.',
          'Adicione tomate picado.',
          'Cozinhe em fogo baixo até firmar.'
        ],
        consumption_guide: [
          'Evitar queijos muito salgados.',
          'Ideal para jantar leve.'
        ]
      },
      {
        title: 'Purê de Batata Doce com Alho Assado',
        description: 'Carboidrato de melhor qualidade nutricional e baixo teor de sódio.',
        ingredients: [
          '1 batata doce média',
          '1 dente de alho'
        ],
        instructions: [
          'Cozinhe a batata doce até ficar macia.',
          'Asse o alho até dourar.',
          'Amasse tudo até formar purê.'
        ],
        consumption_guide: [
          'Não adicionar manteiga.',
          'Controlar porção.'
        ]
      },
      {
        title: 'Suco Natural de Melancia com Hortelã',
        description: 'Hidratação rica em potássio e antioxidantes.',
        ingredients: [
          '1 fatia de melancia',
          'Folhas de hortelã'
        ],
        instructions: [
          'Bata a melancia.',
          'Adicione hortelã fresca.',
          'Servir imediatamente.'
        ],
        consumption_guide: [
          'Sem açúcar.',
          'Consumir fresco.'
        ]
      },
    ]
  },


  {
    id: 'cond-obesidade-detalhado',
    title: 'Obesidade: Estratégia de Saciedade e Controle Energético',
    category: 'Obesidade',
    tags: ['Alta Saciedade', 'Baixa Densidade Calórica', 'Controle de Porções'],
    recipes: [
      {
        title: 'Salada Proteica Completa',
        description: 'Refeição volumosa, rica em fibras e proteína magra, promovendo saciedade com menor ingestão calórica.',
        ingredients: [
          'Folhas verdes variadas',
          '120g de peito de frango grelhado',
          'Tomate picado',
          'Pepino em rodelas',
          '1 colher de chá de azeite'
        ],
        instructions: [
          'Higienize bem as folhas e vegetais.',
          'Grelhe o frango até dourar completamente.',
          'Misture todos os ingredientes em um prato grande.',
          'Finalize com pequena quantidade de azeite.'
        ],
        consumption_guide: [
          'Iniciar a refeição pela proteína.',
          'Evitar molhos industrializados.',
          'Ideal para almoço ou jantar.'
        ]
      },
      {
        title: 'Omelete Funcional de Vegetais',
        description: 'Alta proteína com vegetais fibrosos para prolongar a saciedade.',
        ingredients: [
          '2 ovos',
          'Espinafre picado',
          'Tomate picado',
          '1 fio de azeite'
        ],
        instructions: [
          'Bata levemente os ovos.',
          'Refogue rapidamente os vegetais.',
          'Adicione os ovos e cozinhe em fogo baixo até firmar.'
        ],
        consumption_guide: [
          'Pode ser usado no jantar.',
          'Evitar pão branco como acompanhamento.'
        ]
      },
      {
        title: 'Sopa de Legumes com Frango Desfiado',
        description: 'Refeição leve, volumosa e com excelente controle calórico.',
        ingredients: [
          'Abobrinha',
          'Cenoura',
          'Chuchu',
          '100g de frango desfiado'
        ],
        instructions: [
          'Cozinhe os legumes até ficarem macios.',
          'Adicione o frango desfiado ao final.',
          'Temperar apenas com ervas naturais.'
        ],
        consumption_guide: [
          'Ideal para jantar.',
          'Não bater completamente para manter fibras.'
        ]
      },
      {
        title: 'Peixe Grelhado com Brócolis no Vapor',
        description: 'Proteína magra com vegetal rico em fibras e baixo valor calórico.',
        ingredients: [
          '1 filé de peixe',
          '1 xícara de brócolis',
          'Limão e ervas'
        ],
        instructions: [
          'Tempere o peixe com limão.',
          'Grelhe até ficar macio.',
          'Cozinhe o brócolis no vapor por 5 minutos.'
        ],
        consumption_guide: [
          'Evitar molhos cremosos.',
          'Porção equilibrada.'
        ]
      },
      {
        title: 'Iogurte Natural com Chia',
        description: 'Lanche rico em proteína e fibras solúveis que auxiliam no controle do apetite.',
        ingredients: [
          '1 pote de iogurte natural desnatado',
          '1 colher de sopa de chia'
        ],
        instructions: [
          'Misture a chia ao iogurte.',
          'Aguarde 10 minutos para hidratação.'
        ],
        consumption_guide: [
          'Ideal para lanche da tarde.',
          'Não adicionar açúcar.'
        ]
      },
      {
        title: 'Frango Desfiado com Abobrinha Refogada',
        description: 'Prato simples, baixo em calorias e rico em proteína.',
        ingredients: [
          '120g de frango cozido e desfiado',
          '1 abobrinha fatiada',
          'Alho'
        ],
        instructions: [
          'Refogue o alho levemente.',
          'Adicione a abobrinha e cozinhe até ficar macia.',
          'Misture o frango ao final.'
        ],
        consumption_guide: [
          'Consumir como refeição principal.',
          'Evitar arroz branco junto.'
        ]
      },
      {
        title: 'Salada de Atum com Vegetais',
        description: 'Alta proteína e baixo teor calórico.',
        ingredients: [
          '1 lata de atum em água',
          'Folhas verdes',
          'Tomate',
          'Pepino'
        ],
        instructions: [
          'Escorra o atum.',
          'Misture com vegetais frescos.',
          'Tempere com limão.'
        ],
        consumption_guide: [
          'Evitar maionese.',
          'Boa opção para jantar leve.'
        ]
      },
      {
        title: 'Purê de Couve-Flor',
        description: 'Substituto de purês calóricos, com menor densidade energética.',
        ingredients: [
          '1 xícara de couve-flor cozida',
          '1 fio de azeite'
        ],
        instructions: [
          'Cozinhe a couve-flor até ficar macia.',
          'Amasse ou bata até formar purê.'
        ],
        consumption_guide: [
          'Pode substituir purê de batata.',
          'Controlar azeite.'
        ]
      },
      {
        title: 'Carne Magra Grelhada com Salada',
        description: 'Fonte de proteína com alto poder de saciedade.',
        ingredients: [
          '120g de patinho grelhado',
          'Salada verde'
        ],
        instructions: [
          'Grelhe a carne até o ponto desejado.',
          'Sirva com salada fresca.'
        ],
        consumption_guide: [
          'Mastigar lentamente.',
          'Evitar frituras.'
        ]
      },
      {
        title: 'Shake Proteico com Morango',
        description: 'Auxilia no controle de fome entre refeições.',
        ingredients: [
          '1 scoop de whey protein',
          '200ml de leite desnatado',
          '3 morangos'
        ],
        instructions: [
          'Bata todos os ingredientes até ficar homogêneo.'
        ],
        consumption_guide: [
          'Ideal no pós-treino ou lanche.',
          'Não substituir refeições principais sem orientação.'
        ]
      }
    ]
  },
  {
    id: 'cond-hipotireoidismo-detalhado',
    title: 'Hipotireoidismo: Suporte Nutricional Metabólico',
    category: 'Hipotiroidismo',
    tags: ['Metabolismo Ativo', 'Rico em Selênio', 'Proteína Adequada'],
    recipes: [
      {
        title: 'Omelete com Espinafre e Castanha-do-Pará',
        description: 'Fonte de proteína, ferro e selênio, nutriente importante para a função tireoidiana.',
        ingredients: [
          '2 ovos',
          'Espinafre picado',
          '1 castanha-do-pará triturada'
        ],
        instructions: [
          'Bata levemente os ovos.',
          'Refogue o espinafre rapidamente.',
          'Adicione os ovos e cozinhe em fogo baixo.',
          'Finalize com a castanha triturada.'
        ],
        consumption_guide: [
          'Consumir no café da manhã ou jantar.',
          'Não exceder 1 castanha por dia.'
        ]
      },
      {
        title: 'Salmão Assado com Brócolis',
        description: 'Rico em ômega-3, auxiliando na redução inflamatória e suporte metabólico.',
        ingredients: [
          '1 filé de salmão',
          '1 xícara de brócolis',
          'Limão'
        ],
        instructions: [
          'Tempere o salmão com limão.',
          'Asse por 20 minutos a 180°C.',
          'Cozinhe o brócolis no vapor.'
        ],
        consumption_guide: [
          'Consumir no almoço.',
          'Evitar molhos industrializados.'
        ]
      },
      {
        title: 'Frango Grelhado com Quinoa',
        description: 'Combinação de proteína magra com proteína vegetal completa.',
        ingredients: [
          '120g de frango grelhado',
          '1/2 xícara de quinoa cozida'
        ],
        instructions: [
          'Grelhe o frango até dourar.',
          'Cozinhe a quinoa conforme instruções.',
          'Sirva juntos.'
        ],
        consumption_guide: [
          'Controlar porção de quinoa.',
          'Ideal para almoço.'
        ]
      },
      {
        title: 'Iogurte Natural com Linhaça',
        description: 'Auxilia no funcionamento intestinal frequentemente reduzido no hipotireoidismo.',
        ingredients: [
          '1 pote de iogurte natural',
          '1 colher de sopa de linhaça moída'
        ],
        instructions: [
          'Misture a linhaça ao iogurte.',
          'Consumir imediatamente.'
        ],
        consumption_guide: [
          'Ideal para lanche.',
          'Evitar versões com açúcar.'
        ]
      },
      {
        title: 'Carne Magra com Abóbora Assada',
        description: 'Fonte de ferro e proteína para manutenção da massa muscular.',
        ingredients: [
          '120g de patinho',
          'Abóbora em cubos'
        ],
        instructions: [
          'Grelhe a carne.',
          'Asse a abóbora até ficar macia.'
        ],
        consumption_guide: [
          'Mastigar bem.',
          'Evitar frituras.'
        ]
      },
      {
        title: 'Sopa de Lentilha com Legumes',
        description: 'Rica em ferro vegetal e fibras.',
        ingredients: [
          'Lentilha',
          'Cenoura',
          'Abobrinha'
        ],
        instructions: [
          'Cozinhe a lentilha até macia.',
          'Adicione legumes picados.',
          'Cozinhe até ficarem macios.'
        ],
        consumption_guide: [
          'Boa opção para jantar.',
          'Controlar porção.'
        ]
      },
      {
        title: 'Ovos Cozidos com Salada Verde',
        description: 'Refeição simples, proteica e de fácil preparo.',
        ingredients: [
          '2 ovos',
          'Folhas verdes'
        ],
        instructions: [
          'Cozinhe os ovos por 8 minutos.',
          'Sirva com salada fresca.'
        ],
        consumption_guide: [
          'Ideal para refeição leve.',
          'Evitar molhos gordurosos.'
        ]
      },
      {
        title: 'Tilápia Grelhada com Couve Refogada',
        description: 'Fonte de proteína magra e fibras.',
        ingredients: [
          'Filé de tilápia',
          'Couve fatiada'
        ],
        instructions: [
          'Grelhe a tilápia.',
          'Refogue rapidamente a couve.'
        ],
        consumption_guide: [
          'Consumir no almoço.',
          'Evitar excesso de sal.'
        ]
      },
      {
        title: 'Panqueca de Aveia com Ovo',
        description: 'Carboidrato complexo com proteína.',
        ingredients: [
          '2 colheres de aveia',
          '1 ovo'
        ],
        instructions: [
          'Misture os ingredientes.',
          'Grelhe em frigideira antiaderente.'
        ],
        consumption_guide: [
          'Boa opção para café da manhã.',
          'Evitar coberturas açucaradas.'
        ]
      },
      {
        title: 'Frango com Batata Doce Assada',
        description: 'Combinação equilibrada para suporte energético controlado.',
        ingredients: [
          '120g frango',
          '1/2 batata doce'
        ],
        instructions: [
          'Grelhe o frango.',
          'Asse a batata doce até ficar macia.'
        ],
        consumption_guide: [
          'Controlar porção de carboidrato.',
          'Ideal para almoço.'
        ]
      }
    ]
  },

  {
    id: 'cond-diverticulite-aguda',
    title: 'Diverticulite: Fase Aguda (Baixo Resíduo)',
    category: 'Diverticulite',
    phase: 'Aguda',
    tags: ['Fase Aguda', 'Baixo Resíduo', 'Proteção Intestinal'],
    recipes: [

      {
        title: 'Caldo Claro de Frango Totalmente Coado',
        description: 'Preparação líquida, pobre em fibras e resíduos sólidos, ideal para reduzir estímulo intestinal durante inflamação ativa.',
        ingredients: [
          '150g de peito de frango sem pele',
          '1 litro de água filtrada',
          '1 fio pequeno de azeite (opcional)'
        ],
        instructions: [
          'Cozinhe o frango em água por 30–40 minutos.',
          'Coe completamente o líquido em peneira fina.',
          'Se necessário, coe novamente com pano limpo.',
          'Descartar totalmente os sólidos.'
        ],
        consumption_guide: [
          'Consumir morno.',
          'Ingerir 100–150ml por vez.',
          'Ideal nos primeiros dias da crise.'
        ]
      },

      {
        title: 'Sopa Cremosa de Cenoura Coada',
        description: 'Fonte leve de vitaminas com mínima fibra insolúvel, reduzindo agressão à mucosa inflamada.',
        ingredients: [
          '2 cenouras médias sem casca',
          '500ml de água'
        ],
        instructions: [
          'Cozinhe até ficarem extremamente macias.',
          'Bata até virar creme liso.',
          'Passe por peneira fina removendo qualquer resíduo.'
        ],
        consumption_guide: [
          'Textura totalmente homogênea.',
          'Sem pedaços.',
          'Sem temperos irritativos.'
        ]
      },

      {
        title: 'Purê Ultra Liso de Batata',
        description: 'Carboidrato de fácil digestão com textura uniforme e baixo estímulo intestinal.',
        ingredients: [
          '1 batata média sem casca',
          'Água para cozimento'
        ],
        instructions: [
          'Cozinhe até desmanchar.',
          'Amasse completamente até textura lisa.',
          'Se necessário, adicione pequena quantidade da água do cozimento.'
        ],
        consumption_guide: [
          'Sem casca.',
          'Sem manteiga excessiva.',
          'Porções pequenas.'
        ]
      },

      {
        title: 'Ovos Mexidos Cremosos em Fogo Baixo',
        description: 'Proteína altamente digestível com baixo resíduo.',
        ingredients: [
          '2 ovos'
        ],
        instructions: [
          'Bata levemente.',
          'Cozinhe em fogo baixo mexendo constantemente.',
          'Manter textura macia, sem crostas.'
        ],
        consumption_guide: [
          'Evitar fritura.',
          'Sem pimenta ou condimentos fortes.'
        ]
      },

      {
        title: 'Peixe Branco Cozido no Vapor e Desfiado',
        description: 'Proteína leve que reduz esforço digestivo.',
        ingredients: [
          '1 filé de tilápia ou pescada'
        ],
        instructions: [
          'Cozinhe no vapor até ficar extremamente macio.',
          'Desfie cuidadosamente.',
          'Remova qualquer espinha.'
        ],
        consumption_guide: [
          'Textura macia.',
          'Evitar grelhar inicialmente.'
        ]
      },

      {
        title: 'Arroz Branco Muito Bem Cozido',
        description: 'Fonte energética com baixo teor de fibras.',
        ingredients: [
          '1/2 xícara de arroz branco',
          '1 1/2 xícara de água'
        ],
        instructions: [
          'Cozinhar até ficar bastante macio.',
          'Evitar arroz integral.'
        ],
        consumption_guide: [
          'Mastigar bem.',
          'Pode combinar com peixe ou frango.'
        ]
      },

      {
        title: 'Banana Amassada Bem Madura',
        description: 'Fonte de energia com melhor tolerância intestinal.',
        ingredients: [
          '1 banana madura'
        ],
        instructions: [
          'Amasse completamente até virar purê.'
        ],
        consumption_guide: [
          'Evitar adicionar sementes.',
          'Consumir em pequenas porções.'
        ]
      },

      {
        title: 'Iogurte Natural Integral Sem Açúcar',
        description: 'Auxilia na modulação da microbiota intestinal.',
        ingredients: [
          '1 pote de iogurte natural'
        ],
        instructions: [
          'Consumir fresco.',
          'Sem pedaços ou fibras adicionais.'
        ],
        consumption_guide: [
          'Avaliar tolerância individual.'
        ]
      },

      {
        title: 'Caldo Claro de Carne Magra Coado',
        description: 'Fonte proteica leve com eletrólitos.',
        ingredients: [
          '150g de carne magra',
          '1 litro de água'
        ],
        instructions: [
          'Cozinhar por 40 minutos.',
          'Coar completamente.',
          'Descartar sólidos.'
        ],
        consumption_guide: [
          'Ideal em fases iniciais da crise.'
        ]
      },

      {
        title: 'Gelatina Sem Açúcar',
        description: 'Opção leve, de fácil digestão e baixo resíduo.',
        ingredients: [
          'Gelatina sem açúcar'
        ],
        instructions: [
          'Preparar conforme embalagem.',
          'Deixar firmar completamente.'
        ],
        consumption_guide: [
          'Consumir fria.',
          'Não adicionar frutas.'
        ]
      }

    ]
  },

  {
    id: 'cond-diverticulite-remissao',
    title: 'Diverticulite: Fase de Remissão (Fibra Gradual)',
    category: 'Diverticulite',
    phase: 'Remissão',
    tags: ['Fase de Remissão', 'Fibra Gradual', 'Prevenção de Recidiva'],
    recipes: [

      {
        title: 'Arroz Integral com Frango Desfiado',
        description: 'Primeira etapa de reintrodução de fibras com proteína magra.',
        ingredients: [
          '1/2 xícara de arroz integral',
          '100g de frango desfiado'
        ],
        instructions: [
          'Cozinhar arroz até bem macio.',
          'Misturar com frango desfiado.'
        ],
        consumption_guide: [
          'Introduzir gradualmente.',
          'Aumentar consumo de água.'
        ]
      },

      {
        title: 'Aveia com Banana e Canela',
        description: 'Fonte de fibra solúvel (beta-glucana) benéfica ao intestino.',
        ingredients: [
          '2 colheres de aveia',
          '1 banana'
        ],
        instructions: [
          'Misturar e consumir no café da manhã.'
        ],
        consumption_guide: [
          'Iniciar com pequena quantidade.'
        ]
      },

      {
        title: 'Lentilha Muito Bem Cozida',
        description: 'Fibra e proteína vegetal para regular trânsito.',
        ingredients: [
          '1/2 xícara de lentilha'
        ],
        instructions: [
          'Cozinhar até extremamente macia.',
          'Evitar grãos duros.'
        ],
        consumption_guide: [
          'Avaliar tolerância individual.'
        ]
      },

      {
        title: 'Maçã Assada Sem Casca',
        description: 'Fonte de pectina, fibra solúvel mais tolerável.',
        ingredients: [
          '1 maçã sem casca'
        ],
        instructions: [
          'Assar por 20 minutos.'
        ],
        consumption_guide: [
          'Evitar casca inicialmente.'
        ]
      },

      {
        title: 'Salada de Vegetais Cozidos',
        description: 'Vegetais cozidos são melhor tolerados que crus inicialmente.',
        ingredients: [
          'Cenoura',
          'Abobrinha',
          'Chuchu'
        ],
        instructions: [
          'Cozinhar até macios.',
          'Temperar levemente.'
        ],
        consumption_guide: [
          'Introdução gradual.'
        ]
      }

    ]
  },

  {
    id: 'cond-celiacos-detalhado',
    title: 'Doença Celíaca: Alimentação 100% Sem Glúten',
    category: 'Celiacos',
    tags: ['Zero Glúten', 'Recuperação Intestinal', 'Antiinflamatório'],
    recipes: [

      {
        title: 'Pão Caseiro de Farinha de Arroz e Polvilho',
        description: 'Substituto seguro ao pão tradicional, com textura leve e adequado para dieta isenta de glúten.',
        ingredients: [
          '2 xícaras de farinha de arroz',
          '1/2 xícara de polvilho doce',
          '1 colher de sopa de fermento biológico',
          '1 ovo',
          '1 colher de sopa de azeite',
          '1 xícara de água morna'
        ],
        instructions: [
          'Misture os ingredientes secos.',
          'Adicione líquidos e mexa até formar massa homogênea.',
          'Coloque em forma untada.',
          'Deixe crescer por 30 minutos.',
          'Asse a 180°C por 35–40 minutos.'
        ],
        consumption_guide: [
          'Utilizar forma e utensílios exclusivos.',
          'Armazenar em recipiente fechado.'
        ]
      },

      {
        title: 'Panqueca de Banana com Aveia Certificada Sem Glúten',
        description: 'Opção nutritiva para café da manhã com fibras seguras.',
        ingredients: [
          '1 banana madura',
          '1 ovo',
          '2 colheres de aveia certificada sem glúten'
        ],
        instructions: [
          'Amasse a banana.',
          'Misture com ovo e aveia.',
          'Grelhe em frigideira antiaderente.'
        ],
        consumption_guide: [
          'Confirmar certificação da aveia.',
          'Evitar coberturas industrializadas.'
        ]
      },

      {
        title: 'Risoto de Quinoa com Legumes',
        description: 'Fonte de proteína vegetal completa, naturalmente sem glúten.',
        ingredients: [
          '1 xícara de quinoa',
          'Cenoura em cubos',
          'Abobrinha',
          'Caldo caseiro sem glúten'
        ],
        instructions: [
          'Lave bem a quinoa.',
          'Cozinhe até absorver líquido.',
          'Adicione legumes cozidos.'
        ],
        consumption_guide: [
          'Evitar caldos industrializados.',
          'Boa opção para almoço.'
        ]
      },

      {
        title: 'Macarrão de Arroz com Frango e Legumes',
        description: 'Substituição segura ao macarrão de trigo.',
        ingredients: [
          'Macarrão de arroz',
          'Peito de frango',
          'Cenoura',
          'Abobrinha'
        ],
        instructions: [
          'Cozinhe o macarrão conforme embalagem.',
          'Grelhe o frango.',
          'Refogue os legumes.',
          'Misture e sirva.'
        ],
        consumption_guide: [
          'Verificar rótulo do macarrão.',
          'Evitar molho branco tradicional.'
        ]
      },

      {
        title: 'Tapioca com Frango Desfiado',
        description: 'Preparação prática, naturalmente sem glúten.',
        ingredients: [
          'Goma de tapioca',
          'Frango desfiado'
        ],
        instructions: [
          'Espalhe goma na frigideira.',
          'Cozinhe até formar disco.',
          'Adicione frango e dobre.'
        ],
        consumption_guide: [
          'Utilizar frigideira sem contaminação.',
          'Boa opção para lanche.'
        ]
      },

      {
        title: 'Bolo de Fubá Sem Glúten',
        description: 'Versão adaptada sem farinha de trigo.',
        ingredients: [
          '2 xícaras de fubá',
          '3 ovos',
          '1/2 xícara de óleo',
          '1 xícara de açúcar demerara',
          '1 colher fermento'
        ],
        instructions: [
          'Misture líquidos.',
          'Adicione fubá.',
          'Incorpore fermento.',
          'Asse a 180°C por 35 minutos.'
        ],
        consumption_guide: [
          'Consumir com moderação.',
          'Garantir que fermento seja sem glúten.'
        ]
      },

      {
        title: 'Salada de Grão-de-Bico com Azeite',
        description: 'Fonte de proteína vegetal e ferro.',
        ingredients: [
          'Grão-de-bico cozido',
          'Tomate',
          'Pepino',
          'Azeite'
        ],
        instructions: [
          'Misture todos os ingredientes.',
          'Tempere levemente.'
        ],
        consumption_guide: [
          'Boa opção para almoço leve.',
          'Avaliar tolerância individual.'
        ]
      },

      {
        title: 'Omelete com Espinafre e Tomate',
        description: 'Refeição rica em proteína, naturalmente sem glúten.',
        ingredients: [
          '2 ovos',
          'Espinafre',
          'Tomate picado'
        ],
        instructions: [
          'Refogue vegetais.',
          'Adicione ovos batidos.',
          'Cozinhe até firmar.'
        ],
        consumption_guide: [
          'Evitar molhos industrializados.'
        ]
      },

      {
        title: 'Mingau de Arroz com Leite Sem Lactose',
        description: 'Preparação leve e segura.',
        ingredients: [
          '1/2 xícara de arroz',
          'Leite sem lactose'
        ],
        instructions: [
          'Cozinhe o arroz até desmanchar.',
          'Adicione leite e mexa até engrossar.'
        ],
        consumption_guide: [
          'Garantir arroz não contaminado.'
        ]
      },

      {
        title: 'Pizza de Massa de Couve-flor',
        description: 'Alternativa funcional à massa tradicional de trigo.',
        ingredients: [
          'Couve-flor cozida e triturada',
          '1 ovo',
          'Queijo sem glúten'
        ],
        instructions: [
          'Misture ingredientes.',
          'Modele base.',
          'Asse 15 minutos.',
          'Adicione cobertura e finalize.'
        ],
        consumption_guide: [
          'Evitar embutidos industrializados.',
          'Consumir fresca.'
        ]
      }

    ]
  },

  {
    id: 'cond-intolerancia-lactose-detalhado',
    title: 'Intolerância à Lactose: Controle Digestivo e Nutrição Equilibrada',
    category: 'IntoleranciaLactose',
    tags: ['Zero Lactose', 'Alta Digestibilidade', 'Saúde Intestinal'],
    recipes: [

      {
        title: 'Vitamina de Banana com Leite Zero Lactose',
        description: 'Fonte de energia e proteína com melhor tolerância digestiva.',
        ingredients: [
          '1 banana madura',
          '200ml de leite zero lactose',
          '1 colher de aveia'
        ],
        instructions: [
          'Bater todos os ingredientes até ficar homogêneo.',
          'Consumir imediatamente.'
        ],
        consumption_guide: [
          'Ideal para café da manhã.',
          'Avaliar tolerância individual.'
        ]
      },

      {
        title: 'Omelete com Espinafre',
        description: 'Proteína completa sem presença de lactose.',
        ingredients: [
          '2 ovos',
          'Espinafre picado',
          '1 fio de azeite'
        ],
        instructions: [
          'Refogar levemente o espinafre.',
          'Adicionar ovos batidos.',
          'Cozinhar em fogo baixo.'
        ],
        consumption_guide: [
          'Opção segura para almoço ou jantar.',
          'Evitar adicionar queijos tradicionais.'
        ]
      },

      {
        title: 'Frango Grelhado com Purê de Mandioquinha',
        description: 'Refeição equilibrada sem derivados lácteos.',
        ingredients: [
          '120g de peito de frango',
          '1 mandioquinha cozida'
        ],
        instructions: [
          'Grelhar o frango até dourar.',
          'Amassar a mandioquinha até textura lisa.'
        ],
        consumption_guide: [
          'Evitar manteiga no purê.',
          'Usar azeite como alternativa.'
        ]
      },

      {
        title: 'Iogurte Zero Lactose com Chia',
        description: 'Opção probiótica segura para intolerantes.',
        ingredients: [
          '1 pote de iogurte zero lactose',
          '1 colher de chia'
        ],
        instructions: [
          'Misturar e consumir após 10 minutos de hidratação da chia.'
        ],
        consumption_guide: [
          'Introduzir sementes gradualmente.',
          'Boa opção de lanche.'
        ]
      },

      {
        title: 'Arroz Integral com Peixe Assado',
        description: 'Refeição rica em proteína e fibras sem lactose.',
        ingredients: [
          '1/2 xícara de arroz integral',
          '1 filé de peixe',
          'Limão'
        ],
        instructions: [
          'Cozinhar arroz até macio.',
          'Assar peixe por 20 minutos a 180°C.'
        ],
        consumption_guide: [
          'Evitar molhos cremosos tradicionais.'
        ]
      },

      {
        title: 'Panqueca de Aveia com Bebida Vegetal',
        description: 'Substituição do leite convencional por bebida vegetal fortificada.',
        ingredients: [
          '2 colheres de aveia',
          '1 ovo',
          '50ml bebida vegetal (amêndoas ou aveia)'
        ],
        instructions: [
          'Misturar até formar massa.',
          'Grelhar em frigideira antiaderente.'
        ],
        consumption_guide: [
          'Verificar se bebida vegetal é fortificada com cálcio.'
        ]
      },

      {
        title: 'Macarrão ao Molho de Tomate Natural',
        description: 'Preparação simples sem uso de queijos ou cremes.',
        ingredients: [
          'Macarrão',
          'Tomate natural',
          'Alho',
          'Azeite'
        ],
        instructions: [
          'Cozinhar o macarrão.',
          'Preparar molho com tomate fresco.',
          'Misturar e servir.'
        ],
        consumption_guide: [
          'Evitar queijo ralado tradicional.'
        ]
      },

      {
        title: 'Salada de Quinoa com Legumes',
        description: 'Fonte de proteína vegetal e naturalmente sem lactose.',
        ingredients: [
          '1 xícara de quinoa cozida',
          'Cenoura',
          'Pepino',
          'Azeite'
        ],
        instructions: [
          'Misturar todos os ingredientes.',
          'Temperar levemente.'
        ],
        consumption_guide: [
          'Boa opção para refeições leves.'
        ]
      },

      {
        title: 'Bolo Caseiro com Leite Zero Lactose',
        description: 'Versão adaptada sem desconforto digestivo.',
        ingredients: [
          '2 xícaras de farinha',
          '1 xícara leite zero lactose',
          '3 ovos',
          '1/2 xícara óleo',
          '1 colher fermento'
        ],
        instructions: [
          'Misturar líquidos.',
          'Adicionar secos.',
          'Assar por 35 minutos a 180°C.'
        ],
        consumption_guide: [
          'Consumir com moderação.'
        ]
      },

      {
        title: 'Smoothie de Frutas com Bebida Vegetal',
        description: 'Alternativa leve e nutritiva sem lactose.',
        ingredients: [
          'Frutas vermelhas',
          '200ml bebida vegetal fortificada'
        ],
        instructions: [
          'Bater até textura homogênea.',
          'Consumir fresco.'
        ],
        consumption_guide: [
          'Boa opção pós-treino.',
          'Evitar xaropes açucarados.'
        ]
      }

    ]
  },

  {
    id: 'terceira-idade-massa-muscular',
    title: 'Terceira Idade: Manutenção da Força e Massa Muscular',
    category: 'TerceiraIdade',
    phase: 'Ganho de Músculo',
    tags: ['Sarcopenia', 'Proteína Adequada', 'Força Funcional'],
    recipes: [

      {
        title: 'Omelete Proteica com Espinafre e Ricota',
        description: 'Preparação rica em proteína de alto valor biológico para prevenir sarcopenia e manter força muscular.',
        ingredients: [
          '2 ovos',
          '2 colheres de sopa de ricota',
          '1/2 xícara de espinafre picado',
          '1 fio de azeite'
        ],
        instructions: [
          'Refogue o espinafre no azeite até murchar.',
          'Bata os ovos e misture com a ricota.',
          'Despeje na frigideira e cozinhe em fogo baixo até firmar.'
        ],
        consumption_guide: [
          'Ideal no café da manhã.',
          'Mastigar lentamente.',
          'Pode ser acompanhada de pão integral.'
        ]
      },

      {
        title: 'Frango Desfiado com Purê de Batata Doce',
        description: 'Combinação de proteína magra com carboidrato complexo para manutenção muscular.',
        ingredients: [
          '120g de peito de frango',
          '1 batata doce média',
          '1 fio de azeite'
        ],
        instructions: [
          'Cozinhe e desfie o frango.',
          'Cozinhe a batata até ficar macia e amasse.',
          'Misture azeite ao purê e sirva com frango.'
        ],
        consumption_guide: [
          'Textura macia facilita mastigação.',
          'Ideal no almoço.'
        ]
      },

      {
        title: 'Peixe Assado com Quinoa',
        description: 'Fonte de proteína completa e minerais essenciais.',
        ingredients: [
          '1 filé de peixe',
          '1/2 xícara de quinoa',
          'Limão'
        ],
        instructions: [
          'Asse o peixe por 20 minutos.',
          'Cozinhe a quinoa até absorver água.',
          'Finalize com limão.'
        ],
        consumption_guide: [
          'Boa opção pós-atividade física leve.'
        ]
      },

      {
        title: 'Iogurte Natural com Pasta de Amendoim',
        description: 'Lanche proteico para manutenção muscular.',
        ingredients: [
          '1 pote de iogurte natural',
          '1 colher de sopa de pasta de amendoim natural'
        ],
        instructions: [
          'Misture bem e consuma fresco.'
        ],
        consumption_guide: [
          'Consumir no lanche da tarde.'
        ]
      },

      {
        title: 'Carne Magra com Legumes Cozidos',
        description: 'Proteína rica em ferro para prevenção de fraqueza.',
        ingredients: [
          '120g de patinho moído',
          'Cenoura',
          'Abobrinha'
        ],
        instructions: [
          'Grelhe a carne.',
          'Cozinhe os legumes até macios.',
          'Sirva juntos.'
        ],
        consumption_guide: [
          'Evitar frituras.',
          'Textura macia recomendada.'
        ]
      },

      {
        title: 'Ovos Mexidos com Aveia',
        description: 'Proteína combinada com fibra para energia sustentada.',
        ingredients: [
          '2 ovos',
          '1 colher de sopa de aveia'
        ],
        instructions: [
          'Bata os ovos.',
          'Adicione aveia.',
          'Cozinhe mexendo até firmar.'
        ],
        consumption_guide: [
          'Ideal no café da manhã.'
        ]
      },

      {
        title: 'Salmão Grelhado com Purê de Mandioquinha',
        description: 'Proteína rica em ômega-3 para saúde muscular.',
        ingredients: [
          '1 filé de salmão',
          'Mandioquinha cozida'
        ],
        instructions: [
          'Grelhe o salmão.',
          'Amasse a mandioquinha até textura cremosa.'
        ],
        consumption_guide: [
          'Mastigar lentamente.'
        ]
      },

      {
        title: 'Tofu Grelhado com Legumes',
        description: 'Fonte vegetal de proteína para variação alimentar.',
        ingredients: [
          '100g de tofu',
          'Brócolis',
          'Cenoura'
        ],
        instructions: [
          'Grelhe o tofu.',
          'Cozinhe legumes no vapor.'
        ],
        consumption_guide: [
          'Boa alternativa para quem reduz carne.'
        ]
      },

      {
        title: 'Vitamina Proteica de Banana',
        description: 'Bebida energética rica em proteína.',
        ingredients: [
          '1 banana',
          '200ml leite',
          '1 colher whey protein'
        ],
        instructions: [
          'Bata todos os ingredientes até homogêneo.'
        ],
        consumption_guide: [
          'Consumir imediatamente.'
        ]
      },

      {
        title: 'Lentilha com Arroz Integral',
        description: 'Combinação proteica vegetal completa.',
        ingredients: [
          '1/2 xícara lentilha',
          '1/2 xícara arroz integral'
        ],
        instructions: [
          'Cozinhe a lentilha até macia.',
          'Prepare arroz integral.',
          'Misture e sirva.'
        ],
        consumption_guide: [
          'Boa opção para almoço.'
        ]
      }

    ]
  },
  {
    id: 'terceira-idade-ossos',
    title: 'Terceira Idade: Fortalecimento dos Ossos',
    category: 'TerceiraIdade',
    phase: 'de Sustentação',
    tags: ['Cálcio', 'Vitamina D', 'Osteoporose'],
    recipes: [

      {
        title: 'Vitamina de Leite Fortificado com Banana e Chia',
        description: 'Fonte de cálcio, vitamina D e magnésio para suporte ósseo.',
        ingredients: [
          '200ml de leite fortificado',
          '1 banana',
          '1 colher de sopa de chia'
        ],
        instructions: [
          'Bata todos os ingredientes até ficar homogêneo.',
          'Sirva imediatamente.'
        ],
        consumption_guide: [
          'Ideal no café da manhã.',
          'Consumir fresco.'
        ]
      },

      {
        title: 'Sardinha Assada com Limão',
        description: 'Rica em cálcio biodisponível quando consumida com espinhas macias.',
        ingredients: [
          '1 sardinha inteira limpa',
          'Suco de limão',
          '1 fio de azeite'
        ],
        instructions: [
          'Tempere com limão e azeite.',
          'Asse por 20 minutos a 180°C.',
          'Consumir inclusive as espinhas macias.'
        ],
        consumption_guide: [
          'Excelente opção para almoço.'
        ]
      },

      {
        title: 'Couve Refogada com Alho',
        description: 'Vegetal rico em cálcio vegetal e vitamina K.',
        ingredients: [
          '1 xícara de couve picada',
          '1 dente de alho',
          '1 fio de azeite'
        ],
        instructions: [
          'Refogue o alho.',
          'Adicione a couve e cozinhe rapidamente.'
        ],
        consumption_guide: [
          'Evitar cozimento excessivo.'
        ]
      },

      {
        title: 'Iogurte Natural com Amêndoas Trituradas',
        description: 'Combinação rica em cálcio e magnésio.',
        ingredients: [
          '1 pote de iogurte natural',
          '1 colher de sopa de amêndoas trituradas'
        ],
        instructions: [
          'Misture e consuma fresco.'
        ],
        consumption_guide: [
          'Ideal para lanche.'
        ]
      },

      {
        title: 'Omelete com Queijo Branco',
        description: 'Proteína e cálcio em uma refeição leve.',
        ingredients: [
          '2 ovos',
          '2 fatias de queijo branco'
        ],
        instructions: [
          'Bata os ovos.',
          'Adicione queijo.',
          'Cozinhe até firmar.'
        ],
        consumption_guide: [
          'Boa opção no jantar.'
        ]
      },

      {
        title: 'Tofu Grelhado com Gergelim',
        description: 'Fonte vegetal rica em cálcio.',
        ingredients: [
          '100g tofu firme',
          '1 colher de chá de gergelim'
        ],
        instructions: [
          'Grelhe o tofu.',
          'Finalize com gergelim.'
        ],
        consumption_guide: [
          'Boa alternativa vegetal.'
        ]
      },

      {
        title: 'Brócolis no Vapor com Azeite',
        description: 'Fonte de cálcio e antioxidantes.',
        ingredients: [
          '1 xícara de brócolis',
          '1 fio de azeite'
        ],
        instructions: [
          'Cozinhe no vapor por 5 minutos.',
          'Finalize com azeite.'
        ],
        consumption_guide: [
          'Evitar cozinhar demais.'
        ]
      },

      {
        title: 'Leite com Cacau 70%',
        description: 'Fonte de cálcio com antioxidantes.',
        ingredients: [
          '200ml leite',
          '1 colher de chá de cacau 70%'
        ],
        instructions: [
          'Misture e aqueça levemente.'
        ],
        consumption_guide: [
          'Ideal antes de dormir.'
        ]
      },

      {
        title: 'Grão-de-Bico com Espinafre',
        description: 'Magnésio e cálcio vegetal.',
        ingredients: [
          '1/2 xícara grão-de-bico cozido',
          'Espinafre'
        ],
        instructions: [
          'Refogue levemente e sirva.'
        ],
        consumption_guide: [
          'Boa opção no almoço.'
        ]
      },

      {
        title: 'Panqueca de Aveia com Leite',
        description: 'Refeição nutritiva para suporte ósseo.',
        ingredients: [
          '2 colheres aveia',
          '1 ovo',
          'Leite'
        ],
        instructions: [
          'Misture tudo.',
          'Grelhe em frigideira.'
        ],
        consumption_guide: [
          'Consumir morna.'
        ]
      }

    ]
  },

  {
    id: 'terceira-idade-cardiovascular',
    title: 'Terceira Idade: Saúde Cardiovascular',
    category: 'TerceiraIdade',
    phase: 'Cardiovascular',
    tags: ['Ômega 3', 'Baixo Sódio', 'Cardioproteção'],
    recipes: [

      {
        title: 'Salmão Grelhado com Brócolis',
        description: 'Rico em ômega-3 e antioxidantes.',
        ingredients: [
          '1 filé de salmão',
          'Brócolis',
          'Azeite'
        ],
        instructions: [
          'Grelhe o salmão.',
          'Cozinhe brócolis no vapor.',
          'Finalize com azeite.'
        ],
        consumption_guide: [
          'Evitar adição de sal.'
        ]
      },

      {
        title: 'Salada de Abacate com Tomate',
        description: 'Fonte de gorduras monoinsaturadas cardioprotetoras.',
        ingredients: [
          'Abacate',
          'Tomate',
          'Azeite'
        ],
        instructions: [
          'Misture e sirva fresco.'
        ],
        consumption_guide: [
          'Ideal no almoço.'
        ]
      },

      {
        title: 'Aveia com Maçã e Canela',
        description: 'Fibras solúveis que auxiliam no controle do colesterol.',
        ingredients: [
          '2 colheres de aveia',
          '1 maçã picada',
          'Canela'
        ],
        instructions: [
          'Cozinhe a aveia.',
          'Adicione maçã e canela.'
        ],
        consumption_guide: [
          'Consumir no café da manhã.'
        ]
      },

      {
        title: 'Feijão com Arroz Integral',
        description: 'Fonte de fibras e proteínas vegetais.',
        ingredients: [
          'Feijão cozido',
          'Arroz integral'
        ],
        instructions: [
          'Prepare ambos com pouco sal.',
          'Sirva juntos.'
        ],
        consumption_guide: [
          'Evitar embutidos.'
        ]
      },

      {
        title: 'Peixe ao Forno com Ervas',
        description: 'Preparação leve e cardioprotetora.',
        ingredients: [
          'Filé de peixe',
          'Ervas naturais'
        ],
        instructions: [
          'Tempere com ervas.',
          'Asse por 20 minutos.'
        ],
        consumption_guide: [
          'Não utilizar sal em excesso.'
        ]
      },

      {
        title: 'Suco de Beterraba com Laranja',
        description: 'Rico em antioxidantes naturais.',
        ingredients: [
          '1 beterraba pequena',
          '1 laranja'
        ],
        instructions: [
          'Bata e consuma fresco.'
        ],
        consumption_guide: [
          'Consumir imediatamente.'
        ]
      },

      {
        title: 'Lentilha com Cenoura',
        description: 'Fonte de fibras e minerais.',
        ingredients: [
          'Lentilha',
          'Cenoura'
        ],
        instructions: [
          'Cozinhe até macio.'
        ],
        consumption_guide: [
          'Ideal no almoço.'
        ]
      },

      {
        title: 'Nozes e Castanhas',
        description: 'Gorduras boas para proteção cardiovascular.',
        ingredients: [
          'Mix de nozes naturais'
        ],
        instructions: [
          'Consumir porção pequena.'
        ],
        consumption_guide: [
          '1 punhado por dia.'
        ]
      },
      {
        title: 'Frango Grelhado com Salada Verde',
        description: 'Refeição leve e equilibrada.',
        ingredients: [
          'Peito de frango',
          'Folhas verdes'
        ],
        instructions: [
          'Grelhe frango.',
          'Sirva com salada.'
        ],
        consumption_guide: [
          'Temperar com azeite e limão.'
        ]
      },

      {
        title: 'Chá de Hibisco',
        description: 'Auxilia no controle da pressão.',
        ingredients: [
          '1 colher de chá hibisco seco',
          '200ml água quente'
        ],
        instructions: [
          'Infusionar por 5 minutos.',
          'Coar e consumir.'
        ],
        consumption_guide: [
          'Até 2 xícaras ao dia.'
        ]
      }

    ]
  },

];

// Quantidade de receitas
export const getRecipeCount = (collection: EbookCollection) =>
  collection.recipes.length;

// Filtrar por categoria
export const getByCategory = (category: Category) =>
  ebookCollections.filter(c => c.category === category);

// Filtrar por fase bariátrica
export const getByPhase = (phase: BariatricPhase) =>
  ebookCollections.filter(c => c.phase === phase);
