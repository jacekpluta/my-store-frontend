import CartItem, { DELETE_CART_ITEM_MUTATION } from "../components/CartItem";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { CURRENT_USER_QUERY } from "../components/Queries";
import { ApolloConsumer } from "@apollo/client";

global.alert = console.log;
const cartItem = {
  id: "test123",
  item: {
    id: "test123",
    price: 5000,
    image: "dog-small.jpg",
    title: "dogs are best",
    description: "dogs",
  },
  quantity: 1,
};

const fakeUser = {
  id: "test123",
  name: "test name",
  email: "test@o2.pl",
  permissions: ["ADMIN"],
  cart: [
    {
      id: "test123",
      quantity: 3,
      item: {
        id: "test123",
        price: 5000,
        image: "dog-small.jpg",
        title: "dogs are best",
        description: "dogs",
      },
      user: null,
      image: "",
    },
  ],
};

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        user: {
          fakeUser,
        },
      },
    },
  },
  {
    request: { query: DELETE_CART_ITEM_MUTATION, variables: { id: "test123" } },
    result: {
      data: {
        deleteCartItem: {
          id: "test123",
        },
      },
    },
  },
];

it("renders component and maches snap", async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <CartItem cartItem={cartItem} />
    </MockedProvider>
  );

  const cartIt = wrapper.find("ul[data-test='nav']");

  expect(cartIt).toMatchSnapshot();
});

// it("removes the item from carttt", async () => {
//   let apolloClient;
//   const wrapper = mount(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <ApolloConsumer>
//         {(client) => {
//           apolloClient = client;
//           return <CartItem cartItem={cartItem} />;
//         }}
//       </ApolloConsumer>
//     </MockedProvider>
//   );

//   const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
//   expect(res.data.user.cart).toHaveLength(1);
//   expect(res.data.user.cart[0].item.price).toBe(5000);
//   wrapper.find("button").simulate("click");
//   await new Promise((resolve) => setTimeout(resolve, 0));
//   wrapper.update();

//   const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY });

//   expect(res2.data.user.cart).toHaveLength(0);
// });
