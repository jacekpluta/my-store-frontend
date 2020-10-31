import React from "react";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../errorMessage";
import { useMutation } from "@apollo/react-hooks";
import { useFormFields } from "../utils/useFormFields";
import Link from "next/link";
import Router from "next/router";
import { Bar } from "../styles/Bar";

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    email: "",
    password: "",
  });

  const [createUser, { data, loading, error }] = useMutation(
    CREATE_USER_MUTATION
  );

  const { name, email, password } = fields;

  return (
    <>
      <Bar>Log In</Bar>
      <Form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await createUser({
            variables: {
              email,
              name,
              password,
            },
          });
          Router.push({
            pathname: "/",
          });
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Register</h2>
          <p>{data ? "Account successfully created" : ""}</p>
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

          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={name}
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
            <Link href="/login">
              <a>Already have an account? SIGN IN</a>
            </Link>
          </p>
        </fieldset>
      </Form>
    </>
  );
}
