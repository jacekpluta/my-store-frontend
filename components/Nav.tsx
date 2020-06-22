import Link from "next/link";
import NavStyles from "../styles/NavStyles";

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/items">
        <a>Items</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <Link href="/orders">
        <a>Orders</a>
      </Link>
      <Link href="/me">
        <a>Accout</a>
      </Link>
    </NavStyles>
  );
}
