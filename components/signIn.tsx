import React from "react";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./errorMessage";
import { useMutation } from "@apollo/react-hooks";
import { useFormFields } from "../lib/useFormFields";
import { CURRENT_USER_QUERY } from "./queries";
import Link from "next/link";
import Router from "next/router";

export interface SignInProps {}

export const LOGIN_USER_MUTATION = gql`
  mutation LOGIN_USER_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

type target = {
  email: string;
  name: string;
  password: string;
};

export default function SignIn(props: SignInProps) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const [createUser, { data, loading, error }] = useMutation(
    LOGIN_USER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const { name, email, password } = fields;
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createUser({
          variables: {
            email: email,
            name: name,
            password: password,
          },
        });
        Router.push({
          pathname: "/account",
        });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign In</h2>

        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleFieldChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={handleFieldChange}
          />
        </label>

        <button type="submit">Submit</button>
        <p>
          <Link href="/signup">
            <a>Don't have an account? SIGN UP</a>
          </Link>
        </p>
        <p>
          <Link href="/requestreset">
            <a>Forgot your password? RESET EMAIL</a>
          </Link>
        </p>
      </fieldset>
    </Form>
  );
}
