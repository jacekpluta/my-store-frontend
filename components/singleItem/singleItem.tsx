import { gql, useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useState } from "react";
import {
  ADD_TO_CART_MUTATION,
  CURRENT_USER_QUERY,
  SINGLE_ITEM_QUERY,
} from "../../lib/queries";
import { addToCartItem } from "../../lib/vars";

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

  // const dowolnyObiekt = { hello: 'World' }
  // const nowyObiekt = {
  //   __proto__: dowolnyObiekt
  //   test() {
  //     console.log(`Hello ${‘super.hello}`);
  //   }
  // }

  // const pracownik = {
  //   jestPracownikiem: true
  // }
  // const programista = {
  //   jestProgramista: true
  // }
  // programista.__proto__ = pracownik;
  // console.log(programista.jestPracownikiem); //true

  // const jan = Object.create(pracownik)

  // console.log(jan.jestPracownikiem); //true
  // console.log(jan.jestProgramista); //undefined

  // Object.setPrototypeOf(jan, programista)

  // console.log(jan.jestPracownikiem); //true
  // console.log(jan.jestProgramista); //true

  // nowyObiekt.test();

  // function* generator() {
  //   console.log("Generator 1");
  //   yield "wiadomosc";
  //   let val = yield;
  //   console.log(val);
  //   return "koniec!";
  // }

  // const iterator = generator(); // Stworzenie instancji generatora

  // //Uruchomienie generatora pierwszy raz
  // const wynik1 = iterator.next();
  // // W konsoli wypisze Generator 1

  // //Uruchomienie generatora drugi raz
  // const wynik2 = iterator.next();
  // // W konsoli nic sie nei zmieni

  // //Uruchomienie generatora trzeci raz
  // const wynik3 = iterator.next("Generator 2");

  // //Uruchomienie generatora czwarty raz
  // const wynik4 = iterator.next();
  // // Nic sie nie zmieni w konsoli

  // console.log(wynik1); // { done: false, value: "wiadomosc" }
  // console.log(wynik2); // { done: false, value: undefined }
  // console.log(wynik3); // { done: true, value: "koniec!" }
  // console.log(wynik4); // { done: true, value: undefined }

  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],

    // update(cache, payload) {
    //   const cartItem = payload.data.addToCart;
    //   let data = cache.readQuery({ query: CURRENT_USER_QUERY });
    //   return cache.writeQuery({
    //     query: CURRENT_USER_QUERY,
    //     data: { user: { cart: [...data.user.cart, cartItem] } },
    //   });
    // const isInCartItem = data.user.cart.find(
    //   (item: any) => item.item.id === cartItem.item.id
    // );
    // const fileredCartItems = data.user.cart.filter(
    //   (cartItem: any) => cartItem.item.id !== isInCartItem.item.id
    // );
    // if (isInCartItem) {
    //   const items = [...fileredCartItems, isInCartItem];
    //   console.log("items", items);
    //   return cache.writeQuery({
    //     query: CURRENT_USER_QUERY,
    //     data: { user: { cart: items } },
    //   });
    // }
    // else {
    //   return cache.writeQuery({
    //     query: CURRENT_USER_QUERY,
    //     data: { user: { cart: [...data.user.cart, cartItem] } },
    //   });
    // }
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
                  quantity: +1,
                  size: sizePicked,
                },

                // optimisticResponse: {
                //   __typename: "Mutation",
                //   addToCart: {
                //     __typename: "CartItem",
                //     id: item.id,
                //     quantity: +1,
                //     size: sizePicked,
                //   },
                // },
              });
              addToCartItem(null);
              setError(false);
            } else if (!currentUser?.data?.user) {
              Router.push({
                pathname: "/login",
              });
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
