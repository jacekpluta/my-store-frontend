import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Form from "./styles/Form";
import gql from "graphql-tag";
import { useFormFields } from "../lib/useFormFields";
import Error from "./errorMessage";
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

const CreateItem = () => {
  const [fields, handleFieldChange] = useFormFields({
    description: "",
    price: "",
    title: "",
  });

  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");

  interface HTMLInputEvent {
    target: HTMLInputElement & EventTarget;
  }

  const uploadFile = async (e: HTMLInputEvent) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "myshop");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dr7nwbqbz/image/upload",
      { method: "POST", body: data }
    );

    const file = await res.json();

    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);

    {
      image && <img src={image} alt="Upload preview" />;
    }
  };

  const [createItem, createItemtMutation] = useMutation(CREATE_ITEM_MUTATION);

  return (
    <Form
      data-test="form"
      onSubmit={async (e) => {
        e.preventDefault();

        const res = await createItem({
          variables: {
            ...fields,
            image: image,
            largeImage: largeImage,
          },
        });
        Router.push({
          pathname: "/item",
          query: { id: res.data.createItem.id },
        });
      }}
    >
      <Error error={createItemtMutation.error}></Error>
      <fieldset
        disabled={
          createItemtMutation.loading ? createItemtMutation.loading : false
        }
        aria-busy={createItemtMutation.loading}
      >
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder={!image ? "Upload an image" : "Image uploaded"}
            required
            onChange={uploadFile}
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
            value={fields.title}
            onChange={handleFieldChange}
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
            value={fields.price}
            onChange={handleFieldChange}
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
            value={fields.description}
            onChange={handleFieldChange}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateItem;
