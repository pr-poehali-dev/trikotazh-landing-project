import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_SWEATERS = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/2c9e0b79-5716-4586-ab4f-8cb07c624b51.jpg";
const IMG_TEXTURE = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/f1c29209-1f5d-4715-bb69-aeb15b1aa898.jpg";
const IMG_FACTORY = "https://cdn.poehali.dev/projects/c9fa4eb6-f809-4987-8dee-feb93e81519e/files/9f9227bb-c6fa-403a-8b00-2b1830fff5eb.jpg";

const products = [
  { title: "Джемперы и пуловеры", desc: "От базового трикотажа до сложных фактурных узоров", tag: "от 500 шт." },
  { title: "Кардиганы и жакеты", desc: "Классические силуэты и современные кройки, любые составы", tag: "от 300 шт." },
  { title: "Платья и юбки", desc: "Трикотажные платья — тонкие полотна и плотные вязки", tag: "от 300 шт." },
  { title: "Лонгсливы и водолазки", desc: "Базовый ассортимент с возможностью брендирования", tag: "от 1000 шт." },
  { title: "Детский трикотаж", desc: "Гипоаллергенные составы, усиленные швы, безопасная фурнитура", tag: "от 500 шт." },
  { title: "Спортивный трикотаж", desc: "Функциональные полотна, влагоотвод, корпоративная одежда", tag: "от 500 шт." },
];

const advantages = [
  { icon: "Factory", title: "Собственное производство", desc: "Полный цикл — от пряжи до готового изделия на одной площадке в России" },
  { icon: "ShieldCheck", title: "Контроль качества", desc: "ОТК на каждом этапе: входной контроль сырья, полуфабрикаты, финальная приёмка" },
  { icon: "Clock", title: "Соблюдение сроков", desc: "Производственный план фиксируется в договоре. Отгрузка точно в срок" },
  { icon: "Layers", title: "Широкий выбор состава", desc: "Хлопок, шерсть, кашемир, акрил, смесовые ткани — подберём под задачу" },
];

const steps = [
  { num: "01", title: "Заявка", desc: "Оставляете заявку или звоните. Обсуждаем задачу за 30 минут" },
  { num: "02", title: "Обсуждение", desc: "Техническое задание, выбор состава, цвета, фурнитуры. Коммерческое предложение" },
  { num: "03", title: "Образец", desc: "Изготовление контрольного образца для согласования до запуска серии" },
  { num: "04", title: "Производство", desc: "Запуск серийного пошива. Еженедельный отчёт о ходе производства" },
  { num: "05", title: "Отгрузка", desc: "Упаковка по вашим стандартам, доставка по России или самовывоз" },
];

