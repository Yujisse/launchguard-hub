# Launchpad Pro

Build a production-ready SaaS web application called Lançapp.

1. PRODUCT VISION

Lançapp is a launch-readiness platform for SaaS products and applications built with AI-assisted tools such as Lovable, Bolt, Base44, Replit, Cursor and similar platforms.

Users submit a public application URL and can optionally connect an authorized GitHub repository and Supabase project.

Lançapp analyzes whether the application is ready to be launched by checking:

Security configuration

Accidentally exposed secrets

Authentication protection

Database and Row Level Security configuration

Payment and webhook implementation

Subscription plan restrictions

Broken links and buttons

Main user flows

Mobile responsiveness

Performance

Legal and compliance pages

Analytics and error monitoring

General launch readiness

The product must not claim that an application is “100% secure.”

Use honest verdicts such as:

Não está pronto

Risco alto

Quase pronto

Pronto para testes finais

Verificações essenciais aprovadas

The platform performs safe, passive and authorized checks only. Never exploit vulnerabilities or scan third-party systems without authorization.

2. BRAND

Product name: Lançapp

Domain-friendly spelling: lancapp

Tagline: Antes de lançar, Lançapp.

Supporting line: Seu SaaS pronto para ir ao ar.

Brand personality:

Precise

Trustworthy

Modern

Technical without being difficult

Direct

Calm

Never alarmist

Built for solo founders, vibe coders and small agencies

Create a simple, memorable logo.

Logo concept:

Lowercase wordmark “lançapp”

Custom letter “L” or icon combining an open code bracket, a scan line and a checkmark

Avoid generic rocket icons

The icon must work alone as a favicon

Use a simple geometric SVG

The logo must remain recognizable at 24×24 pixels

Do not use fake awards, fabricated testimonials, fake client logos or fake user counts.

3. LANGUAGE

All visible interface copy must be written in natural Brazilian Portuguese.

Code, database columns, technical comments and internal identifiers can be written in English.

Use concise language. Avoid excessive technical jargon.

When a technical term is necessary, explain it in plain language.

4. TECHNOLOGY

Use the standard Lovable stack:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Supabase Authentication

Supabase PostgreSQL

Supabase Storage if necessary

Supabase Edge Functions

Framer Motion for interface animations

Recharts for charts

Lucide React for interface icons

Requirements:

Strict TypeScript

Reusable components

Clean folder organization

No hardcoded secrets

No production credentials in frontend code

No important authorization decisions performed only on the client

Real loading, empty, success and error states

Responsive from 320px to large desktop screens

Accessible keyboard navigation

Visible focus states

Semantic HTML

WCAG AA color contrast

Respect prefers-reduced-motion

If a backend service is not configured, show a clear setup state. Never pretend that a scan, integration or payment succeeded.

Demo information must always be visibly labeled as “Projeto de demonstração.”

5. VISUAL DIRECTION

Create an original interface inspired by the cleanliness and structure of a premium dark dashboard, without copying any existing product or brand.

The visual direction must include:

Near-black background

Fixed desktop sidebar

Thin, subtle borders

Spacious content areas

Compact navigation

Clear typography hierarchy

Few colors

Restrained glow

Clean data cards

Tabs with animated active indicator

Premium developer-tool feeling

No visual clutter

No large stock photos

No excessive gradients

No glassmorphism everywhere

Default dark theme palette:

Main background: #06080B

Sidebar background: #080B0F

Card background: #0C1117

Elevated surface: #111821

Main border: #202A35

Subtle border: rgba(255,255,255,0.07)

Primary text: #F4F7FA

Secondary text: #8D99A8

Primary accent: #B7FF3C

Secondary accent: #45E6C0

Information: #60A5FA

Warning: #F4C95D

Critical: #FF5F75

Success: #42D98B

Use the lime accent strategically for:

Main CTAs

Active navigation

Score highlights

Cursor effects

