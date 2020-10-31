import Cart, { LOCAL_STATE_QUERY } from "../components/cart/cart";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { CURRENT_USER_QUERY } from "../lib/queries";

import { ApolloConsumer } from "@apollo/client";

const fakeItem = {
  __typename: "Item",
  id: "test123",
  price: 5000,
  user: null,
  image: "dog-small.jpg",
  title: "dogs are best",
  description: "dogs",
  largeImage: "dog.jpg",
};

const fakeCartItem = {
  __typename: "CartItem",
  id: "omg123",
  quantity: 3,
  item: fakeItem,
  user: {
    __typename: "User",
    id: "4234",
    name: "test",
    email: "test@o2.pl",
    permissions: ["ADMIN"],
  },
};

const fakeUser = {
  __typename: "User",
  id: "4234",
  name: "test",
  email: "test@o2.pl",
  permissions: ["ADMIN"],
  cart: [fakeCartItem],
};

const cartMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { user: fakeUser } },
  },
  {
    request: { query: LOCAL_STATE_QUERY },
    result: { data: { cartOpen: true } },
  },
];

it("renders component and maches snap", async () => {
  const wrapper = mount(
    <MockedProvider mocks={cartMocks}>
      <Cart />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const header = wrapper.find("header");

  expect(wrapper.find("CartItem")).toHaveLength(1);
  expect(header).toMatchSnapshot();
});
