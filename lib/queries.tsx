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
