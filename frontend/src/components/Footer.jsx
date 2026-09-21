function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          <div>
            <h3 className="text-lg font-semibold text-[var(--text)]">
              FinanceOS
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
              A personal finance workspace for tracking,
              understanding, and managing your money.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">

            <a
              href="#preview"
              className="text-[var(--muted)] hover:text-[var(--text)] transition"
            >
              Dashboard
            </a>

            <a
              href="#features"
              className="text-[var(--muted)] hover:text-[var(--text)] transition"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-[var(--muted)] hover:text-[var(--text)] transition"
            >
              How it works
            </a>

            <a
              href="https://github.com/sukritisrivastava29"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--text)] transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/sukritisrivastava29/"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--text)] transition"
            >
              LinkedIn
            </a>

          </div>

        </div>

        <div className="mt-8 pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--muted)]">

          <p>
            © {new Date().getFullYear()} Sukriti Srivastava
          </p>

          <a
            href="mailto:sukriti.srivastava2903@gmail.com"
            className="hover:text-[var(--text)] transition"
          >
            Get in touch
          </a>

        </div>

      </div>
    </footer>
  );
}

export default Footer;