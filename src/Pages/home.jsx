import ThemeToggle from "../components/ThemeToggle";
import StarBackground from "@/components/StarBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillSection from "../components/SkillSection";
import ProjectSection from "../components/ProjectSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* theme */}
      <ThemeToggle />
      {/* background effect */}
      <StarBackground />
      {/* navbar */}
      <Navbar />
      {/* main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
        <ContactSection />
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default home;
