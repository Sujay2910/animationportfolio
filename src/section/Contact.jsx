import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.feedback,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", feedback: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black text-white px-6 py-20 flex items-center"
    >
      <ParticlesBackground />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* IMAGE */}
        <motion.img
          src={Astra}
          alt="Feedback"
          className="rounded-2xl shadow-xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* FORM */}
        <motion.div
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Send Your Feedback</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-black/40 border border-white/30 focus:border-blue-500 outline-none"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-black/40 border border-white/30 focus:border-blue-500 outline-none"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* FEEDBACK */}
            <div>
              <textarea
                name="feedback"
                rows="4"
                placeholder="Write your feedback here..."
                value={formData.feedback}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-black/40 border border-white/30 focus:border-blue-500 outline-none"
              />
              {errors.feedback && (
                <p className="text-red-400 text-sm">{errors.feedback}</p>
              )}
            </div>

            {/* STATUS */}
            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Feedback sent successfully ✅"
                  : "Failed to send ❌"}
              </p>
            )}

            {/* BUTTON */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold"
            >
              {status === "sending" ? "Sending..." : "Submit Feedback"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