Successful checks

Do not fill the entire interface with lime.

Typography:

Headings: Space Grotesk

Body and UI: Inter

Numbers and code snippets: JetBrains Mono

Style details:

Card radius: 14px

Button radius: 10px

Inputs: 48–52px height

Thin 1px borders

Soft shadows only on elevated elements

Maximum content width on public pages: 1200px

Application pages should use the available width intelligently

Use an 8px spacing system

Support a complete light theme as well, but use dark mode by default.

6. CUSTOM CURSOR AND MOTION

Create a memorable but lightweight cursor experience on desktop.

Custom cursor:

Replace the normal arrow on non-form areas with a small scan-reticle cursor

Use a bright central dot and a thin outer ring

The outer ring should follow the pointer with slight delayed movement

When hovering over a button or link, the ring expands smoothly

When clicking, it compresses briefly

On draggable elements, indicate movement

Preserve the standard text cursor inside inputs and textareas

Disable the custom cursor on touch devices

Disable it when prefers-reduced-motion is enabled

Cursor trail:

Add a thin luminous line following the most recent cursor positions

Use an SVG path or optimized canvas

The line must gradually fade behind the cursor

Maximum opacity must remain low

It should feel like a scanner trace, not a particle explosion

Use requestAnimationFrame

Pause the effect when the tab is inactive

Ensure it does not block clicks

Keep performance smooth

Other animations:

Animated underline moving between tabs

Soft page transitions

Cards entering with small vertical movement and opacity

Number counters for scores

A horizontal scan beam during an active scan

Score ring drawing animation when results load

Sidebar indicator sliding between menu items

Button hover with a subtle light sweep

Small animated grid in the landing-page hero

Progress timeline animation during a scan

Animations must support usability and never make the product feel like a gaming website.

7. INFORMATION ARCHITECTURE

Create the following public routes:

/

/como-funciona

/precos

/relatorio-exemplo

/entrar

/criar-conta

/recuperar-senha

/termos

/privacidade

/uso-aceitavel

Create the following authenticated routes:

/app

/app/projetos

/app/projetos/novo

/app/projetos/:projectId

/app/projetos/:projectId/scan

/app/projetos/:projectId/relatorio/:scanId

/app/projetos/:projectId/correcoes

/app/projetos/:projectId/monitoramento

/app/integracoes

/app/notificacoes

/app/plano

/app/perfil

/app/configuracoes

Create protected administration routes:

/admin

/admin/usuarios

/admin/projetos

/admin/scans

/admin/planos

/admin/auditoria

Users without the correct server-validated role must never access admin pages.

8. LANDING PAGE

Create a premium landing page with the following structure.

Navigation

Left:

Lançapp logo

Center:

Como funciona

O que analisamos

Relatório

Preços

FAQ

Right:

Entrar

Button: “Analisar meu SaaS”

Use a sticky navigation with a subtle background blur after scrolling.

Hero

Eyebrow:

“Pré-lançamento para apps criados com IA”

Main headline:

“Seu SaaS parece pronto.
A Lançapp prova se está.”

Highlight “prova se está” with the lime accent.

Description:

“Encontre falhas de segurança, pagamentos, banco de dados e experiência antes que seus usuários encontrem.”

Add a prominent URL scanner:

URL input

Placeholder: https://seu-saas.com

Main CTA: “Analisar gratuitamente”

Validate the URL before submission

Accept only valid HTTP or HTTPS URLs

Display useful errors

Include Turnstile support for abuse prevention

Supporting text:

“Verificação passiva • Não alteramos seu projeto • Resultado inicial em minutos”

Secondary CTA:

“Ver relatório de exemplo”

Hero visual:

Create an original animated application-analysis card showing:

Project URL

Animated scanning beam

Category progress

A score changing from -- to 82

A few findings entering the list

Label the visual as “Demonstração”

Do not use screenshots from other brands.

Problem section

Headline:

