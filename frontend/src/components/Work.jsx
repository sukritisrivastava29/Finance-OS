const steps = [
  {
    number: "01",
    title: "Add your transactions",
    description:
      "Record income and expenses in seconds, or use receipt scanning to capture transactions faster.",
  },
  {
    number: "02",
    title: "Understand your spending",
    description:
      "See where your money goes with clear charts, categories, trends, and intelligent financial insights.",
  },
  {
    number: "03",
    title: "Make smarter decisions",
    description:
      "Use your financial overview and AI-powered insights to stay on budget and work toward your goals.",
  },
];

function Work() {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
            How it works
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] leading-tight">
            From transactions to
            <span className="text-[var(--accent)]">
              {" "}financial clarity.
            </span>
          </h2>

          <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
            FinanceOS brings your everyday finances together in one
            simple workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-[var(--border)]" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative group"
              >
                {/* Number */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mb-7 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:-translate-y-1">
                  <span className="text-lg font-bold text-[var(--accent)]">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">
                  {step.title}
                </h3>

                <p className="text-[var(--muted)] leading-7 max-w-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[var(--muted)]">
            One place to track, understand, and improve your finances.
          </p>

          <a
            href="#features"
            className="text-[var(--accent)] font-medium hover:opacity-80 transition"
          >
            Explore features →
          </a>
        </div>

      </div>
    </section>
  );
}

export default Work;