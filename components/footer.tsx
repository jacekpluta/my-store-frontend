import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Icon } from "semantic-ui-react";

import { logoImages } from "../lib/images";
import Info from "./info";
import {
  Bar,
  Credits,
  Logos,
  LogosImg,
  FooterMain,
  FooterStyles,
} from "./styles/FooterStyles";

function Footer() {
  return (
    <>
      <FooterStyles>
        <FooterMain>
          <ul>
            <li>
              <a>INFORMATIONS</a>
            </li>
            <li>
              <a>Gift Cards</a>
            </li>
            <li>
              <a>Promotions</a>
            </li>
            <li>
              <a>Find a Store</a>
            </li>
            <li>
              <a>Become a Member</a>
            </li>
            <li>
              <a>My Shop Journal</a>
            </li>
            <li>
              <a>Send us Feedback</a>
            </li>
          </ul>

          <ul>
            <li>
              <a>GET HELP</a>
            </li>
            <li>
              <a>Order Status</a>
            </li>
            <li>
              <a>Shipping and Delivery</a>
            </li>
            <li>
              <a>Returns</a>
            </li>
            <li>
              <a>Payment Options</a>
            </li>
            <li>
              <a>Gift Card Balance</a>
            </li>
            <li>
              <a>Contact Us</a>
            </li>
          </ul>

          <ul>
            <li>
              <a>ABOUT MY SHOP</a>
            </li>
            <li>
              <a>News</a>
            </li>
            <li>
              <a>Careers</a>
            </li>
            <li>
              <a>Investors</a>
            </li>
            <li>
              <a>Purpose</a>
            </li>
            <li>
              <a>Sustainability</a>
            </li>
            <li>
              <a>CA Supply Chains</a>
            </li>
          </ul>

          <ul>
            <li>
              <a>
                <Icon size="big" name="facebook" />
              </a>
            </li>
            <li>
              <a>
                <Icon size="big" name="twitter" />
              </a>
            </li>
            <li>
              <a>
                <Icon size="big" name="instagram" />
              </a>
            </li>
          </ul>
        </FooterMain>

        <Bar></Bar>
        <Credits>
          <a>© 2020 My Shop - All Rights Reserved</a>

          <ul>
            <li>
              <a>Guides</a>
            </li>
            <li>
              <a>Terms of Sale</a>
            </li>
            <li>
              <a>Terms of Use</a>
            </li>
            <li>
              <a>Privacy Policy</a>
            </li>
          </ul>
        </Credits>
      </FooterStyles>
    </>
  );
}

export default Footer;
