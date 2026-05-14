import { ArrowRight, Github, Star } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Marquee } from "@/components/ui/marquee";
import projects from "@/data/projects";

const allTags = [...new Set(projects.flatMap((p) => p.tags))];

const FeaturedProjectCard = ({ project }) => {
  const isPortrait = project.imageRatio === "portrait";
  const screenshots = project.detail?.screenshots || [];

  // Portrait projects: plain card, no 3D tilt, no overflow issues
  if (isPortrait && screenshots.length > 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <Link to={`/projects/${project.slug}`} className="block group">
          <div className="rounded-xl bg-card border border-border transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/[0.05]">
            <div className="flex gap-10 p-2 bg-muted/20 rounded-t-xl items-center justify-center">
              {screenshots.slice(0, 5).map((shot, i) => (
                <img
                  key={i}
                  src={shot}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="h-[300px] w-auto object-contain rounded-md"
                />
              ))}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1 text-primary mb-2">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-medium">Featured</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Detail <ArrowRight size={14} />
                </span>
                <div
                  className="flex gap-3 ml-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Landscape featured: plain card with multiple images
  const landscapeScreenshots = screenshots.length > 1 ? screenshots : [project.image];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Link to={`/projects/${project.slug}`} className="block group">
        <div className="rounded-xl bg-card border border-border transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/[0.05] w-fit mx-auto">
          <div className="flex gap-3 p-3 bg-muted/20 rounded-t-xl items-center justify-center">
            {landscapeScreenshots.slice(0, 3).map((shot, i) => (
              <img
                key={i}
                src={shot}
                alt={`${project.title} screenshot ${i + 1}`}
                className="h-[250px] w-auto object-contain rounded-md"
              />
            ))}
          </div>
          <div className="p-6">
            <div className="flex items-center gap-1 text-primary mb-2">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-medium">Featured</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                View Detail <ArrowRight size={14} />
              </span>
              <div className="flex gap-3 ml-auto" onClick={(e) => e.stopPropagation()}>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const isPortrait = project.imageRatio === "portrait";
  const screenshots = project.detail?.screenshots || [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/projects/${project.slug}`} className="block group">
        <div className="relative overflow-hidden rounded-xl bg-card border border-border card-hover h-full">
          {isPortrait && screenshots.length > 1 ? (
            <div className="grid grid-cols-2 gap-1.5 p-2 bg-muted/20 min-h-[330px]">
              {screenshots.slice(0, 2).map((shot, i) => (
                <img
                  key={i}
                  src={shot}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full h-auto rounded-sm transition duration-500 group-hover:scale-105"
                />
              ))}
            </div>
          ) : (
            <div className="h-[330px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                View Detail <ArrowRight size={14} />
              </span>
              <div className="flex gap-3 ml-auto">
                <span
                  onClick={(e) => e.stopPropagation()}
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectSection = () => {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header with Spotlight + TextGenerateEffect */}
        <div className="relative mb-16">
          <Spotlight
            className="-top-40 left-0 md:left-60"
            fill="hsl(var(--primary))"
          />
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <TextGenerateEffect
                words="Featured Projects"
                className="text-3xl md:text-4xl"
              />
            </motion.div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects that showcase my skills in web and mobile
              development, from responsive frontends to full-stack applications.
            </p>
          </div>
        </div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-12 w-fit mx-auto"
          >
            <FeaturedProjectCard project={featured} />
          </motion.div>
        )}

        {/* Regular Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {others.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Marquee Tech Tags */}
        <div className="mb-12 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s] opacity-90">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm rounded-full border border-border bg-card text-white whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </Marquee>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            href="https://github.com/ibayers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection;
