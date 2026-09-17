import {
  ReceiptText,
  BarChart3,
  Bot,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: ReceiptText,
    number: "01",
    title: "Track every transaction",
    description:
      "Keep income and expenses organized with fast transaction management, search, and categorization.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Understand your spending",
    description:
      "Turn raw transactions into visual insights that make spending patterns easier to understand.",
  },
  {
    icon: Bot,
    number: "03",
    title: "Ask your financial AI",
    description:
      "Use AI-powered conversations and insights to explore your financial data in a more natural way.",
  },
  {
    icon: ReceiptText,
    number: "04",
    title: "Scan receipts",
    description:
      "Extract useful transaction information from receipts instead of entering every detail manually.",
  },
  {
    icon: FileText,
    number: "05",
    title: "Generate reports",
    description:
      "Turn your financial activity into useful reports that you can review or export when needed.",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Your financial workspace",
    description:
      "Keep the tools you use to manage your finances together instead of switching between multiple apps.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="px-6 py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
            Everything in one place
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] leading-tight">
            Built around the way
            <br />
            you manage money.
          </h2>

          <p className="mt-5 text-lg text-[var(--muted)] leading-8">
            FinanceOS combines everyday financial tools with
            intelligent analysis so you can spend less time
            managing your data and more time understanding it.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="bg-[var(--card)] p-7 md:p-8 group transition-all duration-300 hover:bg-[var(--surface)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center group-hover:border-[var(--accent)] transition">
                    <Icon
                      size={20}
                      className="text-[var(--accent)]"
                    />
                  </div>

                  <span className="text-xs font-medium text-[var(--muted)]">
                    {feature.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[var(--text)] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[var(--muted)] leading-7">
                  {feature.description}
                </p>
              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Features;