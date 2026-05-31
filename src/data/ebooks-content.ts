 export interface EbookPage {
   pageNumber: number;
   title: string;
   content: string[];
   illustration?: string;
 }
 
 export interface EbookContent {
   id: string;
   pages: EbookPage[];
 }
 
 const r = (n: number, t: string, p: string, ing: string[], prep: string, info: string, e: string): EbookPage => ({
   pageNumber: n, title: t, content: [`Rendimento: ${p}`, '', 'Ingredientes:', ...ing.map(i => `• ${i}`), '', 'Modo de preparo:', prep, '', `📊 ${info}`], illustration: e
 });
 
 export const ebooksContent: Record<string, EbookContent> = {
   'receitas-diabetes': {
     id: 'receitas-diabetes',
     pages: [
       r(1, 'Omelete de Vegetais', '1 porção', ['3 ovos grandes', '1 xícara (50g) espinafre', '1 tomate médio', '2 col. sopa cebola', '1 col. chá azeite'], 'Bata os ovos. Refogue vegetais. Adicione ovos e cozinhe até firmar.', 'Calorias: 280 | Carboidratos: 5g | Proteínas: 21g | IG: Baixo', '🍳'),
       r(2, 'Salada de Quinoa', '2 porções', ['1 xícara (170g) quinoa', '200g frango', '2 xícaras folhas', 'Suco 1 limão', '2 col. azeite'], 'Cozinhe quinoa 15min. Grelhe frango. Misture tudo com limão e azeite.', 'Calorias: 420 | Carboidratos: 45g | Proteínas: 35g', '🥗'),
       r(3, 'Peixe ao Forno', '1 porção', ['200g peixe branco', '150g brócolis', '1 cenoura', '2 dentes alho', 'Suco 1 limão'], 'Tempere peixe. Disponha legumes ao redor. Asse 180°C por 20min.', 'Calorias: 320 | Carboidratos: 18g | Proteínas: 42g', '🐟'),
       r(4, 'Wrap Integral', '1 porção', ['1 tortilha integral', '100g peru', '3 folhas alface', '1 tomate', '2 col. cream cheese light'], 'Espalhe cream cheese. Adicione recheio. Enrole e corte.', 'Calorias: 320 | Carboidratos: 35g | Proteínas: 24g', '🌯'),
       r(5, 'Sopa de Lentilha', '4 porções', ['1 xícara (200g) lentilha', '2 cenouras', '1 cebola', '2 tomates', '6 xícaras água'], 'Refogue vegetais. Adicione lentilha e água. Cozinhe 30min.', 'Calorias: 220 | Carboidratos: 38g | Proteínas: 14g | Fibras: 15g', '🍲'),
       r(6, 'Berinjela Recheada', '2 porções', ['2 berinjelas', '300g carne moída', '2 tomates', '50g queijo light'], 'Asse berinjelas. Refogue carne. Recheie e gratine 15min.', 'Calorias: 380 | Carboidratos: 22g | Proteínas: 32g', '🍆'),
       r(7, 'Frango Tzatziki', '2 porções', ['300g frango', '200g iogurte', '1 pepino', '2 dentes alho', '1 col. hortelã'], 'Grelhe frango. Misture iogurte, pepino, alho e hortelã.', 'Calorias: 280 | Carboidratos: 12g | Proteínas: 45g', '🍗'),
       r(8, 'Salada Grão de Bico', '3 porções', ['2 xícaras grão de bico', '1 pepino', '2 tomates', 'Suco 2 limões', '3 col. azeite'], 'Misture tudo. Marine 15min antes de servir.', 'Calorias: 280 | Carboidratos: 42g | Proteínas: 12g | Fibras: 11g', '🥙'),
       r(9, 'Atum com Abacate', '2 porções', ['2 latas (300g) atum', '1 abacate', 'Suco 1 limão', '1 tomate', '2 col. coentro'], 'Amasse abacate. Misture atum e vegetais. Tempere com limão.', 'Calorias: 320 | Carboidratos: 15g | Proteínas: 28g', '🥑'),
       r(10, 'Carne com Brócolis', '2 porções', ['300g carne magra', '300g brócolis', '3 dentes alho', '3 col. shoyu light'], 'Refogue carne em tiras. Adicione brócolis e shoyu. Cozinhe vapor 5min.', 'Calorias: 320 | Carboidratos: 12g | Proteínas: 42g', '🥦'),
       r(11, 'Panqueca Aveia', '2 panquecas', ['40g aveia', '1 ovo', '1 banana pequena', '1/2 col. chá canela'], 'Bata tudo. Cozinhe como panqueca 2-3min cada lado.', 'Calorias: 240 | Carboidratos: 38g | Proteínas: 10g | Fibras: 5g', '🥞'),
       r(12, 'Salmão com Ervas', '2 porções', ['300g salmão', '1/4 xícara ervas', '2 dentes alho', '300g aspargos'], 'Cubra salmão com ervas e alho. Asse com aspargos 180°C por 15min.', 'Calorias: 380 | Carboidratos: 8g | Proteínas: 42g | Ômega-3', '🐟'),
       r(13, 'Tomate Recheado', '4 unidades', ['4 tomates', '300g atum', '1/2 cebola', '100g cottage', '2 col. salsa'], 'Esvazie tomates. Misture atum com temperos. Recheie. Asse 10min.', 'Calorias: 160 | Carboidratos: 12g | Proteínas: 20g', '🍅'),
       r(14, 'Smoothie Verde', '2 copos', ['60g espinafre', '1/2 pepino', 'Suco 2 limões', '1 col. chá gengibre', '400ml água coco'], 'Bata tudo até homogêneo. Sirva imediatamente.', 'Calorias: 80 | Carboidratos: 12g | Fibras: 5g | Vitamina C', '🥤'),
       { pageNumber: 15, title: 'Dicas Essenciais', content: ['• Use adoçantes naturais', '• Prefira integrais', '• Combine carboidratos com proteínas', '• Frutas com casca (mais fibras)', '• Evite sucos, prefira frutas inteiras', '• Cozinhe em casa', '• Refeições menores e frequentes', '', 'Cuide-se sempre! 💕'], illustration: '👩‍🍳' }
     ]
   },
   'receitas-hipertensao': {
     id: 'receitas-hipertensao',
     pages: [
       r(1, 'Frango com Ervas', '2 porções', ['300g frango', '2 ramos alecrim', '2 ramos tomilho', 'Suco 1 limão', '2 dentes alho'], 'Tempere com ervas (sem sal). Marine 30min. Asse 180°C por 40min.', 'Sódio: 65mg | Potássio: 520mg | Calorias: 240', '🍗'),
       r(2, 'Salada DASH', '2 porções', ['4 xícaras folhas', '1 beterraba', '1/4 xícara nozes', '1 cenoura', 'Suco 1 limão'], 'Monte salada. Tempere só com limão e azeite (sem sal).', 'Sódio: 30mg | Potássio: 680mg | Fibras: 8g', '🥗'),
       r(3, 'Peixe Grelhado', '2 porções', ['400g peixe', 'Suco 2 limões', '4 ramos ervas', '3 dentes alho'], 'Marine 20min em limão e ervas. Grelhe 4-5min cada lado (sem sal).', 'Sódio: 50mg | Ômega-3: 2.5g | Calorias: 280', '🐟'),
       r(4, 'Batata Doce', '4 porções', ['800g batata doce', '2 ramos alecrim', '2 col. azeite', 'Pimenta'], 'Corte rodelas. Tempere (sem sal). Asse 200°C por 35min.', 'Sódio: 20mg | Potássio: 540mg | Calorias: 180', '🍠'),
       r(5, 'Sopa de Abóbora', '4 porções', ['600g abóbora', '1 cebola', '3 dentes alho', '1 col. chá gengibre', '4 xícaras água'], 'Refogue vegetais. Adicione abóbora. Cozinhe 20min. Bata (sem sal).', 'Sódio: 25mg | Vitamina A: 180% | Calorias: 120', '🍲'),
       r(6, 'Quinoa Colorida', '3 porções', ['1 xícara quinoa', '1 pimentão', '2 tomates', '1/4 xícara manjericão'], 'Cozinhe quinoa (sem sal). Misture com vegetais frescos.', 'Sódio: 15mg | Proteína: 8g | Fibras: 5g', '🍚'),
       r(7, 'Banana Assada', '2 porções', ['2 bananas', '1/2 xícara aveia', '1 col. chá canela', '2 col. nozes', '1 col. mel'], 'Corte bananas. Cubra com aveia e nozes. Asse 180°C por 20min.', 'Sódio: 5mg | Potássio: 420mg | Calorias: 200', '🍌'),
       r(8, 'Tomates Assados', '4 porções', ['8 tomates', '4 col. azeite', '2 col. orégano', '4 dentes alho'], 'Corte ao meio. Tempere (sem sal). Asse 180°C por 25min.', 'Sódio: 10mg | Licopeno rico | Calorias: 90', '🍅'),
       r(9, 'Espinafre Alho', '2 porções', ['4 xícaras espinafre', '4 dentes alho', '2 col. azeite', 'Suco 1 limão'], 'Refogue alho. Adicione espinafre 2-3min (sem sal). Finalize limão.', 'Sódio: 80mg | Magnésio: 80mg | Ferro: 3mg', '🥬'),
       r(10, 'Salmão Papillote', '2 porções', ['300g salmão', '2 limões', '4 ramos endro', '300g aspargos'], 'Embrulhe tudo em papel alumínio. Asse 180°C por 15min.', 'Sódio: 60mg | Ômega-3: 3g | Calorias: 320', '🐟'),
       r(11, 'Arroz Integral', '4 porções', ['1 xícara arroz', '1 cebola', '2 dentes alho', '2 folhas louro', '2 xícaras água'], 'Refogue. Adicione água e louro. Cozinhe 35min (sem sal).', 'Sódio: 5mg | Fibras: 3g | Calorias: 170', '🍚'),
       r(12, 'Guacamole', '4 porções', ['2 abacates', 'Suco 2 limões', '1 tomate', '1/4 cebola', 'Pimenta'], 'Amasse abacate. Misture vegetais picados (sem sal).', 'Sódio: 10mg | Gorduras boas: 22g | Calorias: 180', '🥑'),
       r(13, 'Feijão Caseiro', '6 porções', ['2 xícaras feijão', '2 folhas louro', '4 dentes alho', '1 cebola'], 'Deixe molho overnight. Cozinhe com ervas até amolecer (sem sal).', 'Sódio: 2mg | Proteína: 15g | Fibras: 16g', '🫘'),
       r(14, 'Suco Verde', '2 copos', ['2 folhas couve', '1 xícara abacaxi', '1 col. chá gengibre', '400ml água'], 'Bata tudo. Sirva gelado sem açúcar.', 'Sódio: 15mg | Vitamina C: 120mg | Calorias: 60', '🥤'),
       { pageNumber: 15, title: 'Dicas Importantes', content: ['• Use ervas no lugar de sal', '• Limão realça sabores naturalmente', '• Alho e cebola são ótima base', '• Potássio é seu grande aliado', '• Leia todos os rótulos', '• Cozinhe em casa sempre', '• Dieta DASH funciona', '', 'Saúde em primeiro lugar! 💕'], illustration: '👩‍🍳' }
     ]
   },
   'receitas-obesidade': {
     id: 'receitas-obesidade',
     pages: [
       r(1, 'Omelete Light', '1 porção', ['3 claras ovo', '1 xícara cogumelos', '1 tomate', '1 xícara espinafre'], 'Bata claras. Refogue vegetais. Adicione claras e cozinhe.', 'Calorias: 120 | Proteína: 18g | Gorduras: 1g', '🍳'),
       r(2, 'Salada Completa', '1 porção', ['3 xícaras folhas', '1/2 xícara grão bico', '1 tomate', '1 cenoura'], 'Monte salada. Tempere com limão e vinagre (sem azeite).', 'Calorias: 180 | Fibras: 8g | Proteína: 10g', '🥗'),
       r(3, 'Tilápia Grelhada', '1 porção', ['200g tilápia', 'Suco 1 limão', '2 xícaras vegetais', 'Ervas'], 'Tempere e grelhe 4min cada lado. Sirva com vegetais vapor.', 'Calorias: 200 | Proteína: 38g | Gorduras: 4g', '🐟'),
       r(4, 'Sopa Detox', '4 porções', ['3 xícaras couve', '2 abobrinhas', '2 cenouras', '1 col. chá gengibre', '6 xícaras água'], 'Cozinhe vegetais 15min. Bata metade para cremosidade.', 'Calorias: 90 | Fibras: 6g | Vitaminas', '🍲'),
       r(5, 'Frango Brócolis', '1 porção', ['150g frango', '2 xícaras brócolis', '2 dentes alho', 'Limão'], 'Grelhe frango cubos. Refogue brócolis com alho 5min.', 'Calorias: 250 | Proteína: 42g | Carboidratos: 8g', '🍗'),
       r(6, 'Salada Atum', '1 porção', ['1 lata atum água', '3 xícaras alface', '1/2 pepino', '4 rabanetes'], 'Escorra atum. Monte salada. Tempere com limão.', 'Calorias: 160 | Proteína: 28g | Gorduras: 2g', '🥙'),
       r(7, 'Smoothie Proteico', '1 copo', ['1 scoop whey', '1 xícara morangos', '1 xícara espinafre', '300ml água'], 'Bata tudo. Sirva imediatamente após treino.', 'Calorias: 140 | Proteína: 25g | Carboidratos: 12g', '🥤'),
       r(8, 'Abobrinha Recheada', '2 porções', ['2 abobrinhas', '200g frango moído', '2 tomates', '30g queijo light'], 'Esvazie abobrinhas. Refogue recheio. Asse 180°C por 20min.', 'Calorias: 210 | Proteína: 26g | Gorduras: 8g', '🥒'),
       r(9, 'Ovos Mexidos', '1 porção', ['3 ovos', '1 tomate', '2 col. cebola', '1 xícara espinafre'], 'Refogue vegetais. Adicione ovos batidos. Mexa devagar.', 'Calorias: 180 | Proteína: 18g | Saciedade alta', '🍳'),
       r(10, 'Caldo Verde', '4 porções', ['4 xícaras couve', '2 batatas', '1 cebola', '2 dentes alho', '6 xícaras água'], 'Cozinhe batatas. Bata levemente. Adicione couve 5min.', 'Calorias: 110 | Fibras: 4g | Vitaminas A e C', '🍲'),
       r(11, 'Wrap Integral', '1 porção', ['1 tortilha integral pequena', '100g frango', '2 folhas alface', '1 tomate'], 'Aqueça tortilha. Monte recheio. Enrole firmemente.', 'Calorias: 230 | Proteína: 24g | Carboidratos: 28g', '🌯'),
       r(12, 'Berinjela Forno', '2 porções', ['1 berinjela', '2 tomates', '2 col. manjericão', '40g queijo light'], 'Asse berinjela 15min. Cubra. Asse mais 10min.', 'Calorias: 130 | Fibras: 7g | Antioxidantes', '🍆'),
       r(13, 'Parfait Iogurte', '1 porção', ['1 pote iogurte desnatado', '1/2 xícara frutas vermelhas', '2 col. granola light', '1 col. chá chia'], 'Monte camadas alternadas em copo. Sirva gelado.', 'Calorias: 150 | Proteína: 12g | Probióticos', '🥣'),
       r(14, 'Legumes Vapor', '2 porções', ['2 xícaras brócolis', '1 cenoura', '1 xícara vagem', '1 xícara couve-flor'], 'Corte similar. Cozinhe vapor 8-10min. Tempere limão.', 'Calorias: 60 | Fibras: 6g | Vitaminas', '🥦'),
       { pageNumber: 15, title: 'Receita do Sucesso', content: ['• Coma devagar e mastigue bem', '• Proteína em toda refeição', '• Vegetais à vontade', '• Beba 2L água por dia', '• Planeje suas refeições', '• Exercícios regulares', '• Seja paciente e consistente', '', 'Você consegue! 💕'], illustration: '👩‍🍳' }
     ]
   },
   'receitas-colesterol': {
     id: 'receitas-colesterol',
     pages: [
       r(1, 'Aveia com Frutas', '1 porção', ['1/2 xícara aveia', '1 maçã', '1 col. chá canela', '1/4 xícara nozes'], 'Cozinhe aveia. Adicione maçã picada e canela. Finalize nozes.', 'Fibras solúveis | Beta-glucana | Calorias: 280', '🥣'),
       r(2, 'Salmão Grelhado', '2 porções', ['300g salmão', 'Suco 1 limão', '2 ramos endro', '300g aspargos'], 'Tempere salmão. Grelhe com aspargos por 6-8min.', 'Ômega-3: 3g | HDL+ | Calorias: 380', '🐟'),
       r(3, 'Salada Quinoa', '2 porções', ['1 xícara quinoa', '1/2 xícara feijão', '2 tomates', '1 abacate'], 'Cozinhe quinoa. Misture com feijão e vegetais frescos.', 'Fibras: 12g | Gorduras boas | Calorias: 420', '🥗'),
       r(4, 'Berinjela Assada', '4 porções', ['2 berinjelas', '4 col. azeite', '4 dentes alho', '2 ramos tomilho'], 'Corte fatias. Tempere. Asse 180°C por 30min.', 'Antioxidantes | Fibras | Calorias: 120', '🍆'),
       r(5, 'Frango Amêndoas', '2 porções', ['300g frango', '1/2 xícara amêndoas', '2 xícaras brócolis', '2 dentes alho'], 'Refogue frango. Adicione brócolis e amêndoas tostadas.', 'Vitamina E | Magnésio | Calorias: 380', '🍗'),
       r(6, 'Sopa Feijão', '4 porções', ['2 xícaras feijão', '2 cenouras', '2 tomates', '2 xícaras espinafre'], 'Cozinhe feijão com vegetais. Bata levemente.', 'Fibras solúveis: 18g | Calorias: 240', '🍲'),
       r(7, 'Maçã Assada', '2 porções', ['2 maçãs', '1 col. chá canela', '1/4 xícara nozes', '2 col. aveia'], 'Retire miolo. Recheie. Asse 180°C por 25min.', 'Pectina | Fibras | Calorias: 180', '🍎'),
       r(8, 'Atum Abacate', '2 porções', ['2 latas atum', '1 abacate', 'Suco 1 limão', '1 tomate'], 'Misture atum com abacate amassado e vegetais.', 'Ômega-3 | Gorduras boas | Calorias: 320', '🥑'),
       r(9, 'Arroz Integral', '4 porções', ['1 xícara arroz integral', '1 cenoura', '1/2 xícara ervilha', '1 tomate'], 'Refogue vegetais. Adicione arroz e cozinhe 35min.', 'Fibras insolúveis: 4g | Calorias: 220', '🍚'),
       r(10, 'Sardinha Assada', '2 porções', ['400g sardinha', 'Suco 2 limões', '1 cebola', '2 tomates'], 'Tempere sardinhas. Asse 180°C por 20min.', 'Ômega-3: 2.5g | Econômico | Calorias: 280', '🐟'),
       r(11, 'Smoothie Aveia', '2 copos', ['1/2 xícara aveia', '1 banana', '1 xícara morangos', '400ml leite'], 'Bata tudo gelado até homogêneo.', 'Beta-glucana | Fibras: 6g | Calorias: 220', '🥤'),
       r(12, 'Tofu Grelhado', '2 porções', ['300g tofu', '3 col. shoyu', '1 col. gengibre', '2 col. gergelim'], 'Marine tofu. Grelhe 4min cada lado. Polvilhe gergelim.', 'Proteína vegetal: 20g | Calorias: 180', '🥢'),
       r(13, 'Salada Beterraba', '2 porções', ['2 beterrabas', '1 cenoura', '1 laranja', '1/4 xícara nozes'], 'Rale vegetais crus. Adicione gomos de laranja e nozes.', 'Antioxidantes | Folato | Calorias: 160', '🥗'),
       r(14, 'Lentilha Vegetais', '4 porções', ['1 xícara lentilha', '2 cenouras', '1 cebola', '2 folhas louro'], 'Cozinhe lentilha com vegetais por 25-30min.', 'Fibras: 15g | Proteína: 18g | Calorias: 240', '🫘'),
       { pageNumber: 15, title: 'Controle Natural', content: ['• Aveia todos os dias (beta-glucana)', '• Peixe 3x/semana (ômega-3)', '• Azeite extra-virgem', '• Nozes como lanche (30g/dia)', '• Evite totalmente gordura trans', '• Fibras abundantes (30g/dia)', '• Atividade física regular', '', 'Sua saúde importa! 💕'], illustration: '👩‍🍳' }
     ]
   },
   'receitas-gastrite': {
     id: 'receitas-gastrite',
     pages: [
       r(1, 'Caldo Frango', '4 porções', ['500g frango', '2 batatas', '2 cenouras', '2 col. salsinha'], 'Cozinhe frango com vegetais. Coe. Sirva morno.', 'Reconfortante | Fácil digestão | Calorias: 150', '🍲'),
       r(2, 'Purê Batata', '4 porções', ['4 batatas', '1/2 xícara leite', '2 col. manteiga', 'Sal'], 'Cozinhe batatas. Amasse com leite e manteiga até cremoso.', 'Leve | Nutritivo | Calorias: 180', '🥔'),
       r(3, 'Peixe Cozido', '2 porções', ['300g peixe branco', '2 cenouras', '2 batatas', '2 folhas louro'], 'Cozinhe tudo junto em água. Tempero muito suave.', 'Proteína magra | Fácil | Calorias: 220', '🐟'),
       r(4, 'Arroz Cenoura', '4 porções', ['1 xícara arroz', '1 cenoura', '1 cebola pequena', '1 col. azeite'], 'Refogue levemente. Adicione água. Cozinhe até arroz amolecer.', 'Suave | Nutritivo | Calorias: 190', '🍚'),
       r(5, 'Frango Desfiado', '3 porções', ['400g peito frango', '2 batatas', '2 cenouras', 'Ervas suaves'], 'Cozinhe frango com vegetais. Desfie. Tempero leve.', 'Proteína: 32g | Calorias: 280', '🍗'),
       r(6, 'Sopa Abóbora', '4 porções', ['600g abóbora', '2 batatas', '1 cebola', '2 col. azeite'], 'Cozinhe vegetais. Bata até cremoso. Sirva morno.', 'Vitamina A | Suave | Calorias: 140', '🎃'),
       r(7, 'Omelete Macia', '1 porção', ['2 ovos', '2 col. queijo branco', '1 col. cebolinha', 'Sal'], 'Bata bem os ovos. Cozinhe em fogo baixo até ficar macio.', 'Leve | Proteína: 16g | Calorias: 180', '🍳'),
       r(8, 'Macarrão Abobrinha', '2 porções', ['200g macarrão', '1 abobrinha', '2 col. azeite', '1 col. manjericão'], 'Cozinhe macarrão. Refogue abobrinha. Misture com tempero suave.', 'Fácil digestão | Calorias: 320', '🍝'),
       r(9, 'Banana Cozida', '2 porções', ['2 bananas', '1/2 col. chá canela', '1 col. mel'], 'Cozinhe bananas em água até amolecer. Adicione canela.', 'Sobremesa leve | Calorias: 140', '🍌'),
       r(10, 'Mingau Aveia', '1 porção', ['1/2 xícara aveia', '1 xícara leite', '1/2 col. chá canela', '1 col. mel'], 'Cozinhe aveia no leite até cremoso. Adoce levemente.', 'Café da manhã | Calorias: 220', '🥣'),
       r(11, 'Batata Doce', '2 porções', ['2 batatas doces', '1/2 col. chá canela'], 'Cozinhe batatas até macias. Sirva com canela.', 'Carboidrato bom | Calorias: 160', '🍠'),
       r(12, 'Peru Cozido', '3 porções', ['400g peito peru', '2 batatas', '2 cenouras', '2 folhas louro'], 'Cozinhe peru com vegetais. Temperos muito suaves.', 'Leve | Proteína: 35g | Calorias: 260', '🦃'),
       r(13, 'Gelatina Natural', '4 porções', ['1 pacote gelatina', '2 xícaras frutas cozidas', 'Água'], 'Prepare gelatina conforme embalagem. Adicione frutas.', 'Hidratante | Leve | Calorias: 80', '🍮'),
       r(14, 'Chá Camomila', '2 xícaras', ['2 saquinhos camomila', '1 col. mel', '500ml água'], 'Ferva água. Deixe camomila 5min. Adoce levemente.', 'Calmante | Digestivo | Calorias: 30', '☕'),
       { pageNumber: 15, title: 'Cuidados Essenciais', content: ['• Evite frituras e alimentos gordurosos', '• Sem café, álcool e refrigerantes', '• Refeições pequenas e frequentes', '• Mastigue muito bem', '• Sem picantes e condimentos fortes', '• Coma sempre morno (nunca quente)', '• Evite deitar após comer', '', 'Cuide do estômago! 💕'], illustration: '👩‍🍳' }
     ]
   },
   'receitas-bariatrica': {
     id: 'receitas-bariatrica',
     pages: [
       r(1, 'Vitamina Proteica', '1 copo (200ml)', ['1 scoop whey', '200ml leite desnatado', '5 morangos'], 'Bata tudo. Beba devagar em pequenos goles.', 'Fase líquida | Proteína: 28g | Calorias: 180', '🥤'),
       r(2, 'Sopa Batida', '2 porções (300ml)', ['150g frango', '200g abóbora', '1 cenoura', '3 xícaras água'], 'Cozinhe tudo. Bata até completamente líquido.', 'Fase líquida | Proteína: 20g | Calorias: 140', '🍲'),
       r(3, 'Purê Frango', '1 porção (150ml)', ['100g frango cozido', '1 batata pequena', '50ml leite'], 'Bata tudo até consistência pastosa homogênea.', 'Fase pastosa | Proteína: 30g | Calorias: 200', '🍗'),
       r(4, 'Ovo Mexido Macio', '1 porção (100ml)', ['2 ovos', '2 col. leite', '1 col. queijo'], 'Mexa devagar em fogo baixo até muito cremoso.', 'Fase pastosa | Proteína: 16g | Calorias: 160', '🍳'),
       r(5, 'Peixe Desfiado', '1 porção (150g)', ['100g peixe', '1 batata pequena', '1 col. azeite'], 'Cozinhe e desfie muito fino. Misture com batata.', 'Fase sólida inicial | Proteína: 25g', '🐟'),
       r(6, 'Frango Legumes', '1 porção (150g)', ['60g frango', '50g abobrinha', '40g cenoura'], 'Porção pequena. Mastigue cada pedaço 30x.', 'Fase sólida | Proteína primeiro | Calorias: 180', '🍗'),
       r(7, 'Omelete Light', '1 porção (100g)', ['2 ovos', '1 tomate', '2 col. cottage'], 'Cozinhe até firmar. Coma devagar 30-40min.', 'Proteína: 18g | Calorias: 160', '🍳'),
       r(8, 'Iogurte Whey', '1 porção (150ml)', ['150g iogurte grego', '1/2 scoop whey', '3 morangos'], 'Misture bem. Alto teor proteico para lanche.', 'Proteína: 25g | Calorias: 150', '🥣'),
       r(9, 'Carne Moída', '1 porção (100g)', ['50g carne moída 95% magra', '2 tomates', '1 cebola'], 'Refogue bem. Porção muito pequena.', 'Proteína: 15g | Ferro | Calorias: 120', '🥩'),
       r(10, 'Salada Atum', '1 porção (150g)', ['80g atum', '50g alface', '20g tomate'], 'SEMPRE proteína primeiro. Total 100g.', 'Proteína: 24g | Calorias: 140', '🥗'),
       r(11, 'Smoothie Proteico', '1 copo (200ml)', ['1 scoop whey', '1/2 banana', '1 xícara espinafre', '200ml água'], 'Substitui refeição completa.', 'Proteína: 30g | Calorias: 180', '🥤'),
       r(12, 'Tofu Grelhado', '1 porção (100g)', ['80g tofu', '1 col. shoyu', '1 col. chá gergelim'], 'Proteína vegetal. Mastigue muito bem.', 'Proteína: 15g | Alternativa | Calorias: 120', '🥢'),
       r(13, 'Queijo Cottage', '1 porção (100g)', ['100g cottage', '3 tomates cereja', '1 col. chá manjericão'], 'Lanche proteico rápido.', 'Proteína: 15g | Calorias: 90', '🧀'),
       r(14, 'Sopa Lentilha', '1 porção (150ml)', ['50g lentilha', '30g cenoura', '30g frango'], 'Bata levemente. Rico em proteína e fibras.', 'Proteína: 18g | Fibras: 6g | Calorias: 160', '🍲'),
       { pageNumber: 15, title: 'Regras de Ouro', content: ['• Proteína SEMPRE primeiro', '• Mastigue 30-40x cada pedaço', '• Porções: 150-200ml máximo', '• Nunca beba durante refeição', '• Suplementos vitamínicos diários', '• Hidratação constante entre refeições', '• Acompanhamento médico regular', '• Paciência no processo', '', 'Sucesso na jornada! 💕'], illustration: '👩‍🍳' }
     ]
   },
   'receitas-anemia': {
     id: 'receitas-anemia',
     pages: [
       r(1, 'Fígado Cebola', '2 porções', ['300g fígado bovino', '2 cebolas', '3 dentes alho', 'Suco 1 limão'], 'Marine fígado no limão. Refogue cebola. Adicione fígado 5min.', 'Ferro: 8mg | Vitamina A | Calorias: 280', '🥩'),
       r(2, 'Feijão com Laranja', '4 porções', ['2 xícaras feijão', '1 xícara arroz', '2 laranjas'], 'Sirva feijão com arroz. Sobremesa: laranja (vitamina C).', 'Ferro + Vitamina C | Absorção ótima', '🫘'),
       r(3, 'Carne Brócolis', '2 porções', ['300g carne vermelha', '2 xícaras brócolis', '1 pimentão', 'Limão'], 'Refogue carne mal passada. Adicione vegetais ricos em vitamina C.', 'Ferro heme: 5mg | Vitamina C', '🥩'),
       r(4, 'Salada Beterraba', '2 porções', ['2 beterrabas', 'Suco 2 laranjas', '1 cenoura', '2 col. limão'], 'Rale vegetais crus. Adicione suco de laranja fresco.', 'Ácido fólico | Ferro | Calorias: 120', '🥗'),
       r(5, 'Ovo Espinafre', '1 porção', ['2 ovos', '2 xícaras espinafre', '1 tomate', 'Limão'], 'Refogue espinafre. Adicione ovos. Finalize com limão.', 'Ferro: 4mg | Ácido fólico', '🍳'),
       r(6, 'Lentilha Tomate', '4 porções', ['2 xícaras lentilha', '3 tomates', '1 cebola', 'Suco 2 limões'], 'Cozinhe lentilha com tomate. Finalize com limão abundante.', 'Ferro vegetal: 6mg | Vitamina C', '🫘'),
       r(7, 'Sardinha Assada', '2 porções', ['400g sardinha', 'Suco 2 limões', '2 col. salsa'], 'Tempere com limão. Asse 180°C por 15min.', 'Ferro: 3mg | Ômega-3 | Calorias: 280', '🐟'),
       r(8, 'Smoothie Ferro', '2 copos', ['2 xícaras espinafre', '1 xícara morangos', 'Suco 1 laranja', '1 beterraba'], 'Bata tudo com gelo. Rico em ferro e vitamina C.', 'Ferro: 5mg | Vitamina C: 80mg', '🥤'),
       r(9, 'Frango Couve', '2 porções', ['300g frango', '3 xícaras couve', '2 tomates', 'Suco 1 limão'], 'Grelhe frango. Refogue couve. Finalize com limão e tomate.', 'Proteína | Ferro | Vitaminas', '🍗'),
       r(10, 'Quinoa Legumes', '3 porções', ['1 xícara quinoa', '1/2 xícara feijão', '1 pimentão vermelho'], 'Cozinhe quinoa. Misture feijão e pimentão cru.', 'Ferro: 4mg | Proteína completa', '🍚'),
       r(11, 'Salada Grão Bico', '2 porções', ['2 xícaras grão bico', '2 tomates', 'Suco 2 limões', '2 col. salsa'], 'Misture tudo. Abundante limão para absorção.', 'Ferro vegetal | Vitamina C', '🥙'),
       r(12, 'Bife Rúcula', '1 porção', ['150g bife', '2 xícaras rúcula', '1 tomate', 'Limão'], 'Grelhe bife mal passado. Sirva sobre rúcula e tomate.', 'Ferro heme máximo: 6mg', '🥩'),
       r(13, 'Melado Cana', '1 copo', ['2 col. melado cana', '300ml água', 'Suco 1 limão'], 'Dilua melado em água com limão. Beba 1x ao dia.', 'Ferro: 3mg | Energético', '🥤'),
       r(14, 'Suco Beterraba', '2 copos', ['2 beterrabas', '2 cenouras', 'Suco 2 laranjas'], 'Bata tudo. Beba fresco imediatamente.', 'Ácido fólico | Vitamina C | Ferro', '🥤'),
       { pageNumber: 15, title: 'Absorção Máxima', content: ['• Carne vermelha 2-3x/semana (ferro heme)', '• SEMPRE combine com vitamina C', '• Evite chá e café nas refeições', '• Cozinhe em panela de ferro', '• Feijão + laranja = combinação perfeita', '• Consulte hematologista regularmente', '• Suplemento se necessário', '', 'Muita vitalidade! 💕'], illustration: '👩‍🍳' }
     ]
   },
   'receitas-sem-gluten': {
     id: 'receitas-sem-gluten',
     pages: [
       r(1, 'Pão Tapioca', '4 unidades', ['2 xícaras tapioca', '2 ovos', '100g queijo ralado', '1 col. orégano'], 'Misture tudo. Asse em frigideira até dourar.', '100% sem glúten | Calorias: 180', '🥖'),
       r(2, 'Bolo Banana', '8 fatias', ['4 bananas', '3 ovos', '2 xícaras farinha arroz', '1 col. fermento'], 'Bata tudo. Asse 180°C por 35min. Fofinho!', 'Sem glúten | Natural | Calorias: 200', '🍰'),
       r(3, 'Macarrão Arroz', '2 porções', ['200g macarrão arroz', '2 tomates', '2 col. manjericão', '2 col. azeite'], 'Cozinhe macarrão. Faça molho caseiro fresco.', 'Alternativa perfeita | Calorias: 320', '🍝'),
       r(4, 'Tapioca Recheada', '2 unidades', ['4 col. tapioca', '150g frango', '100g queijo', '1 tomate'], 'Prepare tapioca. Recheie com frango e queijo.', 'Prática | Versátil | Calorias: 280', '🌮'),
       r(5, 'Polenta Cremosa', '4 porções', ['1 xícara fubá', '100g queijo', '2 col. manteiga', '4 xícaras água'], 'Cozinhe fubá mexendo sempre. Adicione queijo.', 'Sem glúten | Italiana | Calorias: 220', '🥘'),
       r(6, 'Panqueca Banana', '4 panquecas', ['2 bananas', '2 ovos', '1 col. chá canela'], 'Amasse banana. Misture ovos. Frite. Só 3 ingredientes!', 'Café da manhã | Calorias: 140', '🥞'),
       r(7, 'Arroz Legumes', '4 porções', ['2 xícaras arroz', '1 xícara brócolis', '1 cenoura', '1/2 xícara milho'], 'Refogue vegetais. Adicione arroz cozido.', 'Completo | Nutritivo | Calorias: 260', '🍚'),
       r(8, 'Torta Frango', '8 fatias', ['400g frango', '2 xícaras farinha arroz', '2 batatas', '1 xícara milho'], 'Faça massa. Recheie com frango e vegetais. Asse.', 'Festa sem glúten | Calorias: 320', '🥧'),
       r(9, 'Cookie Aveia', '12 cookies', ['2 xícaras aveia SG certificada', '2 bananas', '1/2 xícara chocolate'], 'Misture tudo. Asse 180°C por 15min.', 'Lanche saudável | Calorias: 120', '🍪'),
       r(10, 'Pizza Batata', '2 porções', ['4 batatas', '2 ovos', '150g queijo', '2 tomates'], 'Faça massa de batata ralada. Cubra. Asse.', 'Criativa | Saborosa | Calorias: 380', '🍕'),
       r(11, 'Nhoque Mandioca', '4 porções', ['600g mandioca', '1 ovo', '100g queijo', 'Sal'], 'Cozinhe mandioca. Amasse. Modele. Cozinhe em água.', 'Tradicional adaptado | Calorias: 280', '🥟'),
       r(12, 'Brownie Batata', '12 quadrados', ['2 batatas doces', '1/2 xícara cacau', '3 ovos', '1/4 xícara mel'], 'Bata tudo. Asse 180°C por 25min. Delicioso!', 'Sobremesa SG | Calorias: 140', '🍫'),
       r(13, 'Wrap Alface', '2 unidades', ['6 folhas alface', '150g frango', '1 tomate', '1 cenoura'], 'Use alface como tortilha. Recheie. Enrole.', 'Zero glúten | Leve | Calorias: 180', '🥬'),
       r(14, 'Mingau Quinoa', '2 porções', ['1/2 xícara quinoa', '400ml leite', '1 col. chá canela', '2 col. mel'], 'Cozinhe quinoa no leite até cremoso.', 'Nutritivo | Proteico | Calorias: 240', '🥣'),
       { pageNumber: 15, title: 'Vida sem Glúten', content: ['• Leia TODOS os rótulos sempre', '• Atenção à contaminação cruzada', '• Farinhas alternativas: arroz, tapioca, amêndoa', '• Aveia: busque certificada SEM glúten', '• Cozinhe em casa (mais seguro)', '• Comunidade celíaca ajuda muito', '• Restaurantes: sempre pergunte', '', 'É totalmente possível! 💕'], illustration: '👩‍🍳' }
     ]
   }
 };