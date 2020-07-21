import React from "react";
import SingleItem, { SINGLE_ITEM_QUERY } from "../components/SingleItem";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";

const fakeItem = {
  id: "abc123",
  title: "test",
  description: "test description",
  largeImage: "test.jpg",
};
it("renders correctly", async () => {
  const mocks = [
    {
      request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
      result: {
        data: {
          item: fakeItem,
        },
      },
    },
  ];

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SingleItem itemId="123" />
    </MockedProvider>
  );
  expect(wrapper.text()).toContain("Loading...");

  await new Promise((resolve) => setTimeout(resolve, 0));

  wrapper.update();

  expect(wrapper.find("h2")).toMatchSnapshot();
  expect(wrapper.find("img")).toMatchSnapshot();
  expect(wrapper.find("p")).toMatchSnapshot();
});

it("errors when no item found", async () => {
  const mocks = [
    {
      request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
      result: {
        errors: [{ message: "Item not found" }],
      },
    },
  ];

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SingleItem itemId="123" />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));

  wrapper.update();

  const item = wrapper.find('[data-test="graphql-error"]');
  expect(item.text()).toContain("Error!Item not found");
  expect(item).toMatchSnapshot();
});
