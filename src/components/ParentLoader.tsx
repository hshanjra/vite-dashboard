import { motion } from "framer-motion";
function ParentLoader() {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-zinc-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img src="/assets/motion-blur-2.svg" alt="" className="w-52" />
      </motion.div>
      {/* <motion.div
        className="mt-5 text-xl font-medium text-[#333]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Loading...
      </motion.div> */}
    </div>
  );
}

export default ParentLoader;
