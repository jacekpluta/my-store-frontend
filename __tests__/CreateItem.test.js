import { mount } from "enzyme";
import CreateItem from "../components/CreateItem";
import { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { MockedProvider } from "@apollo/react-testing";

const image = "https://image.com/testImage";

global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: image,
    eager: [{ secure_url: image }],
  }),
});

const fakeItem = {
  description: "test",
  id: "123abc",
  image: "testImage",
  largeImage: "testLargeImage",
  price: 111,
  title: "test",
};

// const mocks = [
//   {
//     request: {
//       query: REQUEST_RESET_MUTATION,
//       variables: { email: "test@o2.pl" },
//     },
//     result: {
//       data: { requestReset: { message: "success", __typename: "Message" } },
//     },
//   },
// ];

it("renders component and maches snap", async () => {
  const wrapper = mount(
    <MockedProvider>
      <CreateItem />
    </MockedProvider>
  );

  const form = wrapper.find("form[data-test='form']");

  expect(form).toMatchSnapshot();
});

it("uploads a file when creating a new item", async () => {
  const wrapper = mount(
    <MockedProvider>
      <CreateItem />
    </MockedProvider>
  );

  const input = wrapper.find("input[type='file']");

  input.simulate("change", { target: { files: ["testImage.jpg"] } });

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  expect(global.fetch).toHaveBeenCalled();
  global.fetch.mockReset();
});
