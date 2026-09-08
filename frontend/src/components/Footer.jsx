function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          <div>
            <h3 className="text-xl font-bold">FinanceOS</h3>

            <p className="mt-3 max-w-sm">
              A full-stack personal finance platform designed to help users
              track expenses, monitor budgets, and gain financial insights.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Product</h4>

            <div className="flex flex-col gap-2">
              <a href="#features" className="footer-link">
                Features
              </a>

              <a href="#dashboard" className="footer-link">
                Dashboard
              </a>

              <a href="#work" className="footer-link">
                How It Works
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Developer</h4>

            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/sukritisrivastava29"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/sukritisrivastava29/"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>

              <a
                href="mailto:sukriti.srivastava2903@gmail.com"
                className="footer-link"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm">
          © {new Date().getFullYear()} Sukriti Srivastava. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;