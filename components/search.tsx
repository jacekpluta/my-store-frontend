import React, { useState } from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { Icon } from "semantic-ui-react";

const SEARCH_ITEM_QUERY = gql`
  query SEARCH_ITEM_QUERY($searchTerm: String!) {
    itemLowercases(
      where: {
        OR: [
          { title_contains: $searchTerm }
          # { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
      item {
        id
      }
    }
  }
`;

export interface ISearchProps {
  biggerIcon?: Boolean;
}

export default function Search({ biggerIcon }: ISearchProps) {
  const [loading, setLoading] = useState(false);
  const [items, setItems]: any[] = useState([]);

  const handleOnSearch = debounce(async (e, client) => {
    e.persist();
    setLoading(true);
    const res = await client.query({
      query: SEARCH_ITEM_QUERY,
      variables: { searchTerm: e.target.value },
    });

    setItems(res.data.itemLowercases);
    setLoading(false);
  }, 300);

  const routeToItem = (lowercaseItem: any) => {
    Router.push({
      pathname: "/item",
      query: {
        id: lowercaseItem.item.id,
      },
    });
  };
  resetIdCounter();

  return (
    <SearchStyles>
      <Downshift
        itemToString={(item) => (item === null ? "" : item.title)}
        onChange={routeToItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <ApolloConsumer>
              {(client) => (
                <div className="container">
                  <Icon
                    name="search"
                    size={biggerIcon ? "big" : "small"}
                    style={
                      biggerIcon
                        ? { marginBottom: "0px" }
                        : { marginBottom: "-2px" }
                    }
                  />
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: `Search...`,
                      id: "search",
                      className: loading ? "input loading" : "input",
                      onChange: (e) => {
                        e.persist(); //access to event cos of debounce
                        handleOnSearch(e, client);
                      },
                    })}
                  ></input>
                </div>
              )}
            </ApolloConsumer>
            {isOpen ? (
              <DropDown>
                {items.map((item: any, index: number): any => (
                  <DropDownItem
                    key={item.id}
                    {...getItemProps({ item })}
                    highlighted={index === highlightedIndex}
                    style={{
                      textAlign: "left",
                      fontSize: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <img width="50" src={item.image} alt={item.title}></img>
                    {item.title.replace(
                      /(^\w{1})|(\s+\w{1})/g,
                      (letter: string) => letter.toUpperCase()
                    )}
                  </DropDownItem>
                ))}
                {!items.length && !loading && (
                  <DropDownItem
                    key={1}
                    {...getItemProps(items)}
                    highlighted={true}
                  >
                    There in no item with that name
                  </DropDownItem>
                )}
              </DropDown>
            ) : (
              ""
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
}
