import Header from "@/components/header/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import CaseStudies from "@/sections/CaseStudies";
import Gallery from "@/sections/Gallery";
import Testimonials from "@/sections/Testimonials";
import ToolsSkills from "@/sections/ToolsSkills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <Gallery />
        <Testimonials />
        <ToolsSkills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
