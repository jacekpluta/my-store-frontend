import React, { useEffect, useRef } from "react";
import items from "../pages/items";
import { IItem } from "./items";
import { ButtonPickSize } from "./styles/ButtonStyles";
import { Dimmer } from "./styles/Dimmer";
import { PickSizeStyles } from "./styles/PickSizeStyles";

interface PropsPickSize {
  showPickSize: boolean;
  handleShowPickSize: Function;
  item: IItem;
}

function PickSize({ showPickSize, handleShowPickSize, item }: PropsPickSize) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current.contains(event.target)) {
      handleShowPickSize(false);
    }
  }

  return (
    <div>
      {showPickSize ? (
        <PickSizeStyles showPickSize={showPickSize} ref={wrapperRef}>
          <p>{item.image}</p>
          <p>{item.title}</p>

          <p>{item.price}</p>

          <ButtonPickSize>ADD TO CART</ButtonPickSize>
          <ButtonPickSize>VIEW DETAILS</ButtonPickSize>
        </PickSizeStyles>
      ) : (
        <div ref={wrapperRef} />
      )}
      {showPickSize && <Dimmer></Dimmer>}
    </div>
  );
}

export default PickSize;
