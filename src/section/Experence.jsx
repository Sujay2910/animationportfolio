import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ===================== DATA ===================== */

const experiences = [
  {
    role: "Web Developer",
    company: "I2I Specialist Technologies",
    duration: "2023",
    description:
      "Built high-performance Web application, integrated AI features, improved engagement by 10%.",
  },
  {
    role: "Web Developer Intern",
    company: "Scropy Tech",
    duration: "2025",
    description: "Gained hands-on web development experience.",
  },
  {
    role: "Data Analyst",
    company: "ELite Tech Intern",
    duration: "2025",
    description:
      "Built a Power BI dashboard to track sales, profit, and customer insights.",
  },
];

/* ================= EXPERIENCE ITEM ================= */

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);

  return (
    <div
      className={`relative ${
        layout === "desktop"
          ? "flex flex-1 justify-center items-center"
          : "flex items-start"
      }`}
    >
      {/* DOT */}
      <motion.div
        className="z-20 w-6 h-6 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.15)] mt-2"
        style={{ opacity, scale }}
      />

      {/* CONNECTOR (DESKTOP ONLY) */}
      {layout === "desktop" && (
        <motion.div
          className={`absolute ${
            idx % 2 === 0 ? "-top-10" : "-bottom-10"
          } w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        />
      )}

      {/* CARD */}
      <motion.article
        className={`${
          layout === "desktop"
            ? `absolute ${idx % 2 === 0 ? "bottom-16" : "top-16"}`
            : "relative ml-6 mt-2"
        } bg-gray-900/80 backdrop-blur border border-gray-700 rounded-xl p-6 w-[320px]`}
        style={{ opacity, y }}
      >
        <h3 className="text-xl font-semibold">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300">{exp.description}</p>
      </motion.article>
    </div>
  );
}

/* ================= MAIN SECTION ================= */

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 200 : 300;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const steps = useMemo(
    () => experiences.map((_, i) => i / experiences.length),
    [experiences.length]
  );

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-8 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {/* ================= DESKTOP ================= */}
            {!isMobile && (
              <div className="relative w-full max-w-6xl">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                    style={{ width: lineWidth }}
                  />
                </div>

                <div className="relative flex justify-between">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={steps[idx]}
                      end={steps[idx] + 1 / experiences.length}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ================= MOBILE ================= */}
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                    style={{ height: lineHeight }}
                  />
                </div>

                <div className="relative flex flex-col gap-16 ml-10 mt-6 pb-28">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={steps[idx]}
                      end={steps[idx] + 1 / experiences.length}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
