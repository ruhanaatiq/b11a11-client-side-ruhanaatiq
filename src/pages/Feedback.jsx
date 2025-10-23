import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../provider/AuthProvider";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const categories = [
  "General",
  "Website issue",
  "Booking experience",
  "Pricing",
  "Car condition",
  "Support",
];

export default function Feedback() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const prefersReduced = useReducedMotion();

  const [form, setForm] = useState({
    category: "General",
    rating: 5,
    subject: "",
    message: "",
    bookingId: "",
    email: user?.email || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setSuccess(false);
    if (!form.subject.trim() || !form.message.trim()) {
      setErr("Please fill subject and message.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/feedback", form);
      setSuccess(true);
      // optional redirect after a short delay
      setTimeout(() => nav("/dashboard"), 900);
    } catch (e) {
      setErr(e.response?.data?.error || e.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  // Motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  const groupVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReduced ? 0 : 0.05, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1 className="text-3xl font-bold mb-2" variants={itemVariants}>
        Send us your feedback
      </motion.h1>
      <motion.p className="text-sm text-gray-500 mb-6" variants={itemVariants}>
        We read every submission and respond when appropriate.
      </motion.p>

      {/* Error banner */}
      <AnimatePresence>
        {err && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-3 text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded"
          >
            {err}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success badge */}
      <AnimatePresence>
        {success && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-3 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded"
          >
            <SuccessCheck />
            <span>Thanks! Your feedback has been sent.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={submit}
        className="space-y-4"
        variants={groupVariants}
        initial="hidden"
        animate="show"
      >
        {/* Category + Rating */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
          <label className="form-control">
            <span className="label-text mb-1">Category</span>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              className="select select-bordered"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Rating</span>
            <div className="rating rating-md">
              {[1,2,3,4,5].map((n) => (
                <motion.input
                  key={n}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value={n}
                  checked={Number(form.rating) === n}
                  onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                  whileHover={{ scale: prefersReduced ? 1 : 1.12 }}
                  whileTap={{ scale: prefersReduced ? 1 : 0.92 }}
                />
              ))}
            </div>
          </label>
        </motion.div>

        {/* Subject */}
        <motion.label className="form-control" variants={itemVariants}>
          <span className="label-text mb-1">Subject</span>
          <motion.input
            name="subject"
            value={form.subject}
            onChange={onChange}
            className="input input-bordered"
            placeholder="e.g. Checkout button not working on mobile"
            maxLength={120}
            required
            whileFocus={{ boxShadow: "0 0 0 3px rgba(59,130,246,.35)" }}
          />
        </motion.label>

        {/* Message */}
        <motion.label className="form-control" variants={itemVariants}>
          <span className="label-text mb-1">Message</span>
          <motion.textarea
            name="message"
            value={form.message}
            onChange={onChange}
            className="textarea textarea-bordered h-32"
            placeholder="Tell us what happened or how we can improve…"
            maxLength={2000}
            required
            whileFocus={{ boxShadow: "0 0 0 3px rgba(59,130,246,.35)" }}
          />
        </motion.label>

        {/* Optional fields */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
          <label className="form-control">
            <span className="label-text mb-1">Booking ID (optional)</span>
            <input
              name="bookingId"
              value={form.bookingId}
              onChange={onChange}
              className="input input-bordered"
              placeholder="Paste a booking id if relevant"
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="input input-bordered"
              placeholder="you@example.com"
              required
            />
          </label>
        </motion.div>

        <motion.div className="flex items-center gap-3 pt-2" variants={itemVariants}>
          <motion.button
            type="submit"
            disabled={submitting}
            className={`btn btn-primary ${submitting ? "btn-disabled" : ""}`}
            whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
            whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
          >
            {submitting ? <LoadingDots /> : "Send feedback"}
          </motion.button>
          <span className="text-xs text-gray-500">
            By submitting, you agree to be contacted about this feedback.
          </span>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

/* --- Tiny animated bits --- */

function LoadingDots() {
  return (
    <span className="inline-flex gap-1 items-center">
      <Dot delay={0} />
      <Dot delay={0.1} />
      <Dot delay={0.2} />
    </span>
  );
}

function Dot({ delay = 0 }) {
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-white inline-block"
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, delay, ease: "easeInOut" }}
    />
  );
}

function SuccessCheck() {
  return (
    <motion.svg
      width="22" height="22" viewBox="0 0 24 24" fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <motion.circle
        cx="12" cy="12" r="10"
        stroke="currentColor" className="text-green-500"
        strokeWidth="2" fill="none"
      />
      <motion.path
        d="M7 12l3 3 7-7"
        stroke="currentColor" className="text-green-600"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
      />
    </motion.svg>
  );
}
