import React, { useState } from "react";
import Link from "next/link";
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from "../lib/queries";
import { Icon, Button } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Error from "./errorMessage";
import { AnimatePresence, motion } from "framer-motion";

import {
  ContainerImg,
  ButtonContainerCart,
  ButtonContainerDetails,
  DiscountsImg,
  Description,
  Container,
} from "./styles/ItemsStyles";
import { addToCartItem } from "../lib/vars";

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

  const currentUserQuery = useQuery(CURRENT_USER_QUERY);
  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  if (currentUserQuery.loading) return <p>Loading...</p>;
  if (currentUserQuery.error)
    return <Error error={currentUserQuery.error}></Error>;

  return (
    <Container style={{ width: width }}>
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
            {buttonsVisible && currentUserQuery.data.user && (
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
                    // onClick={async () => {
                    //   await addToCart({
                    //     variables: {
                    //       id: item.id,
                    //     },
                    //   });
                    // }}
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
                  <ButtonContainerDetails
                    style={currentUserQuery.data.user ? { top: "65%" } : {}}
                  >
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
            <DiscountsImg src={item.image}></DiscountsImg>
          </Link>
        </motion.div>
      </ContainerImg>
      <Description>
        <p>{item.title}</p>

        <Button
          animated="fade"
          className="buttonHeart"
          style={{ backgroundColor: "white" }}
        >
          <Button.Content visible>
            <Icon size="big" name="heart outline" />
          </Button.Content>
          <Button.Content hidden>
            <Icon size="big" name="heart" />
          </Button.Content>
        </Button>

        <p>${item.price}</p>
      </Description>
    </Container>
  );
};

export default MenuItem;