const quizSteps = [
  {
    question: "Какой тип изделия вас интересует?",
    options: ["Джемперы / пуловеры", "Кардиганы / жакеты", "Платья / юбки", "Лонгсливы / водолазки", "Детский трикотаж", "Другое"],
  },
  {
    question: "Тираж заказа",
    options: ["до 300 штук", "300 – 1 000 штук", "1 000 – 5 000 штук", "более 5 000 штук"],
  },
  {
    question: "Состав изделия",
    options: ["Хлопок 100%", "Шерсть / кашемир", "Смесовый (хлопок + акрил)", "Синтетика / спорт", "Ещё не определились"],
  },
  {
    question: "Нужна ли разработка лекал?",
    options: ["Да, с нуля", "Есть готовые лекала", "Нужна адаптация"],
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const heroSection = useInView(0.05);
  const productsSection = useInView(0.1);
  const advSection = useInView(0.1);
  const stepsSection = useInView(0.1);
  const quizSection = useInView(0.1);

  const handleAnswer = (option: string) => {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(quizSteps.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const priceEstimate = () => {
    const tiers = ["до 300 штук", "300 – 1 000 штук", "1 000 – 5 000 штук", "более 5 000 штук"];
    const prices = ["от 2 500 ₽/шт", "от 1 400 ₽/шт", "от 900 ₽/шт", "от 650 ₽/шт"];
    const idx = tiers.indexOf(answers[1]);
    return idx >= 0 ? prices[idx] : "по запросу";
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-wide">КнитПро</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <button onClick={() => scrollTo("products")} className="hover:text-foreground transition-colors">Ассортимент</button>
            <button onClick={() => scrollTo("advantages")} className="hover:text-foreground transition-colors">О нас</button>
            <button onClick={() => scrollTo("process")} className="hover:text-foreground transition-colors">Как работаем</button>
            <button onClick={() => scrollTo("quiz")} className="hover:text-foreground transition-colors">Стоимость</button>
          </nav>
          <button
            onClick={() => scrollTo("quiz")}
            className="hidden md:inline-flex items-center gap-2 bg-foreground text-background text-sm px-5 py-2.5 hover:opacity-80 transition-opacity"
          >
            Рассчитать стоимость
          </button>
          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
            <Icon name={navOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4 text-sm">
            <button onClick={() => scrollTo("products")} className="text-left text-muted-foreground hover:text-foreground">Ассортимент</button>
            <button onClick={() => scrollTo("advantages")} className="text-left text-muted-foreground hover:text-foreground">О нас</button>
            <button onClick={() => scrollTo("process")} className="text-left text-muted-foreground hover:text-foreground">Как работаем</button>
            <button onClick={() => scrollTo("quiz")} className="text-left font-medium">Рассчитать стоимость →</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="pt-16 min-h-screen flex flex-col" ref={heroSection.ref}>
        <div className="flex-1 grid md:grid-cols-2 max-w-6xl mx-auto w-full px-6 py-20 md:py-0 md:items-center gap-12">
          <div
            className="transition-all duration-700"
            style={{ opacity: heroSection.inView ? 1 : 0, transform: heroSection.inView ? "translateY(0)" : "translateY(32px)" }}
          >
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              Производство в России
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-medium mb-6">
              Трикотаж<br />
              <em className="not-italic" style={{ color: "hsl(var(--accent))" }}>на заказ</em><br />
              для брендов
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
              Полный цикл производства трикотажных изделий: от разработки до отгрузки. Собственные мощности, жёсткий ОТК, сроки по договору.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("quiz")}
                className="bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Рассчитать стоимость
              </button>
              <button
                onClick={() => scrollTo("products")}
                className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                Ассортимент
              </button>
            </div>
            <div className="flex gap-10 mt-14 pt-10 border-t border-border">
              <div>
                <div className="font-display text-3xl font-medium">12+</div>
                <div className="text-xs text-muted-foreground mt-1">лет на рынке</div>
              </div>
              <div>
                <div className="font-display text-3xl font-medium">300+</div>
                <div className="text-xs text-muted-foreground mt-1">брендов-клиентов</div>
              </div>
              <div>
                <div className="font-display text-3xl font-medium">2М+</div>
                <div className="text-xs text-muted-foreground mt-1">изделий в год</div>
              </div>
            </div>
          </div>
          <div
            className="relative transition-all duration-700"
            style={{ transitionDelay: "200ms", opacity: heroSection.inView ? 1 : 0, transform: heroSection.inView ? "scale(1)" : "scale(0.96)" }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={IMG_SWEATERS} alt="Трикотажные изделия" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-28 h-28 overflow-hidden border-4 border-background hidden md:block">
              <img src={IMG_TEXTURE} alt="Текстура" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-muted/40" ref={productsSection.ref}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="mb-16 transition-all duration-700"
            style={{ opacity: productsSection.inView ? 1 : 0, transform: productsSection.inView ? "translateY(0)" : "translateY(32px)" }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Ассортимент</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Что производим</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {products.map((p, i) => (
              <div
                key={i}
                className="bg-background p-8 hover:bg-muted/60 group transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms`, opacity: productsSection.inView ? 1 : 0, transform: productsSection.inView ? "translateY(0)" : "translateY(32px)" }}
              >
                <div className="inline-block text-xs border border-border px-2 py-1 text-muted-foreground mb-5">{p.tag}</div>
                <h3 className="font-medium text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24" ref={advSection.ref}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="grid md:grid-cols-2 gap-16 items-center transition-all duration-700"
            style={{ opacity: advSection.inView ? 1 : 0, transform: advSection.inView ? "translateY(0)" : "translateY(32px)" }}
          >
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Почему выбирают нас</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-8">Производство<br />полного цикла</h2>
              <div className="aspect-video overflow-hidden">
                <img src={IMG_FACTORY} alt="Производство" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-0 divide-y divide-border">
              {advantages.map((a, i) => (
                <div
                  key={i}
                  className="py-7 flex gap-5 transition-all duration-500"
                  style={{ transitionDelay: `${i * 100 + 200}ms`, opacity: advSection.inView ? 1 : 0, transform: advSection.inView ? "translateX(0)" : "translateX(32px)" }}
                >
                  <div className="shrink-0 w-10 h-10 border border-border flex items-center justify-center text-muted-foreground">
                    <Icon name={a.icon} fallback="CircleAlert" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-foreground text-background" ref={stepsSection.ref}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="mb-16 transition-all duration-700"
            style={{ opacity: stepsSection.inView ? 1 : 0, transform: stepsSection.inView ? "translateY(0)" : "translateY(32px)" }}
          >
            <p className="text-xs text-background/50 uppercase tracking-widest mb-3">Этапы работы</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-background">Как мы работаем</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-0">
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative border-l border-background/20 pl-6 pb-10 md:pb-0 md:border-l-0 md:border-t md:pt-6 md:pl-0 transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms`, opacity: stepsSection.inView ? 1 : 0, transform: stepsSection.inView ? "translateY(0)" : "translateY(32px)" }}
              >
                <div className="font-display text-5xl font-medium text-background/20 mb-3 md:pr-6">{s.num}</div>
                <h3 className="font-medium text-background mb-2 md:pr-6">{s.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed md:pr-6">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" className="py-24" ref={quizSection.ref}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="grid md:grid-cols-2 gap-16 items-start transition-all duration-700"
            style={{ opacity: quizSection.inView ? 1 : 0, transform: quizSection.inView ? "translateY(0)" : "translateY(32px)" }}
          >
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Калькулятор</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">Рассчитайте стоимость за 2 минуты</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ответьте на 4 вопроса — и получите предварительную оценку стоимости производства. Менеджер свяжется в течение часа.
              </p>
              <div className="space-y-3">
                {["Предварительный расчёт сразу", "Менеджер перезвонит в течение часа", "Без обязательств и предоплаты"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} style={{ color: "hsl(var(--accent))" }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border">
              {!submitted ? (
                <div className="p-8">
                  <div className="flex gap-1 mb-8">
                    {quizSteps.map((_, i) => (
                      <div
                        key={i}
                        className="h-0.5 flex-1 transition-colors duration-300"
                        style={{ backgroundColor: i < step ? "hsl(var(--foreground))" : i === step ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--border))" }}
                      />
                    ))}
                  </div>

                  {step < quizSteps.length ? (
                    <>
                      <p className="text-xs text-muted-foreground mb-2">Вопрос {step + 1} из {quizSteps.length}</p>
                      <h3 className="font-medium text-lg mb-6">{quizSteps[step].question}</h3>
                      <div className="grid gap-2">
                        {quizSteps[step].options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            className="text-left px-4 py-3 text-sm border border-border hover:border-foreground hover:bg-muted transition-all"
                            style={{ backgroundColor: answers[step] === opt ? "hsl(var(--muted))" : undefined, borderColor: answers[step] === opt ? "hsl(var(--foreground))" : undefined }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {step > 0 && (
                        <button onClick={() => setStep(step - 1)} className="mt-4 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                          <Icon name="ChevronLeft" size={14} />
                          Назад
                        </button>
                      )}
                    </>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6 p-4 bg-muted border-l-2" style={{ borderLeftColor: "hsl(var(--accent))" }}>
                        <p className="text-xs text-muted-foreground mb-1">Предварительная оценка</p>
                        <p className="font-display text-2xl font-medium">{priceEstimate()}</p>
                        <p className="text-xs text-muted-foreground mt-1">Итоговая цена зависит от деталей</p>
                      </div>
                      <h3 className="font-medium mb-4">Куда отправить подробный расчёт?</h3>
                      <div className="space-y-3 mb-6">
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          value={contact.name}
                          onChange={e => setContact({ ...contact, name: e.target.value })}
                          required
                          className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                        />
                        <input
                          type="tel"
                          placeholder="Телефон"
                          value={contact.phone}
                          onChange={e => setContact({ ...contact, phone: e.target.value })}
                          required
                          className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                        />
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
                  <button
                    onClick={() => { setStep(0); setAnswers([]); setContact({ name: "", phone: "" }); setSubmitted(false); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                  >
                    Рассчитать ещё раз
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold">КнитПро</span>
          <p className="text-sm text-muted-foreground">© 2024 КнитПро. Производство трикотажных изделий в России</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </div>
  );
}