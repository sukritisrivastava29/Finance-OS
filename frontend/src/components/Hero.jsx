import {
  ArrowRight,
  Play,
  Sparkles,
  Check,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-28">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)] opacity-[0.07] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--muted)] mb-8">
          <Sparkles
            size={15}
            className="text-[var(--accent)]"
          />

          Intelligent personal finance
        </div>

        <h1 className="max-w-5xl mx-auto text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-[var(--text)]">
          Your money.
          <br />

          <span className="text-[var(--accent)]">
            Your command center.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mt-7 text-lg md:text-xl leading-8 text-[var(--muted)]">
          FinanceOS brings your income, expenses, receipts,
          reports, and AI-powered insights together in one
          intelligent financial workspace.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">

          <a
            href="/signup"
            className="primary-btn px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            Start managing your money
            <ArrowRight size={18} />
          </a>

          <a
            href="#preview"
            className="secondary-btn px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            <Play size={17} />
            See the dashboard
          </a>

        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-[var(--muted)]">
          <span className="flex items-center gap-2">
            <Check
              size={15}
              className="text-[var(--accent)]"
            />
            Transaction tracking
          </span>

          <span className="flex items-center gap-2">
            <Check
              size={15}
              className="text-[var(--accent)]"
            />
            Receipt scanning
          </span>

          <span className="flex items-center gap-2">
            <Check
              size={15}
              className="text-[var(--accent)]"
            />
            AI insights
          </span>
        </div>

      </div>
    </section>
  );
}

export default Hero;