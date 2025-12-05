export interface AppProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription?: string[];
  features: string[];
  techStack: string[];
  image: string;
  heroCharacterImage?: string;
  screenshots?: string[];
  popHeightRatio?: number;
  initialActiveScreenshot?: string;
  links?: {
    demo?: string;
    repo?: string;
  };
}
