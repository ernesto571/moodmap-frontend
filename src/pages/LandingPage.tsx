import CTA from "../components/LandingPageComponents/CTA";
import Features from "../components/LandingPageComponents/Features";
import Footer from "../components/LandingPageComponents/Footer";
import Hero from "../components/LandingPageComponents/Hero";
import HowItWorks from "../components/LandingPageComponents/HowItWorks";
import Reviews from "../components/LandingPageComponents/Review";

export default function LamndingPage() {
  return (
    <main className="grid-bg min-h-screen flex flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  );
}


