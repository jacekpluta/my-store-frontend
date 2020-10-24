import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./errorMessage";
import { SingleItemStyle } from "./styles/SingleItemStyle";
import { ButtonAddToCart } from "./styles/ButtonStyles";
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from "../lib/queries";
import Counter from "./counter";
import Size from "./size";
import { addToCartItem } from "../lib/vars";

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

export default function SingleItem(props: SingleItemProps) {
  const { itemId } = props;
  const [counter, setCounter] = useState(1);
  const [error, setError] = useState(false);
  const [sizePicked, setSizePicked] = useState(0);

  const singleItemQuery = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: itemId },
  });

  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  if (singleItemQuery.loading) return <p>Loading...</p>;
  if (singleItemQuery.error) return <Error error={singleItemQuery.error} />;
  if (addToCartMutation.error) return <Error error={addToCartMutation.error} />;
  if (!singleItemQuery.data.item)
    return <p>No item found for item with id - {itemId}</p>;

  const item = singleItemQuery.data.item;

  const addCounter = (counter: number) => {
    setCounter(counter + 1);
  };

  const substractCounter = (counter: number) => {
    setCounter(counter - 1);
  };

  const handleSizePicked = (sizeNumber: number) => {
    setSizePicked(sizeNumber);
  };

  const inSingleItem: Boolean = true;

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

        <Size
          error={error}
          handleSizePicked={handleSizePicked}
          inSingleItem={inSingleItem}
          sizePicked={sizePicked}
        ></Size>
        <Counter
          addCounter={addCounter}
          substractCounter={substractCounter}
          counter={counter}
        ></Counter>

        <ButtonAddToCart
          disabled={addToCartMutation.loading}
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
          ADD TO CART
        </ButtonAddToCart>
      </div>
    </SingleItemStyle>
  );
}
