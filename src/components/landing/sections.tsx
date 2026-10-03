import {
  AlertTriangle,
  BadgeCheck,
  Braces,
  CreditCard,
  Database,
  FileText,
  Gauge,
  Lock,
  MousePointerClick,
  Plus,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function ProblemSection() {
  const items = [
    { icon: MousePointerClick, text: "Funciona no seu computador, mas quebra para o usuário." },
    { icon: Lock, text: "Uma chave exposta pode colocar todo o projeto em risco." },
    { icon: CreditCard, text: "Um webhook mal configurado pode liberar planos sem pagamento." },
  ];
  return (
    <section className="container-page py-20 sm:py-28">
      <SectionTitle title="Criar ficou mais rápido. Verificar ainda não." />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.text} className="surface-card p-6">
            <i.icon className="size-5 text-warning" aria-hidden />
            <p className="mt-4 text-sm text-muted-foreground">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      icon: Plus,
      title: "Adicione seu projeto",
      text: "Informe a URL pública e confirme que você tem autorização para analisá-la.",
    },
    {
      icon: ShieldCheck,
      title: "Receba o diagnóstico",
      text: "Verificações passivas geram um score, um veredito honesto e achados priorizados.",
    },
    {
      icon: RefreshCw,
      title: "Corrija e escaneie novamente",
      text: "Copie a correção pronta para seu construtor e verifique o resultado.",
    },
  ];
  return (
    <section id="como-funciona" className="border-y border-border-subtle bg-sidebar py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle
          eyebrow="Como funciona"
          title="Três passos até um lançamento mais seguro"
          description="Conectar GitHub e Supabase é opcional — quando autorizado, a análise fica mais profunda."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, idx) => (
            <li key={s.title} className="surface-card p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-elevated">
                  <s.icon className="size-4 text-primary" aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CategoriesSection() {
  const cards = [
    {
      icon: Lock,
      title: "Segurança e segredos",
      text: "Procuramos chaves expostas e configurações de risco no que é público.",
      check: "Ex.: chave de serviço visível no front-end",
    },
    {
      icon: Database,
      title: "Autenticação e banco de dados",
      text: "Conferimos proteção de rotas e regras de acesso às tabelas.",
      check: "Ex.: tabela exposta sem RLS ativa",
    },
    {
      icon: CreditCard,
      title: "Pagamentos e planos",
      text: "Verificamos se o acesso pago depende de confirmação real do provedor.",
      check: "Ex.: webhook sem verificação de assinatura",
    },
    {
      icon: Braces,
      title: "Fluxos e funcionalidades",
      text: "Mapeamos páginas, links e botões que não levam a lugar nenhum.",
      check: "Ex.: link interno quebrado no cadastro",
    },
    {
      icon: Gauge,
      title: "Mobile e desempenho",
      text: "Avaliamos a experiência em telas pequenas e o tempo de resposta.",
      check: "Ex.: viewport mobile mal configurada",
    },
    {
      icon: FileText,
      title: "Legal, analytics e monitoramento",
      text: "Checamos páginas obrigatórias e se erros em produção são observados.",
      check: "Ex.: política de privacidade ausente",
    },
  ];
  return (
    <section id="analises" className="container-page py-20 sm:py-28">
      <SectionTitle
        eyebrow="O que analisamos"
        title="Seis frentes que decidem um lançamento"
        description="Cada verificação vira um achado com evidência segura e passo a passo de correção."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.title}
            className="surface-card group p-6 transition-all duration-300 hover:border-primary/40 hover:bg-elevated"
          >
            <c.icon className="size-5 text-primary" aria-hidden />
            <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            <p className="mt-4 font-mono text-[11px] text-muted-foreground/80">{c.check}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ReportPreviewSection() {
  const categories = [
    { label: "Segurança e segredos", score: 58 },
    { label: "Autenticação e banco", score: 74 },
    { label: "Pagamentos e planos", score: 63 },
    { label: "Fluxos e funcionalidades", score: 81 },
    { label: "Mobile e desempenho", score: 88 },
    { label: "Legal e observabilidade", score: 70 },
  ];
  const severities = [
    { label: "Críticos", count: 2, tone: "text-critical" },
    { label: "Altos", count: 3, tone: "text-warning" },
    { label: "Médios", count: 5, tone: "text-info" },
  ];
  return (
    <section id="relatorio" className="border-y border-border-subtle bg-sidebar py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle
          eyebrow="Relatório"
          title="Um veredito honesto, não um selo de aprovação"
          description="Dados de exemplo apenas para ilustrar o formato do relatório."
        />
        <div className="surface-card mt-12 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle p-6">
            <div>
              <p className="font-mono text-xs text-muted-foreground">https://exemplo-saas.com</p>
              <h3 className="mt-1 text-lg font-semibold">Projeto de demonstração</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-mono text-3xl font-semibold">68</p>
                <p className="text-xs text-muted-foreground">Score de prontidão</p>
              </div>
              <span className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs text-warning">
                Risco alto
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-3">
              {categories.map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{c.label}</span>
                    <span className="font-mono">{c.score}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-elevated">
                    <div
                      className={cn(
                        "h-1.5 rounded-full",
                        c.score < 65 ? "bg-critical" : c.score < 85 ? "bg-warning" : "bg-success",
                      )}
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {severities.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-lg border border-border-subtle bg-elevated px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className={cn("size-4", s.tone)} aria-hidden />
                    {s.label}
                  </span>
                  <span className="font-mono text-sm">{s.count}</span>
                </div>
              ))}
              <Button asChild variant="hero" className="w-full">
                <a href="#analisar">Explorar relatório de exemplo</a>
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Dados de exemplo — projeto de demonstração.
        </p>
      </div>
    </section>
  );
}

export function PlatformsSection() {
  const items = ["Lovable", "Bolt", "Base44", "Replit", "Cursor", "GitHub", "Supabase"];
  return (
    <section className="container-page py-16">
      <p className="text-center text-sm text-muted-foreground">
        Feito para projetos criados e hospedados com
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {items.map((i) => (
          <li
            key={i}
            className="rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground"
          >
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PricingSection() {
  const plans = [
    {
      name: "Grátis",
      price: "R$0",
      note: "para começar",
      features: [
        "Análise passiva da URL pública",
        "HTTPS, redirecionamentos e cabeçalhos",
        "Relatório salvo na sua conta",
        "Reanálise e histórico",
      ],
      cta: "Criar conta grátis",
      highlight: false,
    },
    {
      name: "Relatório de lançamento",
      price: "R$147",
      note: "pagamento único",
      features: [
        "1 relatório completo",
        "Correções detalhadas",
        "Prompts adaptados ao construtor",
        "Reanálise durante 7 dias",
      ],
      cta: "Analisar lançamento",
      highlight: false,
    },
    {
      name: "Guard",
      price: "R$79",
      note: "por mês",
      features: [
        "3 projetos",
        "Relatórios completos",
        "Monitoramento semanal",
        "Alertas de novos riscos",
        "Histórico de análises",
      ],
      cta: "Assinar Guard",
      highlight: true,
    },
    {
      name: "Agência",
      price: "R$297",
      note: "por mês",
      features: [
        "10 projetos",
        "Membros da equipe",
        "Relatórios compartilháveis",
        "Monitoramento",
        "Gestão centralizada",
      ],
      cta: "Escolher Agência",
      highlight: false,
    },
  ];

  return (
    <section id="precos" className="container-page py-20 sm:py-28">
      <SectionTitle
        eyebrow="Preços"
        title="Pague pelo que você precisa antes de lançar"
        description="Hoje está disponível a análise gratuita da URL pública. Os planos pagos estão em preparação e ainda não podem ser contratados."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "surface-card relative flex flex-col p-6",
              p.highlight && "border-primary/50 shadow-[var(--shadow-glow)]",
            )}
          >
            {p.highlight ? (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground">
                Em breve
              </span>
            ) : null}
            <h3 className="text-sm font-semibold">{p.name}</h3>
            <p className="mt-4 font-mono text-3xl font-semibold">{p.price}</p>
            <p className="text-xs text-muted-foreground">{p.note}</p>
            <ul className="mt-6 flex-1 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            {p.price === "R$0" ? (
              <Button asChild variant="hero" className="mt-6">
                <a href="/criar-conta">{p.cta}</a>
              </Button>
            ) : (
              <>
                <Button variant="outline" className="mt-6" disabled>
                  Em breve
                </Button>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Plano ainda não disponível para contratação.
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  const faqs = [
    {
      q: "A Lançapp altera meu projeto?",
      a: "Não. As verificações são passivas e somente de leitura. Nada é publicado, alterado ou removido no seu projeto.",
    },
    {
      q: "Preciso conectar o GitHub?",
      a: "Não. A análise da URL pública funciona sozinha. A conexão com GitHub e Supabase ainda está em desenvolvimento; até lá, esses itens aparecem como “Não foi possível verificar”.",
    },
    {
      q: "A análise garante que meu SaaS está seguro?",
      a: "Não. A Lançapp reduz riscos conhecidos, mas nenhuma análise automatizada garante segurança absoluta.",
    },
    {
      q: "Posso analisar um projeto feito fora do Lovable?",
      a: "Sim. Funciona com qualquer aplicação web pública, independentemente da ferramenta usada para criá-la.",
    },
    {
      q: "O que acontece com o código analisado?",
      a: "Hoje não analisamos código. Da URL pública guardamos apenas status, cabeçalhos e o resumo dos achados — o conteúdo das páginas não é armazenado.",
    },
    {
      q: "Posso cancelar o plano quando quiser?",
      a: "Os planos pagos ainda não estão disponíveis. Quando forem lançados, o cancelamento será feito pelo próprio painel.",
    },
    {
      q: "A Lançapp corrige os problemas automaticamente?",
      a: "Ainda não. Hoje o relatório traz orientações de correção. A correção via GitHub está em desenvolvimento e, quando existir, só funcionará com sua permissão explícita, em um branch separado com pull request para revisão.",
    },
  ];

  return (
    <section id="faq" className="border-y border-border-subtle bg-sidebar py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="container-page py-24">
      <div className="surface-card relative overflow-hidden px-6 py-16 text-center">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">
            Não descubra os problemas depois do primeiro cliente.
          </h2>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <a href="#analisar">Analisar meu SaaS</a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">Antes de lançar, Lançapp.</p>
        </div>
      </div>
    </section>
  );
}
