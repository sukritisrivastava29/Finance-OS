import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashPreview from "../components/DashPreview";
import Work from "../components/Work";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
function LandingPage() {
  return (
    <div className="app-theme min-h-screen overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <ThemeToggle/>
        <DashPreview />
        <Features />
        <Work />
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;