import { StyledGallery } from "./styles/StyledGallery";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { wrap } from "@popmotion/popcorn";
import { images } from "../lib/images";
import GalleryText from "./styles/GalleryText";
import GalleryDot from "./styles/GalleryDot";
import { OpacityBackground } from "./styles/OpacityBackground";
import { ButtonMainShiny } from "./styles/ButtonStyles";
import GallerySubText from "./styles/GallerySubText";

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

  str: { opacity: 0, x: -200 },
  ani: { opacity: 1, x: 0 },
  ext: { opacity: 0, x: 200 },
};

export default function Gallery() {
  const [page, setPage] = useState(0);

  const imageIndex = wrap(0, images.length, page);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((page) => page + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [page]);

  return (
    <StyledGallery>
      <OpacityBackground></OpacityBackground>
      <AnimatePresence initial={false}>
        <motion.img
          style={{
            width: "100%",
            height: "100vh",
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
        <div key={index}>
          <GalleryText>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={"str"}
                animate={"ani"}
                exit={"ext"}
                variants={variants}
                key={page}
              >
                {imageIndex === 0 && <p>NEW SALE 50% OFF</p>}
                {imageIndex === 1 && <p> STEP INTO NEW AIR</p>}
                {imageIndex === 2 && <p> START RUNNING</p>}
              </motion.div>
            </AnimatePresence>

            <GallerySubText>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  initial={"str"}
                  animate={"ani"}
                  exit={"ext"}
                  variants={variants}
                  key={page}
                >
                  {imageIndex === 0 && (
                    <p> Last season models are on sale, check them out!</p>
                  )}
                  {imageIndex === 1 && <p> Featuring new Air Max</p>}
                  {imageIndex === 2 && (
                    <p> It's never to late to start training</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </GallerySubText>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={"str"}
                animate={"ani"}
                exit={"ext"}
                variants={variants}
                key={page}
              >
                <ButtonMainShiny>START SHOPPING</ButtonMainShiny>
              </motion.div>
            </AnimatePresence>
          </GalleryText>
        </div>
      ))}

      {images.map((image, index) => (
        <GalleryDot
          key={index}
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
