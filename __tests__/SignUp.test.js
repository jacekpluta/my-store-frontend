import { mount } from "enzyme";
import SignUp from "../components/SignUp";
import { CREATE_USER_MUTATION } from "../components/SignUp";
import { MockedProvider } from "@apollo/react-testing";
import { CURRENT_USER_QUERY } from "../components/Queries";
import Router from "next/router";
import { ApolloConsumer } from "@apollo/client";

const mockedRouter = { push: () => {} };
Router.router = mockedRouter;

const fakeUser = {
  __typename: "User",
  id: "4234",
  name: "test",
  email: "test@o2.pl",
  permissions: ["ADMIN"],
  cart: [],
};

let signUpMutationCalled = false;

const signUpMocks = [
  {
    request: {
      query: CREATE_USER_MUTATION,
      variables: {
        name: fakeUser.name,
        email: fakeUser.email,
        password: "pass123",
      },
    },
    result: () => {
      signUpMutationCalled = true;
      return {
        signup: { id: fakeUser.id, name: fakeUser.name, email: fakeUser.email },
      };
    },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { user: fakeUser } },
  },
];

function type(wrapper, id, value) {
  wrapper.find(`input[id="${id}"]`).simulate("change", {
    target: { id, value },
  });
}

it("renders and maches snapshot", async () => {
  const wrapper = mount(
    <MockedProvider mocks={signUpMocks}>
      <SignUp></SignUp>
    </MockedProvider>
  );

  expect(wrapper.find("Form")).toMatchSnapshot();
});

it("renders and maches snapshot", async () => {
  let apolloClient;
  const wrapper = mount(
    <MockedProvider mocks={signUpMocks}>
      <ApolloConsumer>
        {(client) => {
          apolloClient = client;
          return <SignUp></SignUp>;
        }}
      </ApolloConsumer>
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  type(wrapper, "name", fakeUser.name);
  type(wrapper, "password", "pass123");
  type(wrapper, "email", fakeUser.email);

  wrapper.update();

  expect(wrapper.find("#email").prop("value")).toEqual("test@o2.pl");
  expect(wrapper.find("#name").prop("value")).toEqual("test");
  expect(wrapper.find("#password").prop("value")).toEqual("pass123");
  wrapper.update();

  wrapper.find("form").simulate("submit");

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();
  expect(signUpMutationCalled).toBe(true);

  const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
  expect(user.data.user).toMatchObject(fakeUser);
});
