import Order, { SINGLE_ORDER_QUERY } from "../components/Order";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { CURRENT_USER_QUERY } from "../components/Queries";
import { ApolloConsumer } from "@apollo/client";

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
    request: { query: SINGLE_ORDER_QUERY, variables: { id: "test123" } },
    result: {
      data: {
        order: {
          id: "test123",
          charge: "xzc123",
          total: 100,
          user: {
            id: "usertest123",
          },
          items: [
            {
              id: "itemtest123",
              title: "test title",
              description: "test desc",
              price: 50,
              image: "",
              quantity: 2,
            },
            {
              id: "itemtest456",
              title: "test title2",
              description: "test desc2",
              price: 51,
              image: "",
              quantity: 4,
            },
          ],
        },
      },
    },
  },
];

it("renders and matches snapshot", async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <Order orderId="test123" />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  wrapper.update();

  const order = wrapper.find("div[data-test='order']");
  expect(order).toMatchSnapshot();
});
