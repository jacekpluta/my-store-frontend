import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ScrollMenu from "react-horizontal-scrolling-menu";

import { Icon, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Error from "./errorMessage";
import { AnimatePresence, motion } from "framer-motion";

const DiscountsStyle = styled.div`
  background: ${(props) => props.theme.white};

  padding: 20px 0px 20px 40px;

  .menu-wrapper--inner::-webkit-scrollbar-track-piece:start {
    margin-left: 50px;
  }

  .menu-wrapper--inner::-webkit-scrollbar-track-piece:end {
    margin-right: 50px;
  }

  &:last-child {
    padding-right: 40px;
  }

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const ContainerImg = styled.div`
  position: relative;
  height: auto;
  width: 30vw;
  overflow: hidden;
`;

const ButtonContainerCart = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  cursor: pointer;
`;

const ButtonContainerDetails = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  cursor: pointer;
`;
const DiscountsImg = styled.img`
  width: 100%;
  height: auto;
  padding: 0px 10px 10px 10px;
  margin: 0px 0px;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const FeaturedContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 50px 0;
  text-align: center;
  font-size: 1.5em;
  position: relative;

  ::after {
    content: "";
    width: 100%;
    border-bottom: solid 1px ${(props) => props.theme.black};
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 1;
  }
`;

const FeaturedStyle = styled.h2`
  background-color: ${(props) =>
    props.theme.white}; /* Same as the parents Background */
  width: auto;
  display: inline-block;
  z-index: 3;
  padding: 0 20px 0 20px;
  color: ${(props) => props.theme.black};
  position: relative;
  margin: 0;
  font-size: 1.2em;
`;

const UnderFeaturedStyle = styled.h4`
  width: auto;
  z-index: 3;
  color: grey;
  position: relative;
  margin: 0;
  font-size: 0.8em;
`;

const Description = styled.div`
  width: auto;
  z-index: 3;
  color: grey;
  position: relative;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding-bottom: 10px;
  p {
    line-height: 0.5;
  }
  p:nth-child(1) {
    justify-self: start;
    font-size: 1.2em;
    color: ${(props) => props.theme.black};
  }
  p:nth-child(2) {
    justify-self: end;
    font-size: 1.2em;
    color: ${(props) => props.theme.black};
  }
  p:nth-child(3) {
    justify-self: start;
    font-size: 0.8em;
    padding-left: 2px;
    color: ${(props) => props.theme.greyish};
  }
  .buttonHeart {
    justify-self: end;
    height: 1px;

    padding-bottom: 15px;
    top: -12px;
  }
  span {
    position: aboslute;
    top: 0;
    left: 0;
  }
`;

const Container = styled.div``;

const list = [{ id: 0 }, { id: 1 }, { id: 2 }];

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${4}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const variants = {
  str: { opacity: 0 },
  ani: { opacity: 1 },
  ext: { opacity: 0 },
};

const MenuItem = ({ selected, id }: { selected: string; id: number }) => {
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const discountItemsQuery = useQuery(ALL_ITEMS_QUERY);
  if (discountItemsQuery.loading) return <p>Loading...</p>;
  if (discountItemsQuery.error)
    return <Error error={discountItemsQuery.error}></Error>;

  const items = discountItemsQuery.data.items;

  return (
    <Container>
      <ContainerImg>
        <motion.div
          whileHover={{ scale: 1.1, opacity: 0.8 }}
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
                    animated="fade"
                    style={{
                      width: "130%",
                      height: "50px",
                      fontSize: "1vw",
                      marginBottom: "30px",
                      borderRadius: "35px",
                    }}
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
                <ButtonContainerDetails>
                  <Button
                    animated="fade"
                    style={{
                      width: "130%",
                      height: "50px",
                      fontSize: "1vw",
                      marginTop: "30px",
                      borderRadius: "35px",
                    }}
                  >
                    <Button.Content visible>View details</Button.Content>
                    <Button.Content hidden>
                      <span>
                        <Icon name="eye" />
                      </span>
                    </Button.Content>
                  </Button>
                </ButtonContainerDetails>
              </motion.div>
            )}
          </AnimatePresence>
          <DiscountsImg src={items[id].image}></DiscountsImg>
        </motion.div>
      </ContainerImg>
      <Description>
        <p>{items[id].title}</p>
        <p>${items[id].price}</p>
        <p>{items[id].description}</p>

        <Button
          animated="fade"
          className="buttonHeart"
          size="small"
          style={{ backgroundColor: "#f0f2f2" }}
        >
          <Button.Content visible>
            <Icon size="large" name="heart outline" />
          </Button.Content>
          <Button.Content hidden>
            <Icon size="large" name="heart" />
          </Button.Content>
        </Button>
      </Description>
    </Container>
  );
};

export const Menu = (selected: string) =>
  list.map((el) => {
    return <MenuItem key={el.id} id={el.id} selected={selected} />;
  });

const Discounts = () => {
  const [selected, setSelected] = useState(null);
  const [galleryWidth, setGalleryWidth] = useState(0);
  const scrollmenu = useRef(null);
  const [alignCenter, setAlignCenter] = useState(false);
  const [dicountsHovered, setDicountsHovered] = useState(false);

  useEffect(() => {
    if (scrollmenu.current && scrollmenu.current.allItemsWidth > 250) {
      setGalleryWidth(scrollmenu.current.allItemsWidth);
    }
  }, [scrollmenu.current]);

  useEffect(() => {
    const id = document.querySelector(".menu-wrapper");
    if (id) {
      id.classList.add("menu-wrapper-aditional");
    }
  }, [galleryWidth]);

  const menuItems = Menu(selected);

  const onSelect = (selectedItemKey: string | number) => {
    setSelected(selectedItemKey);
  };

  //forces ScrollMenu component to rerenders
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlignCenter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DiscountsStyle>
      <motion.div
        onHoverStart={() => {
          setDicountsHovered(true);
        }}
        onHoverEnd={() => {
          setDicountsHovered(false);
        }}
      >
        <FeaturedContainer>
          <FeaturedStyle>Featured products</FeaturedStyle>
          <UnderFeaturedStyle>
            Get your new pair of shoes today!
          </UnderFeaturedStyle>
        </FeaturedContainer>

        <ScrollMenu
          ref={scrollmenu}
          alignCenter={alignCenter}
          clickWhenDrag={true}
          dragging={true}
          data={menuItems}
          innerWrapperStyle={{
            transform: "translate3d(0px, 0px, 0px)",
            transition: `transform 0.4s ease 0s; width: ${galleryWidth}px`,
            width: `${galleryWidth}px`,
            textAlign: "left",
          }}
          wrapperStyle={
            dicountsHovered
              ? {
                  transition: "all 0.3s ease",
                }
              : {
                  overflowX: "auto",
                }
          }
          useButtonRole={true}
          selected={selected}
          onSelect={onSelect}
          wheel={false}
        ></ScrollMenu>
      </motion.div>
    </DiscountsStyle>
  );
};

export default Discounts;