“Criar ficou mais rápido. Verificar ainda não.”

Show three concise problems:

“Funciona no seu computador, mas quebra para o usuário.”

“Uma chave exposta pode colocar todo o projeto em risco.”

“Um webhook mal configurado pode liberar planos sem pagamento.”

How it works

Use three steps:

“Adicione seu projeto”

“Receba o diagnóstico”

“Corrija e escaneie novamente”

Explain that GitHub and Supabase connections are optional but allow deeper analysis.

Analysis categories

Create six cards:

Segurança e segredos

Autenticação e banco de dados

Pagamentos e planos

Fluxos e funcionalidades

Mobile e desempenho

Legal, analytics e monitoramento

Each card should have:

Lucide icon

Short explanation

Example check

Subtle hover animation

Example report

Show a realistic report preview with:

Overall score

Launch verdict

Category scores

2 critical findings

3 high findings

5 medium findings

CTA: “Explorar relatório de exemplo”

Clearly identify this as sample data.

Supported platforms

Use clean text badges for:

Lovable

Bolt

Base44

Replit

Cursor

GitHub

Supabase

Do not use unofficial brand logos if assets are unavailable.

Pricing

Create four pricing options.

Grátis

1 projeto

1 análise básica por mês

Verificação da URL pública

Visualização limitada de achados

R$0

CTA: “Começar grátis”

Relatório de lançamento

Pagamento único

1 relatório completo

Correções detalhadas

Prompts adaptados ao construtor

Reanálise durante 7 days

R$147

CTA: “Analisar lançamento”

Guard

3 projetos

Relatórios completos

Monitoramento semanal

Alertas de novos riscos

Histórico de análises

R$79/mês

Mark as “Mais escolhido.”

Agência

10 projetos

Membros da equipe

Relatórios compartilháveis

Monitoramento

Gestão centralizada

R$297/mês

CTA: “Escolher Agência”

Do not imply guaranteed income, guaranteed security or guaranteed approval.

FAQ

Include at least these questions:

A Lançapp altera meu projeto?

Preciso conectar o GitHub?

A análise garante que meu SaaS está seguro?

Posso analisar um projeto feito fora do Lovable?

O que acontece com o código analisado?

Posso cancelar o plano quando quiser?

A Lançapp corrige os problemas automaticamente?

Explain that automatic GitHub correction always requires explicit permission, creates a separate branch and opens a pull request. It never pushes directly to the production branch.

Final CTA

Headline:

“Não descubra os problemas depois do primeiro cliente.”

Button:

“Analisar meu SaaS”

Supporting line:

“Antes de lançar, Lançapp.”

Footer

Include:

Product links

Company links

Legal links

Contact email placeholder

Current year

Status link placeholder

Theme selector

Social links only if configured

9. AUTHENTICATION AND ONBOARDING

Use Supabase Auth.

Implement:

Email and password signup

Email verification

Login

Logout

Password recovery

Password update

Session persistence

Protected routes

Proper auth errors

Optional GitHub login if configured

Onboarding steps:

User name and role

What they used to create the app

Public project URL

Optional GitHub connection

Optional Supabase connection

First scan

Builder choices:

Lovable

Bolt

Base44

Replit

Cursor

Outro

Allow onboarding to be skipped and completed later.

10. APPLICATION LAYOUT

Desktop:

Fixed sidebar approximately 236px wide

Logo at the top

Grouped navigation

User account card at the bottom

Top bar with breadcrumb, search, notification button, theme button and profile avatar

Main content with generous spacing

Sidebar groups:

Visão geral

Dashboard

Projetos

Novo scan

Análise

Relatórios

Correções

Monitoramento

Integrações

GitHub

Supabase

Webhooks

Conta

Plano

Perfil

Configurações

On mobile:

Replace the fixed sidebar with an accessible navigation drawer

Keep important actions reachable

Convert wide tables into stacked cards

