import {
  ReceiptText,
  BarChart3,
  Bot,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: ReceiptText,
    title: "Track your money",
    description:
      "Manage income and expenses in one place with search, categorization, and receipt scanning.",
    tools: "Transactions · Search · OCR",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Understand your spending",
    description:
      "Turn your financial activity into clear visual insights and reports that are easier to act on.",
    tools: "Charts · Insights · Reports",
  },
  {
    number: "03",
    icon: Bot,
    title: "Work with your data",
    description:
      "Ask questions about your finances and explore your transactions through FinanceOS AI.",
    tools: "AI Assistant · Analysis · Insights",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="px-6 py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto">

        <div className="border-t border-[var(--border)] pt-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div>
              <p className="text-sm font-medium text-[var(--accent)] mb-3">
                What FinanceOS does
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text)]">
                Built for everyday finance.
              </h2>
            </div>

            <p className="max-w-md text-sm md:text-base leading-7 text-[var(--muted)]">
              Everything from recording a transaction to
              understanding your spending, without the clutter
              of multiple tools.
            </p>

          </div>
        </div>

        <div className="grid md:grid-cols-3 border-y border-[var(--border)]">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className={`
                  py-8 md:py-10
                  ${index !== 0 ? "md:border-l border-[var(--border)]" : ""}
                  ${index !== features.length - 1 ? "border-b md:border-b-0 border-[var(--border)]" : ""}
                  md:px-8
                  first:md:pl-0
                  last:md:pr-0
                `}
              >

                <div className="flex items-center justify-between mb-10">
                  <Icon
                    size={20}
                    strokeWidth={1.7}
                    className="text-[var(--accent)]"
                  />

                  <span className="text-xs text-[var(--muted)]">
                    {feature.number}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-[var(--text)] mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-[var(--muted)]">
                  {feature.description}
                </p>

                <p className="mt-6 text-xs text-[var(--muted)]">
                  {feature.tools}
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