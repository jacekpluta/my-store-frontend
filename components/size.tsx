import React, { useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import { SizeStyles } from "./styles/SortStyles";

const sizes = [40, 41, 42, 43];

export interface PickProps {
  size: number;
  key: number;
  handleSizePicked: Function;
}

export interface SizeProps {
  inSingleItem: Boolean;
  error: Boolean;
  handleSizePicked: Function;
}

const Size = ({ inSingleItem, error, handleSizePicked }: SizeProps) => {
  const [option, setOption] = useState(0);
  const [sortVisible, setSortVisible] = useState(false);
  const wrapperRef = useRef(null);

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current.contains(event.target)) {
      setSortVisible(false);
    }
  }

  const PickSizeDrop = ({ size, key, handleSizePicked }: PickProps) => {
    return (
      <li>
        <span>
          <a
            href="#"
            onClick={() => {
              setOption(size);
              setSortVisible(false);
              handleSizePicked();
            }}
          >
            {size === 0 && "Pick Size"}
          </a>
        </span>
      </li>
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SizeStyles ref={wrapperRef} inSingleItem={inSingleItem} error={error}>
      <ul>
        <li>
          <span>
            <a href="#" onClick={() => setSortVisible(!sortVisible)}>
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
            {sizes.map((size) => (
              <PickSizeDrop
                key={size}
                size={size}
                handleSizePicked={handleSizePicked}
              ></PickSizeDrop>
            ))}
          </ul>
        </li>
      </ul>
    </SizeStyles>
  );
};

export default Size;
