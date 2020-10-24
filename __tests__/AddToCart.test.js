// import AddToCart, { ADD_TO_CART_MUTATION } from "../components/AddToCart";
// import { mount } from "enzyme";
// import { MockedProvider } from "@apollo/react-testing";
// import { CURRENT_USER_QUERY } from "../components/Queries";

// import { ApolloConsumer } from "@apollo/client";

// const fakeItem = {
//   __typename: "Item",
//   id: "test123",
//   price: 100,
//   user: null,
//   image: "test.jpg",
//   title: "test title",
//   description: "test",
//   largeImage: "test.jpg",
// };

// const fakeCartItem = {
//   __typename: "CartItem",
//   id: "omg123",
//   quantity: 3,
//   item: fakeItem,
//   user: {
//     __typename: "User",
//     id: "4234",
//     name: "test",
//     email: "test@o2.pl",
//     permissions: ["ADMIN"],
//   },
// };

// const fakeUser = {
//   __typename: "User",
//   id: "4234",
//   name: "test",
//   email: "test@o2.pl",
//   permissions: ["ADMIN"],
//   cart: [],
// };

// const addToCartMocks = [
//   {
//     request: { query: CURRENT_USER_QUERY },
//     result: { data: { user: fakeUser } },
//   },
//   {
//     request: {
//       query: ADD_TO_CART_MUTATION,
//       variables: {
//         id: "test123",
//       },
//     },
//     result: { data: { addToCart: { ...fakeCartItem, quantity: 1 } } },
//   },
// ];

// it("renders component and maches snap", async () => {
//   const wrapper = mount(
//     <MockedProvider mocks={addToCartMocks}>
//       <AddToCart itemId="test123" />
//     </MockedProvider>
//   );

//   await new Promise((resolve) => setTimeout(resolve, 0));
//   wrapper.update();

//   const button = wrapper.find("button");

//   expect(button).toMatchSnapshot();
// });

// it("adds item to cart on click", async () => {
//   let apolloClient;
//   const wrapper = mount(
//     <MockedProvider mocks={addToCartMocks}>
//       <ApolloConsumer>
//         {(client) => {
//           apolloClient = client;
//           return <AddToCart itemId="test123" />;
//         }}
//       </ApolloConsumer>
//     </MockedProvider>
//   );

//   await new Promise((resolve) => setTimeout(resolve, 0));
//   wrapper.update();

//   const {
//     data: { user },
//   } = await apolloClient.query({
//     query: CURRENT_USER_QUERY,
//   });

//   expect(user.cart).toHaveLength(0);
//   expect(wrapper.find("button").prop("disabled")).toEqual(false);

//   wrapper.find("button").simulate("click");

//   expect(wrapper.find("button").prop("disabled")).toEqual(true);

//   wrapper.update();
//   //   console.log(wrapper.debug());
// });

// it("changes from add to adding when clicked", async () => {
//   let apolloClient;
//   const wrapper = mount(
//     <MockedProvider mocks={addToCartMocks}>
//       <ApolloConsumer>
//         {(client) => {
//           apolloClient = client;
//           return <AddToCart itemId="test123" />;
//         }}
//       </ApolloConsumer>
//     </MockedProvider>
//   );

//   await new Promise((resolve) => setTimeout(resolve, 0));
//   wrapper.update();

//   expect(wrapper.text()).toContain("Add to cart");
//   wrapper.find("button").simulate("click");
//   expect(wrapper.text()).toContain("Adding to cart");
// });
