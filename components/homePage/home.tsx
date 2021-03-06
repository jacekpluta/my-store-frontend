import React from "react";
import { useQuery } from "@apollo/react-hooks";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { DISCOUNT_ITEMS_QUERY, FEATURED_ITEMS_QUERY } from "../../lib/queries";
import { logoImages } from "../../lib/images";
import Discounts from "./discounts";
import Gallery from "./gallery";
import ImageMain from "./imageMain";
import Info from "./info";
import { LogosImg, Logos } from "../styles/FooterStyles";
import Error from "../errorMessage";

import { loadingItems } from "../../lib/fakeItems";

interface HomeProps {}

function Home(props: HomeProps) {
  const featuredItemsQuery = useQuery(FEATURED_ITEMS_QUERY);
  const discountItemsQuery = useQuery(DISCOUNT_ITEMS_QUERY);

  if (featuredItemsQuery.error || discountItemsQuery.error)
    return <Error error={featuredItemsQuery.error}></Error>;

  const featuredItems = featuredItemsQuery?.data?.items;
  const discountItems = discountItemsQuery?.data?.items;

  const Menu = () =>
    logoImages.map((image, index) => {
      return (
        <LogosImg
          style={{ cursor: "grab" }}
          draggable="false"
          key={index}
          src={logoImages[index]}
        ></LogosImg>
      );
    });

  const menuItems = Menu();

  return (
    <>
      <Gallery></Gallery>
      <Discounts
        menuWrapper={0}
        items={discountItemsQuery.loading ? loadingItems : discountItems}
        title={"Shoes on sale"}
        subTitle={"Get your new pair of shoes today!"}
      ></Discounts>
      <ImageMain></ImageMain>
      <Discounts
        menuWrapper={1}
        items={featuredItemsQuery.loading ? loadingItems : featuredItems}
        title={"Featured products"}
        subTitle={"Check out our newest addition!"}
      ></Discounts>

      <Info></Info>
      <Logos>
        <ScrollMenu
          alignCenter={true}
          clickWhenDrag={true}
          dragging={true}
          data={menuItems}
          useButtonRole={true}
          wheel={false}
        ></ScrollMenu>
      </Logos>
    </>
  );
}

export default Home;
