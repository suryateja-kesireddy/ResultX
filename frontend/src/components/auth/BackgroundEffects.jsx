import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />

      {/* Blue Glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-500/25 blur-[120px]"
      />

      {/* Purple Glow */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute top-1/2 right-0 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[140px]"
      />

      {/* Cyan Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]"
      />

    </div>
  );
}