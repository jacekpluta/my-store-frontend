import React from "react";
import Items from "../components/items";

export interface HomeProps {}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return <Items></Items>;
  }
}

export default Home;
