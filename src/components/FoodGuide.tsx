import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FoodGuideProps {
    morbidityIds: string[];
}

// Base de conhecimento para o guia
const FOOD_RULES: Record<string, { avoid: string[], allowed: string[] }> = {
    'hipertensao': {
        avoid: ['Sal de cozinha', 'Temperos industrializados', 'Embutidos (presunto, salame)', 'Molhos prontos', 'Enlatados', 'Queijos amarelos'],
        allowed: ['Sal de ervas', 'Alho e Cebola', 'Azeite extra virgem', 'Frutas ricas em potássio', 'Vegetais frescos'],
    },
    'diabetes': {
        avoid: ['Açúcar refinado', 'Doces', 'Refrigerantes', 'Farinha branca', 'Sucos de caixinha', 'Mel'],
        allowed: ['Adoçantes naturais', 'Farinhas integrais', 'Leguminosas', 'Vegetais folhosos', 'Frutas com casca'],
    },
    'intolerancia-lactose': {
        avoid: ['Leite de vaca', 'Queijos frescos', 'Manteiga', 'Creme de leite', 'Leite condensado'],
        allowed: ['Leites vegetais', 'Queijos curados (parmesão)', 'Iogurte sem lactose', 'Azeite', 'Manteiga ghee'],
    },
    'hipotireoidismo': {
        avoid: ['Soja crua', 'Couve crua', 'Brócolis cru', 'Repolho cru', 'Glúten (em excesso)'],
        allowed: ['Castanhas do Pará (Selênio)', 'Peixes (Iodo)', 'Vegetais cozidos', 'Ovos', 'Frutas cítricas'],
    },
    'colesterol': {
        avoid: ['Gordura visível da carne', 'Frituras', 'Margarina', 'Pele de frango', 'Biscoitos recheados'],
        allowed: ['Aveia', 'Azeite', 'Peixes (Ômega-3)', 'Abacate', 'Oleaginosas'],
    },
    'gastrite': {
        avoid: ['Café preto', 'Pimenta', 'Frituras', 'Bebidas alcoólicas', 'Chocolate', 'Frutas muito ácidas'],
        allowed: ['Chás claros (camomila)', 'Vegetais cozidos', 'Carnes magras', 'Gelatina', 'Frutas macias (mamão)'],
    },
    // Defaults para pós-bariátrica
    'bariatrica-liquida': {
        avoid: ['Alimentos sólidos', 'Sementes', 'Cascas', 'Fibras fibrosas', 'Açúcar'],
        allowed: ['Caldos coados', 'Sucos coados', 'Água de coco', 'Suplementos proteicos líquidos', 'Gelatina'],
    },
    'bariatrica-pastosa': {
        avoid: ['Pedaços grandes', 'Fibras duras', 'Arroz', 'Pão', 'Carnes secas'],
        allowed: ['Purês', 'Cremes', 'Carnes moídas/desfiadas', 'Ovos mexidos moles', 'Iogurte'],
    },
    'bariatrica-solida': {
        avoid: ['Líquidos junto com a refeição', 'Bebidas gaseificadas', 'Doces concentrados (Dumping)'],
        allowed: ['Proteínas magras', 'Vegetais bem cozidos', 'Frutas descascadas', 'Mastigação exaustiva'],
    }
};

export function FoodGuide({ morbidityIds }: FoodGuideProps) {
    if (!morbidityIds || morbidityIds.length === 0) return null;

    // Agrega regras
    const avoidSet = new Set<string>();
    const allowedSet = new Set<string>();

    morbidityIds.forEach(id => {
        const rules = FOOD_RULES[id];
        if (rules) {
            rules.avoid.forEach(item => avoidSet.add(item));
            rules.allowed.forEach(item => allowedSet.add(item));
        }
    });

    // Converte para array
    const avoidList = Array.from(avoidSet);
    const allowedList = Array.from(allowedSet);

    if (avoidList.length === 0 && allowedList.length === 0) return null;

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
            {/* Coluna Negativa */}
            <Card className="border-red-200 bg-red-50/50 shadow-sm overflow-hidden">
                <CardHeader className="pb-3 border-b border-red-100 text-center">
                    <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2 text-red-700">
                        🚫 O que evitar
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <ul className="space-y-3 flex flex-col items-center">
                        {avoidList.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-red-900/80 text-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0 hidden sm:block" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Coluna Positiva */}
            <Card className="border-green-200 bg-green-50/50 shadow-sm overflow-hidden">
                <CardHeader className="pb-3 border-b border-green-100 text-center">
                    <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2 text-green-700">
                        ✅ O que preferir
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <ul className="space-y-3 flex flex-col items-center">
                        {allowedList.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-green-900/80 text-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0 hidden sm:block" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
