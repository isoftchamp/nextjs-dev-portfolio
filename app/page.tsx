import HeroSection from "@/app/ui/components/home/hero-section";
import AboutSection from "@/app/ui/components/home/about-section";
import Experience from "@/app/ui/components/home/experience";
import Skills from "@/app/ui/components/home/skills";
import Projects from "@/app/ui/components/home/projects";
import Education from "@/app/ui/components/home/education";
import Blog from "@/app/ui/components/home/blog";
import Contact from "@/app/ui/components/home/contact";
import { getBlogs } from "@/app/lib/actions";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <Contact />
    </>
  );
}
