import React from "react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { ALL_ITEMS_QUERY } from "./items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default function deleteItem(props) {
  const [deleteItem, { data, error }] = useMutation(DELETE_ITEM_MUTATION, {
    update(cache, payload) {
      const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
      data.items = data.items.filter(
        (item) => item.id !== payload.data.deleteItem.id
      );
      cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
    },
  });
  const { itemId } = props;

  const handleDeleteItem = () => {
    if (confirm("Do you want to delete that item?"))
      deleteItem({ variables: { id: itemId } }).catch((error) => {
        alert("You don't have permissions to delete that item");
      });
  };

  return <button onClick={handleDeleteItem}>{props.children}</button>;
}
