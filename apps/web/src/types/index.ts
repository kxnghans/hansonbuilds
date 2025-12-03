export interface AppProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  links?: {
    demo?: string;
    repo?: string;
  };
}
