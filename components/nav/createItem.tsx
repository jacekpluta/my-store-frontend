import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Form from "../styles/Form";
import gql from "graphql-tag";
import { useFormFields } from "../utils/useFormFields";
import Router from "next/router";
import { FormStyles } from "../styles/FormStyles";

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
    $image: String!
    $largeImage: String!
    $gender: Gender!
    $category: Category!
    $brand: Brand!
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      gender: $gender
      category: $category
      brand: $brand
    ) {
      id
      title
    }
  }
`;

// export const CREATE_ITEM_LOWERCASE_MUTATION = gql`
//   mutation CREATE_ITEM_LOWERCASE_MUTATION(
//     $title: String!
//     $description: String!
//     $price: Int!
//     $image: String!
//     $largeImage: String!
//     $gender: Gender!
//     $category: Category!
//     $brand: Brand!
//   ) {
//     createItemLowercase(
//       title: $title
//       description: $description
//       price: $price
//       image: $image
//       largeImage: $largeImage
//       gender: $gender
//       category: $category
//       brand: $brand
//     ) {
//       id
//       title
//     }
//   }
// `;

interface HTMLInputEvent {
  target: HTMLInputElement & EventTarget;
}

const CreateItem = () => {
  const [fields, handleFieldChange] = useFormFields({
    description: "",
    price: "",
    title: "",
    gender: "MEN",
    brand: "NIKE",
    category: "SHOES",
  });

  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [createItem, createItemMutation] = useMutation(CREATE_ITEM_MUTATION);

  const uploadFile = async (e: HTMLInputEvent) => {
    setUploading(true);
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

    setUploading(false);
  };

  return (
    <FormStyles>
      <fieldset
        disabled={createItemMutation.loading || uploading}
        aria-busy={createItemMutation.loading || uploading}
      >
        <div className="veen" style={{ background: "#D0D4D7" }}>
          <div className="wrapper" style={{ left: "20%", width: "60%" }}>
            <Form
              data-test="form"
              style={{ marginTop: "-35px" }}
              onSubmit={async (e) => {
                e.preventDefault();

                const res = await createItem({
                  variables: {
                    ...fields,
                    image: image,
                    largeImage: largeImage,
                  },
                });

                // const res2 = await createItemLowercase({
                //   variables: {
                //     ...fields,
                //     image: image,
                //     largeImage: largeImage,
                //   },
                // });

                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id },
                });
              }}
            >
              <h2 className="second">
                <span>My Shop</span>
              </h2>

              {/* <Error error={createItemtMutation.error}></Error> */}
              <div className="name">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={fields.title}
                  onChange={handleFieldChange}
                />

                <label>Title</label>
              </div>
              <div className="name">
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  value={fields.description}
                  onChange={handleFieldChange}
                />

                <label>Description</label>
              </div>

              <div className="name">
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  onChange={handleFieldChange}
                />

                <label>Price</label>
              </div>

              <div className="gender">
                <label>Gender</label>
                <select id="gender" name="gender" onChange={handleFieldChange}>
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                </select>
              </div>

              <div className="category">
                <label>Category</label>
                <select
                  id="category"
                  name="category"
                  onChange={handleFieldChange}
                >
                  <option value="SHOES">Shoes</option>
                  <option value="BOOTS">Boots</option>
                  <option value="TRAINERS">Trainers</option>
                  <option value="SANDALS">Sandals</option>
                </select>
              </div>

              <div className="brand">
                <label>Brand</label>
                <select id="brand" name="brand" onChange={handleFieldChange}>
                  <option value="NIKE">Nike</option>
                  <option value="PUMA">Puma</option>
                  <option value="ASICS">Asics</option>
                  <option value="REBOOK">Rebook</option>
                </select>
              </div>

              <div className="name">
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder={!image ? "" : "Image uploaded"}
                  required
                  onChange={uploadFile}
                />

                <label> Image</label>
              </div>
              <div className="submit">
                <button
                  disabled={uploading || createItemMutation.loading}
                  className="dark"
                >
                  ADD ITEM
                </button>
              </div>
            </Form>
          </div>
        </div>
      </fieldset>
    </FormStyles>
  );
};

export default CreateItem;
