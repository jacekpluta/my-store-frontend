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

export interface IItem {
  id: string;
  price: number;
  user: null;
  image: string;
  title: string;
  description: string;
  largeImage: string;
  brand: string;
  category: string;
  gender: string;
}

export interface ItemsProps {
  page: number;
  filters: any[]; //array of string and objects(with numbers)
}

export interface ItemsState {
  filterOptions: {
    skip: number;
    first: number;
    orderBy: string;
    gender_in?: string[] | undefined;
    category_in?: string[] | undefined;
    brand_in?: string[] | undefined;
    price_gte?: number | undefined;
    price_lte?: number | undefined;
  };
  showPickSize: Boolean;
}

export enum Order {
  createdAtDESC = "createdAt_DESC",
  titleDESC = "title_DESC",
  titleASC = "title_ASC",
  priceASC = "price_ASC",
  priceDESC = "price_DESC",
}

export interface NavBarProps {
  itemsCount: number;
  navOpen: boolean;
  main: boolean;
  toggleBar: boolean;
  path: string;
  currentUser: CurrentUser;
  matchedPermissions: string[];
}
