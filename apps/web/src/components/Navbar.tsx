"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { PROJECT_LIST } from "@/data/projects";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBuildsOpen, setIsBuildsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsBuildsOpen(false); // Optional: reset nested menu
  };

  return (
    <nav className="w-full max-w-5xl flex items-center justify-between py-4 px-4 md:px-0 relative z-50">
      <Link href="/" className="text-2xl font-bold text-neumorph-text" onClick={handleLinkClick}>
        HansonBuilds
      </Link>

      <div className="flex items-center space-x-4">
        {/* Desktop Nav could go here, but we are focusing on the burger per instruction */}
        
        <ThemeToggle />
        
        <button
          className="text-neumorph-text focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-neumorph-bg shadow-neumorph-convex rounded-lg z-50 py-4 px-4 flex flex-col border border-neumorph-text/5">
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
                {isBuildsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {isBuildsOpen && (
                <ul className="mt-2 ml-4 space-y-2 border-l-2 border-neumorph-text/10 pl-3">
                  {PROJECT_LIST.map((project) => (
                    <li key={project.id}>
                      <Link 
                        href={`/apps/${project.id}`} 
                        className="text-neumorph-text/80 hover:text-neumorph-accent block text-base"
                        onClick={handleLinkClick}
                      >
                        {project.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
        </div>
      )}
    </nav>
  );
};
