import React from "react";
import Item from "../components/Item";
import { shallow } from "enzyme";

let wrapper;

const fakeItem = {
  description: "test",
  id: "123abc",
  image: "testImage",
  largeImage: "testLargeImage",
  price: 111,
  title: "test",
};

beforeEach(() => {
  wrapper = shallow(<Item item={fakeItem} />);
});

it("renders and maches snapshot", () => {
  const wrapper = shallow(<Item item={fakeItem} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders price tag", () => {
  const PriceTag = wrapper.find("PriceTag");
  expect(PriceTag.children().text()).toBe("$1.11");
  expect(wrapper.find("Title a").text()).toBe(fakeItem.title);

  const img = wrapper.find("img");
  expect(img.props().src).toBe(fakeItem.image);
  expect(img.props().alt).toBe(fakeItem.title);
});

it("renders title", () => {
  expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
});

it("renders image", () => {
  const img = wrapper.find("img");
  expect(img.props().src).toBe(fakeItem.image);
  expect(img.props().alt).toBe(fakeItem.title);
});

it("renders out buttons", () => {
  const buttonList = wrapper.find(".buttonList");
  expect(buttonList.children()).toHaveLength(3);

  expect(buttonList.find("Link")).toHaveLength(1);
  expect(buttonList.find("addToCart")).toHaveLength(1);
  expect(buttonList.find("deleteItem")).toHaveLength(1);
});
