import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_SWEATERS = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/2c9e0b79-5716-4586-ab4f-8cb07c624b51.jpg";
const IMG_TEXTURE = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/f1c29209-1f5d-4715-bb69-aeb15b1aa898.jpg";
const IMG_FACTORY = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/9f9227bb-c6fa-403a-8b00-2b1830fff5eb.jpg";
const IMG_HOODIES = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/d7994b86-76ad-4edc-b848-266fdecffac2.jpg";
const IMG_BRAND = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/bcdece0b-f055-4b96-9a65-6706a187728f.jpg";
const IMG_CORPORATE = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/9d93a2de-ba8e-4e7c-9454-42d5fabf3d2a.jpg";

const audiences = [
  { icon: "Tag", title: "Бренды одежды", desc: "Запуск или расширение коллекций. Работаем с сезонными линейками и базовыми капсулами" },
  { icon: "Rocket", title: "Стартапы", desc: "Тестовые партии от 50 единиц. Помогаем выйти на рынок без больших вложений в склад" },
  { icon: "ShoppingBag", title: "Маркетплейсы", desc: "Производим под WB, Ozon, Яндекс Маркет. Знаем требования к маркировке и упаковке" },
  { icon: "Building2", title: "Корпоративный мерч", desc: "Фирменная одежда для команды, партнёров, мероприятий. Нанесение логотипа включено" },
];

const products = [
  { title: "Футболки", desc: "Плотность 160–220 г/м², любые фасоны и составы", tag: "от 50 шт.", img: IMG_BRAND },
  { title: "Худи", desc: "Классические и оверсайз, с начёсом и без, петельная и футерная нить", tag: "от 50 шт.", img: IMG_HOODIES },
  { title: "Свитшоты", desc: "Лаконичные базовые и оверсайз-модели для брендов и корпоративного мерча", tag: "от 50 шт.", img: IMG_CORPORATE },
  { title: "Спортивные костюмы", desc: "Двойка и тройка: брюки + куртка + опционально шорты или майка", tag: "от 100 шт.", img: IMG_SWEATERS },
  { title: "Джемперы и кардиганы", desc: "От базового трикотажа до сложных фактурных узоров", tag: "от 100 шт.", img: IMG_TEXTURE },
  { title: "Детский трикотаж", desc: "Гипоаллергенные составы, усиленные швы, безопасная фурнитура", tag: "от 100 шт.", img: IMG_FACTORY },
];

const minBatches = [
  { qty: "50", label: "штук", desc: "Минимальный заказ на модель", accent: true },
  { qty: "14", label: "дней", desc: "Срок производства тестовой партии" },
  { qty: "1", label: "образец", desc: "Перед запуском тиража всегда делаем образец" },
  { qty: "0", label: "предоплата", desc: "По схеме 50/50: аванс и остаток после приёмки" },
];

const advantages = [
  { icon: "Factory", title: "Производство в РФ", desc: "Полный цикл на одной площадке. Не перепродаём — шьём сами" },
  { icon: "ShieldCheck", title: "Контроль качества", desc: "ОТК на каждом этапе. Финальная приёмка перед отгрузкой" },
  { icon: "Clock", title: "Быстрые сроки", desc: "Тестовая партия — 14 дней. Серия — от 21 дня" },
  { icon: "Ruler", title: "Помощь с лекалами", desc: "Конструкторы и технологи в штате. Разработаем с нуля или адаптируем ваши" },
];

const comparison = [
  { param: "Минимальный заказ", ru: "от 50 шт.", cn: "от 1000 шт.", kg: "от 200 шт." },
  { param: "Срок производства", ru: "14–21 день", cn: "45–60 дней", kg: "21–35 дней" },
  { param: "Контроль качества", ru: "Лично, на месте", cn: "Сложно", kg: "Ограниченно" },
  { param: "Логистика", ru: "По РФ 2–3 дня", cn: "Таможня + фрахт", kg: "Таможня" },
  { param: "Документы (НДС, сертификаты)", ru: "Полный пакет", cn: "Доп. затраты", kg: "Частично" },
  { param: "Коммуникация", ru: "Русский язык", cn: "Переводчик", kg: "Русский язык" },
];

