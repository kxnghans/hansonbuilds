import { AppProject } from "@/types";

export const PROJECTS: Record<string, AppProject> = {
  milcalc: {
    id: "milcalc",
    name: "MilCalc",
    tagline: "Modern Military Finance & Fitness",
    description:
      "MilCalc is a comprehensive suite of tools designed for United States military personnel. It strips away the complexity of government pay charts and fitness regulations, offering a clean, neumorphic interface for accurate calculations. From estimating retirement under the BRS system to adjusting PT scores for altitude, MilCalc handles the math so service members can focus on the mission.",
    features: [
      "Air Force PT Calculator (Altitude Adjusted)",
      "Military Pay Calculator (BAH, BAS, COLA)",
      "Retirement Estimator (High-3 & BRS)",
      "VA Disability Comparison",
      "Secure Cloud Sync via Supabase",
      "Biometric Authentication",
    ],
    techStack: ["React Native", "Expo", "Supabase", "TypeScript", "PostgreSQL"],
  },
  gospelgames: {
    id: "gospelgames",
    name: "Gospel Games",
    tagline: "The Party in Your Pocket",
    description:
      "Designed for youth pastors, small group leaders, and retreats, Gospel Games brings high-energy social interaction to Biblical themes. Avoiding the 'cheesy' trope of Christian media, it utilizes a vibrant Claymorphism aesthetic and modern game mechanics to foster genuine community connections. Whether breaking the ice or engaging in deep theological debates, it's the ultimate toolkit for Christian gatherings.",
    features: [
      "Never Have I Ever: Biblical Edition",
      "Would You Rather: Prophets & Parables",
      "Biblical Banter (Voting Game)",
      "Blind Rankings",
      "Pharisee (Social Deduction)",
      "Daily Scripture Wordle",
    ],
    techStack: ["React Native", "Reanimated", "Firebase", "Expo"],
  },
  unpack: {
    id: "unpack",
    name: "Unpack",
    tagline: "Get it out of the group chat",
    description:
      "Group travel planning is broken. It lives in messy group chats, buried spreadsheets, and lost email threads. Unpack creates a centralized, collaborative hub for your next adventure. Assign packing responsibilities, vote on itineraries, and track shared expenses in real-time. It's your digital travel buddy that ensures no one forgets their toothbrush—or their passport.",
    features: [
      "Collaborative Itinerary Builder",
      "Shared Packing Lists",
      "Expense Splitting & Tracking",
      "Document Secure Storage",
      "Real-time Chat Integration",
      "Offline Mode",
    ],
    techStack: ["Next.js", "Expo", "Turborepo", "Tailwind CSS"],
  },
};

export const PROJECT_LIST = Object.values(PROJECTS);
