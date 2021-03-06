import React, { useState } from "react";
import Form from "../styles/Form";
import Error from "../errorMessage";
import { useMutation } from "@apollo/react-hooks";
import { useFormFields } from "../../lib/utils/useFormFields";
import {
  CREATE_USER_MUTATION,
  CURRENT_USER_QUERY,
  LOGIN_USER_MUTATION,
} from "../../lib/queries";

import Router from "next/router";
import { FormStyles } from "../styles/FormStyles";
import Link from "next/link";
import { Bar } from "../styles/Bar";
import { cartLocal } from "../../lib/vars";

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    nameRegister: "",
    emailRegister: "",
    passwordRegister: "",
  });

  const [wrapperClass, setWrapperClass] = useState("wrapper");
  const [buttonLoginClass, setButtonLoginClass] = useState("dark active");
  const [buttonRegisterClass, setButtonRegisterClass] = useState("dark");

  const [loginUser, loginUserData] = useMutation(LOGIN_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const [createUser, createUserData] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const {
    email,
    password,
    nameRegister,
    emailRegister,
    passwordRegister,
  } = fields;

  function handleLogin() {
    setWrapperClass("wrapper");
    setButtonLoginClass("active");
    setButtonRegisterClass("dark");
  }

  function handleRegister() {
    setWrapperClass("wrapper move");
    setButtonLoginClass("dark");
    setButtonRegisterClass("active");
  }

  return (
    <FormStyles>
      <fieldset
        disabled={createUserData.loading || loginUserData.loading}
        aria-busy={createUserData.loading || loginUserData.loading}
      >
        <div className="veen" style={{ background: "#D0D4D7" }}>
          <div className="login-btn splits">
            <p>Already an user?</p>
            <button onClick={handleLogin} className={buttonLoginClass}>
              Login
            </button>
          </div>
          <div className="rgstr-btn splits">
            <p>Don't have an account?</p>
            <button onClick={handleRegister} className={buttonRegisterClass}>
              Register
            </button>
          </div>
          <div className={wrapperClass}>
            <Form
              className="login"
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await loginUser({
                  variables: {
                    email: email,
                    password: password,
                  },
                });

                //clear local cart and local var
                localStorage.removeItem("cartLocal");
                cartLocal([]);

                Router.push({
                  pathname: "/",
                });
              }}
            >
              <h2 className="second">
                <span>My Shop</span>
              </h2>
              <h3>Login</h3>

              <div className="mail">
                <input
                  type="mail"
                  name="mail"
                  id="email"
                  required
                  value={email}
                  onChange={handleFieldChange}
                />
                <label>E-mail</label>
              </div>
              <div className="passwd">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={handleFieldChange}
                />
                <label>Password</label>
              </div>
              <div className="submit">
                <button type="submit" className="dark">
                  Login
                </button>
              </div>

              <p>
                <Link href="/requestreset">
                  <a>
                    <span style={{ font: "white", fontWeight: 500 }}>
                      Forgot your password?{" "}
                    </span>
                    <b>RESET EMAIL HERE</b>
                  </a>
                </Link>
              </p>
              <p>{createUserData!.data && "Account successfully created"}</p>
              <div style={{ position: "absolute" }}>
                <Error error={loginUserData.error} />
              </div>
            </Form>
            <Form
              className="register"
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await createUser({
                  variables: {
                    email: emailRegister,
                    name: nameRegister,
                    password: passwordRegister,
                  },
                });

                //clear local cart and local var
                localStorage.removeItem("cartLocal");
                cartLocal([]);

                Router.push({
                  pathname: "/",
                });
              }}
            >
              <h2 className="second">
                <span>My Shop</span>
              </h2>
              <h3>Register</h3>

              <div className="mail">
                <input
                  type="email"
                  id="emailRegister"
                  name="emailRegister"
                  required
                  value={emailRegister}
                  onChange={handleFieldChange}
                />
                <label>E-mail</label>
              </div>
              <div className="uid">
                <input
                  type="text"
                  id="nameRegister"
                  name="nameRegister"
                  required
                  value={nameRegister}
                  onChange={handleFieldChange}
                />
                <label>Name</label>
              </div>
              <div className="passwd">
                <input
                  type="password"
                  id="passwordRegister"
                  name="passwordRegister"
                  required
                  value={passwordRegister}
                  onChange={handleFieldChange}
                />
                <label>Password</label>
              </div>
              <div className="submit">
                <button className="dark">Register</button>
              </div>
              <div style={{ position: "absolute" }}>
                <Error error={createUserData.error} />
              </div>
            </Form>
          </div>
        </div>
      </fieldset>
    </FormStyles>
  );
}
