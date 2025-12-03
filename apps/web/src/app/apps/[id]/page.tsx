"use client";

import Link from "next/link";
import { useState } from "react";
import { NeumorphCard } from "@/components/NeumorphCard";
import { NeumorphButton } from "@/components/NeumorphButton";
import { PROJECTS } from "@/data/projects";
import { ArrowLeft, Check, ExternalLink, Mail, Bug } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function AppLandingPage({ params }: { params: { id: string } }) {
  const project = PROJECTS[params.id];
  const [activeForm, setActiveForm] = useState<"waitlist" | "bug" | null>(null);

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

  return (
    <div className="flex flex-col items-center p-8 md:p-12 transition-colors duration-300 w-full">
      <nav className="w-full max-w-4xl flex justify-start items-center mb-12">
        <Link href="/" className="flex items-center text-neumorph-text hover:text-neumorph-accent transition-colors">
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to Hub
        </Link>
      </nav>

      <div className="max-w-4xl w-full text-center">
        <NeumorphCard convex className="p-8 md:p-16 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-neumorph-text mb-4">{project.name}</h1>
          <p className="text-xl text-neumorph-accent font-medium mb-8">{project.tagline}</p>
          
          <p className="text-lg text-neumorph-text/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            {project.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-neumorph-bg shadow-neumorph-flat text-sm font-semibold text-neumorph-text/70">
                {tech}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
            {project.features.map((feature, i) => (
              <NeumorphCard key={i} concave className="flex items-center p-5 text-neumorph-text">
                <div className="min-w-[24px] min-h-[24px] flex items-center justify-center rounded-full bg-neumorph-accent/10 mr-4">
                    <Check className="w-4 h-4 text-neumorph-accent" />
                </div>
                <span className="font-medium">{feature}</span>
              </NeumorphCard>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
            <NeumorphButton variant="primary" className="flex items-center justify-center">
              View Details <ExternalLink className="ml-2 w-4 h-4" />
            </NeumorphButton>
          </div>
        </NeumorphCard>
        
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <NeumorphButton 
            onClick={() => setActiveForm(activeForm === "waitlist" ? null : "waitlist")}
            className={`flex items-center justify-center min-w-[200px] ${activeForm === "waitlist" ? "text-emerald-500" : ""}`}
          >
            <Mail className="mr-2 w-5 h-5" /> Join Waitlist
          </NeumorphButton>
          <NeumorphButton 
            onClick={() => setActiveForm(activeForm === "bug" ? null : "bug")}
             className={`flex items-center justify-center min-w-[200px] ${activeForm === "bug" ? "text-red-500" : ""}`}
          >
            <Bug className="mr-2 w-5 h-5" /> Report a Bug
          </NeumorphButton>
        </div>

        {/* Conditional Forms */}
        {activeForm === "waitlist" && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
             <ContactForm type="waitlist" projectId={project.id} />
          </div>
        )}
        
        {activeForm === "bug" && (
           <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <ContactForm type="bug-report" projectId={project.id} />
           </div>
        )}

      </div>
    </div>
  );
}