Keep report filters usable

Never rely only on hover

11. DASHBOARD

Create a useful authenticated dashboard.

Header:

“Bom te ver, {firstName}.”

Subheading:

“Veja o que precisa de atenção antes do próximo lançamento.”

Summary cards:

Projetos ativos

Último score

Achados críticos

Próximo monitoramento

Main sections:

Project list with score, verdict and last scan

Recent critical findings

Score evolution chart

Recent activity

CTA for a new scan

Empty state:

“Seu primeiro diagnóstico começa com uma URL.”

CTA:

“Adicionar projeto”

12. PROJECT CREATION

The new project flow must request:

Project name

Public URL

Builder used

Production or staging environment

Optional GitHub repository

Optional Supabase project

Confirmation that the user owns or is authorized to analyze the target

Require an authorization checkbox:

“Confirmo que sou proprietário deste projeto ou tenho autorização para analisá-lo.”

The scan cannot start without this confirmation.

13. SCAN EXPERIENCE

Create a real scan status page with a vertical progress timeline.

Stages:

Validando endereço

Verificando conexão e HTTPS

Analisando cabeçalhos

Mapeando páginas e links

Verificando experiência mobile

Analisando repositório autorizado

Verificando banco de dados autorizado

Calculando resultado

Preparando correções

Only show GitHub or Supabase stages when those integrations are connected.

The progress shown must reflect the real job state saved in the database. Do not use a fake timer to report completion.

Display:

Current step

Overall progress

Elapsed time

Safe activity log

Cancel option when supported

Error recovery

Retry button

A failed scan must preserve completed checks and explain what failed.

14. SCORING SYSTEM

Use a transparent 0–100 readiness score.

Category weights:

Segurança e segredos: 25

Autenticação e banco de dados: 20

Pagamentos e planos: 20

Fluxos e funcionalidades: 15

Mobile e desempenho: 10

Legal e observabilidade: 10

Verdicts:

0–49: “Não está pronto”

50–69: “Risco alto”

70–84: “Quase pronto”

85–94: “Pronto para testes finais”

95–100: “Verificações essenciais aprovadas”

A score of 100 must never be described as proof of complete security.

Use deterministic deductions based on check severity.

Severity levels:

Crítico

Alto

Médio

Baixo

Informação

Não foi possível verificar

Do not interpret missing access as a passed check. Use “Não foi possível verificar.”

15. REPORT PAGE

The report header must contain:

Project name and URL

Scan date

Overall score

Verdict

Comparison with previous scan

“Escanear novamente” button

“Compartilhar relatório” button

PDF export placeholder or implementation if supported

Create category cards with:

Category score

Status

Number of findings

Progress bar

Create finding filters:

Severity

Category

Status

Search

Only new findings

Only unresolved findings

Each finding card must show:

Severity

Clear title

Short explanation

Evidence with sensitive values redacted

Why it matters

What can happen

Exact remediation steps

Builder-specific correction prompt

Affected file or URL when known

Detection confidence

“Copiar correção”

“Marcar como resolvido”

“Ignorar com justificativa”

“Ver detalhes”

Finding statuses:

Aberto

Em correção

Resolvido

Ignorado

Reapareceu

Use a stable fingerprint to prevent the same finding from being duplicated after every scan.

16. ASSISTED CORRECTIONS

Create a “Correções” workspace.

For each finding, let the user select their builder:

Lovable

Bolt

Base44

Replit

Cursor

Código manual

Generate a structured correction prompt containing:

Context

Problem

Affected component

Security requirements

Requested change

What must not change

Validation steps

Acceptance criteria

Correction modes:

Copy prompt

Always available.

Create GitHub correction

Only available when the GitHub integration is correctly configured.

Safe GitHub correction workflow:

User selects findings

Lançapp prepares a proposed patch

Show an understandable diff preview

User explicitly approves it

Create a new branch

Commit changes to that branch

