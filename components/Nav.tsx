import Link from "next/link";
import NavStyles from "../styles/NavStyles";

import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./queries";
import SignOut from "./signOut";

export default function Nav() {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (data) {
    console.log(data.user);
  }

  return (
    <NavStyles>
      {/* {loading ? <p>Checking for user...</p> : ""} */}
      {/* {error ? <p>Error: {error.message}</p> : ""} */}
      {data && data.user ? <p>Hello {data.user.name}</p> : ""}

      <Link href="/items">
        <a>Items</a>
      </Link>

      {data && data.user && (
        <>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/account">
            <a>Accout</a>
          </Link>

          <Link href="/sell">
            <a>Sell</a>
          </Link>

          <SignOut></SignOut>
        </>
      )}

      {data && !data.user ? (
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      ) : (
        ""
      )}
    </NavStyles>
  );
}
