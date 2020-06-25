import React from "react";
import { Mutation } from "react-apollo";
import Form from "../styles/Form";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Error from "../components/errorMessage";
import Router from "next/router";

export interface CreateItemProps {}

export interface CreateItemState {
  description: string;
  id: string;
  image: string;
  largeImage: string;
  price: number;
  title: string;
}

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends React.Component<CreateItemProps, CreateItemState> {
  state = {
    description: "",
    id: "",
    image: "",
    largeImage: "",
    price: 0,
    title: "",
  };

  constructor(props: CreateItemProps) {
    super(props);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value, name } = e.target;

    const val: string | number = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "myshop");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dr7nwbqbz/image/upload",
      { method: "POST", body: data }
    );

    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
    {
      this.state.image && <img src={this.state.image} alt="Upload preview" />;
    }
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }): any => (
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              //call mutation
              const res = await createItem();
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id },
              });
            }}
          >
            <Error error={error}></Error>
            <fieldset disabled={loading ? loading : ""} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
