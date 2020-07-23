import React from "react";
import { Mutation, Query } from "react-apollo";
import Form from "./styles/Form";
import gql from "graphql-tag";
import Error from "./ErrorMessage";

export interface UpdateItemProps {
  id: string;
}

export interface UpdateItemState {}
export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends React.Component<UpdateItemProps, UpdateItemState> {
  state = {};

  constructor(props: UpdateItemProps) {
    super(props);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value, name } = e.target;
    const val: string | number = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation): void => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }): any => {
                return (
                  <Form
                    onSubmit={(e) => {
                      this.updateItem(e, updateItem);
                    }}
                  >
                    <Error error={error}></Error>
                    <fieldset
                      disabled={loading ? loading : false}
                      aria-busy={loading}
                    >
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Title"
                          required
                          defaultValue={data?.item?.title}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="price">
                        Price
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder="Price"
                          required
                          defaultValue={data?.item?.price}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <input
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Enter a description"
                          required
                          defaultValue={data?.item?.description}
                          onChange={this.handleChange}
                        />
                      </label>
                      <button type="submit">
                        Sav{loading ? "ing" : "e"} Changes
                      </button>
                    </fieldset>
                  </Form>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
