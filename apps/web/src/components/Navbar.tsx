"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { PROJECT_LIST } from "@/data/projects";
import { Icons } from "./Icons";
import { AnimatedBurgerIcon } from "./AnimatedBurgerIcon";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBuildsOpen, setIsBuildsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsBuildsOpen(false);
  };

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scaleY: 0.95,
      transformOrigin: "top",
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      y: 0,
      scaleY: 1,
      transformOrigin: "top",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scaleY: 0.95,
      transformOrigin: "top",
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const submenuVariants = {
    hidden: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <nav className="w-full max-w-5xl flex items-center justify-between py-4 px-4 md:px-0 relative z-50">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-neumorph-text" onClick={handleLinkClick}>
        <Icons.Home size={24} />
        HansOnBuilds
      </Link>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <button
          className="text-neumorph-text focus:outline-none relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <AnimatedBurgerIcon isOpen={isOpen} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-16 right-0 w-64 bg-neumorph-bg shadow-neumorph-convex rounded-lg z-40 py-4 px-4 flex flex-col border border-neumorph-text/5 origin-top"
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="text-neumorph-text text-lg hover:text-neumorph-accent font-medium block" 
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>

              {/* Collapsible Builds Menu */}
              <li
                onMouseEnter={() => setIsBuildsOpen(true)}
                onMouseLeave={() => setIsBuildsOpen(false)}
              >
                <button 
                  onClick={() => setIsBuildsOpen(!isBuildsOpen)}
                  className="w-full flex justify-between items-center text-neumorph-text text-lg hover:text-neumorph-accent font-medium focus:outline-none"
                >
                  Builds
                  <motion.span
                    animate={{ rotate: isBuildsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icons.ChevronDown size={20} />
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {isBuildsOpen && (
                    <motion.ul
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden ml-4 space-y-2 border-l-2 border-neumorph-text/10 pl-3"
                    >
                      {PROJECT_LIST.map((project) => (
                        <li key={project.id} className="first:pt-2">
                          <Link 
                            href={`/apps/${project.id}`} 
                            className="text-neumorph-text/80 hover:text-neumorph-accent block text-base"
                            onClick={handleLinkClick}
                          >
                            {project.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link 
                  href="/register" 
                  className="text-neumorph-text text-lg hover:text-neumorph-accent font-medium block" 
                  onClick={handleLinkClick}
                >
                  Join Waitlist
                </Link>
              </li>

              <li>
                <Link 
                  href="/bug-report" 
                  className="text-neumorph-text text-lg hover:text-neumorph-accent font-medium block" 
                  onClick={handleLinkClick}
                >
                  Report Bug
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
