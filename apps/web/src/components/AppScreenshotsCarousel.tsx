"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, PanInfo } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DRAG_BUFFER = 50;

interface AppScreenshotsCarouselProps {
  screenshots?: string[];
}

export function AppScreenshotsCarousel({ screenshots = [] }: AppScreenshotsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate functionality
  useEffect(() => {
    if (screenshots.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [screenshots.length, isHovered]);

  if (!screenshots.length) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -DRAG_BUFFER) {
      handleNext();
    } else if (info.offset.x > DRAG_BUFFER) {
      handlePrev();
    }
  };

  const getVariant = (index: number) => {
    const length = screenshots.length;
    let diff = (index - activeIndex + length) % length;
    
    let positionStr = "hidden";
    if (diff === 0) positionStr = "center";
    else if (diff === 1) positionStr = "right";
    else if (diff === length - 1) positionStr = "left";

    const sideHoverY = "-55%";
    const centerBaseY = "-50%";
    const sideBaseX = "70%";
    const sideHoverX = "85%";

    switch (positionStr) {
      case "center":
        return {
          x: "0%",
          y: centerBaseY,
          scale: isHovered ? 1.05 : 1,
          zIndex: 20,
          opacity: 1,
          filter: "blur(0px)",
          display: "block",
        };
      case "right":
        return {
          x: isHovered ? sideHoverX : sideBaseX,
          y: isHovered ? sideHoverY : centerBaseY,
          scale: isHovered ? 0.75 : 0.85,
          zIndex: 10,
          opacity: 0.8,
          filter: "blur(0px)",
          display: "block",
        };
      case "left":
        return {
          x: isHovered ? `-${sideHoverX}` : `-${sideBaseX}`,
          y: isHovered ? sideHoverY : centerBaseY,
          scale: isHovered ? 0.75 : 0.85,
          zIndex: 10,
          opacity: 0.8,
          filter: "blur(0px)",
          display: "block",
        };
      default:
        return {
          x: "0%",
          y: "0%", // Keep hidden items effectively "off" or reset
          scale: 0.5,
          zIndex: 0,
          opacity: 0,
          filter: "blur(10px)",
          display: "none",
        };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[46.875rem] flex items-center justify-center py-8 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-[50rem] h-full flex items-center justify-center">
        {screenshots.map((src, index) => {
          const isActive = index === activeIndex;
          const length = screenshots.length;
          const diff = (index - activeIndex + length) % length;
          const isRight = diff === 1;
          const isLeft = diff === length - 1;
          
          return (
            <motion.div
              key={index}
              className={cn(
                "absolute top-1/2",
                (isRight || isLeft) ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
              )}
              initial={false}
              animate={getVariant(index)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              onTap={() => {
                if (isRight) handleNext();
                if (isLeft) handlePrev();
              }}
              style={{ transformOrigin: "center center" }}
            >
               {/* 
                 Conditional Styling for Frame vs No Frame
                 We use transitions on the border-width, rounded-corners, and colors to smoothly morph.
               */}
               <div className={cn(
                 "relative overflow-hidden transition-all duration-500 ease-in-out",
                 // Base size - Adjusted for modern mobile aspect ratio (approx 19.5:9)
                 "w-[17.1rem] h-[37rem]",
                 // Frame Styling (Active vs Inactive)
                 isActive 
                   ? "bg-gray-900 rounded-[3rem] shadow-2xl border-[0.5rem] border-gray-800" // iPhone Frame
                   : "bg-transparent rounded-[1rem] shadow-lg border-0" // Plain Screenshot
               )}>
                 
                 {/* Notch (Only visible when active) */}
                 <div className={cn(
                   "absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20 pointer-events-none transition-opacity duration-300",
                   isActive ? "opacity-100" : "opacity-0"
                 )}></div>
                 
                 {/* Screen Content Container */}
                 <div className={cn(
                   "relative w-full h-full overflow-hidden transition-all duration-500",
                   isActive ? "rounded-[2.5rem] bg-black" : "rounded-[1rem] bg-transparent"
                 )}>
                   <Image
                     src={src}
                     alt={`Screenshot ${index + 1}`}
                     fill
                     className="object-contain"
                     priority={isActive}
                   />
                   
                   {/* Gloss/Reflection (Only Active) */}
                   <div className={cn(
                     "absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30 transition-opacity duration-500",
                     isActive ? "opacity-100 rounded-[2.5rem]" : "opacity-0"
                   )}></div>
                 </div>

                 {/* Home Bar (Only visible when active) */}
                 <div className={cn(
                   "absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-500 rounded-full z-20 opacity-50 pointer-events-none transition-opacity duration-300",
                   isActive ? "opacity-100" : "opacity-0"
                 )}></div>
                 
               </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-40">
         {screenshots.map((_, i) => (
           <button
             key={i} 
             onClick={() => setActiveIndex(i)}
             className={cn(
               "w-2 h-2 rounded-full transition-all duration-300 shadow-sm",
               i === activeIndex ? "bg-neumorph-accent w-6" : "bg-neumorph-text/20 hover:bg-neumorph-text/40"
             )}
             aria-label={`Go to slide ${i + 1}`}
           />
         ))}
      </div>
    </div>
  );
}
