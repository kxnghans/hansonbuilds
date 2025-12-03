import { ContactForm } from "@/components/ContactForm";

export default function BugReportPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full p-4">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-neumorph-text mb-4">Report a Bug</h1>
        <p className="text-neumorph-text/80 text-lg">
          Found an issue? Let us know so we can fix it.
        </p>
      </div>
      <ContactForm type="bug-report" />
    </div>
  );
}
