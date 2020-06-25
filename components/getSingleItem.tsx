import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export default function getSingleItem() {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: "ckbsewz1atxeu0a42x5sjham8" },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return "lol";
}
