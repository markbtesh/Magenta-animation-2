import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

const AnimatedImages = () => {
  const images = ["/rc1.png", "/rc2.png", "/rc3.png", "/rc4.png"];
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  const startAnimation = async () => {
    await controls.start((i) => ({
      rotate: 0,
      transition: { duration: 1, delay: i * 0.2 },
    }));
  };

  const hoverAnimation = async () => {
    await controls.start((i) => ({
      rotate: 540,
      transition: { duration: 1, delay: i * 0.2 },
    }));
    await controls.start((i) => ({
      rotate: 0,
      transition: { duration: 1, delay: i * 0.2 },
    }));
  };

  // Start the initial animation when the component mounts
  useEffect(() => {
    startAnimation();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "500px",
        margin: "25% auto",
        scale: "0.7",
      }}
      onHoverStart={() => {
        setIsHovering(true);
        hoverAnimation();
      }}
      onHoverEnd={() => setIsHovering(false)}
    >
      {images.map((src, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ rotate: 540 }}
          animate={controls}
          style={{ position: "absolute", top: 0, left: 0 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        >
          <img
            src={src}
            alt={`Image ${index + 1}`}
            width={350}
            height={350}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedImages;
