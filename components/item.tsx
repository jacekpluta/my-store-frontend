import React from "react";
import Title from "../styles/Title";
import ItemStyles from "../styles/ItemStyles";
import PriceTag from "../styles/PriceTag";
import Link from "next/link";
import DeleteItem from "./deleteItem";
import formatMoney from "../lib/formatMoney";

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
        <Title>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id },
            }}
          >
            <a>{item.title} </a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>

        <div className="buttonList">
          <Link
            // href="/update/[item.id]"
            // as={`/update/${item.id}`}
            href={{ pathname: "update", query: { id: item.id } }}
          >
            <a>Edit </a>
          </Link>
          <button>Add to cart</button>
          <DeleteItem>Delete Item</DeleteItem>>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
