import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    user {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

export const FEATURED_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = 6) {
    items(first: $first, skip: $skip, orderBy: description_ASC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export const DISCOUNT_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = 4) {
    items(first: $first, skip: $skip, orderBy: id_ASC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export const IS_CART_OPEN_QUERY = gql`
  query IsCartOpen {
    cartOpen @client
  }
`;
