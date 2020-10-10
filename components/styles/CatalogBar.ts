import styled from "styled-components";

export const CatalogBar = styled.div`
  text-align: left;
  height: 100px;
  width: 100%;
  padding: 40px 25px 75px;

  font-size: 28px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.blackwhite};
  background: ${(props) => props.theme.white};
`;
