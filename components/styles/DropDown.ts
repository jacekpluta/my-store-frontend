import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 3;
  border: 1px solid ${(props) => props.theme.lightgrey};
`;

interface Props {
  highlighted: string;
  theme: {
    lightgrey: string;
  };
}

const DropDownItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  background: ${(props: Props) => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${(props: Props) => (props.highlighted ? "padding-left: 2rem;" : "null")};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props: Props) => (props.highlighted ? props.theme.lightgrey : "white")};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.blackwhite};

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-top: 4px;
    background-color: #f5f5f5;
  }

  .input {
    width: 130px;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    background-color: #f5f5f5;

    .loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
