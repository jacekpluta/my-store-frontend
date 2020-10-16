import React, { useState, useEffect, useRef } from "react";

import ScrollMenu from "react-horizontal-scrolling-menu";
import { motion } from "framer-motion";
import {
  DiscountsStyle,
  FeaturedContainer,
  UnderFeaturedStyle,
  FeaturedStyle,
} from "./styles/ItemsStyles";
import MenuItem from "./menuItem";
import { IItem } from "./items";

export interface IItems {
  items?: [IItem];
  subTitle?: string;
  title?: string;
}

const Discounts = ({ items, subTitle, title }: IItems) => {
  const ItemsMenu = () => {
    return items.map((item: IItem, id: number) => (
      <MenuItem key={id} id={id} item={item} />
    ));
  };

  const [selected, setSelected] = useState(null);
  const [galleryWidth, setGalleryWidth] = useState(0);
  const scrollmenu = useRef(null);
  const [alignCenter, setAlignCenter] = useState(false);
  const [dicountsHovered, setDicountsHovered] = useState(false);

  useEffect(() => {
    if (scrollmenu.current && scrollmenu.current.allItemsWidth > 450) {
      setGalleryWidth(scrollmenu.current.allItemsWidth);
    }
  }, [scrollmenu.current]);

  useEffect(() => {
    const id = document.querySelector(".menu-wrapper");
    if (id) {
      id.classList.add("menu-wrapper-aditional");
    }
  }, [galleryWidth]);

  const menuItems = ItemsMenu();

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
