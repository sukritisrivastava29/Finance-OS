import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashPreview from "../components/DashPreview";
import Work from "../components/Work";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <Work/>
      <DashPreview/>
      <Footer/>
    </div>
  );
}

export default LandingPage;