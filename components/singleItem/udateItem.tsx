import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import Form from "../styles/Form";
import Error from "../errorMessage";
import { SINGLE_ITEM_QUERY, UPDATE_ITEM_MUTATION } from "../../lib/queries";
import { useFormFields } from "../utils/useFormFields";
import { CREATE_ITEM_MUTATION } from "../nav/createItem";
import { FormStyles } from "../styles/FormStyles";
import Router from "next/router";

interface HTMLInputEvent {
  target: HTMLInputElement & EventTarget;
}

export interface UpdateItemProps {
  id: string;
}

export interface UpdateItemState {}

const UpdateItem = ({ id }: UpdateItemProps) => {
  const singleItemQuery = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: id },
  });

  const [fields, handleFieldChange] = useFormFields({
    description: "",
    price: "",
    title: "",
    gender: "",
    brand: "",
    category: "",
  });

  const [imageNew, setImageNew] = useState("");
  const [largeImageNew, setLargeImageNew] = useState("");
  const [uploading, setUploading] = useState(false);
  const [updateItem, updateItemMutation] = useMutation(UPDATE_ITEM_MUTATION);

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

    setImageNew(file.secure_url);
    setLargeImageNew(file.eager[0].secure_url);

    {
      imageNew && <img src={imageNew} alt="Upload preview" />;
    }

    setUploading(false);
  };

  if (singleItemQuery.loading) return <p>Loading...</p>;
  if (singleItemQuery.error) return <Error error={singleItemQuery.error} />;
  if (!singleItemQuery.data.item)
    return <p>No item found for item with id - {id}</p>;
  const {
    title,
    description,
    price,
    gender,
    category,
    brand,
    image,
    largeImage,
  } = singleItemQuery.data.item;

  return (
    <FormStyles>
      <fieldset
        disabled={updateItemMutation.loading || uploading}
        aria-busy={updateItemMutation.loading || uploading}
      >
        <div className="veen" style={{ background: "#D0D4D7" }}>
          <div className="wrapper" style={{ left: "20%", width: "60%" }}>
            <Form
              data-test="form"
              style={{ marginTop: "-10px" }}
              onSubmit={async (e) => {
                e.preventDefault();

                const res = await updateItem({
                  variables: {
                    id: id,
                    title: fields.title === "" ? title : fields.title,
                    description:
                      fields.description === ""
                        ? description
                        : fields.description,
                    price: fields.price === "" ? price : fields.price,
                    gender: fields.gender === "" ? gender : fields.gender,
                    category:
                      fields.category === "" ? category : fields.category,
                    brand: fields.brand === "" ? brand : fields.brand,
                    imageNew: imageNew === "" ? image : imageNew,
                    largeImageNew:
                      largeImageNew === "" ? largeImage : largeImageNew,
                  },
                });

                Router.push({
                  pathname: "/item",
                  query: { id: res.data.updateItem.id },
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
                  placeholder={title}
                  onChange={handleFieldChange}
                />

                <label>Title</label>
              </div>
              <div className="name">
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder={description}
                  onChange={handleFieldChange}
                />

                <label>Description</label>
              </div>

              <div className="name">
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder={price}
                  onChange={handleFieldChange}
                />

                <label>Price</label>
              </div>

              <div className="gender">
                <label>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  placeholder={gender}
                  onChange={handleFieldChange}
                >
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                </select>
              </div>

              <div className="category">
                <label>Category</label>
                <select
                  id="category"
                  name="category"
                  placeholder={category}
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
                <select
                  id="brand"
                  name="brand"
                  placeholder={brand}
                  onChange={handleFieldChange}
                >
                  <option value="NIKE">Nike</option>
                  <option value="PUMA">Puma</option>
                  <option value="ASICS">Asics</option>
                  <option value="REBOOK">Rebook</option>
                </select>
              </div>

              <div className="name">
                <div style={{ display: "flex" }}>
                  <label> Image</label>
                  <input
                    type="file"
                    style={{ width: "85%", height: "50px", paddingTop: "13px" }}
                    id="file"
                    name="file"
                    placeholder={!imageNew && "Image uploaded"}
                    onChange={uploadFile}
                    size={5}
                  />

                  <img
                    height={50}
                    style={{
                      width: "15%",
                      paddingBottom: "10px",
                      border: "solid lightgrey",
                    }}
                    src={!imageNew ? image : imageNew}
                  ></img>
                </div>
              </div>
              <div className="submit">
                <button
                  disabled={uploading || updateItemMutation.loading}
                  className="dark"
                >
                  UPDATE ITEM
                </button>
              </div>
            </Form>
          </div>
        </div>
      </fieldset>
    </FormStyles>
  );
};

export default UpdateItem;

// render() {
//   return (
//     <Query
//       query={SINGLE_ITEM_QUERY}
//       variables={{
//         id: this.props.id,
//       }}
//     >
//       {({ data, loading }: any) => {
//         if (loading) return <p>Loading...</p>;
//         if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;
//         return (
//           <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
//             {(updateItem: any, { loading, error }: any): any => {
//               return (
//                 <Form
//                   onSubmit={(e) => {
//                     this.updateItem(e, updateItem);
//                   }}
//                 >
//                   <Error error={error}></Error>
//                   <fieldset
//                     disabled={loading ? loading : false}
//                     aria-busy={loading}
//                   >
//                     <label htmlFor="title">
//                       Title
//                       <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         placeholder="Title"
//                         required
//                         defaultValue={data?.item?.title}
//                         onChange={this.handleChange}
//                       />
//                     </label>
//                     <label htmlFor="price">
//                       Price
//                       <input
//                         type="number"
//                         id="price"
//                         name="price"
//                         placeholder="Price"
//                         required
//                         defaultValue={data?.item?.price}
//                         onChange={this.handleChange}
//                       />
//                     </label>
//                     <label htmlFor="description">
//                       Description
//                       <input
//                         type="text"
//                         id="description"
//                         name="description"
//                         placeholder="Enter a description"
//                         required
//                         defaultValue={data?.item?.description}
//                         onChange={this.handleChange}
//                       />
//                     </label>
//                     <button type="submit">
//                       Sav{loading ? "ing" : "e"} Changes
//                     </button>
//                   </fieldset>
//                 </Form>
//               );
//             }}
//           </Mutation>
//         );
//       }}
//     </Query>
//   );
