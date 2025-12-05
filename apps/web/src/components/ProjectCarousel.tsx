"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PROJECT_LIST } from "@/data/projects";
import { NeumorphCard } from "./NeumorphCard";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/hooks/useCarousel";

export function ProjectCarousel() {
  // Start with middle project (Gospel Games usually) active
  const { activeIndex, next, prev, handleDragEnd, getRelativeIndex } = useCarousel({
    count: PROJECT_LIST.length,
    initialIndex: 1
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null); // Ref for dynamic card height
  const isInView = useInView(containerRef, { amount: 0.5, once: false });
  const [isHovered, setIsHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState(30 * 16); // Default to previous fixed height in pixels

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [cardRef.current]); // Re-measure if cardRef.current changes (though it shouldn't once mounted)

  // Calculate position based on offset from active index
  const getVariant = (index: number) => {
    const relativeIndex = getRelativeIndex(index);
    
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
      className="relative w-full h-[34rem] flex items-center justify-center py-10 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {PROJECT_LIST.map((project, index) => {
          const isCenter = getRelativeIndex(index) === 0;
          
                                // Character Pop-up Logic
                                // Trigger if it's the center card AND (hovered OR scrolled into view)
                                const showCharacter = isCenter && isHovered;
                      
                                // Image Height: 12rem (h-48)
                                const imageHeight = 12; // 12rem
                                
                                // Pop-up calculation uses dynamically measured cardHeight
                                const popRatio = project.popHeightRatio || 0.25;
                                const popUpY = -1 * imageHeight * popRatio;
                      
                                return (
                                  <motion.div
                                    key={project.id}
                                    className="absolute w-[17.1rem]" // Height is now dynamic
                                    initial={false}
                                    animate={getVariant(index)}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.1}
                                    onDragEnd={handleDragEnd}
                                    // Allow clicking side cards to navigate
                                    onClick={() => {
                                      const relativeIndex = getRelativeIndex(index);
                                      if (relativeIndex === 1) next(); // Right card clicked
                                      if (relativeIndex === 2) prev(); // Left card clicked
                                    }}
                                  >
                                                  {/* Character Image - Pops up from BEHIND the card content but effectively "inside" the container */}
                                                  <motion.div
                                                    className="absolute left-0 right-0 mx-auto w-[80%] z-0 pointer-events-none flex justify-center"
                                                    initial={{ y: "0rem", opacity: 0 }}
                                                    animate={{
                                                      y: showCharacter ? `${popUpY}rem` : "0rem", 
                                                      opacity: showCharacter ? 1 : 0 
                                                    }}
                                                    transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
                                                  >                                       <div className={cn("relative w-full h-48", project.id === "milcalc" && "scale-110")}>
                                         <Image
                                           src={project.image}
                                           alt={`${project.name} Character`}
                                           fill
                                           className="object-contain drop-shadow-2xl"
                                         />
                                       </div>
                                    </motion.div>              {/* The Card Itself */}
            <Link 
              ref={index === 0 ? cardRef : null} 
              href={`/apps/${project.id}`} 
              className={cn("block h-full relative z-10", !isCenter && "pointer-events-none cursor-default")}
            >
              <NeumorphCard 
                convex={isCenter}
                concave={!isCenter}
                className={cn(
                  "p-6 flex flex-col bg-neumorph-bg transition-colors duration-300",
                  isCenter ? "border border-neumorph-text/5" : "opacity-90"
                )}
              >
                 {/* Header */}
                 <div className="flex items-center justify-between mb-5">
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
                   <h2 className="text-xl font-bold text-neumorph-text mb-2">{project.name}</h2>
                   <p className="text-sm font-bold text-neumorph-accent mb-5 uppercase tracking-wide">{project.tagline}</p>
                   <div className="text-sm text-neumorph-text/80 leading-relaxed">
                     {(project.shortDescription || [project.description]).map((text, i) => (
                       <p key={i} className={cn({ "mb-2": i < (project.shortDescription?.length || 0) - 1 })}> 
                         {text}
                       </p>
                     ))}
                   </div>
                 </div>

                 {/* Action */}
                 <div className={cn(
                   "mt-5 pt-5 border-t border-neumorph-text/5 flex items-center text-neumorph-accent font-medium transition-opacity",
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
      
      {/* Navigation Indicators (Dots) */}
      <div className="absolute bottom-4 flex gap-3">
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
