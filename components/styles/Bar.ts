import styled from "styled-components";

export const Bar = styled.div`
  text-align: left;

  padding: 25px 0 10px 35px;
  width: 100%;
  font-size: 28px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.blackwhite};
  background: ${(props) => props.theme.white};
`;
