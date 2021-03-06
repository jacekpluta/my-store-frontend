import styled from "styled-components";

export const Container = styled.div`
  width: 23vw;
  margin: 13px;
`;

export const DiscountsStyle = styled.div`
  background: ${(props) => props.theme.white};
  padding: 20px 40px 20px 40px;

  .menu-wrapper--inner::-webkit-scrollbar-track-piece:start {
    margin-left: 50px;
  }
  .menu-wrapper--inner::-webkit-scrollbar-track-piece:end {
    margin-right: 50px;
  }
  &:last-child {
    padding-right: 40px;
  }

  /* user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; */
`;

export const ContainerImg = styled.div`
  position: relative;
  height: auto;
  overflow: hidden;

  button:nth-child(1) {
    width: 130%;
    height: 50px;
    font-size: 1vw;
    margin-bottom: 30px;
    border-radius: 35px;
  }
  button:nth-child(2) {
    width: 130%;
    height: 50px;
    font-size: 1vw;
    margin-top: 30px;
    border-radius: 35px;
  }
`;

export const ButtonContainerCart = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const ButtonContainerDetails = styled.div`
  position: absolute;
  top: 55%;
  left: 45%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  cursor: pointer;
`;
export const DiscountsImg = styled.img`
  width: 100%;
  height: auto;
  cursor: grab;
  /* user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; */
`;

export const FeaturedContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 50px 0;
  text-align: center;
  font-size: 1.5em;
  position: relative;

  ::after {
    content: "";
    padding: 0;
    margin: 0;
    width: 100%;
    border-bottom: solid 1px ${(props) => props.theme.black};
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 1;
  }
`;

export const FeaturedStyle = styled.h2`
  background-color: ${(props) =>
    props.theme.white}; /* Same as the parents Background */
  width: auto;
  display: inline-block;
  z-index: 2;
  padding: 0 20px 0 20px;
  color: ${(props) => props.theme.black};
  position: relative;
  margin: 0;
  font-size: 1.2em;
`;

export const UnderFeaturedStyle = styled.h4`
  width: auto;
  z-index: 2;
  color: grey;
  position: relative;
  margin: 0;
  font-size: 0.8em;
`;

export const Description = styled.div`
  z-index: 0;
  color: grey;
  position: relative;
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  grid-template-rows: auto auto;
  padding-left: 10px;

  padding-top: 12px;
  text-align: left;
  grid-gap: 5px;

  p {
    padding: 0;
    margin: 0;
    line-height: 1;
    color: ${(props) => props.theme.black};
    justify-self: start;
  }

  p:nth-child(1) {
    font-size: 1.2em;
  }
  p:nth-child(3) {
    font-size: 1em;
  }

  .buttonHeart {
    justify-self: end;
    height: 1px;
    padding-bottom: 20px;
    top: -8px;
    background-color: transparent;
  }
  span {
    position: aboslute;
    top: 0;
    left: 0;
  }

  /* @media (max-width: 800px) {
    grid-template-rows: 40px 30px;
  }

  @media (max-width: 700px) {
    grid-template-rows: 55px 30px;
  } */

  @media (max-width: 530px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-gap: 0px;

    .buttonHeart {
      padding: 0;
      margin: 0;
      padding-top: 10px;
      padding-bottom: 20px;
      justify-self: left;
    }
  }
`;
