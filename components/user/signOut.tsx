import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../../lib/queries";
import gql from "graphql-tag";
import Link from "next/link";

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;
interface signOutProps {
  path: string;
}
export default function signOut({ path }: signOutProps) {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  return (
    <div onClick={() => signOut()}>
      <Link
        href={{
          pathname: "/",
        }}
      >
        <a className={path === "/cart" ? "add" : "none"}>Logout </a>
      </Link>
    </div>
  );
}
