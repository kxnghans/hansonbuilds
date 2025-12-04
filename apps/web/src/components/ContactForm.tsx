import { useState } from "react";
import { motion } from "framer-motion";
import { NeumorphCard } from "./NeumorphCard";
import { NeumorphButton } from "./NeumorphButton";
import { NeumorphInput } from "./NeumorphInput";
import { db, storage } from "@/lib/firebase"; // Import db and storage from firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage functions
import { PROJECT_LIST } from "@/data/projects";
import { Icons } from "./Icons";

interface ContactFormProps {
  type: "contact" | "bug-report" | "waitlist";
  projectId?: string; // Optional. If provided, locks the context to this project.
}

export const ContactForm = ({ type, projectId }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    // Additional fields for bug report / waitlist
    appId: projectId || "", // Initialize to empty string if no projectId, to show "Select Project"
    description: "",
    severity: "low",
  });
  const [file, setFile] = useState<File | null>(null); // State for file upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error status on change to remove red rings
    if (submitStatus === "error") {
        setSubmitStatus(null);
    }
    // Reset success status on new input to reset button animation
    if (submitStatus === "success") {
        setSubmitStatus(null);
    }
  };
  
  // ... rest of the component until the button ...
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic validation for project selection if dropdown is visible and "Select Project" is still chosen
    if (showProjectDropdown && !formData.appId) {
      setSubmitStatus("error");
      // Provide a more specific error message if desired
      console.error("Please select a project.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (type === "contact") {
        await addDoc(collection(db, "contacts"), {
          type: "general",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          createdAt: serverTimestamp(),
        });
      } else if (type === "waitlist") {
         await addDoc(collection(db, "contacts"), {
          type: "waitlist",
          appId: formData.appId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Joined waitlist for ${formData.appId}`,
          createdAt: serverTimestamp(),
        });
      } else if (type === "bug-report") {
        let fileUrl = "";
        if (file) {
            const storageRef = ref(storage, `bug-reports/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            fileUrl = await getDownloadURL(storageRef);
        }

        await addDoc(collection(db, "bug_reports"), {
          appId: formData.appId,
          description: formData.description,
          severity: formData.severity,
          attachmentUrl: fileUrl,
          createdAt: serverTimestamp(),
        });
      }
      
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        appId: projectId || "", // Reset to empty string after successful submission if dropdown is active
        description: "",
        severity: "low",
      });
      setFile(null);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  let title = "Contact Us";
  let btnText = "Send Message";
  if (type === "bug-report") {
    title = "Report a Bug";
    btnText = "Submit Bug Report";
  } else if (type === "waitlist") {
    title = "Join the Waitlist";
    btnText = "Waitlist";
  }

  const showProjectDropdown = !projectId && (type === "bug-report" || type === "waitlist");
  const showProjectLocked = projectId && (type === "bug-report" || type === "waitlist");
  const hasError = submitStatus === "error";

  const getInputRingClass = (isError: boolean) => 
    isError ? "focus:ring-red-500" : "focus:ring-neumorph-accent";

  return (
    <NeumorphCard className="p-6 md:p-8 w-full max-w-2xl mx-auto mt-6 shadow-neumorph-convex">
      <h3 className="text-xl font-semibold mb-6 text-neumorph-text text-left">
        {title}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Selection - Moved to top */}
        {showProjectDropdown && (
           <div className="relative text-left">
            <label htmlFor="appId" className="block text-sm font-medium text-neumorph-text mb-1 ml-1">
              <span className="text-red-500 mr-1">*</span> Select Project
            </label>
            <div className="relative"> {/* Added relative div here */}
              <select
                id="appId"
                name="appId"
                className={`w-full p-3 border border-transparent rounded-lg shadow-neumorph-concave bg-neumorph-bg text-neumorph-text placeholder-neumorph-text/40 focus:outline-none focus:ring-2 text-base appearance-none ${getInputRingClass(hasError && !formData.appId)}`}
                value={formData.appId}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>Select Project</option> {/* Added placeholder option */}
                {PROJECT_LIST.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neumorph-text/70 pointer-events-none" /> {/* Added ChevronDown */}
            </div>
          </div>
        )}
        
        {showProjectLocked && (
           <NeumorphInput
              label="Project"
              id="projectName"
              name="projectName"
              type="text"
              value={PROJECT_LIST.find(p => p.id === projectId)?.name || projectId}
              readOnly
              className="opacity-75 cursor-not-allowed"
            />
        )}

        {/* Name, Email, Phone for Contact and Waitlist */}
        {(type === "contact" || type === "waitlist") && (
          <>
            <NeumorphInput
              label="Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              error={hasError}
            />
            <NeumorphInput
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              error={hasError}
            />
            <NeumorphInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              // Phone is optional in schema, so no required asterisk or error state strictly needed unless validated
            />
          </>
        )}

        {/* Message Field for Contact */}
        {type === "contact" && (
            <div className="relative text-left">
              <label htmlFor="message" className="block text-sm font-medium text-neumorph-text mb-1 ml-1">
                <span className="text-red-500 mr-1">*</span> Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`w-full p-3 border border-transparent rounded-lg shadow-neumorph-concave bg-neumorph-bg text-neumorph-text placeholder-neumorph-text/40 focus:outline-none focus:ring-2 text-base ${getInputRingClass(hasError)}`}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>
        )}

        {/* Fields specific to Bug Report */}
        {type === "bug-report" && (
          <>
            <div className="relative text-left">
              <label htmlFor="description" className="block text-sm font-medium text-neumorph-text mb-1 ml-1">
                <span className="text-red-500 mr-1">*</span> Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className={`w-full p-3 border border-transparent rounded-lg shadow-neumorph-concave bg-neumorph-bg text-neumorph-text placeholder-neumorph-text/40 focus:outline-none focus:ring-2 text-base ${getInputRingClass(hasError)}`}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what happened..."
                required
              ></textarea>
            </div>
            <div className="relative text-left">
              <label htmlFor="severity" className="block text-sm font-medium text-neumorph-text mb-1 ml-1">
                 <span className="text-red-500 mr-1">*</span> Severity
              </label>
              <div className="relative"> {/* Added relative div here */}
                <select
                  id="severity"
                  name="severity"
                  className={`w-full p-4 border border-transparent rounded-xl shadow-neumorph-concave bg-neumorph-bg text-neumorph-text placeholder-neumorph-text/40 focus:outline-none focus:ring-2 text-base appearance-none ${getInputRingClass(false)}`}
                  value={formData.severity}
                  onChange={handleChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neumorph-text/70 pointer-events-none" /> {/* Added ChevronDown */}
              </div>
            </div>
            
            {/* File Upload for Bug Report */}
            <div className="relative text-left">
                <label htmlFor="supportingDoc" className="block text-sm font-medium text-neumorph-text mb-1 ml-1">
                    Supporting Document
                </label>
                <div className="relative w-full">
                     <input
                        type="file"
                        id="supportingDoc"
                        name="supportingDoc"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                     />
                     <label 
                        htmlFor="supportingDoc" 
                        className={`flex items-center justify-between w-full p-3 border border-transparent rounded-lg shadow-neumorph-concave bg-neumorph-bg text-neumorph-text cursor-pointer hover:bg-neumorph-bg/50 transition-colors focus:outline-none focus:ring-2 text-base ${getInputRingClass(false)}`}
                     >
                        <span className={`truncate ${!file ? 'text-neumorph-text/40' : 'text-neumorph-text'}`}>
                            {file ? file.name : "Upload screenshot or PDF (Optional)"}
                        </span>
                        <Icons.Upload className="w-5 h-5 text-neumorph-text/60" />
                     </label>
                </div>
                 <p className="text-xs text-neumorph-text/60 mt-1 ml-1">
                    Supported formats: PDF, JPG, PNG.
                </p>
            </div>
          </>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="flex items-center justify-center max-w-xs mx-auto py-3 px-6 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed bg-neumorph-bg text-neumorph-text shadow-neumorph-flat active:shadow-neumorph-pressed overflow-hidden"
          style={{ 
            "--neumorph-offset-base": "0.1875rem", 
            "--neumorph-blur-base": "0.375rem",
            "--neumorph-offset-mid": "0.1875rem",
            "--neumorph-blur-mid": "0.375rem",
          } as React.CSSProperties}
        >
          <div className="relative flex items-center justify-center">
             <motion.div
               initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
               animate={
                  submitStatus === "success" 
                  ? { x: 100, y: -10, rotate: -20, opacity: 0 } 
                  : { x: 0, y: 0, rotate: 0, opacity: 1 }
               }
               transition={{ duration: 0.6, ease: "easeInOut" }}
               className="mr-2"
             >
               <Icons.PaperPlane className="w-4 h-4" />
             </motion.div>
             
             <motion.span
                animate={{ opacity: submitStatus === "success" ? 0 : 1 }}
                transition={{ duration: 0.3 }}
             >
                {isSubmitting ? "Sending..." : btnText}
             </motion.span>
          </div>
        </button>

        {submitStatus === "success" && (
          <p className="text-green-500 mt-2 text-center font-medium">
            {type === "waitlist" ? "You've been added to the waitlist!" : "Submitted successfully!"}
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-500 mt-2 text-center">
            Error submitting form. Please check required fields.
          </p>
        )}
      </form>
    </NeumorphCard>
  );
};
