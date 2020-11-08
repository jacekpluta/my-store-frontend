import React, { useState } from "react";
import Link from "next/link";

import { Icon, Button } from "semantic-ui-react";

import { AnimatePresence, motion } from "framer-motion";
import ReactPlaceholder from "react-placeholder";
import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";

import "react-placeholder/lib/reactPlaceholder.css";

import {
  ContainerImg,
  ButtonContainerCart,
  ButtonContainerDetails,
  DiscountsImg,
  Description,
  Container,
} from "../styles/ItemsStyles";
import { addToCartItem } from "../../lib/vars";

const variants = {
  str: { opacity: 0 },
  ani: { opacity: 1 },
  ext: { opacity: 0 },
};

interface ItemProps {
  description: string;
  id: string;
  image: string;
  largeImage: string;
  price: number;
  title: string;
}

const MenuItem = ({
  id,
  item,
  width,
  handleShowPickSize,
}: {
  id: number;
  item: ItemProps;
  width: number | null;
  handleShowPickSize: Function;
}) => {
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const awesomePlaceholder = (
    <div className="my-awesome-placeholder">
      <RectShape
        color="lightgrey"
        style={{ width: width, height: width, paddingBottom: 100 }}
      />
      <div style={{ marginTop: 10, display: "flex" }}>
        <TextBlock rows={2} color="lightgrey" />
        <RoundShape
          color="lightgrey"
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </div>
    </div>
  );

  return (
    <Container style={{ width: width }}>
      <ReactPlaceholder
        ready={item.price !== -1}
        customPlaceholder={awesomePlaceholder}
        showLoadingAnimation
      >
        <ContainerImg>
          <motion.div
            whileHover={{ opacity: 0.8, scale: 1.1 }}
            onHoverStart={() => {
              setButtonsVisible(true);
            }}
            onHoverEnd={() => {
              setButtonsVisible(false);
            }}
          >
            <AnimatePresence>
              {buttonsVisible && (
                <motion.div
                  variants={variants}
                  key={"button1"}
                  initial="str"
                  animate="ani"
                  exit="ext"
                  transition={{ duration: 0.5 }}
                >
                  <ButtonContainerCart>
                    <Button
                      onClick={() => {
                        handleShowPickSize(true);
                        addToCartItem(item);
                      }}
                      animated="fade"
                    >
                      <Button.Content visible>Add to cart</Button.Content>
                      <Button.Content hidden>
                        <span>
                          <Icon name="cart" />
                        </span>
                      </Button.Content>
                    </Button>
                  </ButtonContainerCart>
                </motion.div>
              )}

              {buttonsVisible && (
                <Link
                  href={{
                    pathname: "/item",
                    query: { id: item.id },
                  }}
                >
                  <motion.div
                    key={"button2"}
                    variants={variants}
                    initial="str"
                    animate="ani"
                    exit="ext"
                    transition={{
                      opacity: { duration: 0.5 },
                    }}
                  >
                    <ButtonContainerDetails style={{ top: "65%" }}>
                      <Button animated="fade">
                        <Button.Content visible>
                          <a> View details</a>
                        </Button.Content>
                        <Button.Content hidden>
                          <span>
                            <Icon name="eye" />
                          </span>
                        </Button.Content>
                      </Button>
                    </ButtonContainerDetails>
                  </motion.div>
                </Link>
              )}
            </AnimatePresence>

            <Link
              href={{
                pathname: "/item",
                query: { id: item.id },
              }}
            >
              <DiscountsImg draggable="false" src={item.image}></DiscountsImg>
            </Link>
          </motion.div>
        </ContainerImg>
        <Description>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id },
            }}
          >
            <p style={{ cursor: "pointer" }}>{item.title}</p>
          </Link>
          <Button animated="fade" className="buttonHeart">
            <Button.Content visible>
              <Icon size="big" style={{ zIndex: -2 }} name="heart outline" />
            </Button.Content>
            <Button.Content hidden>
              <Icon size="big" name="heart" />
            </Button.Content>
          </Button>

          <p>${item.price}.00</p>
        </Description>
      </ReactPlaceholder>
    </Container>
  );
};

export default MenuItem;
