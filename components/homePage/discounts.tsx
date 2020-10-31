import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { motion } from "framer-motion";
import {
  DiscountsStyle,
  FeaturedContainer,
  UnderFeaturedStyle,
  FeaturedStyle,
} from "../styles/ItemsStyles";
import MenuItem from "./menuItem";
import { IItem } from "../catalog/items";
import PickSize from "../singleItem/pickSize";
import { ADD_TO_CART_ITEM_QUERY } from "../../lib/queries";

export interface IItems {
  items?: [IItem];
  subTitle?: string;
  title?: string;
}

const Discounts = ({ items, subTitle, title }: IItems) => {
  const width = 280;
  const [galleryWidth, setGalleryWidth] = useState(0);
  const scrollmenu = useRef(null);
  const [alignCenter, setAlignCenter] = useState(false);
  const [dicountsHovered, setDicountsHovered] = useState(false);
  const [showPickSize, setShowPickSize] = useState(false);

  const handleShowPickSize = (show: any) => {
    setShowPickSize(show);
  };

  const ItemsMenu = () => {
    return items.map((item: IItem, id: number) => (
      <MenuItem
        width={width}
        key={id}
        id={id}
        item={item}
        handleShowPickSize={handleShowPickSize}
      />
    ));
  };

  const scrollmenuWidth = scrollmenu?.current?.allItemsWidth;
  useEffect(() => {
    if (scrollmenuWidth && scrollmenu.current) {
      setGalleryWidth(scrollmenuWidth);
    }
  }, [scrollmenu.current, scrollmenuWidth]);

  const menuItems = ItemsMenu();

  useEffect(() => {
    const divs = document.querySelectorAll(".menu-wrapper");

    if (divs) {
      for (let i = 0; i < divs.length; i++) {
        divs[i].classList.add("menu-wrapper-aditional");
      }
    }
  }, [menuItems]);

  //forces ScrollMenu component to rerenders
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlignCenter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addToCartItemQuery = useQuery(ADD_TO_CART_ITEM_QUERY, {
    fetchPolicy: "network-only",
  });

  if (addToCartItemQuery.loading) return <p>Loading...</p>;

  const data = addToCartItemQuery.data.addToCartItem;

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
          <FeaturedStyle>{title}</FeaturedStyle>
          <UnderFeaturedStyle>{subTitle}</UnderFeaturedStyle>
        </FeaturedContainer>

        <ScrollMenu
          ref={scrollmenu}
          alignCenter={alignCenter}
          clickWhenDrag={true}
          dragging={true}
          data={menuItems}
          innerWrapperStyle={{
            transform: "translate3d(0px, 0px, 0px)",
            // transition: `transform 0.4s ease 0s; width: ${1200}px`,
            width: `${items.length * width + 150}px`,
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
          wheel={false}
        ></ScrollMenu>
      </motion.div>

      {data && (
        <PickSize
          showPickSize={showPickSize}
          item={data}
          handleShowPickSize={handleShowPickSize}
        ></PickSize>
      )}
    </DiscountsStyle>
  );
};

export default Discounts;
