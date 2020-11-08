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
  menuWrapper: number;
}

const Discounts = ({ items, subTitle, title, menuWrapper }: IItems) => {
  const width = 280;
  const scrollmenu = useRef(null);
  const [alignCenter, setAlignCenter] = useState(false);
  const [dicountsHovered, setDicountsHovered] = useState(false);
  const [showPickSize, setShowPickSize] = useState(false);
  const [scroll, setScroll] = useState(0);

  const handleShowPickSize = (show: any) => {
    setShowPickSize(show);
  };

  const ItemsMenu = () => {
    if (items[0]?.title === "loading") {
      return items.map((item: IItem, id: number) => (
        <MenuItem
          width={width}
          key={id}
          id={id}
          item={item}
          handleShowPickSize={handleShowPickSize}
        />
      ));
    } else {
      return items.map((item: IItem, id: number) => (
        <MenuItem
          width={width}
          key={id}
          id={id}
          item={item}
          handleShowPickSize={handleShowPickSize}
        />
      ));
    }
  };

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

  useEffect(() => {
    const els = document.querySelectorAll(`.menu-wrapper`);
    if (els[menuWrapper]) {
      if (scroll > els[menuWrapper].clientWidth) {
        setScroll(els[menuWrapper].clientWidth);
      }
    }
    if (scroll < 0) {
      setScroll(0);
    }
  }, [scroll]);

  const addToCartItemQuery = useQuery(ADD_TO_CART_ITEM_QUERY);

  const update = () => {
    const els = document.querySelectorAll(`.menu-wrapper`);
    const width = els[menuWrapper].scrollLeft;

    if (width) {
      setScroll(width);
    }
  };

  useEffect(() => {
    const els = document.querySelectorAll(`.menu-wrapper`);

    if (els[menuWrapper]) {
      els[menuWrapper].scrollTo({ top: 0, left: scroll, behavior: "smooth" });
    }
  }, [scroll]);

  if (addToCartItemQuery.loading) return <p>Loading...</p>;

  const data = addToCartItemQuery.data.addToCartItem;

  // const ArrowLeft = () => {
  //   if (alignCenter && scroll > 0) {
  //     return (
  //       <Icon
  //         className="arrow-prev"
  //         style={{
  //           position: "absolute",
  //           zIndex: 5,
  //           color: "grey",
  //           left: "60px",
  //           marginTop: "-60px",
  //         }}
  //         size="huge"
  //         onClick={() => setScroll((scroll: number) => scroll - width)}
  //         name="angle left"
  //       />
  //     );
  //   } else {
  //     return <div></div>;
  //   }
  // };

  // const ArrowRight = () => {
  //   const els = document.querySelectorAll(`.menu-wrapper`);
  //   if (els[menuWrapper]) {
  //     if (alignCenter && scroll < els[menuWrapper].clientWidth - 10) {
  //       return (
  //         <Icon
  //           className="arrow-next"
  //           style={{
  //             position: "absolute",
  //             zIndex: 5,
  //             color: "grey",
  //             right: "60px",
  //             marginTop: "-60px",
  //           }}
  //           size="huge"
  //           onClick={() => setScroll((scroll: number) => scroll + width)}
  //           name="angle right"
  //         />
  //       );
  //     } else {
  //       return <div></div>;
  //     }
  //   } else {
  //     return <div></div>;
  //   }
  // };

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
          onUpdate={update}
          hideArrows={true}
          ref={scrollmenu}
          alignCenter={alignCenter}
          clickWhenDrag={true}
          dragging={true}
          // arrowLeft={ArrowLeft()}
          // arrowRight={ArrowRight()}
          hideSingleArrow={true}
          data={menuItems}
          innerWrapperStyle={{
            transform: "translate3d(0px, 0px, 0px)",
            // transition: `transform 0.4s ease 0s; width: ${1200}px`,
            width: `${items.length * width + 160}px`,
            textAlign: "left",
          }}
          wrapperStyle={
            dicountsHovered
              ? {
                  transition: "all 0.3s ease",
                }
              : {
                  overflowX: "scroll",
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
