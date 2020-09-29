import React from "react";
import Gallery from "../components/gallery";
import Discounts from "../components/discounts";
interface HomeProps {
  query: {
    page: string;
  };
}
//props.query
function Home(props: HomeProps) {
  return (
    <>
      <Gallery></Gallery>
      <Discounts></Discounts>
    </>
  );
}

export default Home;
