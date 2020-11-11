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
        quantity
        size
        item {
          id
          title
          description
          price
          gender
          category
          brand
          image
          largeImage
        }
      }
    }
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      image
      largeImage
      price
      brand
      category
      gender
    }
  }
`;

export const IS_CART_OPEN_QUERY = gql`
  query IsCartOpen {
    cartOpen @client
  }
`;

export const IS_NAV_OPEN_QUERY = gql`
  query IsNavOpen {
    navOpen @client
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

export const CART_LOCAL_QUERY = gql`
  query CartLocal {
    cartLocal @client
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $gender: Gender
    $brand: Brand
    $category: Category
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
      gender: $gender
      brand: $brand
      category: $category
    ) {
      id
      title
      description
      price
      gender
      brand
      category
    }
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

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export const DISCOUNT_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = 6) {
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
  mutation ADD_TO_CART_MUTATION($id: ID!, $quantity: Int!, $size: Int!) {
    addToCart(id: $id, quantity: $quantity, size: $size) {
      __typename
      quantity
      size
      item {
        id
        title
        description
        price
        gender
        category
        brand
        image
        largeImage
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LOGIN_USER_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
