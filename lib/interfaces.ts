import { IItem } from "../components/cart/cartItem";

export interface CurrentUser {
  user: {
    id: string;
    name: string;
    email: string;
    permissions: Array<string>;
    cart: [
      {
        item: IItem;
        quantity: number;
        size: number;
      }
    ];
  };
}

export interface ICartItem {
  id: number;
  quantity: number;
  size: number;
  item: {
    id: number;
    price: number;
    user: null;
    image: string;
    title: string;
    description: string;
    largeImage: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    permissions: string[];
  };
}

export interface IUser {
  currentUser: {
    user: {
      id: string;
      name: string;
      email: string;
      permissions: Array<string>;
      cart: [
        {
          item: IItem;
          quantity: number;
          size: number;
        }
      ];
    };
  };
}
