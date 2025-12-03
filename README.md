# HansonBuilds Development Hub

This is the central portfolio hub for HansonBuilds, hosting landing pages for multiple software projects. The application is built with a focus on **Neumorphic (Soft UI)** design, offering a creative and interactive web experience.

## Tech Stack

- **Architecture:** Monorepo managed by [Turborepo](https://turbo.build/)
- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Firebase](https://firebase.google.com/) (Firestore for database, Storage for future image uploads)

## Features

-   **Responsive Navigation:** Burger menu with a collapsible "Builds" section showcasing projects, "Join Waitlist", "Report Bug" links, and a Theme Toggle.
-   **Homepage:** Engaging Hero section followed by a grid of project cards.
-   **Project Landing Pages:** Detailed information about each project, with expandable "Join Waitlist" and "Report Bug" forms at the bottom.
-   **Standalone Forms:** Dedicated "Join Waitlist" and "Report Bug" pages accessible from the navigation.
-   **Interactive Forms:**
    *   Fields for Name, Email, Phone Number, and Project selection.
    *   Clear placeholder text for all inputs.
    *   Red asterisks for required fields.
    *   Dynamic focus rings: blue when active, red on validation failure.
    *   Paper plane icon on submit buttons for visual flair.

## Getting Started

### Prerequisites

-   Node.js (>=18)
-   pnpm (Package Manager)

### Installation

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    pnpm install
    ```

### Firebase Setup

The project uses Firebase for backend services (Firestore for data, Storage for potential future image uploads).

1.  **Create a Firebase Project:**
    *   Go to [console.firebase.google.com](https://console.firebase.google.com/).
    *   Create a new project.
2.  **Register a Web App:**
    *   In your Firebase project, add a new web app and retrieve your `firebaseConfig` object.
3.  **Set Environment Variables:**
    *   Create a `.env.local` file in the `apps/web` directory.
    *   Add your Firebase configuration details to `.env.local` with the `NEXT_PUBLIC_` prefix (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY="..."`).
4.  **Enable Firestore Database:**
    *   In the Firebase console, navigate to "Build" > "Firestore Database" and create a database (start in production mode).

### Running the Development Server

To start the development server for all apps (currently `apps/web`):

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Accessing from other devices (e.g., phone on the same Wi-Fi):**

1.  Ensure your development server is running (`pnpm dev`).
2.  Find your computer's local IP address (e.g., by running `ipconfig` on Windows or `ifconfig` on macOS/Linux).
3.  On your other device, open a web browser and navigate to `http://YOUR_LOCAL_IP_ADDRESS:3000`.

## Project Structure

-   `apps/web`: The main Next.js web application.
-   `packages/*`: Shared packages (configuration, UI libraries, etc. - *to be implemented*).