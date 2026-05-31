 export function Footer() {
   return (
      <footer className="section-padding bg-muted border-t mt-auto">
        <div className="w-full max-w-6xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo.png" alt="DietCase" className="h-8 w-8 rounded-full" />
            <span className="text-xl font-bold">DietCase</span>
          </div>
          <p className="text-muted-foreground font-medium">
            © 2026 DietCase. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-md mx-auto">
            Cuidando da sua alimentação com tecnologia e inteligência.
          </p>
        </div>
      </footer>
   );
 }