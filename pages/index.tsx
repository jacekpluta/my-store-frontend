import React from "react";
import Items from "../components/items";

interface HomeProps {
  query: {
    page: string;
  };
}
//props.query
function Home(props: HomeProps) {
  return <Items page={parseFloat(props.query.page) || 1}></Items>;
}

export default Home;
