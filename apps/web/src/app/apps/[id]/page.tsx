"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { NeumorphCard } from "@/components/NeumorphCard";
import { NeumorphButton } from "@/components/NeumorphButton";
import { PROJECTS, PROJECT_LIST } from "@/data/projects";
import { Icons } from "@/components/Icons";
import { ContactForm } from "@/components/ContactForm";
import { ProjectSelector } from "@/components/ProjectSelector";
import { AppScreenshotsCarousel } from "@/components/AppScreenshotsCarousel";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"; // Ensure cn is imported for conditional classes

export default function AppLandingPage({ params }: { params: { id: string } }) {
  const project = PROJECTS[params.id];
  const [activeForm, setActiveForm] = useState<"waitlist" | "bug" | null>(null);
  const [showTechStack, setShowTechStack] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Parallax / Look-at Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the rotation values
  // Reduced degree range for a subtler effect (from 20 to 10)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position from -0.5 to 0.5
      x.set(e.clientX / innerWidth - 0.5);
      y.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  useEffect(() => {
    if (activeForm && formContainerRef.current) {
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [activeForm]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-neumorph-text p-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Project not found.</p>
        <Link href="/">
           <NeumorphButton>Return Home</NeumorphButton>
        </Link>
      </div>
    );
  }

  const formVariants = {
    hidden: { opacity: 0, y: -20, height: 0, overflow: "hidden" },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: "auto",
      transition: { 
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.1 } 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      height: 0,
      transition: { 
        height: { duration: 0.3, delay: 0.1 },
        opacity: { duration: 0.2 } 
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-3 transition-colors duration-300 w-full">
      <nav className="w-full max-w-4xl flex items-center gap-4 mb-12 relative z-30 mx-auto">
        <Link href="/" className="flex-shrink-0 flex items-center text-neumorph-text hover:text-neumorph-accent transition-colors">
          <Icons.ArrowLeft className="mr-2 w-5 h-5" />
          Back to Hub
        </Link>
        
        <div className="flex-grow min-w-0">
          <ProjectSelector currentProjectId={project.id} />
        </div>
      </nav>

      <div className="max-w-4xl w-full text-center">
        <NeumorphCard convex className="p-8 md:p-16 mb-12 relative">
          {/* Code Toggle Button */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
            <button
              onClick={() => setShowTechStack(!showTechStack)}
              className={cn(
                "p-3 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center",
                showTechStack 
                  ? "bg-neumorph-bg shadow-neumorph-pressed text-neumorph-accent" 
                  : "bg-neumorph-bg shadow-neumorph-convex hover:shadow-neumorph-pressed text-neumorph-text hover:text-neumorph-accent"
              )}
              aria-label="View Tech Stack"
            >
              <Icons.FaCode className="w-6 h-6" />
            </button>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-neumorph-text mb-4">{project.name}</h1>
          <p className="text-xl text-neumorph-accent font-medium mb-12">{project.tagline}</p>
          
          {/* Description Section with Character */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            {/* Interactive Character Image */}
            <motion.div 
              className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 perspective-1000"
              style={{ 
                rotateX, 
                rotateY,
                perspective: 1000 
              }}
            >
               <Image
                 src={project.heroCharacterImage || project.image}
                 alt={`${project.name} Character`}
                 fill
                 className="object-contain drop-shadow-xl"
               />
            </motion.div>

            {/* Description Text */}
            <p className="text-lg text-neumorph-text/80 leading-relaxed text-center md:text-left max-w-xl">
              {project.description}
            </p>
          </div>

          {/* Animated Tech Stack */}
          <AnimatePresence>
            {showTechStack && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 48 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-3 p-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-neumorph-bg shadow-neumorph-flat text-sm font-semibold text-neumorph-text/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-left">
            {project.features.map((feature, i) => (
              <NeumorphCard key={i} concave className="flex items-center p-3 text-neumorph-text text-sm">
                <div className="min-w-[1rem] min-h-[1rem] flex items-center justify-center rounded-full bg-neumorph-accent/10 mr-2">
                    <Icons.Check className="w-3 h-3 text-neumorph-accent" />
                </div>
                <span className="font-medium">{feature}</span>
              </NeumorphCard>
            ))}
          </div>

          <AppScreenshotsCarousel screenshots={project.screenshots} initialActiveScreenshot={project.initialActiveScreenshot} />
        </NeumorphCard>
        
        {/* Action Buttons */}
        <div className="flex flex-row justify-center gap-6 mb-8">
          <NeumorphButton 
            onClick={() => setActiveForm(activeForm === "waitlist" ? null : "waitlist")}
            className={`flex items-center justify-center min-w-[12.5rem] ${activeForm === "waitlist" ? "text-emerald-500" : ""}`}
          >
            <Icons.Mail className="mr-2 w-5 h-5" /> Join Waitlist
          </NeumorphButton>
          <NeumorphButton 
            onClick={() => setActiveForm(activeForm === "bug" ? null : "bug")}
             className={`flex items-center justify-center min-w-[12.5rem] ${activeForm === "bug" ? "text-red-500" : ""}`}
          >
            <Icons.Bug className="mr-2 w-5 h-5" /> Report a Bug
          </NeumorphButton>
        </div>

        {/* Conditional Forms with Animation */}
        <div ref={formContainerRef} className="w-full">
          <AnimatePresence mode="wait">
            {activeForm === "waitlist" && (
              <motion.div
                key="waitlist"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="pb-20"
              >
                <ContactForm type="waitlist" projectId={project.id} />
              </motion.div>
            )}
            
            {activeForm === "bug" && (
              <motion.div
                key="bug"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="pb-20"
              >
                  <ContactForm type="bug-report" projectId={project.id} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}