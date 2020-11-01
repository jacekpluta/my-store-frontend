import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import {
  AccountPageStyles,
  AccountPageTitle,
} from "./styles/AccountPageStyles";

function Account() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <>
      <Head>My Account</Head>
      <AccountPageTitle>My Account</AccountPageTitle>
      <AccountPageStyles activeTab={activeTab}>
        <div className="menu">
          <ul>
            <li>
              <Icon style={{ marginRight: "10px" }} name="user" />
              My details
            </li>
            <li>
              <Link
                href={{
                  pathname: "/orders",
                }}
              >
                <>
                  <Icon style={{ marginRight: "10px" }} name="ordered list" />
                  My orders
                </>
              </Link>
            </li>
            <li>
              <Icon style={{ marginRight: "10px" }} name="setting" />
              Account settings
            </li>
          </ul>
        </div>

        {activeTab === "details" && (
          <div className="details">
            <h2>My Details</h2>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders">
            <h2>Orders</h2>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings">
            <h2>Account Seeting</h2>
          </div>
        )}
      </AccountPageStyles>
    </>
  );
}

export default Account;
