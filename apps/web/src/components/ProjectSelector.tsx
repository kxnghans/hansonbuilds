"use client";

import Link from "next/link";
import { PROJECT_LIST } from "@/data/projects";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProjectSelector({ currentProjectId }: { currentProjectId: string }) {
  return (
    <nav className="flex items-center p-1.5 rounded-xl bg-neumorph-bg shadow-neumorph-concave">
      <div className="flex w-full">
        {PROJECT_LIST.map((project) => {
          const isActive = project.id === currentProjectId;
          return (
            <Link
              key={project.id}
              href={`/apps/${project.id}`}
              className={cn(
                "relative flex-1 text-center py-2 text-sm font-medium transition-colors rounded-lg z-10 whitespace-nowrap",
                isActive 
                  ? "text-neumorph-accent" 
                  : "text-neumorph-text hover:text-neumorph-accent/80"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProjectPill"
                  className="absolute inset-0 bg-neumorph-bg shadow-neumorph-flat rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {project.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
