import { mount } from "enzyme";
import RequestToSignIn from "../components/RequestToSignIn";
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

it("renders the child component when signed in", async () => {
  const Test = () => <p>Test</p>;
  const wrapper = mount(
    <MockedProvider mocks={signedInMocks}>
      <RequestToSignIn>
        <Test />
      </RequestToSignIn>
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  expect(wrapper.contains(<Test />)).toBe(true);
});

it("renders sign in component when not signed in", async () => {
  const wrapper = mount(
    <MockedProvider mocks={notSignedInMocks}>
      <RequestToSignIn />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  expect(wrapper.text()).toContain("Sign InEmailPasswordSubmit");

  const SignIn = wrapper.find("SignIn");
  expect(SignIn.exists()).toBe(true);
});
