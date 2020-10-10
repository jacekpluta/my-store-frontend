import React, { useState } from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";

import gql from "graphql-tag";
import debounce from "lodash.debounce";

import { SortStyles } from "./styles/SortStyles";
import { Icon } from "semantic-ui-react";

const SEARCH_ITEM_QUERY = gql`
  query SEARCH_ITEM_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;

export default function Sort() {
  const [loading, setLoading] = useState(false);
  const [items, setItems]: any[] = useState([]);
  const [option, setOption] = useState("Featured");
  const handleOnSearch = debounce(async (e, client) => {
    e.persist();
    setLoading(true);
    const res = await client.query({
      query: SEARCH_ITEM_QUERY,
      variables: { searchTerm: e.target.value },
    });
    setItems(res.data.items);
    setLoading(false);
  }, 300);

  const routeToItem = (item: any) => {
    Router.push({
      pathname: "/item",
      query: {
        id: item.id,
      },
    });
  };
  resetIdCounter();
  return (
    <SortStyles>
      <ul>
        <li style={{ display: "black", float: "right" }}>
          <span>
            <a
              href="#"
              style={{
                display: `flex`,
              }}
            >
              <div
                style={{
                  borderRight: `solid 1px #D0D4D7`,
                  paddingRight: "7px",
                }}
              >
                {option}
              </div>

              <Icon
                style={{
                  paddingLeft: "7px",
                }}
                name="sort"
              />
            </a>
          </span>
          <ul>
            <li>
              <span>
                <a href="#" onClick={() => setOption("Featured")}>
                  Featured
                  <Icon name="bolt" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a href="#" onClick={() => setOption("Name: A-Z")}>
                  Name: A-Z <Icon name="sort alphabet down" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a href="#" onClick={() => setOption("Name: Z-A")}>
                  Name: Z-A <Icon name="sort alphabet up" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a href="#" onClick={() => setOption("Price: High-Low")}>
                  Price: High-Low <Icon name="sort amount down" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a href="#" onClick={() => setOption("Price: Low-High")}>
                  Price: Low-High <Icon name="sort amount up" />
                </a>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </SortStyles>
  );
}
