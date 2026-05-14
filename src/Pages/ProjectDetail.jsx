import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Github, CheckCircle } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { EvervaultCard } from "@/components/ui/evervault-card";
import projects from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { detail } = project;
  const isPortrait = project.imageRatio === "portrait";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Spotlight */}
      <div className="relative overflow-hidden py-32 px-4">
        <Spotlight
          className="-top-40 left-0 md:left-60"
          fill="hsl(var(--primary))"
        />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <TextGenerateEffect
            words={project.title}
            className="text-4xl md:text-5xl"
          />
          <p className="text-muted-foreground mt-4 text-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button flex items-center gap-2"
            >
              <Github size={16} /> Source Code
            </a>
          </div>
        </div>
      </div>

      {/* Screenshots Gallery */}
      <div className="container mx-auto max-w-4xl px-4 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {detail.screenshots.length > 1 ? (
            <div className={`flex gap-3 justify-center ${isPortrait ? "flex-wrap" : "flex-wrap"}`}>
              {detail.screenshots.map((shot, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border cursor-pointer bg-muted/20"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={shot}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="h-[150px] md:h-[250px] w-auto object-contain transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden border border-border cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover transition duration-300 hover:scale-105"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Content Area with TracingBeam */}
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content with TracingBeam */}
          <div className="lg:col-span-2">
            <TracingBeam className="px-6">
              <div className="space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    {detail.overview}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="space-y-3 text-left">
                    {detail.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <CheckCircle
                          size={18}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </TracingBeam>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack with EvervaultCard */}
            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-semibold mb-4">Tech Stack</h3>
              <div className="aspect-square w-full max-w-[280px] mx-auto">
                <EvervaultCard text={detail.techStack[0]?.name || "Tech"} />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {detail.techStack.map((tech) => (
                  <Badge key={tech.name} variant="outline">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-semibold mb-4">Links</h3>
              <div className="space-y-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={16} /> Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={detail.screenshots.map((s) => ({ src: s }))}
      />
    </div>
  );
};

export default ProjectDetail;
