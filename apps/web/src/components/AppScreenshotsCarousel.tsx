"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/hooks/useCarousel";

interface AppScreenshotsCarouselProps {
  screenshots?: string[];
  initialActiveScreenshot?: string;
}

export function AppScreenshotsCarousel({ screenshots = [], initialActiveScreenshot }: AppScreenshotsCarouselProps) {
  const initialIndex = initialActiveScreenshot
    ? screenshots.findIndex(src => src === initialActiveScreenshot)
    : 0;
    
  const { activeIndex, setIndex, next, prev, handleDragEnd, getRelativeIndex } = useCarousel({
    count: screenshots.length,
    initialIndex: initialIndex >= 0 ? initialIndex : 0
  });

  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isAutoFocused, setIsAutoFocused] = useState(false);

  // Determine highlight state based on hover or touch auto-focus
  const shouldHighlight = isHovered || (isTouchDevice && isAutoFocused);

  // Handle touch detection and initial auto-focus delay
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
      
      if (isTouch) {
        const timer = setTimeout(() => {
          setIsAutoFocused(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    checkTouch();
    window.matchMedia("(pointer: coarse)").addEventListener('change', checkTouch);
    return () => window.matchMedia("(pointer: coarse)").removeEventListener('change', checkTouch);
  }, []);

  // Auto-rotate functionality
  useEffect(() => {
    // Stop rotation if highlights are active (hovered or touch-focused)
    if (screenshots.length <= 1 || shouldHighlight) return;
    
    const timer = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(timer);
  }, [screenshots.length, shouldHighlight, next]);

  if (!screenshots.length) return null;

  const handleNext = () => {
    next();
    if (isTouchDevice) setIsAutoFocused(true);
  };

  const handlePrev = () => {
    prev();
    if (isTouchDevice) setIsAutoFocused(true);
  };

  // Wrapper for drag to include touch focus side effect
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      handleDragEnd(event, info);
      // Note: useCarousel's handleDragEnd calls next()/prev().
      // We want to ensure focus is set if a drag occurs.
      // Since handleDragEnd triggers the state change, we can just detect the drag result.
      // However, simplest way to mirror original behavior is to re-implement the check or just set focused.
      if (Math.abs(info.offset.x) > 50) {
         if (isTouchDevice) setIsAutoFocused(true);
      }
  };

  const getVariant = (index: number) => {
    const diff = getRelativeIndex(index);
    const length = screenshots.length;
    
    let positionStr = "hidden";
    if (diff === 0) positionStr = "center";
    else if (diff === 1) positionStr = "right";
    else if (diff === length - 1) positionStr = "left";
    else if (diff === 2) positionStr = "far-right";
    else if (diff === length - 2) positionStr = "far-left";

    const sideHoverY = "-55%";
    const centerBaseY = "-50%";
    const sideBaseX = "70%";
    const sideHoverX = "85%";
    
    // Far positions just need to be outside the visible area but ready to slide in
    const farBaseX = "100%"; 

    switch (positionStr) {
      case "center":
        return {
          x: "0%",
          y: centerBaseY,
          scale: shouldHighlight ? 1.05 : 1,
          zIndex: 20,
          opacity: 1,
          filter: "blur(0px)",
          display: "block",
        };
      case "right":
        return {
          x: shouldHighlight ? sideHoverX : sideBaseX,
          y: shouldHighlight ? sideHoverY : centerBaseY,
          scale: shouldHighlight ? 0.75 : 0.85,
          zIndex: 10,
          opacity: 0.8,
          filter: "blur(0px)",
          display: "block",
        };
      case "left":
        return {
          x: shouldHighlight ? `-${sideHoverX}` : `-${sideBaseX}`,
          y: shouldHighlight ? sideHoverY : centerBaseY,
          scale: shouldHighlight ? 0.75 : 0.85,
          zIndex: 10,
          opacity: 0.8,
          filter: "blur(0px)",
          display: "block",
        };
      case "far-right":
        return {
          x: farBaseX,
          y: centerBaseY,
          scale: 0.6,
          zIndex: 5,
          opacity: 0, // Invisible but present
          filter: "blur(5px)",
          display: "block", // Key: Rendered in DOM
        };
      case "far-left":
        return {
          x: `-${farBaseX}`,
          y: centerBaseY,
          scale: 0.6,
          zIndex: 5,
          opacity: 0, // Invisible but present
          filter: "blur(5px)",
          display: "block", // Key: Rendered in DOM
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
      className="relative w-full h-[38.6rem] flex items-center justify-center py-6 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-[41.25rem] h-full flex items-center justify-center">
        {screenshots.map((src, index) => {
          const isActive = index === activeIndex;
          const length = screenshots.length;
          const diff = getRelativeIndex(index);
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
              onDragEnd={onDragEnd}
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
                 // Base size - Adjusted for modern mobile aspect ratio (approx 19.5:9) - Scaled +10% from previous 75%
                 "w-[14.1rem] h-[30.5rem]",
                 // Frame Styling (Active vs Inactive)
                 isActive 
                   ? "bg-gray-900 rounded-[2.5rem] shadow-2xl border-[0.375rem] border-gray-800" // iPhone Frame
                   : "bg-transparent rounded-[0.75rem] shadow-lg border-0" // Plain Screenshot
               )}>
                 
                 {/* Notch (Only visible when active) */}
                 <div className={cn(
                   "absolute top-0 left-1/2 transform -translate-x-1/2 w-[6.6rem] h-[1.25rem] bg-black rounded-b-lg z-20 pointer-events-none transition-opacity duration-300",
                   isActive ? "opacity-100" : "opacity-0"
                 )}></div>
                 
                 {/* Screen Content Container */}
                 <div className={cn(
                   "relative w-full h-full overflow-hidden transition-all duration-500",
                   isActive ? "rounded-[2.1rem] bg-black" : "rounded-[0.75rem] bg-transparent"
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
                     isActive ? "opacity-100 rounded-[2.1rem]" : "opacity-0"
                   )}></div>
                 </div>

                 {/* Home Bar (Only visible when active) */}
                 <div className={cn(
                   "absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-[6.6rem] h-[2.5px] bg-gray-500 rounded-full z-20 opacity-50 pointer-events-none transition-opacity duration-300",
                   isActive ? "opacity-100" : "opacity-0"
                 )}></div>
                 
               </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
         {screenshots.map((_, i) => (
           <button
             key={i} 
             onClick={() => {
               setIndex(i);
               if (isTouchDevice) setIsAutoFocused(true);
             }}
             className={cn(
               "w-2 h-2 rounded-full transition-all duration-300 shadow-sm",
               i === activeIndex ? "bg-neumorph-accent w-[1.25rem]" : "bg-neumorph-text/20 hover:bg-neumorph-text/40"
             )}
             aria-label={`Go to slide ${i + 1}`}
           />
         ))}
      </div>
    </div>
  );
}