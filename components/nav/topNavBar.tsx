import Link from "next/link";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { Icon, TransitionGroup, Popup, Search } from "semantic-ui-react";
import { isCartOpen } from "../../lib/vars";
import { AnimationStyles } from "../styles/AnimationStyles";
import CartItemsNumber from "../styles/CartItemsNumber";
import { WhiteBar } from "../styles/WhiteBar";
import { NavIcons } from "../styles/NavIcons";
import SignOut from "../user/signOut";
import { CurrentUser } from "../../lib/interfaces";

interface LeftNavBarProps {
  itemsCount: number;
  navOpen: boolean;
  main: boolean;
  toggleBar: boolean;
  path: string;
  currentUser: CurrentUser;
  matchedPermissions: string[];
}

const TopNavBar = ({
  itemsCount,
  path,
  currentUser,
  matchedPermissions,
  main,
  toggleBar,
}: LeftNavBarProps) => (
  <>
    <NavIcons>
      <ul className="icons">
        <li
          onClick={() => {
            isCartOpen(true);
          }}
          className="icon"
        >
          <div style={{ display: "inline" }}>
            <Icon className="icn" size="big" name="shopping cart" />
            <AnimationStyles>
              <TransitionGroup>
                <CSSTransition
                  unmountOnExit
                  classNames="count"
                  className="count"
                  key={itemsCount}
                  timeout={{ enter: 100, exit: 100 }}
                >
                  <CartItemsNumber>{itemsCount}</CartItemsNumber>
                </CSSTransition>
              </TransitionGroup>
            </AnimationStyles>
          </div>
        </li>

        <li className="icon">
          <Popup
            content={<Search biggerIcon={true} />}
            on="click"
            pinned
            position="bottom right"
            trigger={
              <Icon
                className="icn"
                name="search"
                size="big"
                style={{ paddingLeft: "15px" }}
              />
            }
          />
        </li>
      </ul>
    </NavIcons>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a className={path === "/" ? "add" : "none"}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/catalog">
            <a className={path === "/catalog" ? "add" : "none"}>Catalog</a>
          </Link>
        </li>

        {!currentUser?.user && (
          <li>
            <Link href="/login">
              <a className={path === "/login" ? "add" : "none"}>
                Login / Register
              </a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/cart">
            <a className={path === "/cart" ? "add" : "none"}>Cart</a>
          </Link>
        </li>

        <li
          onClick={() => {
            isCartOpen(true);
          }}
          className="icon"
        >
          <div style={{ display: "inline" }}>
            <Icon className="icn" size="big" name="shopping cart" />

            <AnimationStyles>
              <TransitionGroup>
                <CSSTransition
                  unmountOnExit
                  classNames="count"
                  className="count"
                  key={itemsCount}
                  timeout={{ enter: 100, exit: 100 }}
                >
                  <CartItemsNumber>{itemsCount}</CartItemsNumber>
                </CSSTransition>
              </TransitionGroup>
            </AnimationStyles>
          </div>
        </li>

        <li className="icon">
          <Popup
            content={<Search biggerIcon={true} />}
            on="click"
            pinned
            position="bottom right"
            trigger={
              <Icon
                className="icn"
                name="search"
                size="big"
                style={{ paddingLeft: "15px" }}
              />
            }
          />
        </li>

        {currentUser?.user && (
          <>
            <li>
              <Link href="/account">
                <a className={path === "/account" ? "add" : "none"}>Accout</a>
              </Link>
            </li>

            {matchedPermissions.length > 0 && (
              <li>
                <Link href="/sell">
                  <a className={path === "/sell" ? "add" : "none"}>Sell</a>
                </Link>
              </li>
            )}

            <li>
              <SignOut path={path}></SignOut>
            </li>
          </>
        )}
      </ul>
      {main && toggleBar && <WhiteBar />}
    </nav>
  </>
);
export default TopNavBar;