Open a pull request

Never merge automatically

Never push directly to the default branch

Record the event in the audit log

If patch generation is not safely available, keep the button disabled and explain the missing configuration. Never simulate that a pull request was created.

17. SAFE URL ANALYSIS

Implement passive URL checks through a server-side Edge Function.

Possible checks:

URL availability

HTTP status

HTTPS usage

Redirect chain

Certificate connection status

Security headers

Content Security Policy

Strict Transport Security

X-Content-Type-Options

Referrer-Policy

Frame protection

Cookie security flags when visible

Mixed content references

Broken internal links

Missing error page

Missing terms or privacy pages

Basic form behavior

Mobile viewport configuration

Basic metadata

robots.txt

sitemap.xml

Obvious exposed error messages

Optional PageSpeed integration when an API key is configured

Critical SSRF protection:

Permit only HTTP and HTTPS

Reject localhost

Reject loopback addresses

Reject private network ranges

Reject link-local addresses

Reject cloud metadata endpoints

Resolve and validate DNS before requests

Validate redirect destinations again

Limit redirects

Limit response size

Enforce strict timeouts

Prevent DNS rebinding

Rate-limit scans by user and IP

Log abuse attempts

Use Turnstile for anonymous requests

Never perform destructive tests, brute force, credential attacks or vulnerability exploitation.

18. GITHUB ANALYSIS

Use an authorized GitHub App or OAuth integration with the least privilege possible.

Start with read-only repository access.

Checks may include:

Accidentally committed secrets

Public environment variables containing private credentials

Supabase service role key in frontend files

Unsafe wildcard CORS

Missing server-side authorization

Authentication performed only in the client

Unprotected application routes

Webhooks without signature verification

Payment status trusted directly from the frontend

Debug configuration enabled in production

Source maps or logs exposing sensitive details

Dependency risk metadata

Missing error monitoring

Unsafe redirects

RLS migration clues

Hardcoded admin roles

Plan access controlled only by hidden UI elements

Requirements:

Redact possible secret values

Never display a complete secret

Never store full repository contents longer than necessary

Prefer storing hashes, paths and finding metadata

Tokens must never be sent to the browser

Tokens must be encrypted or stored through a secure secrets mechanism

Allow users to revoke the integration

Record connection and revocation events

19. SUPABASE ANALYSIS

Only analyze a Supabase project after explicit authorization.

Possible checks:

RLS enabled on exposed tables

Presence of appropriate policies

Overly permissive policies

Public storage bucket configuration

Service role key exposure

Auth redirect configuration

User ownership columns

Admin role protection

Sensitive operations inside secure server functions

Tables without expected access restrictions

Never expose Supabase management tokens in frontend code.

Use a server-side function for all privileged requests.

Do not mark RLS as safe simply because the frontend hides a feature.

20. PAYMENTS

Create a provider-agnostic billing architecture.

Use Stripe test mode if a supported Lovable payment integration is available. Keep the architecture ready for a future Mercado Pago adapter.

Implement:

Plans table

Checkout session creation through an Edge Function

Customer portal

Subscription status

One-time report purchase

Monthly subscriptions

Payment success and failure screens

Webhook handling

Idempotency

Billing history

Upgrade and downgrade

Cancellation

Usage limits

Important security rules:

Never trust a successful redirect as payment confirmation

Update access only after a verified provider webhook

Verify webhook signatures

Store provider IDs, not sensitive card information

Do not process card details directly

Enforce plan limits on the server

Use BRL values:

Relatório: R$147 one time

Guard: R$79/month

Agência: R$297/month

If payment credentials are not configured, show a clear test/setup state instead of a fake checkout.

21. DATABASE MODEL

Create Supabase migrations for these main tables:

profiles

id

user_id

full_name

avatar_url

user_role

onboarding_completed

created_at

updated_at

projects

id

owner_id

name

public_url

builder

environment

status

latest_score

