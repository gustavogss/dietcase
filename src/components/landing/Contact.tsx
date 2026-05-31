import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useScrollTriggerReveal } from '@/hooks/useScrollTriggerReveal';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome (mín. 2 caracteres).')
    .max(100, 'Seu nome deve ter no máximo 100 caracteres.'),
  email: z
    .string()
    .trim()
    .email('Informe um email válido.')
    .max(255, 'Seu email deve ter no máximo 255 caracteres.'),
  message: z
    .string()
    .trim()
    .min(10, 'Sua mensagem deve ter no mínimo 10 caracteres.')
    .max(1000, 'Sua mensagem deve ter no máximo 1000 caracteres.'),
});

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollTriggerReveal(sectionRef);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path?.[0] as keyof typeof formData | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error('Revise os campos do formulário.', {
        description: 'Corrija as informações destacadas e tente novamente.',
      });
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      // Mock sending delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Mensagem enviada com sucesso!', {
        description: 'Em breve retornaremos seu contato (Simulação).',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      toast.error('Erro ao enviar mensagem', {
        description: 'Tente novamente mais tarde.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-muted/30">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div data-reveal className="text-center mb-16 space-y-2">
          <h2 className="text-foreground">Entre em Contato</h2>
          <p className="text-muted-foreground font-medium">Estamos aqui para ajudar</p>
        </div>

        <div data-stagger className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <Link to="/" className="flex items-center gap-4 mb-6 hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="DietCase" className="h-12 w-12 rounded-full" />
                <h3 className="text-2xl font-bold">DietCase</h3>
              </Link>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed break-words">
                Soluções inteligentes de nutrição para pessoas com necessidades especiais.
                Cuidamos da sua alimentação com tecnologia e conhecimento especializado.
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">Email</p>
                    <p className="text-muted-foreground font-medium">contato@dietcase.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">Telefone</p>
                    <p className="text-muted-foreground font-medium">(83) 9999-9999</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">Endereço</p>
                    <p className="text-muted-foreground font-medium">João Pessoa, PB - Brasil</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="border-none shadow-2xl overflow-hidden">
            <CardContent className="p-10">
              <p className="mb-8 text-muted-foreground font-medium">
                Preencha o formulário com os seus melhores dados
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Seu nome"
                    className="h-14 px-6 text-lg bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    required
                    maxLength={100}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive font-medium">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Seu email"
                    className="h-14 px-6 text-lg bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    required
                    maxLength={255}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive font-medium">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Sua mensagem"
                    rows={6}
                    className="px-6 py-4 text-lg bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    required
                    maxLength={1000}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive font-medium">{errors.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full py-8 text-xl font-bold shadow-xl shadow-primary/20 text-white hover:bg-accent hover:text-white hover:shadow-accent/30 transition-colors" size="lg" disabled={isSending}>
                  {isSending ? 'Enviando...' : 'Enviar mensagem'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}