# Project Gemini: HansonBuilds Development Hub

## Overview
This document serves as the development entry point and context for the HansonBuilds web project. The application acts as a central portfolio hub, hosting landing pages for multiple software projects (initially three iOS apps). 

**Primary Goals:**
1.  **Showcase:** Highlight development abilities through a creative, interactive web experience.
2.  **Aggregation:** Centralize access to independent app projects.
3.  **Growth:** Collect user data/leads (waitlists, newsletters) for specific apps.

## Design Philosophy
- **Aesthetic:** **Neumorphic (Soft UI)**.
    - Emphasis on subtle shadows, highlights, and depth to create a tactile, "extruded" plastic feel.
    - Minimalist color palette with strong accent colors for actions.
- **Experience:** Fluid animations, "creative" layout structures, and high interactivity to demonstrate technical proficiency.

## Technology Stack

### Architecture: Monorepo
- **Manager:** [Turborepo](https://turbo.build/)
    - Efficient build caching and task orchestration.
- **Package Manager:** (Implied: npm/pnpm/yarn - to be decided during scaffold)

### Web Application
- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    - *Note:* Will require specific configuration/plugins for Neumorphic shadow utilities.
- **Testing:** [Vitest](https://vitest.dev/)

### Code Quality & Tooling
- **Linting:** ESLint
- **Formatting:** Prettier

## Implementation Plan

### Phase 1: Infrastructure Scaffold
- Initialize Turborepo workspace.
- Configure shared configurations (`eslint-config`, `tsconfig`).
- Setup `apps/web` (Next.js) with TypeScript and Tailwind.

### Phase 2: Design System (Neumorphism)
- Configure Tailwind `box-shadow` utilities for:
    - `shadow-neumorph-flat`
    - `shadow-neumorph-pressed`
    - `shadow-neumorph-convex`
    - `shadow-neumorph-concave`
- Build core UI components (Cards, Buttons, Inputs) using these styles.

### Phase 3: Core Features
- **Home/Hub Page:** 
    - Implemented "Half-Oval Project Carousel" with 3D positioning and fluid animations.
    - Features active state character pop-ups triggered by hover or scroll visibility.
    - Responsive Scaling: Cards scaled to ~75% on small screens and ~90% on medium screens relative to large desktop size.
    - Hover Dynamics: Non-active cards retreat further from the center when the carousel is hovered to spotlight the hero card.
- **Project Template:** Reusable layout for individual App Landing Pages with segmented "Project Selector" navigation.
- **Data Capture:** Integration for email forms (Waitlist/Bug Reports).
- **Data Model:** Added `shortDescription` to project types for concise carousel text.
