import { mount } from "enzyme";
import Pagination, { PAGINATION_QUERY } from "../components/Pagination";
import { MockedProvider } from "@apollo/react-testing";

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: "aggregate",
            aggregate: {
              count: length,
              __typename: "count",
            },
          },
        },
      },
    },
  ];
}
let wrapper;
beforeEach(() => {
  wrapper = mount(
    <MockedProvider mocks={makeMocksFor(12)}>
      <Pagination page={1} />
    </MockedProvider>
  );
});

it("shows loading", async () => {
  expect(wrapper.text()).toContain("Loading...");
});

it("renders user nav component when signed in", async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const pagination = wrapper.find('[data-test="pagination"]');
  expect(pagination).toMatchSnapshot();

  const allPages = wrapper.find(".allPages").text();
  expect(allPages).toEqual("3");
});

it("disables prev button on first page", async () => {
  const wrapper = mount(
    <MockedProvider mocks={makeMocksFor(12)}>
      <Pagination page={1} />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const prev = wrapper.find("a.prev").prop("aria-disabled");
  const next = wrapper.find("a.next").prop("aria-disabled");
  expect(prev).toEqual(true);
  expect(next).toEqual(false);
});

it("disables next button on last page", async () => {
  const wrapper = mount(
    <MockedProvider mocks={makeMocksFor(12)}>
      <Pagination page={3} />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const prev = wrapper.find("a.prev").prop("aria-disabled");
  const next = wrapper.find("a.next").prop("aria-disabled");
  expect(prev).toEqual(false);
  expect(next).toEqual(true);
});

it("enables all buttons if not on the first or list page", async () => {
  const wrapper = mount(
    <MockedProvider mocks={makeMocksFor(12)}>
      <Pagination page={2} />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));
  wrapper.update();

  const prev = wrapper.find("a.prev").prop("aria-disabled");
  const next = wrapper.find("a.next").prop("aria-disabled");
  expect(prev).toEqual(false);
  expect(next).toEqual(false);
});
