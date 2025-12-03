import Link from "next/link";
import { NeumorphCard } from "@/components/NeumorphCard";
import { PROJECT_LIST } from "@/data/projects";
import { Icons } from "@/components/Icons";

export default function Home() {
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
    <>
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-neumorph-text mb-6 leading-tight">
          HansonBuilds
        </h1>
        <p className="text-xl md:text-2xl text-neumorph-text/80 max-w-3xl mx-auto leading-relaxed">
          Showcasing a passion for development through creative, interactive web experiences and robust mobile applications.
        </p>
      </section>

      {/* Projects Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {PROJECT_LIST.map((project) => (
          <Link key={project.id} href={`/apps/${project.id}`} className="block h-full">
            <NeumorphCard className="h-full p-8 hover:shadow-neumorph-pressed transition-all duration-300 transform hover:-translate-y-1 group flex flex-col">
              <div className="mb-6 p-4 rounded-full bg-neumorph-bg shadow-neumorph-concave w-16 h-16 flex items-center justify-center">
                {getIcon(project.id)}
              </div>
              
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-2 text-neumorph-text">
                  {project.name}
                </h2>
                <p className="text-sm font-bold text-neumorph-accent mb-4 uppercase tracking-wide">
                   {project.tagline}
                </p>
                <p className="text-neumorph-text/80 leading-relaxed">
                  {project.description.substring(0, 120)}...
                </p>
              </div>

              <div className="mt-8 flex items-center text-neumorph-accent font-medium group-hover:opacity-80">
                View Project
                <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </NeumorphCard>
          </Link>
        ))}
      </section>
    </>
  );
}