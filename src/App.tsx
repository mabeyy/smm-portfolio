import Header from "@/components/header/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Experience from "@/sections/Experience";
import Gallery from "@/sections/Gallery";
import ToolsSkills from "@/sections/ToolsSkills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Gallery />
        <ToolsSkills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