const steps = [
  { num: "01", title: "Заявка", desc: "Оставляете заявку или звоните. Обсуждаем задачу за 30 минут" },
  { num: "02", title: "Обсуждение", desc: "Техническое задание, выбор состава, цвета, фурнитуры. Коммерческое предложение" },
  { num: "03", title: "Образец", desc: "Изготовление контрольного образца для согласования до запуска серии" },
  { num: "04", title: "Производство", desc: "Запуск серийного пошива. Еженедельный отчёт о ходе производства" },
  { num: "05", title: "Отгрузка", desc: "Упаковка по вашим стандартам, доставка по России или самовывоз" },
];

const cases = [
  { title: "Бренд streetwear", qty: "2 000 шт.", product: "Худи + свитшоты", result: "Партия за 18 дней под сезон", img: IMG_HOODIES },
  { title: "Маркетплейс Wildberries", qty: "5 500 шт.", product: "Базовые футболки", result: "Полный пакет документов, СТМ-этикетки", img: IMG_BRAND },
  { title: "IT-компания, мерч", qty: "350 шт.", product: "Худи + поло + свитшоты", result: "Брендинг + вышивка логотипа", img: IMG_CORPORATE },
];

const faqs = [
  { q: "Какой минимальный заказ?", a: "От 50 единиц на модель. Для тестовых партий возможен меньший тираж — обсуждается индивидуально." },
  { q: "Каковы сроки производства?", a: "Тестовая партия — 14 дней. Серийное производство от 500 шт. — 21–30 дней в зависимости от сложности изделия." },
  { q: "Делаете ли вы разработку дизайна и лекал?", a: "Да. В штате есть конструкторы и технологи. Стоимость разработки лекал — от 5 000 ₽ за модель, входит в стоимость первой партии от 300 шт." },
  { q: "Работаете ли с НДС?", a: "Да, работаем по ОСНО. Предоставляем полный пакет закрывающих документов: счёт-фактуру, накладную, акт." },
  { q: "Можно ли нанести логотип?", a: "Да: шелкография, вышивка, термоперенос, прямая печать (DTG). Подберём способ под ваш состав и тираж." },
  { q: "Как происходит оплата?", a: "50% предоплата при подписании договора, 50% после финальной приёмки партии до отгрузки." },
];

