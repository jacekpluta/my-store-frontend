import { mount } from "enzyme";
import Nav from "../components/Nav";
import { CURRENT_USER_QUERY } from "../components/Queries";
import { MockedProvider } from "@apollo/react-testing";

const fakeUser = {
  __typename: "User",
  id: "4234",
  name: "test",
  email: "test@o2.pl",
  permissions: ["ADMIN"],
  cart: [],
};

const fakeItem = {
  __typename: "Item",
  id: "abc123",
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
  user: fakeUser,
};

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { user: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { user: fakeUser } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        user: { ...fakeUser, cart: [fakeCartItem, fakeCartItem, fakeCartItem] },
      },
    },
  },
];

it("renders user nav component when signed in", async () => {
  const wrapper = mount(
    <MockedProvider mocks={signedInMocks}>
      <Nav />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const nav = wrapper.find('ul[data-test="nav"]');

  expect(nav.children().length).toBe(7);

  expect(nav.text()).toContain("Logout");
  expect(nav.text()).toContain("Items");
  expect(nav.text()).toContain("Hello");
  expect(nav.text()).toContain("Sell");
  expect(nav.text()).toContain("Orders");
  expect(nav.text()).toContain("My Cart");
});

it("renders different nav component when not signed in", async () => {
  const wrapper = mount(
    <MockedProvider mocks={notSignedInMocks}>
      <Nav />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const nav = wrapper.find('ul[data-test="nav"]');
  expect(nav.children().length).toBe(2);
});

it("renders corrent amount of items in cart", async () => {
  const wrapper = mount(
    <MockedProvider mocks={signedInMocksWithCartItems}>
      <Nav />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const nav = wrapper.find('ul[data-test="nav"]');
  const count = nav.find("div.count");
  expect(count).toMatchSnapshot();
});
