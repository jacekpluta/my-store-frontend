import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { images } from "../lib/images";
import { Icon } from "semantic-ui-react";
import ReactSlider from "react-slider";

const DiscountsStyle = styled.div`
  position: relalative;
  background: ${(props) => props.theme.white};
  width: auto;
  height: auto;
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
`;

const DiscountsImg = styled.img`
  height: auto;
  width: 45vw;
  padding: 10px 10px 10px 10px;
  margin: 0px 0px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  opacity: 1;
  transition: opacity 0.2s ease-in;
  -moz-transition: opacity 0.2s ease-in;
  -webkit-transition: opacity 0.2s ease-in;
  -o-transition: opacity 0.2s ease-in;
  :hover {
    opacity: 0.6;
  }
`;

const list = [
  { name: "item1" },
  { name: "item2" },
  { name: "item3" },
  { name: "item4" },
  { name: "item5" },
  { name: "item6" },
];

const MenuItem = ({ text, selected }: { text: string; selected: string }) => {
  return (
    <DiscountsImg
      src={images[1]}
      className={`menu-item ${selected ? "active" : ""}`}
    />
  );
};

export const Menu = (list: { name: string }[], selected: string) =>
  list.map((el, idex) => {
    const { name } = el;

    return <MenuItem text={name} key={idex} selected={selected} />;
  });

const Discounts = () => {
  const [selected, setSelected] = useState(null);
  const [galleryWidth, setGalleryWidth] = useState(null);

  useEffect(() => {
    const demoId = document.querySelector(".menu-wrapper");
    demoId.classList.add("menu-wrapper-inner");
  }, []);

  const scrollmenu = useRef(null);

  const menuItems = Menu(list, selected);

  const onSelect = (selectedItemKey: string | number) => {
    setSelected(selectedItemKey);
  };

  useEffect(() => {
    setGalleryWidth(scrollmenu.current.allItemsWidth);
  }, [scrollmenu]);

  return (
    <DiscountsStyle>
      <h1>Best Prices</h1>
      <ScrollMenu
        ref={scrollmenu}
        alignCenter={true}
        clickWhenDrag={true}
        dragging={true}
        data={menuItems}
        innerWrapperStyle={{
          width: `${galleryWidth}px`,
          transform: "translate3d(0px, 0px, 0px)",
          transition: "transform 0.4s ease 0s; width: 4190.68px",
        }}
        wrapperStyle={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
        menuStyle={{}}
        useButtonRole={true}
        selected={selected}
        onSelect={onSelect}
        wheel={false}
      ></ScrollMenu>
    </DiscountsStyle>
  );
};

export default Discounts;
