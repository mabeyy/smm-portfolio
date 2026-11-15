import Header from "@/components/header/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Experience from "@/sections/Experience";
import Gallery from "@/sections/Gallery";
import Results from "@/sections/Results";
import ToolsSkills from "@/sections/ToolsSkills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import SectionProgress from "@/components/SectionProgress";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Experience />
        <Results />
        <ToolsSkills />
        <Contact />
      </main>
      <Footer />
      <SectionProgress />
    </>
  );
}

