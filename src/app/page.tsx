import Link from 'next/link'
import { CheckCircle2, Zap, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center gap-8 animate-slide-up">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent-green flex items-center justify-center">
            <CheckCircle2 size={22} className="text-bg-primary" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight">MyTask Pro</span>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            Organize seu dia
            <br />
            <span className="text-accent-green">com clareza</span>
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">
            Gerencie tarefas por categoria, tempo e período. Simples, rápido e focado em produtividade.
          </p>
        </div>

        {/* Features */}
        <div className="w-full flex flex-col gap-2.5 text-sm">
          {[
            { icon: Zap, text: 'Tarefas com tempo estimado e categorias' },
            { icon: CheckCircle2, text: 'Filtros por dia, semana e mês' },
            { icon: Shield, text: 'Dados seguros com autenticação JWT' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-bg-card border border-border rounded-xl px-4 py-3">
              <Icon size={16} className="text-accent-green shrink-0" />
              <span className="text-text-secondary">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/auth/register"
            className="w-full flex items-center justify-center py-4 bg-accent-green text-bg-primary font-semibold rounded-xl hover:bg-accent-green/90 active:scale-[0.98] transition-all duration-200"
          >
            Começar agora — é grátis
          </Link>
          <Link
            href="/auth/login"
            className="w-full flex items-center justify-center py-4 bg-bg-card border border-border text-text-primary font-medium rounded-xl hover:bg-bg-hover transition-all duration-200"
          >
            Já tenho uma conta
          </Link>
        </div>
      </div>
    </main>
  )
}
