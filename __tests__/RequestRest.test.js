import { mount } from "enzyme";
import RequestReset from "../components/RequestReset";
import { REQUEST_RESET_MUTATION } from "../components/RequestReset";
import { MockedProvider } from "@apollo/react-testing";

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: "test@o2.pl" },
    },
    result: {
      data: { requestReset: { message: "success", __typename: "Message" } },
    },
  },
];
it("renders component", async () => {
  const wrapper = mount(
    <MockedProvider>
      <RequestReset />
    </MockedProvider>
  );

  const form = wrapper.find("form[data-test='form']");

  expect(form).toMatchSnapshot();
});

it("renders component", async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RequestReset />
    </MockedProvider>
  );
  expect(wrapper.text()).toContain("Request reset token to change your email");

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  wrapper
    .find("input")
    .simulate("change", { target: { id: "email", value: "test@o2.pl" } });

  wrapper.find("form[data-test='form']").simulate("submit");

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  expect(wrapper.find("p").text()).toContain(
    "Reset link has been send to your email!"
  );
});
