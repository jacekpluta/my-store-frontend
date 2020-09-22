import { StyledGallery } from "./styles/StyledGallery";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { wrap } from "@popmotion/popcorn";
import { images } from "./images";
import GalleryTitle from "./styles/GalleryTitle";
import GalleryDot from "./styles/GalleryDot";

const variants = {
  enter: (direction: number) => {
    return {
      // x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    // x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      // x: direction < 0 ? 1000 : -1000,1
      opacity: 0,
    };
  },
};

export default function Gallery() {
  const [page, setPage] = useState(0);

  const imageIndex = wrap(0, images.length, page);
  // console.log(imageIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((page) => page + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [page]);

  return (
    <StyledGallery>
      <AnimatePresence initial={false}>
        <motion.img
          style={{
            width: "100%",
            height: "100vh",
            opacity: "0.6",
            position: "absolute",
            maxWidth: "100vw",
          }}
          key={page}
          src={images[imageIndex]}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1 },
          }}
        />
      </AnimatePresence>

      {images.map((image, index) => (
        <GalleryTitle>
          {imageIndex === 0 && <motion.div>aaa</motion.div>}
          {imageIndex === 1 && <motion.div>aaa</motion.div>}
          {imageIndex === 2 && <motion.div>aaa</motion.div>}
          {imageIndex === 3 && <motion.div>aaa</motion.div>}
        </GalleryTitle>
      ))}

      {images.map((image, index) => (
        <GalleryDot
          style={index === imageIndex ? { opacity: 1 } : {}}
          className="gallery_dot"
          onClick={() => {
            setPage(index);
          }}
        ></GalleryDot>
      ))}
    </StyledGallery>
  );
}
