import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "./errorMessage";
import PaginationStyles from "./styles/PaginationStyles";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export interface PaginationProps {
  page: number;
}

export default function Pagination(props: PaginationProps) {
  const { page } = props;
  const { loading, error, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <Error error={error} />;
  const pagesCount = data?.itemsConnection?.aggregate?.count;
  const allPages = Math.ceil(pagesCount / perPage);
  return (
    <PaginationStyles data-test="pagination">
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
      <p style={{ marginTop: 5 }}>
        Page {page} of <span className="allPages">{allPages}</span>
      </p>

      <Link
        href={{
          pathname: "/items",
          query: { page: page + 1 },
        }}
      >
        <a className="next" aria-disabled={page >= allPages}>
          ➡ Next
        </a>
      </Link>
    </PaginationStyles>
  );
}
