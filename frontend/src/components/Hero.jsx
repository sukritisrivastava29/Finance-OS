import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-[var(--accent)] mb-6">
            FINANCEOS
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-[var(--text)]">
            Your finances,
            <br />
            <span className="text-[var(--muted)]">
              in one place.
            </span>
          </h1>

          <p className="max-w-xl mt-7 text-lg md:text-xl leading-8 text-[var(--muted)]">
            Track your money, understand your spending, and
            make better financial decisions without the clutter.
          </p>

          <div className="mt-8">
            <a
              href="/signup"
              className="primary-btn inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium"
            >
              Get started
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[var(--border)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-medium text-[var(--text)]">
                Track
              </p>
              <p className="mt-1 text-[var(--muted)]">
                Income and expenses
              </p>
            </div>

            <div>
              <p className="font-medium text-[var(--text)]">
                Understand
              </p>
              <p className="mt-1 text-[var(--muted)]">
                Spending patterns and insights
              </p>
            </div>

            <div>
              <p className="font-medium text-[var(--text)]">
                Automate
              </p>
              <p className="mt-1 text-[var(--muted)]">
                Receipts, reports and AI assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;