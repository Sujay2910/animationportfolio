import React, { useMemo } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { motion } from "framer-motion";
import avatar from "../assets/avator.png";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

const socials = [
  { Icon: FaXTwitter, label: "X", href: "https://twitter.com" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sujay-bote-962637301/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Sujay2910" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/mr.sujaybote46" },
];

export default function Home() {
  const roles = useMemo(() => ["Web Developer", "Data Science"], []);

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  // Typing Animation Logic
  React.useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden">
      <ParticlesBackground />

      {/* Gradient Blurs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Blur */}
        <div
          className="
            absolute -top-20 -left-20
            w-[70vw] sm:w-[45vw] md:w-[35vw]
            h-[70vw] sm:h-[45vw] md:h-[35vw]
            rounded-full
            bg-gradient-to-r from-[#302b63] via-[#00bf9f] to-[#1cd8d2]
            opacity-40
            blur-[120px] sm:blur-[150px]
          "
        ></div>

        {/* Bottom Right Blur */}
        <div
          className="
            absolute -bottom-20 -right-20
            w-[70vw] sm:w-[45vw] md:w-[35vw]
            h-[70vw] sm:h-[45vw] md:h-[35vw]
            rounded-full
            bg-gradient-to-r from-[#302b63] via-[#00bf9f] to-[#1cd8d2]
            opacity-30
            blur-[120px] sm:blur-[150px]
            animate-pulse
          "
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">

            {/* Typing Animation */}
            <motion.div
              className="
                mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                font-semibold text-white tracking-wide
                min-h-[2.3em]
              "
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>

              <span className="inline-block w-[2px] ml-1 bg-white animate-pulse"></span>
            </motion.div>

            {/* Big Heading */}
            <motion.h1
              className="
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
                text-transparent bg-clip-text
                bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302663]
                drop-shadow-lg leading-tight
              "
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I'm <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                Sujay Bote
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high-impact web experiences,
              building modern, scalable, and lightning-fast applications that make a difference.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#project"
                className="
                  px-6 py-3 rounded-full font-medium text-lg text-white
                  bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302663]
                  shadow-lg hover:scale-105 transition-all
                "
              >
                View My Work
              </a>

              <a
                href="/Bote_Sujay_Resume.pdf"
                download
                className="
                  px-6 py-3 rounded-full text-lg font-medium text-black
                  bg-white hover:bg-gray-200 shadow-lg hover:scale-105
                  transition-all
                "
              >
                My Resume
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="mt-6 flex items-center justify-center lg:justify-start gap-5 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {socials.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    p-3 sm:p-2 
                    rounded-full bg-white/5 
                    hover:bg-white/20 
                    transition transform hover:scale-125
                  "
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                >
                  <Icon className="text-white w-8 h-8 sm:w-7 sm:h-7" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Avatar Section */}
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background: "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #1cd8d2)",
            }}
          ></div>
          
          <motion.img
            src={avatar}
            alt="Sujay Bote"
            className="absolute top-20 right-0 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(45vw, 780px)",
              maxHeight: "82vh"
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
