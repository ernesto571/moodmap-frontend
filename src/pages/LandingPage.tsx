import CTA from "../components/LandingPageComponents/CTA";
import Features from "../components/LandingPageComponents/Features";
import Footer from "../components/LandingPageComponents/Footer";
import Hero from "../components/LandingPageComponents/Hero";
import HowItWorks from "../components/LandingPageComponents/HowItWorks";
import Reviews from "../components/LandingPageComponents/Review";

export default function LamndingPage() {
  return (
    <section className="grid-bg flex flex-col overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Reviews />
      <CTA />
      <Footer />
    </section>
  );
}


