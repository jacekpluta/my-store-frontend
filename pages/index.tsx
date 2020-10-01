import React from "react";
import Gallery from "../components/gallery";
import Discounts from "../components/discounts";
import ImageMain from "../components/imageMain";
import Footer from "../components/footer";
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
      <ImageMain></ImageMain>
      <Footer></Footer>
    </>
  );
}

export default Home;
