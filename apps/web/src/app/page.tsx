"use client";

import { ProjectCarousel } from "@/components/ProjectCarousel";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 mb-8 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-neumorph-text mb-6 leading-tight">
          HansonBuilds
        </h1>
        <p className="text-xl md:text-2xl text-neumorph-text/80 max-w-3xl mx-auto leading-relaxed">
          Showcasing a passion for development through creative, interactive web experiences and robust mobile applications.
        </p>
      </section>

      {/* Projects Carousel Section */}
      <section className="w-full pb-20">
        <ProjectCarousel />
      </section>
    </>
  );
}