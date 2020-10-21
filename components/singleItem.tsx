import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./errorMessage";
import { SingleItemStyle, CounterStyles } from "./styles/SingleItemStyle";
import { Icon } from "semantic-ui-react";
import { useEffect } from "react";
import { SortStylesSigleItem } from "./styles/SortStyles";
import { useRef } from "react";
import {
  ButtonAddToCart,
  ButtonCounterFirst,
  ButtonCounterNumber,
  ButtonCounterSecond,
} from "./styles/ButtonStyles";
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from "../lib/queries";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
      brand
      gender
    }
  }
`;

export interface SingleItemProps {
  itemId: string;
}
export interface PropsPickSize {
  size: number;
  key: number;
}

export default function SingleItem(props: SingleItemProps) {
  const { itemId } = props;

  const [option, setOption] = useState("Pick Size");
  const [sortVisible, setSortVisible] = useState(false);
  const [counter, setCounter] = useState(1);

  const wrapperRef = useRef(null);

  const singleItemQuery = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: itemId },
  });

  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current.contains(event.target)) {
      setSortVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (singleItemQuery.loading) return <p>Loading...</p>;
  if (singleItemQuery.error) return <Error error={singleItemQuery.error} />;
  if (addToCartMutation.error) return <Error error={singleItemQuery.error} />;

  if (!singleItemQuery.data.item)
    return <p>No item found for item with id - {itemId}</p>;

  const item = singleItemQuery.data.item;

  const sizes = [40, 41, 42, 43];

  const PickSize = ({ size, key }: PropsPickSize) => {
    return (
      <li>
        <span>
          <a
            href="#"
            onClick={() => {
              setOption(size);
              setSortVisible(false);
            }}
          >
            {size} <Icon name="genderless" />
          </a>
        </span>
      </li>
    );
  };

  const Counter = () => {
    return (
      <CounterStyles>
        <ButtonCounterFirst
          onClick={() => {
            if (counter < 9) {
              setCounter(counter + 1);
            } else {
              setCounter(9);
            }
          }}
        >
          +
        </ButtonCounterFirst>
        <ButtonCounterNumber>{counter}</ButtonCounterNumber>
        <ButtonCounterSecond
          onClick={() => {
            if (counter > 1) {
              setCounter(counter - 1);
            } else {
              setCounter(1);
            }
          }}
        >
          -
        </ButtonCounterSecond>
      </CounterStyles>
    );
  };

  return (
    <SingleItemStyle>
      <img src={item.largeImage} alt={item.title} />
      <div className="details">
        <h2>{item.title}</h2>
        <span>
          <p style={{ paddingRight: "15px" }}>${item.price}.00 </p>

          <div className="genderBox">
            <p>{item.gender}</p>
          </div>
        </span>
        <p>{item.description}</p>
        <div>
          <SortStylesSigleItem ref={wrapperRef}>
            <ul>
              <li>
                <span>
                  <a href="#" onClick={() => setSortVisible(!sortVisible)}>
                    <div
                      style={{
                        paddingLeft: "10px",
                      }}
                    >
                      {option}
                    </div>
                    <div
                      style={{
                        paddingRight: "5px",
                        paddingLeft: "5px",
                        borderLeft: `solid 1px #D0D4D7`,
                      }}
                    >
                      <Icon name="sort" />
                    </div>
                  </a>
                </span>
                <ul
                  style={sortVisible ? { height: "220px" } : { height: "0px" }}
                >
                  {sizes.map((size) => (
                    <PickSize key={size} size={size}></PickSize>
                  ))}
                </ul>
              </li>
            </ul>
          </SortStylesSigleItem>
          <Counter></Counter>
        </div>

        <ButtonAddToCart
          disabled={addToCartMutation.loading}
          onClick={async () => {
            await addToCart({
              variables: {
                id: itemId,
              },
            });
          }}
        >
          ADD TO CART
        </ButtonAddToCart>
      </div>
    </SingleItemStyle>
  );
}
