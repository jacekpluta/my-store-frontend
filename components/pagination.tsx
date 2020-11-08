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
          pathname: "/catalog",
          query: { page: 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ⬅ First
        </a>
      </Link>
      {page <= allPages && page > 2 && (
        <Link
          href={{
            pathname: "/catalog",
            query: { page: allPages - page + 2 },
          }}
        >
          <a className="prev">{allPages - page + 2}</a>
        </Link>
      )}

      {page <= allPages && page > 1 && (
        <Link
          href={{
            pathname: "/catalog",
            query: { page: allPages - page + 1 },
          }}
        >
          <a className="prev">{allPages - page + 1}</a>
        </Link>
      )}

      <Link
        href={{
          pathname: "/catalog",
          query: { page: page },
        }}
      >
        <a aria-disabled={true} className="prev">
          {page}
        </a>
      </Link>

      {/* <p style={{ marginTop: 5 }}>
        Page {page} of <span className="allPages">{allPages}</span>
      </p> */}
      {allPages > page && page + 1 > allPages === false && (
        <Link
          href={{
            pathname: "/catalog",
            query: { page: page + 1 },
          }}
        >
          <a className="next">{page + 1}</a>
        </Link>
      )}

      {allPages > page && page + 2 > allPages === false && (
        <Link
          href={{
            pathname: "/catalog",
            query: { page: page + 2 },
          }}
        >
          <a className="next">{page + 2}</a>
        </Link>
      )}

      <Link
        href={{
          pathname: "/catalog",
          query: { page: allPages },
        }}
      >
        <a className="next" aria-disabled={page >= allPages}>
          Last ➡
        </a>
      </Link>
    </PaginationStyles>
  );
}
