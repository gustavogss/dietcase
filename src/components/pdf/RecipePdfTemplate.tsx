import type { Recipe } from "@/types";

interface RecipePdfTemplateProps {
  recipe: Recipe;
}

export function RecipePdfTemplate({ recipe }: RecipePdfTemplateProps) {
  return (
    <article className="mx-auto max-w-[210mm] bg-white p-10 text-slate-800">
      <img
        src={recipe.imageUrl ?? "/logo.png"}
        alt={recipe.name}
        className="mb-8 h-64 w-full rounded-xl object-cover"
        onError={(event) => {
          event.currentTarget.src = "/logo.png";
        }}
      />
      <header className="border-b-2 border-orange-500 pb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
          DietCase · Receita Inteligente
        </p>
        <h1 className="mt-3 text-4xl font-bold">{recipe.name}</h1>
        <p className="mt-3 text-slate-600">{recipe.description}</p>
        <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-600">
          <span>{recipe.prepTime} minutos</span>
          <span>{recipe.servings} porções</span>
          <span>
            {recipe.yieldDescription ?? `Rende ${recipe.servings} porções`}
          </span>
          <span>Dificuldade: {recipe.difficulty}</span>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Ingredientes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={ingredient}>
              {recipe.ingredientAmounts?.[index]
                ? `${recipe.ingredientAmounts[index]} de ${ingredient}`
                : ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Modo de preparo</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
          {recipe.instructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ol>
      </section>

      {recipe.nutrition && (
        <section className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold">Informações nutricionais</h2>
          <p className="mt-3 text-slate-700">
            {recipe.nutrition.calories ?? "-"} kcal · proteína{" "}
            {recipe.nutrition.protein ?? "-"}g · carboidratos{" "}
            {recipe.nutrition.carbs ?? "-"}g · gorduras{" "}
            {recipe.nutrition.fat ?? "-"}g
          </p>
        </section>
      )}
    </article>
  );
}
