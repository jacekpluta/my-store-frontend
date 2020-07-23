import CreditCardCheckout, {
  CREATE_ORDER_MUTATION,
} from "../components/CreditCardCheckout";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { CURRENT_USER_QUERY } from "../components/Queries";
import { ApolloConsumer } from "@apollo/client";
import NProgress from "next/router";
import Router from "next/router";

Router.router = { push() {} };

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

const fakeCart = {
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
];

it("renders and matches snapshot", async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <CreditCardCheckout
        allItemsCount={2}
        cart={fakeCart.cart}
        user={fakeUser}
      />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();
  const checkoutButton = wrapper.find("ReactStripeCheckout");
  expect(checkoutButton).toMatchSnapshot();
});

it("creates an order", async () => {
  const createOrderMock = jest.fn().mockResolvedValue({
    data: { createOrder: { id: "test123" } },
  });

  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <CreditCardCheckout
        allItemsCount={2}
        cart={fakeCart.cart}
        user={fakeUser}
      />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();
});

it("Charges a card", () => {
  // Mocking Stripe object
  const elementMock = {
    mount: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
    update: jest.fn(),
  };

  const elementsMock = {
    create: jest.fn().mockReturnValue(elementMock),
  };

  const stripeMock = {
    elements: jest.fn().mockReturnValue(elementsMock),
    createToken: jest.fn(() => Promise.resolve()),
    createSource: jest.fn(() => Promise.resolve()),
  };

  // Set the global Stripe
  window.Stripe = jest.fn().mockReturnValue(stripeMock);

  // Ex. of a token successfully created mock
  stripeMock.createToken.mockResolvedValue({
    token: {
      id: "test_id",
    },
  });

  // Ex. of a failure mock
  stripeMock.createToken.mockResolvedValue({
    error: {
      code: "incomplete_number",
      message: "Your card number is incomplete.",
      type: "validation_error",
    },
  });

  // Act
  // Wrap component in provider
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <CreditCardCheckout
        allItemsCount={2}
        cart={fakeCart.cart}
        user={fakeUser}
      />
    </MockedProvider>
  );

  // Do stuff with the components, api calls, etc as you would normally do with React Testing Library
});

it("creates an order", async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <CreditCardCheckout
        allItemsCount={2}
        cart={fakeCart.cart}
        user={fakeUser}
      />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  // Mocking Stripe object
  const elementMock = {
    mount: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
    update: jest.fn(),
  };

  const elementsMock = {
    create: jest.fn().mockReturnValue(elementMock),
  };

  const stripeMock = {
    elements: jest.fn().mockReturnValue(elementsMock),
    createToken: jest.fn(() => Promise.resolve()),
    createSource: jest.fn(() => Promise.resolve()),
  };

  // Set the global Stripe
  window.Stripe = jest.fn().mockReturnValue(stripeMock);

  // Ex. of a token successfully created mock
  stripeMock.createToken.mockResolvedValue({
    token: {
      id: "test_id",
    },
  });

  // Ex. of a failure mock
  stripeMock.createToken.mockResolvedValue({
    error: {
      code: "incomplete_number",
      message: "Your card number is incomplete.",
      type: "validation_error",
    },
  });
});

it("routes to the order page when completed", async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <CreditCardCheckout
        allItemsCount={2}
        cart={fakeCart.cart}
        user={fakeUser}
      />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const createOrderMock = jest.fn().mockResolvedValue({
    data: { createOrder: { id: "xyz789" } },
  });
  //  const component = wrapper.find('TakeMyMoney').instance();
  Router.router.push = jest.fn();

  const button = wrapper.find("button");

  button.simulate("click");
  wrapper.update();

  // component.onToken({ id: 'abc123' }, createOrderMock);
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(Router.router.push).toHaveBeenCalled();
});
