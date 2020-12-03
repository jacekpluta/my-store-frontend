import React from "react";
import NavMenu from "../styles/NavMenu";
import faker from "faker";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER_MUTATION, CURRENT_USER_QUERY } from "../../lib/queries";
import { Icon } from "semantic-ui-react";
import { isNavOpen } from "../../lib/vars";
import SignOut from "../user/signOut";
import { CurrentUser } from "../../lib/interfaces";

interface LeftNavBarProps {
  navOpen: boolean;
  main: boolean;
  toggleBar: boolean;
  path: string;
  currentUser: CurrentUser;
  matchedPermissions: string[];
}

const LeftNavBar = ({
  navOpen,
  main,
  toggleBar,
  currentUser,
  matchedPermissions,
  path,
}: LeftNavBarProps) => {
  const [createUser, createUserData] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  return (
    <NavMenu navOpen={navOpen} main={main} toggleBar={toggleBar}>
      <div id="menuToggle">
        <input
          type="checkbox"
          checked={navOpen}
          readOnly={true}
          onClick={() => {
            isNavOpen(!navOpen);
          }}
        />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <h1>Menu</h1>
          {currentUser?.user && (
            <p>
              Hello, <b>{currentUser?.user?.name}!</b>
            </p>
          )}

          <div className="barTop"></div>
          <Link href="/">
            <li
              onClick={() => {
                isNavOpen(!navOpen);
              }}
            >
              <a className={path === "/" ? "add" : "none"}>Home</a>
            </li>
          </Link>
          <Link href="/catalog">
            <li
              onClick={() => {
                isNavOpen(!navOpen);
              }}
            >
              <a className={path === "/catalog" ? "add" : "none"}>Catalog</a>
            </li>
          </Link>

          <Link href="/cart">
            <li
              onClick={() => {
                isNavOpen(!navOpen);
              }}
            >
              <a className={path === "/cart" ? "add" : "none"}>Cart</a>
            </li>
          </Link>

          {currentUser?.user && (
            <>
              <Link href="/account">
                <li
                  onClick={() => {
                    isNavOpen(!navOpen);
                  }}
                >
                  <a className={path === "/account" ? "add" : "none"}>Accout</a>
                </li>
              </Link>

              {matchedPermissions.length > 0 && (
                <Link href="/sell">
                  <li
                    onClick={() => {
                      isNavOpen(!navOpen);
                    }}
                  >
                    <a className={path === "/sell" ? "add" : "none"}>Sell</a>
                  </li>
                </Link>
              )}

              <li
                onClick={() => {
                  isNavOpen(!navOpen);
                }}
              >
                <SignOut path={path}></SignOut>
              </li>
            </>
          )}
          {!currentUser?.user && (
            <>
              <Link href="/login">
                <li
                  onClick={() => {
                    isNavOpen(!navOpen);
                  }}
                >
                  <a className={path === "/login" ? "add" : "none"}>
                    Login / Register
                  </a>
                </li>
              </Link>

              <li
                onClick={async () => {
                  const name = `guest-${faker.random.number()}`;
                  const email = faker.internet.email();
                  const password = faker.internet.password();

                  await createUser({
                    variables: {
                      email,
                      name,
                      password,
                    },
                  });
                }}
              >
                <a>Guest login</a>
              </li>
            </>
          )}
          <div className="footer">
            <ul>
              <li>
                <a>
                  <Icon
                    className="icn"
                    color="grey"
                    size="big"
                    name="facebook"
                  />
                </a>
              </li>
              <li>
                <a>
                  <Icon
                    className="icn"
                    color="grey"
                    size="big"
                    name="twitter"
                  />
                </a>
              </li>
              <li>
                <a>
                  <Icon
                    className="icn"
                    color="grey"
                    size="big"
                    name="instagram"
                  />
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </NavMenu>
  );
};

export default LeftNavBar;