latest_verdict

last_scan_at

created_at

updated_at

project_members

id

project_id

user_id

role

invited_at

accepted_at

integrations

id

project_id

provider

external_account_id

connection_status

permissions

secret_reference

connected_at

revoked_at

Never store raw access tokens in a normal client-readable column.

scans

id

project_id

requested_by

scan_type

status

current_stage

progress

overall_score

verdict

started_at

completed_at

failure_message

created_at

scan_category_scores

id

scan_id

category

score

weight

finding_count

findings

id

project_id

scan_id

fingerprint

check_code

category

severity

title

summary

safe_evidence

impact

remediation

confidence

affected_resource

status

first_seen_at

last_seen_at

resolved_at

correction_prompts

id

finding_id

builder

prompt_content

version

created_at

monitoring_checks

id

project_id

status

response_time

status_code

checked_at

notifications

id

user_id

type

title

body

read_at

created_at

plans

id

code

name

price_brl

billing_interval

project_limit

scan_limit

features

active

subscriptions

id

user_id

provider

provider_customer_id

provider_subscription_id

plan_id

status

current_period_end

created_at

updated_at

usage_records

id

user_id

project_id

resource_type

quantity

period_key

created_at

scan_events

id

scan_id

stage

safe_message

event_type

created_at

audit_logs

id

actor_id

project_id

action

target_type

target_id

safe_metadata

created_at

Add appropriate indexes, unique constraints, foreign keys and cascade behavior.

22. ROW LEVEL SECURITY

Enable RLS on every user-related table.

Policies must ensure:

Users can view and update only their own profile

Project owners can access their projects

Project members can access only projects to which they belong

Members receive permissions according to their project role

Users can see only scans and findings from authorized projects

Notifications belong only to their recipient

Billing information belongs only to the account owner

Audit logs cannot be casually edited

Admin access is validated using a secure server-side role

No user can give themselves an admin role

Service-role operations run only inside trusted server functions

Do not use frontend checks as the only authorization layer.

23. MONITORING

For Guard and Agency plans, create monitoring support for:

Availability

HTTP status

Response time

Certificate expiration warning

Important security header changes

Critical finding recurrence

Monitoring page:

Current status

Last checks

Response-time chart

Incident timeline

Notification preferences

Monitoring frequency

Pause/resume control

Create notifications for:

Scan finished

New critical finding

Critical finding reappeared

Application unavailable

Certificate warning

Payment failed

Subscription changed

24. EMAILS

Prepare transactional email templates for:

Confirm email

Recover password

Scan completed

Critical finding detected

Weekly monitoring summary

Team invitation

Payment failure

Use the Lançapp visual identity.

If Resend is configured, send application emails through a secure Edge Function.

Never expose the Resend key to the client.

25. PROFILE AND SETTINGS

Profile tabs:

Minha conta

Notificações

Segurança

API e integrações

Settings must include:

Full name

Email

Avatar

Password update

Theme

Language prepared for future localization

Notification switches

Connected accounts

Active sessions placeholder

Export account data

Delete account with confirmation

Use clean switch cards similar to a premium settings dashboard.

26. ADMIN AREA

Create a protected admin dashboard showing:

Total users

Active projects

Scans in the last 24 hours

Failed scans

Paid subscriptions

Monthly recurring revenue based on real billing records

Abuse and rate-limit events

Admin capabilities:

Search users

Inspect project metadata

Inspect scan failures

Retry failed jobs

Manage plan definitions

View audit logs

Suspend abusive accounts

Admins must not see raw user secrets or complete repository credentials.

27. SHARING AND EXPORTS

Allow a report to be shared through a revocable token.

Shared report settings:

Enable/disable public link

Optional expiration

Optional password

Hide technical evidence

Hide project URL

Revoke link

Shared reports must never expose:

Access tokens

Raw secrets

Private source code

Internal user IDs

Private integration metadata

