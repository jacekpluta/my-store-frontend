import React from "react";
import renderer from "react-test-renderer";
import Item from "../components/item";
import { shallow } from "enzyme";

it("renders homepage unchanged", () => {
  const fakeItem = {
    description: "test",
    id: "123abc",
    image: "testImage",
    largeImage: "testLargeImage",
    price: 111,
    title: "test",
  };
  const wrapper = shallow(<Item item={fakeItem} />);

  const PriceTag = wrapper.find("PriceTag");
  expect(PriceTag.children().text()).toBe("$1.11");
  expect(wrapper.find("Title a").text()).toBe("test");
});
