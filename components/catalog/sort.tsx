import React, { useState, useRef, useEffect } from "react";

import { SortStyles } from "../styles/SortStyles";
import { Icon } from "semantic-ui-react";

export interface SortProps {
  handleOnSort: Function;
}

export default function Sort({ handleOnSort }: SortProps) {
  const [option, setOption] = useState("Featured");
  const [sortVisible, setSortVisible] = useState(false);
  const wrapperRef = useRef(null);

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current.contains(event.target)) {
      setSortVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SortStyles ref={wrapperRef}>
      <ul>
        <li>
          <span>
            <a onClick={() => setSortVisible(!sortVisible)}>
              <div
                style={{
                  paddingLeft: "10px",
                }}
              >
                {option}
              </div>
              <div
                style={{
                  paddingRight: "5px",
                  paddingLeft: "5px",
                  borderLeft: `solid 1px #D0D4D7`,
                }}
              >
                <Icon name="sort" />
              </div>
            </a>
          </span>
          <ul style={sortVisible ? { height: "220px" } : { height: "0px" }}>
            <li>
              <span>
                <a
                  onClick={() => {
                    setOption("Featured");
                    handleOnSort("createdAt_DESC");
                    setSortVisible(false);
                  }}
                >
                  Featured
                  <Icon name="bolt" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a
                  onClick={() => {
                    setOption("Name: A-Z");
                    handleOnSort("title_DESC");
                    setSortVisible(false);
                  }}
                >
                  Name: A-Z <Icon name="sort alphabet down" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a
                  onClick={() => {
                    setOption("Name: Z-A");
                    handleOnSort("title_ASC");
                    setSortVisible(false);
                  }}
                >
                  Name: Z-A <Icon name="sort alphabet up" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a
                  onClick={() => {
                    setOption("Price: High-Low");
                    handleOnSort("price_DESC");
                    setSortVisible(false);
                  }}
                >
                  Price: High-Low <Icon name="sort amount down" />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a
                  onClick={() => {
                    setOption("Price: Low-High");
                    handleOnSort("price_ASC");
                    setSortVisible(false);
                  }}
                >
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