const quizSteps = [
  { question: "Какой тип изделия вас интересует?", options: ["Футболки", "Худи / свитшоты", "Спортивный костюм", "Трикотаж (джемпер, кардиган)", "Детская одежда", "Другое"] },
  { question: "Тираж заказа", options: ["до 100 штук", "100 – 500 штук", "500 – 2 000 штук", "более 2 000 штук"] },
  { question: "Нужна ли разработка лекал?", options: ["Да, с нуля", "Есть готовые лекала", "Нужна адаптация"] },
  { question: "Куда планируете продавать?", options: ["Маркетплейс (WB, Ozon)", "Свой интернет-магазин", "Офлайн / шоурум", "Корпоративные заказчики"] },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [consultForm, setConsultForm] = useState({ name: "", phone: "" });
  const [consultSent, setConsultSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const heroSection = useInView(0.05);

  const handleAnswer = (option: string) => {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    if (step < quizSteps.length - 1) setStep(step + 1);
    else setStep(quizSteps.length);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const priceEstimate = () => {
    const map: Record<string, string> = {
      "до 100 штук": "от 1 800 ₽/шт",
      "100 – 500 штук": "от 980 ₽/шт",
      "500 – 2 000 штук": "от 650 ₽/шт",
      "более 2 000 штук": "от 420 ₽/шт",
    };
    return map[answers[1]] ?? "по запросу";
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-wide">КнитПро</span>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {[["products", "Ассортимент"], ["advantages", "О нас"], ["process", "Как работаем"], ["cases", "Кейсы"], ["quiz", "Стоимость"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-foreground transition-colors">{label}</button>
            ))}
          </nav>
          <button onClick={() => scrollTo("quiz")} className="hidden md:inline-flex bg-foreground text-background text-sm px-5 py-2.5 hover:opacity-80 transition-opacity">
            Рассчитать стоимость
          </button>
          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
            <Icon name={navOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4 text-sm">
            {[["products", "Ассортимент"], ["advantages", "О нас"], ["process", "Как работаем"], ["cases", "Кейсы"], ["quiz", "Рассчитать стоимость →"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-muted-foreground hover:text-foreground">{label}</button>
            ))}
          </div>
        )}
      </header>

      {/* ── 1. HERO ── */}
      <section id="hero" className="pt-16 min-h-screen flex flex-col" ref={heroSection.ref}>
        <div className="flex-1 grid md:grid-cols-2 max-w-6xl mx-auto w-full px-6 py-20 md:py-0 md:items-center gap-12">
          <div style={{ opacity: heroSection.inView ? 1 : 0, transform: heroSection.inView ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Производство в России · Работаем с 2012 года
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-medium mb-6">
              Производство<br />
              трикотажа<br />
              <em className="not-italic" style={{ color: "hsl(var(--accent))" }}>под ваш бренд</em>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-3 max-w-md">
              Полный цикл: от идеи до готовой партии.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-md">
              Футболки, худи, свитшоты, спортивные костюмы — <strong className="text-foreground font-medium">от 50 штук</strong> на модель.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("quiz")} className="bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:opacity-80 transition-opacity">
                Рассчитать стоимость
              </button>
              <button onClick={() => scrollTo("products")} className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted transition-colors">
                Ассортимент
              </button>
            </div>
            <div className="flex gap-10 mt-14 pt-10 border-t border-border">
              {[["12+", "лет на рынке"], ["300+", "брендов-клиентов"], ["50", "шт. минимум"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl font-medium">{num}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ opacity: heroSection.inView ? 1 : 0, transform: heroSection.inView ? "scale(1)" : "scale(0.96)", transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms" }} className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={IMG_SWEATERS} alt="Трикотажные изделия" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-28 h-28 overflow-hidden border-4 border-background hidden md:block">
              <img src={IMG_TEXTURE} alt="Текстура" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ДЛЯ КОГО ── */}
      <section id="audience" className="py-24 bg-muted/40">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Для кого</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Узнайте себя</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {audiences.map((a, i) => (
              <Reveal key={i} delay={i * 80} className="bg-background p-8 hover:bg-secondary/60 transition-colors">
                <div className="w-10 h-10 border border-border flex items-center justify-center mb-5 text-muted-foreground">
                  <Icon name={a.icon} fallback="CircleAlert" size={18} />
                </div>
                <h3 className="font-medium mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ЧТО ПРОИЗВОДИМ ── */}
      <section id="products" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Ассортимент</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Что производим</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group overflow-hidden border border-border hover:border-foreground/30 transition-colors">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="inline-block text-xs border border-border px-2 py-1 text-muted-foreground mb-3">{p.tag}</div>
                    <h3 className="font-medium text-lg mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. МИНИМАЛЬНЫЕ ПАРТИИ ── */}
      <section id="minbatch" className="py-24 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-xs text-background/40 uppercase tracking-widest mb-3">Низкий порог входа</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-background">Начните без риска</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10">
            {minBatches.map((m, i) => (
              <Reveal key={i} delay={i * 100} className="bg-foreground p-8">
                <div
                  className="font-display text-6xl font-medium mb-1"
                  style={{ color: m.accent ? "hsl(var(--accent))" : "hsl(var(--background))" }}
                >
                  {m.qty}
                </div>
                <div className="text-sm text-background/60 uppercase tracking-wider mb-3">{m.label}</div>
                <p className="text-sm text-background/70 leading-relaxed">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ПРЕИМУЩЕСТВА ── */}
      <section id="advantages" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Почему выбирают нас</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-8">Производство<br />полного цикла</h2>
              <div className="aspect-video overflow-hidden">
                <img src={IMG_FACTORY} alt="Производство" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <div className="divide-y divide-border">
              {advantages.map((a, i) => (
                <Reveal key={i} delay={i * 100 + 200} className="py-7 flex gap-5">
                  <div className="shrink-0 w-10 h-10 border border-border flex items-center justify-center text-muted-foreground">
                    <Icon name={a.icon} fallback="CircleAlert" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. СРАВНЕНИЕ ── */}
      <section id="comparison" className="py-24 bg-muted/40">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Сравнение</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Россия vs Китай vs Киргизия</h2>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 pr-6 font-medium text-muted-foreground w-48">Параметр</th>
                    <th className="py-4 px-6 font-semibold text-center bg-foreground text-background">🇷🇺 Россия (мы)</th>
                    <th className="py-4 px-6 font-medium text-center text-muted-foreground">🇨🇳 Китай</th>
                    <th className="py-4 px-6 font-medium text-center text-muted-foreground">🇰🇬 Киргизия</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/30"}`}>
                      <td className="py-4 pr-6 text-muted-foreground">{row.param}</td>
                      <td className="py-4 px-6 text-center font-medium bg-foreground/5 border-x border-border/40">{row.ru}</td>
                      <td className="py-4 px-6 text-center text-muted-foreground">{row.cn}</td>
                      <td className="py-4 px-6 text-center text-muted-foreground">{row.kg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. ПРОЦЕСС ── */}
      <section id="process" className="py-24 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-xs text-background/40 uppercase tracking-widest mb-3">Этапы работы</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-background">Как мы работаем</h2>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-0">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 100} className="relative border-l border-background/20 pl-6 pb-10 md:pb-0 md:border-l-0 md:border-t md:pt-6 md:pl-0">
                <div className="font-display text-5xl font-medium text-background/20 mb-3 md:pr-6">{s.num}</div>
                <h3 className="font-medium text-background mb-2 md:pr-6">{s.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed md:pr-6">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. КЕЙСЫ ── */}
      <section id="cases" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Кейсы</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Уже работаем</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {cases.map((c, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-background group">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-7 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{c.product}</p>
                    <h3 className="font-medium text-lg mb-1">{c.title}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-muted-foreground">{c.result}</span>
                      <span className="font-display text-xl font-medium" style={{ color: "hsl(var(--accent))" }}>{c.qty}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. КВИЗ ── */}
      <section id="quiz" className="py-24 bg-muted/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Калькулятор</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">Рассчитайте стоимость за 1 минуту</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ответьте на 4 вопроса — получите предварительную оценку. Менеджер перезвонит в течение часа с точным расчётом.
              </p>
              <div className="space-y-3">
                {["Предварительная цена сразу после квиза", "Менеджер перезвонит в течение часа", "Без обязательств и предоплаты"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} style={{ color: "hsl(var(--accent))" }} />
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="border border-border bg-background">
                {!submitted ? (
                  <div className="p-8">
                    <div className="flex gap-1 mb-8">
                      {quizSteps.map((_, i) => (
                        <div key={i} className="h-0.5 flex-1 transition-colors duration-300"
                          style={{ backgroundColor: i < step ? "hsl(var(--foreground))" : i === step ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--border))" }} />
                      ))}
                    </div>
                    {step < quizSteps.length ? (
                      <>
                        <p className="text-xs text-muted-foreground mb-2">Вопрос {step + 1} из {quizSteps.length}</p>
                        <h3 className="font-medium text-lg mb-6">{quizSteps[step].question}</h3>
                        <div className="grid gap-2">
                          {quizSteps[step].options.map((opt) => (
                            <button key={opt} onClick={() => handleAnswer(opt)}
                              className="text-left px-4 py-3 text-sm border transition-all hover:border-foreground hover:bg-muted"
                              style={{ borderColor: answers[step] === opt ? "hsl(var(--foreground))" : undefined, backgroundColor: answers[step] === opt ? "hsl(var(--muted))" : undefined }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                        {step > 0 && (
                          <button onClick={() => setStep(step - 1)} className="mt-4 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                            <Icon name="ChevronLeft" size={14} /> Назад
                          </button>
                        )}
                      </>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                        <div className="mb-6 p-4 bg-muted border-l-2" style={{ borderLeftColor: "hsl(var(--accent))" }}>
                          <p className="text-xs text-muted-foreground mb-1">Предварительная оценка</p>
                          <p className="font-display text-2xl font-medium">{priceEstimate()}</p>
                          <p className="text-xs text-muted-foreground mt-1">Итоговая цена уточняется менеджером</p>
                        </div>
                        <h3 className="font-medium mb-4">Куда отправить расчёт?</h3>
                        <div className="space-y-3 mb-6">
                          <input type="text" placeholder="Ваше имя" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} required
                            className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors" />
                          <input type="tel" placeholder="Телефон" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} required
                            className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors" />
                        </div>
                        <button type="submit" className="w-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-80 transition-opacity">
                          Получить расчёт
                        </button>
                        <p className="text-xs text-muted-foreground mt-3 text-center">Нажимая, вы соглашаетесь с политикой конфиденциальности</p>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 border border-border flex items-center justify-center mx-auto mb-6" style={{ color: "hsl(var(--accent))" }}>
                      <Icon name="CheckCircle" size={24} />
                    </div>
                    <h3 className="font-display text-2xl font-medium mb-3">Заявка принята!</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {contact.name}, менеджер свяжется с вами по номеру {contact.phone} в течение часа.
                    </p>
                    <button onClick={() => { setStep(0); setAnswers([]); setContact({ name: "", phone: "" }); setSubmitted(false); }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                      Рассчитать ещё раз
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 10. КОНСУЛЬТАЦИЯ ── */}
      <section id="consult" className="py-24" style={{ background: "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(25 40% 18%) 100%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Бесплатная консультация</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-5">
                Не знаете<br />с чего начать?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Расскажите о задаче — эксперт по производству проконсультирует бесплатно. Поможем разобраться с составом, тиражом и бюджетом.
              </p>
              <div className="space-y-2">
                {["Разбор вашего ТЗ или идеи", "Рекомендация по составу и технологии", "Примерный бюджет ещё до договора"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <Icon name="Check" size={14} style={{ color: "hsl(var(--accent))" }} />
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-white/5 border border-white/10 p-8">
                {!consultSent ? (
                  <form onSubmit={(e) => { e.preventDefault(); setConsultSent(true); }} className="space-y-4">
                    <input type="text" placeholder="Ваше имя" value={consultForm.name} onChange={e => setConsultForm({ ...consultForm, name: e.target.value })} required
                      className="w-full border border-white/20 bg-white/5 text-white placeholder:text-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors" />
                    <input type="tel" placeholder="Телефон или WhatsApp" value={consultForm.phone} onChange={e => setConsultForm({ ...consultForm, phone: e.target.value })} required
                      className="w-full border border-white/20 bg-white/5 text-white placeholder:text-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors" />
                    <button type="submit" className="w-full py-3.5 text-sm font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: "hsl(var(--accent))", color: "white" }}>
                      Получить бесплатную консультацию
                    </button>
                    <p className="text-xs text-white/30 text-center">Перезвоним в рабочее время в течение 2 часов</p>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center mx-auto mb-5" style={{ color: "hsl(var(--accent))" }}>
                      <Icon name="Phone" size={22} />
                    </div>
                    <h3 className="font-display text-2xl font-medium text-white mb-2">Отлично!</h3>
                    <p className="text-sm text-white/60">Эксперт свяжется с вами в течение 2 часов</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ── */}
      <section id="faq" className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="mb-14 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Вопросы и ответы</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Частые вопросы</h2>
          </Reveal>
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="py-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left font-medium hover:text-muted-foreground transition-colors"
                  >
                    <span>{faq.q}</span>
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={18} className="shrink-0 ml-4 text-muted-foreground" />
                  </button>
                  {openFaq === i && (
                    <div className="pb-5 text-sm text-muted-foreground leading-relaxed pr-8">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. КОНТАКТЫ ── */}
      <section id="contacts" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Свяжитесь с нами</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <Reveal>
                <div className="space-y-5">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                    { icon: "MessageCircle", label: "WhatsApp", value: "+7 (495) 000-00-00" },
                    { icon: "Mail", label: "Email", value: "info@knitpro.ru" },
                    { icon: "MapPin", label: "Адрес производства", value: "Москва, ул. Производственная, 1" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                        <Icon name={c.icon} fallback="CircleAlert" size={17} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{c.label}</p>
                        <p className="font-medium">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="border-t border-border pt-8">
                  <p className="text-sm text-muted-foreground mb-3">Режим работы</p>
                  <p className="font-medium">Пн–Пт, 9:00 — 18:00</p>
                  <p className="text-sm text-muted-foreground mt-1">По WhatsApp — в любое время</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="border border-border p-8">
                {!contactSent ? (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); }} className="space-y-4">
                    <h3 className="font-medium mb-2">Напишите нам</h3>
                    <input type="text" placeholder="Ваше имя" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} required
                      className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors" />
                    <input type="tel" placeholder="Телефон" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} required
                      className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors" />
                    <textarea placeholder="Расскажите о задаче" value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} rows={4}
                      className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors resize-none" />
                    <button type="submit" className="w-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-80 transition-opacity">
                      Отправить сообщение
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-12 h-12 border border-border flex items-center justify-center mx-auto mb-5" style={{ color: "hsl(var(--accent))" }}>
                      <Icon name="CheckCircle" size={24} />
                    </div>
                    <h3 className="font-display text-2xl font-medium mb-2">Сообщение отправлено!</h3>
                    <p className="text-sm text-muted-foreground">Ответим в течение рабочего дня</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-10 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold">КнитПро</span>
          <p className="text-sm text-muted-foreground">© 2024 КнитПро. Производство трикотажных изделий в России</p>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Политика конфиденциальности</a>
        </div>
      </footer>
    </div>
  );
}
