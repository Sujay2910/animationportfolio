import React, { useEffect, useState, useRef, useMemo } from "react";
import img1 from "../assets/DSA.png";
import img2 from "../assets/SHRI.png";
import photo1 from "../assets/DM.jpeg";
import photo2 from "../assets/SM.jpeg";
import {
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  motion,
} from "framer-motion";

/* ---------- Mobile Hook ---------- */
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

function Project() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  /* ---------- Projects ---------- */
  const projects = useMemo(
    () => [
      {
        title: "Algorithm Visualization",
        link: "https://data-structure-algo.vercel.app/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Business Website",
        link: "https://quiet-haupia-7f074d.netlify.app/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
    ],
    [isMobile]
  );

  /* ---------- Scroll Logic ---------- */
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? projects.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section id="project"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <h2 className="absolute top-6 text-2xl sm:text-3xl font-semibold">
          My Work
        </h2>
          
        <div className="relative w-full flex flex-col items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="
                      text-center mb-4
                      text-[clamp(1.2rem,5vw,2.4rem)]
                      italic font-semibold text-white/95
                      sm:absolute sm:-top-20 sm:left-[30%] lg:left-[-5%]
                    "
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              {/* ---------- Image ---------- */}
              <div
                className="
                  relative w-full overflow-hidden shadow-2xl
                  rounded-lg sm:rounded-xl
                  h-[45vh] sm:h-[66vh]
                  bg-black/30
                "
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain sm:object-cover"
                  loading="lazy"
                />

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>

              {/* ---------- Button ---------- */}
              <div className="mt-6 flex justify-center sm:absolute sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2">
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg font-semibold bg-white text-black hover:bg-gray-200 transition"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
