"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  company: string;
  seats: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  seats: "",
  message: "",
};

export default function DemoRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      setStatus("error");
      setErrorMsg("Name, work email, and company are required.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong sending this — try emailing hello@veltrax.in directly.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-xl border border-[#39D98A]/30 bg-[#39D98A]/10 px-6 py-10 text-center"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#39D98A]/20 text-[#39D98A]">
          <Check className="h-5 w-5" />
        </div>
        <p className="font-semibold text-white dark:text-white light:text-black">Request received.</p>
        <p className="text-sm text-white/50 dark:text-white/50 light:text-black/50">We&apos;ll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/50 dark:text-white/50 light:text-black/50">Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={update("name")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#4F8CFF]/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/25 light:border-black/15 light:bg-black/5 light:text-black light:placeholder-black/30"
            placeholder="Jane Doe"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/50 dark:text-white/50 light:text-black/50">Work email *</label>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#4F8CFF]/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/25 light:border-black/15 light:bg-black/5 light:text-black light:placeholder-black/30"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/50 dark:text-white/50 light:text-black/50">Company *</label>
          <input
            type="text"
            value={form.company}
            onChange={update("company")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#4F8CFF]/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/25 light:border-black/15 light:bg-black/5 light:text-black light:placeholder-black/30"
            placeholder="Acme Corp"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/50 dark:text-white/50 light:text-black/50">Approx. staff seats</label>
          <input
            type="text"
            value={form.seats}
            onChange={update("seats")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#4F8CFF]/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/25 light:border-black/15 light:bg-black/5 light:text-black light:placeholder-black/30"
            placeholder="e.g. 30"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/50 dark:text-white/50 light:text-black/50">
          What are you tracking today? (optional)
        </label>
        <textarea
          value={form.message}
          onChange={update("message")}
          rows={3}
          className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#4F8CFF]/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/25 light:border-black/15 light:bg-black/5 light:text-black light:placeholder-black/30"
          placeholder="Excel sheets, a legacy tool, nothing yet..."
        />
      </div>

      <AnimatePresence>
        {status === "error" && errorMsg && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-400"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
        whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
        className="mt-2 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#4F8CFF] via-[#47D7FF]/80 to-[#9D7DFF] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request a demo
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}