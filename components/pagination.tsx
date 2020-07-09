import React from "react";
import Head from "next/head";
import Link from "next/link";

import PaginationStyles from "../styles/PaginationStyles";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export interface PaginationProps {}

export interface PaginationState {}

export default function Pagination(props) {
  const { page } = props;
  const { loading, error, data } = useQuery(PAGINATION_QUERY, {});
  if (loading) return "Loading...";
  if (error) return <Error error={error} />;
  const pagesCount = data?.itemsConnection?.aggregate?.count;
  const allPages = Math.ceil(pagesCount / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          MyShop - {page} of {allPages}
        </title>
      </Head>
      <Link
        href={{
          pathname: "/items",
          query: { page: page - 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ⬅ Prev
        </a>
      </Link>
      <p>
        Page {page} of {allPages}
      </p>
      <p>{pagesCount} Items Total</p>
      <Link
        href={{
          pathname: "/items",
          query: { page: page + 1 },
        }}
      >
        <a className="prev" aria-disabled={page >= allPages}>
          ➡ Next
        </a>
      </Link>
    </PaginationStyles>
  );
}
