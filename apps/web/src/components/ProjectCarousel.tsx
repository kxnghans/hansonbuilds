"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, PanInfo, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PROJECT_LIST } from "@/data/projects";
import { NeumorphCard } from "./NeumorphCard";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

const DRAG_BUFFER = 50;

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle project (Gospel Games usually) active
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5, once: false });
  const [isHovered, setIsHovered] = useState(false);

  // Handle circular navigation
  const getProjectIndex = (index: number) => {
    const length = PROJECT_LIST.length;
    return ((index % length) + length) % length;
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -DRAG_BUFFER) {
      handleNext();
    } else if (info.offset.x > DRAG_BUFFER) {
      handlePrev();
    }
  };

  // Calculate position based on offset from active index
  const getVariant = (index: number) => {
    const length = PROJECT_LIST.length;
    const relativeIndex = (index - (activeIndex % length) + length) % length;
    
    let position = relativeIndex;
    if (relativeIndex === 2) position = -1; // Wrap around for the left item

    const sideBaseX = "88%";
    const sideHoverX = "97%";
    const sideHoverY = "-25%";
    const sideBaseScale = 0.85;
    const sideHoverScale = 0.75;
    const centerHoverScale = 1.05;

    switch (position) {
      case 0: // Center (Active)
        return {
          x: "0%",
          y: "0%",
          scale: isHovered ? centerHoverScale : 1,
          zIndex: 20,
          opacity: 1,
          filter: "blur(0px)",
        };
      case 1: // Right
        return {
          x: isHovered ? sideHoverX : sideBaseX, 
          y: isHovered ? sideHoverY : "0%",
          scale: isHovered ? sideHoverScale : sideBaseScale,
          zIndex: 10,
          opacity: 0.6,
          filter: "blur(1px)",
        };
      case -1: // Left
        return {
          x: isHovered ? `-${sideHoverX}` : `-${sideBaseX}`,
          y: isHovered ? sideHoverY : "0%",
          scale: isHovered ? sideHoverScale : sideBaseScale,
          zIndex: 10,
          opacity: 0.6,
          filter: "blur(1px)",
        };
      default:
        return {
          x: "0%",
          y: "0%",
          scale: 0,
          zIndex: 0,
          opacity: 0,
        };
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "milcalc":
        return <Icons.Smartphone className="w-8 h-8 text-neumorph-accent" />;
      case "unpack":
        return <Icons.Plane className="w-8 h-8 text-neumorph-accent" />;
      case "gospelgames":
        return <Icons.Gamepad2 className="w-8 h-8 text-neumorph-accent" />;
      default:
        return <Icons.Smartphone className="w-8 h-8 text-neumorph-accent" />;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[37.5rem] flex items-center justify-center py-10 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {PROJECT_LIST.map((project, index) => {
          const isCenter = (index - (activeIndex % PROJECT_LIST.length) + PROJECT_LIST.length) % PROJECT_LIST.length === 0;
          
          // Character Pop-up Logic
          // Trigger if it's the center card AND (hovered OR scrolled into view)
          const showCharacter = isCenter && isHovered;

          return (
            <motion.div
              key={project.id}
              className="absolute w-[23.75rem] h-[32.6rem]"
              initial={false}
              animate={getVariant(index)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              // Allow clicking side cards to navigate
              onClick={() => {
                const relativeIndex = (index - (activeIndex % PROJECT_LIST.length) + PROJECT_LIST.length) % PROJECT_LIST.length;
                if (relativeIndex === 1) handleNext(); // Right card clicked
                if (relativeIndex === 2) handlePrev(); // Left card clicked
              }}
            >
              {/* Character Image - Pops up from BEHIND the card content but effectively "inside" the container */}
              <motion.div
                className="absolute left-0 right-0 mx-auto w-[80%] z-0 pointer-events-none flex justify-center"
                initial={{ y: 200, opacity: 0 }}
                animate={{ 
                  y: showCharacter ? -160 : 200, 
                  opacity: showCharacter ? 1 : 0 
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
              >
                 <div className={cn("relative w-full h-48", project.id === "milcalc" && "scale-110")}>
                   <Image
                     src={project.image}
                     alt={`${project.name} Character`}
                     fill
                     className="object-contain drop-shadow-2xl"
                   />
                 </div>
              </motion.div>

              {/* The Card Itself */}
              <Link href={`/apps/${project.id}`} className={cn("block h-full relative z-10", !isCenter && "pointer-events-none cursor-default")}>
                <NeumorphCard 
                  convex={isCenter}
                  concave={!isCenter}
                  className={cn(
                    "h-full p-6 flex flex-col bg-neumorph-bg transition-colors duration-300",
                    isCenter ? "border border-neumorph-text/5" : "opacity-90"
                  )}
                >
                   {/* Header */}
                   <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-full bg-neumorph-bg shadow-neumorph-concave">
                        {getIcon(project.id)}
                      </div>
                      {isCenter && (
                        <div className="text-xs font-bold px-3 py-1 rounded-full bg-neumorph-accent/10 text-neumorph-accent">
                          ACTIVE
                        </div>
                      )}
                   </div>

                   {/* Content */}
                   <div className="flex-grow flex flex-col justify-center">
                     <h2 className="text-3xl font-bold text-neumorph-text mb-2">{project.name}</h2>
                     <p className="text-sm font-bold text-neumorph-accent mb-4 uppercase tracking-wide">{project.tagline}</p>
                     <div className="text-neumorph-text/80 leading-relaxed">
                       {(project.shortDescription || [project.description]).map((text, i) => (
                         <p key={i} className={cn({ "mb-2": i < (project.shortDescription?.length || 0) - 1 })}>
                           {text}
                         </p>
                       ))}
                     </div>
                   </div>

                   {/* Action */}
                   <div className={cn(
                     "mt-6 pt-6 border-t border-neumorph-text/5 flex items-center text-neumorph-accent font-medium transition-opacity",
                     isCenter ? "opacity-100" : "opacity-0"
                   )}>
                     Explore Project <Icons.ArrowRight className="ml-2 w-4 h-4" />
                   </div>
                </NeumorphCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {/* Mobile Navigation Indicators (Dots) */}
      <div className="absolute bottom-4 flex gap-3 md:hidden">
         {PROJECT_LIST.map((_, i) => (
           <div 
             key={i} 
             className={cn(
               "w-2 h-2 rounded-full transition-colors",
               (i === (activeIndex % PROJECT_LIST.length)) ? "bg-neumorph-accent" : "bg-neumorph-text/20"
             )}
           />
         ))}
      </div>
    </div>
  );
}
