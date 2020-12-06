import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ADD_TO_CART_MUTATION } from "../../lib/queries";
import Error from "../errorMessage";
import Counter from "./counter";

import Size from "./size";
import { ButtonPickSize } from "../styles/ButtonStyles";
import { Dimmer } from "../styles/Dimmer";
import { PickSizeStyles } from "../styles/PickSizeStyles";
import Link from "next/link";
import { addToCartItem } from "../../lib/vars";
import { IItem } from "../../lib/interfaces";

const ButtonStyle = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 15px;
  padding-right: 20px;

  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`;

interface PropsPickSize {
  showPickSize: Boolean;
  handleShowPickSize: Function;
  item: IItem;
}

function PickSize({ showPickSize, handleShowPickSize, item }: PropsPickSize) {
  const wrapperRef = useRef(null);
  const [counter, setCounter] = useState(1);
  const [sizePicked, setSizePicked] = useState(0);
  const [error, setError] = useState(false);

  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (addToCartMutation.loading) return <p>Loading...</p>;
  if (addToCartMutation.error) return <Error error={addToCartMutation.error} />;

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current?.contains(event.target)) {
      handleShowPickSize(false);
    }
  }

  const addCounter = (counter: number) => {
    setCounter(counter + 1);
  };

  const substractCounter = (counter: number) => {
    setCounter(counter - 1);
  };

  const handleSizePicked = (sizeNumber: number) => {
    setSizePicked(sizeNumber);
  };

  return (
    <div>
      {showPickSize && item && (
        <>
          <PickSizeStyles showPickSize={showPickSize} ref={wrapperRef}>
            <div className="description">
              <img src={item.image}></img>
              <span>
                <p>{item.title}</p>
                <p>${item.price}.00</p>
              </span>
            </div>

            <Size
              sizePicked={sizePicked}
              error={error}
              inSingleItem={false}
              handleSizePicked={handleSizePicked}
            ></Size>

            <div style={{ marginLeft: "80px" }}>
              <Counter
                addCounter={addCounter}
                substractCounter={substractCounter}
                counter={counter}
              ></Counter>
            </div>

            <div className="pickSizeButtons">
              <div
                onClick={async () => {
                  if (sizePicked !== 0) {
                    await addToCart({
                      variables: {
                        id: item.id,
                        quantity: counter,
                        size: sizePicked,
                      },
                    });

                    addToCartItem(null);
                    setError(false);
                  } else {
                    setError(true);
                  }
                }}
              >
                <ButtonPickSize>ADD TO CART</ButtonPickSize>
              </div>

              <Link
                href={{
                  pathname: "/item",
                  query: { id: item.id },
                }}
              >
                <ButtonPickSize>VIEW DETAILS</ButtonPickSize>
              </Link>
            </div>

            <ButtonStyle
              onClick={async () => {
                handleShowPickSize(false);
              }}
            >
              &times;
            </ButtonStyle>
          </PickSizeStyles>
          <Dimmer></Dimmer>
        </>
      )}
    </div>
  );
}

export default PickSize;
