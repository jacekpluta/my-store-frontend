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
