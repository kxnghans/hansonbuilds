"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NeumorphCard } from "@/components/NeumorphCard";
import { NeumorphInput } from "@/components/NeumorphInput";
import { NeumorphButton } from "@/components/NeumorphButton";

export default function RegisterPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Simulate API call
    console.log("Submitting data for", params.id, data);

    setTimeout(() => {
      setStatus("success");
    }, 1500);
  }

  if (status === "success") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <NeumorphCard convex className="p-10 max-w-md w-full">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-neumorph-concave">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-neumorph-text mb-2">You're on the list!</h2>
          <p className="text-neumorph-text/80 mb-8">Thanks for registering for {params.id}. We'll be in touch soon.</p>
          <Link href="/" className="text-neumorph-accent font-medium hover:underline">
            Return to Home
          </Link>
        </NeumorphCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <NeumorphCard className="p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-neumorph-text mb-6 text-center">Join the {params.id} Waitlist</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <NeumorphInput
            label="Full Name"
            id="name"
            name="name"
            required
            placeholder="Jane Doe"
          />

          <NeumorphInput
            label="Email Address"
            type="email"
            id="email"
            name="email"
            required
            placeholder="jane@example.com"
          />

          <NeumorphButton
            type="submit"
            variant="primary"
            disabled={status === "submitting"}
            className="mt-4"
          >
            {status === "submitting" ? "Joining..." : "Join Waitlist"}
          </NeumorphButton>
        </form>

        <div className="mt-6 text-center">
          <Link href={`/apps/${params.id}`} className="text-sm text-neumorph-text/60 hover:text-neumorph-text">
            Cancel
          </Link>
        </div>
      </NeumorphCard>
    </main>
  );
}
