import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineMail,
} from "react-icons/ai";
import "./Footer.scss";
import { Link } from "react-router-dom";
import cardsSvg from "../../assets/images/cards.svg";

function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="content">
          <div className="left-footer">
            <div className="title">Follow us on</div>
            <ul className="follow">
              <li>
                <a href="https://instagram.com">
                  <AiOutlineInstagram className="center link" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com">
                  <AiOutlineTwitter className="center link" />
                </a>
              </li>
              <li>
                <a href="https://facebook.com">
                  <AiOutlineFacebook className="center link" />
                </a>
              </li>
              <li>
                <a href="https://mail.google.com">
                  <AiOutlineMail className="center link" />
                </a>
              </li>
            </ul>
          </div>
          <div className="right-footer">
            <div className="title">Compnay Details</div>
            <ul className="company">
              <li>
                <Link>Contact Us</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Return & Exchange Policy</Link>
              </li>
              <li>
                <Link>Shipping Policy</Link>
              </li>
              <li>
                <Link>Terms & Condition</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="sub-footer">
          <div className="copyright-info">
            <p>Copyright {new Date().getFullYear()} © <strong>Posterz</strong></p>
          </div>
          <div className="cards-img">
            <img src={cardsSvg} alt="cards" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
