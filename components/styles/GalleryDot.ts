import styled from "styled-components";

const GalleryDot = styled.div`
  position: relative;
  background: white;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 3;
  /* top: 40%; */
  left: calc(50% - 105px);
  top: 40vh;
  margin: 15px;
  opacity: 0.5;

  &:hover,
  &:focus {
    opacity: 1;
    transition-duration: 0.5s;
  }
`;

export default GalleryDot;
