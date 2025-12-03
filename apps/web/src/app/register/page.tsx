import { ContactForm } from "@/components/ContactForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full p-4">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-neumorph-text mb-4">Join the Waitlist</h1>
        <p className="text-neumorph-text/80 text-lg">
          Get early access and updates for your favorite projects.
        </p>
      </div>
      <ContactForm type="waitlist" />
    </div>
  );
}
