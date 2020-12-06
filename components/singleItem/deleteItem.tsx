import React from "react";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ALL_ITEMS_QUERY } from "../../lib/queries";
import { ButtonSingleItemAdminPage } from "../styles/ButtonStyles";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const GET_DELETED_ITEM_ID = gql`
  {
    id @client
  }
`;
interface deleteItemProps {
  itemId: string;
  children: any;
}

export default function DeleteItem(props: deleteItemProps) {
  const [deleteItem, deleteItemMutation] = useMutation(DELETE_ITEM_MUTATION, {
    update(cache, payload) {
      const data: any = cache.readQuery({ query: ALL_ITEMS_QUERY });
      data.items = data.items.filter(
        (item: any) => item.id !== payload.data.deleteItem.id
      );
      cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
    },
  });
  const { itemId } = props;

  const handleDeleteItem = () => {
    if (confirm("Do you want to delete that item?"))
      deleteItem({ variables: { id: itemId } }).catch((error) => {
        console.log("handleDeleteItem error");
      });
  };

  return (
    <ButtonSingleItemAdminPage onClick={handleDeleteItem}>
      {props.children}
    </ButtonSingleItemAdminPage>
  );
}
