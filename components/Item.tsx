import React from "react";

import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Link from "next/link";
import DeleteItem from "./deleteItem";
import formatMoney from "./formatMoney";
import AddToCart from "./addToCart";

export interface ItemProps {
  item: {
    description: string;
    id: string;
    image: string;
    largeImage: string;
    price: number;
    title: string;
  };
}

export interface ItemState {}

class Item extends React.Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);
  }
  render() {
    const { item } = this.props;

    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}

        <Link
          href={{
            pathname: "/item",
            query: { id: item.id },
          }}
        >
          <a>{item.title}</a>
        </Link>

        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>

        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: item.id },
            }}
          >
            <a>Edit </a>
          </Link>
          <AddToCart itemId={item.id}></AddToCart>
          <DeleteItem itemId={item.id}>Delete Item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
