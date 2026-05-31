import { EbookCollection } from '@/data/ebooks';

interface EbookPdfTemplateProps {
    collection: EbookCollection;
    userName?: string;
}

export function EbookPdfTemplate({ collection, userName }: EbookPdfTemplateProps) {
    const date = new Date().toLocaleDateString('pt-BR');

    return (
        <div className="max-w-[210mm] mx-auto p-8 bg-white text-slate-800">
            {/* Cover Page */}
            <div className="min-h-[297mm] flex flex-col justify-between items-center text-center p-12 border-4 border-slate-100 mb-8 break-after-page">
                <div className="flex-1 flex flex-col justify-center items-center gap-8">
                    <img src="/logo.png" alt="DietCase" className="w-32 h-32 rounded-full mb-8 shadow-sm" />

                    <div className="space-y-4">
                        <span className="text-slate-500 uppercase tracking-widest text-sm font-semibold">
                            Guia Nutricional Premium
                        </span>
                        <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                            {collection.title}
                        </h1>
                        <div className="inline-block px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-medium text-sm">
                            {collection.recipeCount} Receitas Exclusivas
                        </div>
                    </div>
                </div>

                <div className="w-full border-t pt-8 flex justify-between text-sm text-slate-400">
                    <span>DietCase Nutrition</span>
                    <span>Gerado em {date}</span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-12">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 border-b pb-4 mb-6">Introdução</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {collection.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        Esta coleção foi elaborada para atender às necessidades específicas da categoria
                        <strong> {collection.category}</strong>. As receitas abaixo priorizam a qualidade nutricional,
                        sabor e facilidade de preparo, seguindo diretrizes clínicas atualizadas.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-slate-900 border-b pb-4 mb-8">Receitas & Preparações</h2>

                    <div className="grid gap-8">
                        {collection.recipes.map((recipe, index) => (
                            <div key={index} className="bg-slate-50 p-6 rounded-xl break-inside-avoid shadow-sm border border-slate-100">
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-sm mt-1">
                                            {recipe.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 ml-12">
                                    <div className="bg-white p-4 rounded-lg border border-slate-100">
                                        <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                                            <span className="w-1 h-4 bg-orange-400 rounded-full"></span>
                                            Ingredientes
                                        </h4>
                                        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside marker:text-orange-300">
                                            {recipe.ingredients.map((ing, i) => (
                                                <li key={i}>{ing}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-slate-100">
                                            <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                                                <span className="w-1 h-4 bg-slate-400 rounded-full"></span>
                                                Modo de Preparo
                                            </h4>
                                            <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside marker:font-bold marker:text-slate-400">
                                                {recipe.instructions.map((step, i) => (
                                                    <li key={i} className="pl-1">
                                                        <span className="">{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>

                                        {recipe.consumption_guide && recipe.consumption_guide.length > 0 && (
                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                <h4 className="font-semibold text-blue-700 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                                    <span className="text-lg">💡</span>
                                                    Como Consumir
                                                </h4>
                                                <ul className="text-sm text-blue-600 space-y-1 list-none">
                                                    {recipe.consumption_guide.map((tip, i) => (
                                                        <li key={i} className="flex gap-2">
                                                            <span>•</span>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t text-center text-sm text-slate-400">
                <p>© 2026 DietCase - Todos os direitos reservados.</p>
                <p className="text-xs mt-2">Este material é para uso pessoal e não substitui orientação médica profissional.</p>
            </div>
        </div>
    );
}
