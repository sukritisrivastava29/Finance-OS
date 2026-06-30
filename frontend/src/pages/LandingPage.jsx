import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import features from "../components/features";
import DashPreview from "../components/DashPreview";
import work from "../components/work";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <features />
      <work/>
      <DashPreview/>
      <Footer/>
    </div>
  );
}

export default LandingPage;