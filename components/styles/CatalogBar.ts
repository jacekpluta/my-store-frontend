import styled from "styled-components";

export const CatalogBar = styled.div`
  text-align: left;
  height: 100px;
  width: 100%;
  padding: 20px 20px;
  font-weight: bold;
  font-size: 28px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: white;
  background: ${(props) => props.theme.lightGrey};
`;
