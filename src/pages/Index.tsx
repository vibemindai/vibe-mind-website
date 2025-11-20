import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechGlobe from "@/components/TechGlobe";
import TechStack from "@/components/TechStack";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <TechGlobe />
      <TechStack />
      <Products />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
