import React from "react";
import Gallery from "../components/gallery";
import Discounts from "../components/discounts";
import ImageMain from "../components/imageMain";
import Footer from "../components/footer";
import { useQuery } from "@apollo/react-hooks";
import Error from "../components/errorMessage";
import { DISCOUNT_ITEMS_QUERY, FEATURED_ITEMS_QUERY } from "../lib/queries";

interface HomeProps {
  query: {
    page: string;
  };
}
//props.query
function Home(props: HomeProps) {
  const featuredItemsQuery = useQuery(FEATURED_ITEMS_QUERY);
  const discountItemsQuery = useQuery(DISCOUNT_ITEMS_QUERY);

  if (featuredItemsQuery.loading || discountItemsQuery.loading)
    return <p>Loading...</p>;
  if (featuredItemsQuery.error || discountItemsQuery.error)
    return (
      <Error
        error={featuredItemsQuery.error || discountItemsQuery.error}
      ></Error>
    );
  const featuredItems = featuredItemsQuery.data.items;
  const discountItems = discountItemsQuery.data.items;

  return (
    <>
      <Gallery></Gallery>
      <Discounts
        items={discountItems}
        title={"Shoes on sale"}
        subTitle={"Get your new pair of shoes today!"}
      ></Discounts>
      <ImageMain></ImageMain>
      <Discounts
        items={featuredItems}
        title={"Featured products"}
        subTitle={"Check out our newest addition!"}
      ></Discounts>
      <Footer></Footer>
    </>
  );
}

export default Home;
