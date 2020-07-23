import { mount } from "enzyme";
import CreateItem from "../components/CreateItem";
import { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { MockedProvider } from "@apollo/react-testing";
import Router from "next/router";

const image = "https://image.com/testImage";

global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: image,
    eager: [{ secure_url: image }],
  }),
});

it("renders component and maches snap", async () => {
  const wrapper = mount(
    <MockedProvider>
      <CreateItem />
    </MockedProvider>
  );

  const form = wrapper.find("form[data-test='form']");

  expect(form).toMatchSnapshot();
});

it("uploads an image when creating a new item", async () => {
  const wrapper = mount(
    <MockedProvider>
      <CreateItem />
    </MockedProvider>
  );

  const input = wrapper.find("input[type='file']");

  input.simulate("change", { target: { files: ["testImage.jpg"] } });

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  expect(wrapper.find("#file").prop("placeholder")).toEqual("Image uploaded");

  expect(global.fetch).toHaveBeenCalled();
  global.fetch.mockReset();
});

it("handles onChange", async () => {
  const wrapper = mount(
    <MockedProvider>
      <CreateItem />
    </MockedProvider>
  );

  wrapper
    .find("#title")
    .simulate("change", { target: { id: "title", value: "title test" } });
  wrapper.find("#description").simulate("change", {
    target: { id: "description", value: "description test" },
  });
  wrapper.find("#price").simulate("change", {
    target: { id: "price", value: 100, type: "number" },
  });

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  expect(wrapper.find("#description").prop("value")).toEqual(
    "description test"
  );
  expect(wrapper.find("#title").prop("value")).toEqual("title test");
  expect(wrapper.find("#price").prop("value")).toEqual(100);
});

it("creates an item on submit", async () => {
  const fakeItem = {
    description: "test",
    id: "123abc",
    image: "testImage",
    largeImage: "testLargeImage",
    price: 111,
    title: "test",
  };

  const mocks = [
    {
      request: {
        query: CREATE_ITEM_MUTATION,
        variables: {
          description: fakeItem.description,
          price: fakeItem.price,
          title: fakeItem.title,
          image: "",
          largeImage: "",
        },
      },
      result: {
        data: {
          createItem: {
            id: "123",
            fakeItem,
          },
        },
      },
    },
  ];

  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <CreateItem />
    </MockedProvider>
  );

  wrapper
    .find("#title")
    .simulate("change", { target: { id: "title", value: fakeItem.title } });
  wrapper.find("#description").simulate("change", {
    target: { id: "description", value: fakeItem.description },
  });
  wrapper.find("#price").simulate("change", {
    target: { id: "price", value: fakeItem.price, type: "number" },
  });

  Router.router = { push: jest.fn() };
  wrapper.find("form").simulate("submit");

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  expect(Router.router.push).toHaveBeenCalledTimes(1);
  expect(Router.router.push).toHaveBeenCalledWith({
    pathname: "/item",
    query: { id: "123" },
  });
});
