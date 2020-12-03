import { gql, useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import {
  ADD_TO_CART_MUTATION,
  CART_LOCAL_QUERY,
  CURRENT_USER_QUERY,
  SINGLE_ITEM_QUERY,
} from "../../lib/queries";
import { addToCartItem, cartLocal } from "../../lib/vars";

import Error from "../errorMessage";
import {
  ButtonSingleItemAdminPage,
  ButtonSingleItemPage,
} from "../styles/ButtonStyles";
import {
  AdminButtonsContainer,
  SingleItemStyle,
} from "../styles/SingleItemStyle";
import Counter from "./counter";
import DeleteItem from "./deleteItem";
import Size from "./size";

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

  const cartLocalData = useQuery(CART_LOCAL_QUERY);

  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const currentUser = useQuery(CURRENT_USER_QUERY);

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

  const permissionsNeeded = ["ADMIN", "PERRMISSIONUPDATE"];
  const matchedPermissions = currentUser?.data?.user?.permissions?.filter(
    (permissionTheyHave: string) =>
      permissionsNeeded.includes(permissionTheyHave)
  );

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

        <ButtonSingleItemPage
          disabled={addToCartMutation.loading}
          onClick={async () => {
            if (currentUser?.data?.user && sizePicked !== 0) {
              await addToCart({
                variables: {
                  id: item.id,
                  quantity: +counter,
                  size: sizePicked,
                },
              });

              addToCartItem(null);

              setError(false);
            } else if (!currentUser?.data?.user && sizePicked !== 0) {
              const localCart = [...cartLocalData.data.cartLocal];

              const isInCart = localCart.find((cartItem) => {
                if (
                  cartItem.item.id === item.id &&
                  cartItem.size === sizePicked
                )
                  return cartItem;
              });

              if (isInCart) {
                const filteredCart = localCart.filter(
                  (localCartItem) =>
                    localCartItem.item.id + localCartItem.size !==
                    isInCart.item.id + isInCart.size
                );

                return cartLocal([
                  ...filteredCart,
                  {
                    __typename: "Item",
                    quantity: isInCart.quantity + counter,
                    size: sizePicked,
                    item: item,
                  },
                ]);
              }

              return cartLocal([
                ...localCart,
                {
                  __typename: "Item",
                  quantity: +counter,
                  size: sizePicked,
                  item: item,
                },
              ]);
            } else {
              setError(true);
            }
          }}
        >
          ADD TO CART
        </ButtonSingleItemPage>

        {matchedPermissions?.length > 0 && (
          <AdminButtonsContainer
            style={{
              display: "inline-flex",
              flexDirection: "row",
            }}
          >
            <ButtonSingleItemAdminPage
              onClick={async () => {
                Router.push({
                  pathname: "/updateItem",
                  query: { id: item.id },
                });
              }}
            >
              UPDATE ITEM
            </ButtonSingleItemAdminPage>
            <DeleteItem itemId={item.id}>DELETE ITEM</DeleteItem>
          </AdminButtonsContainer>
        )}
      </div>
    </SingleItemStyle>
  );
}
