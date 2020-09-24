import React from "react";
import Gallery from "../components/gallery";
import Items from "../components/items";

interface HomeProps {
  query: {
    page: string;
  };
}
//props.query
function Home(props: HomeProps) {
  return <Gallery></Gallery>;
}

export default Home;