Prepare a clean print layout for PDF export.

28. EMPTY, ERROR AND LOADING STATES

Create polished states for:

No projects

No scans

No findings

Integration disconnected

Scan failed

Scan partially completed

Network failure

Payment setup missing

Permission denied

Page not found

Maintenance state

Use skeletons for dashboard and report loading.

Do not leave blank pages.

29. ANALYTICS AND OBSERVABILITY

Prepare integration points for:

PostHog product analytics

Sentry error monitoring

Events should include:

account_created

project_created

scan_started

scan_completed

finding_opened

correction_copied

github_connected

checkout_started

subscription_activated

Do not send secret values, repository contents or sensitive evidence to analytics.

30. SAMPLE INTERFACE COPY

Use these phrases where appropriate:

Hero CTA:

“Analisar gratuitamente”

New project CTA:

“Adicionar projeto”

Start scan:

“Iniciar diagnóstico”

Scan running:

“Estamos verificando seu projeto sem alterar nada.”

Critical result:

“Este ponto precisa de atenção antes do lançamento.”

Unknown result:

“Não tivemos acesso suficiente para confirmar esta configuração.”

Correction CTA:

“Gerar correção”

Rescan CTA:

“Verificar novamente”

Empty findings state:

“Nenhum problema desta categoria foi encontrado nas verificações realizadas.”

Disclaimer:

“A Lançapp reduz riscos conhecidos, mas nenhuma análise automatizada garante segurança absoluta.”

31. DEVELOPMENT RULES

Follow these rules throughout the implementation:

Build reusable production-quality components

Do not create a static visual mockup only

Connect forms to real validation and state

Use Zod for validation

Use React Hook Form where appropriate

Use TanStack Query for server state if needed

Use toast feedback carefully

Use confirmation dialogs for sensitive actions

Keep URL query state for report filters

Use server timestamps

Do not hardcode the current user

Do not hardcode dashboard metrics

Do not show fake scan results for real projects

Seed only one clearly labeled demonstration project

Do not expose stack traces to users

Redact sensitive log information

Avoid unnecessary dependencies

Keep animations performant

Include helpful code comments only where logic is complex

32. DELIVERY PRIORITY

Implement in this order:

Design system and responsive application shell

Landing page

Authentication

Onboarding

Projects and database schema

Passive public URL scan

Report and findings

Correction prompts

GitHub and Supabase integration setup states

Billing architecture

Monitoring

Admin

Accessibility and responsive review

Security review

Final visual polish

If an external credential is required, complete the entire user interface and backend contract, then show exactly which environment variable must be configured.

33. FINAL ACCEPTANCE CRITERIA

The application is complete only when:

All listed routes exist

Navigation works on desktop and mobile

Authentication is functional

Protected routes cannot be accessed when logged out

RLS migrations exist

A user can create a project

A user can submit an authorized public URL

Server-side URL validation includes SSRF defenses

Scan status is persisted

Real supported checks produce findings

Reports use real stored scan data

Users can filter and update findings

Builder-specific correction prompts can be copied

GitHub actions never modify the default branch directly

Payment access depends on verified webhooks

Plan limits are enforced on the server

Loading, error and empty states are complete

The custom cursor works without harming accessibility

Touch devices do not receive desktop cursor effects

Reduced-motion preference is respected

There are no fake testimonials, fake metrics or fake integrations

No secrets are exposed in frontend code

The interface feels clean, memorable and premium

Before considering the build finished, test these widths:

320px

375px

768px

1024px

1440px

Run a final review for:

TypeScript errors

Broken routes

Missing loading states

Keyboard navigation

Color contrast

RLS coverage

Secret leakage

Mobile overflow

Motion performance

Clear Portuguese copy

The final result should feel like a serious launch-control center for AI-built SaaS products: clean, fast, trustworthy and memorable.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://launchguard-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/df6179b5-386e-4569-8fef-baf74412bb3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
