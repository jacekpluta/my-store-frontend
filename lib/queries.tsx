import gql from "graphql-tag";
import { perPage } from "../config";

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

export const IS_CART_OPEN_QUERY = gql`
  query IsCartOpen {
    cartOpen @client
  }
`;

export const FILTERS_QUERY = gql`
  query Filters {
    filters @client
  }
`;

export const CLEAR_FILTERS_QUERY = gql`
  query ClearFilters {
    clearFilters @client
  }
`;

export const ADD_TO_CART_ITEM_QUERY = gql`
  query AddToCartItem {
    addToCartItem @client
  }
`;

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}, $orderBy: ItemOrderByInput, $price_gte: Int, $price_lte: Int,$brand_in: [Brand!], $gender_in: [Gender!], $category_in: [Category!]) {
    items(first: $first, skip: $skip, orderBy: $orderBy, where: { price_gte: $price_gte,price_lte: $price_lte,  brand_in: $brand_in, gender_in: $gender_in, category_in: $category_in}) {
      id
      title
      price
      description
      image
      largeImage
      gender
      brand
      category
    }
  }
`;

export const FEATURED_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = 4) {
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

export const FILTERED_ITEMS_QUERY = gql`
  query FILTERED_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}, $orderBy: ItemOrderByInput, $price: Int) {
    items(first: $first, skip: $skip, orderBy: $orderBy, where: { price: $price }) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!, $quantity: Int!) {
    addToCart(id: $id, quantity: $quantity) {
      id
    }
  }
`;
