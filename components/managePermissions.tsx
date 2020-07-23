import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "./errorMessage";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PaginationStyles from "./styles/PaginationStyles";
import styled from "styled-components";
import Table from "./styles/Table";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const USERS_QUERY = gql`
  query PAGINATION_QUERY {
    usersConnection {
      aggregate {
        count
      }
    }
  }
`;

const PERMISSIONS_QUERY = gql`
  query PERMISSIONS_QUERY {
    __type(name: "Permission") {
      name
      enumValues {
        name
      }
    }
  }
`;

//name_DESC
const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int = 0, $first: Int = 20) {
    users(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      name
      email
      permissions
    }
  }
`;

//UPDATE_PERMISSIONS_MUTATION
const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

export interface ManagePermissionsProps {
  page: number;
}

interface User {
  name: string;
  email: string;
  id: number;
  permissions: [];
}

export default function ManagePermissions(props: ManagePermissionsProps) {
  const { page } = props;
  const usersOnPage: number = 20;

  const usersConnectQuery = useQuery(USERS_QUERY);
  const permissionsQuery = useQuery(PERMISSIONS_QUERY);
  const allUsersQuery = useQuery(ALL_USERS_QUERY, {
    variables: {
      skip: page * usersOnPage - usersOnPage,
      first: usersOnPage,
    },
    fetchPolicy: "network-only",
  });

  if (
    usersConnectQuery.loading ||
    permissionsQuery.loading ||
    allUsersQuery.loading
  )
    return <p>Loading...</p>;
  if (
    usersConnectQuery.error ||
    permissionsQuery.error ||
    allUsersQuery.error
  ) {
    return (
      <Error
        error={
          usersConnectQuery.error ||
          permissionsQuery.error ||
          allUsersQuery.error
        }
      ></Error>
    );
  }

  const permissionsData = permissionsQuery?.data?.__type?.enumValues;
  const permissions = permissionsData.map(({ name }: any) => name);

  const pagesCount: number =
    usersConnectQuery?.data?.usersConnection?.aggregate?.count;

  const allPages: number = Math.ceil(pagesCount / 20);

  return (
    <Center>
      <h2>Manage Permissions</h2>

      <Table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            {permissions.map((permission: any) => (
              <th key={permission}>{permission}</th>
            ))}
          </tr>
        </thead>

        {allUsersQuery.data.users.map((user: User) => (
          <tbody key={user.email}>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <User user={user}></User>
            </tr>
          </tbody>
        ))}
      </Table>

      <PaginationStyles>
        <Head>
          <title>
            MyShop - Users - {page} of {allPages}
          </title>
        </Head>
        <Link
          href={{
            pathname: "/managepermissions",
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
        <p>{pagesCount} users registered</p>
        <Link
          href={{
            pathname: "/managepermissions",
            query: { page: page + 1 },
          }}
        >
          <a className="prev" aria-disabled={page >= allPages}>
            ➡ Next
          </a>
        </Link>
      </PaginationStyles>
    </Center>
  );
}

const User = (props: any) => {
  const { user }: any = props;
  const [userPermissions, setUserPermissions] = useState(user.permissions);
  const permissionsQuery = useQuery(PERMISSIONS_QUERY);
  const permissionsData = permissionsQuery?.data?.__type?.enumValues;
  const permissions = permissionsData.map(({ name }: User) => name);
  let updatedPermissions = [...userPermissions];

  const [updatePermission, { data, loading, error }] = useMutation(
    UPDATE_PERMISSIONS_MUTATION
  );

  if (error) {
    return <Error error={error}></Error>;
  }

  const handlePermissionChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkbox = event.target;

    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    }

    if (!checkbox.checked) {
      updatedPermissions = updatedPermissions.filter((permission) => {
        if (permission !== checkbox.value) return permission;
      });
    }
    setUserPermissions(updatedPermissions);
    await updatePermission({
      variables: {
        permissions: updatedPermissions,
        userId: user.id,
      },
    });
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const getAllPermisions = () =>
    permissions.map((permission: any) => (
      <td key={permission}>
        <label htmlFor={`${user.id}-${permission}`}>
          {!loading ? (
            <input
              id={`${user.id}-${permission}`}
              type="checkbox"
              checked={userPermissions.includes(permission)}
              value={permission}
              onChange={handlePermissionChange}
            />
          ) : (
            <ClipLoader
              css={override}
              size={15}
              color={"#123abc"}
              loading={loading}
            />
          )}
        </label>
      </td>
    ));

  return <>{getAllPermisions()}</>;
};
