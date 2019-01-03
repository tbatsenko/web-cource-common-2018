import React, { Component } from "react";
import "./PortfolioHeader.scss";
import portfolioLogo from "./images/portfolio_logo.svg";
import defaultUserAvatar from "./images/default-user.svg";

import BEM from "../../helpers/BEM";

const b = BEM("portfolio-header");


class PortfolioHeader extends Component {
  static defaultProps = {
    logoSrc: portfolioLogo,
    userAvatarSrc: defaultUserAvatar,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  onHeaderAvatarClick() {
    if (this.state.showPopup === true) {
      this.setState({
        showPopup: false,
      });
    } else {
      this.setState({
        showPopup: true,
      });
    }
  }

  render() {
    const { showPopup } = this.state;
    const { logoSrc, userAvatarSrc } = this.props;
    return (
      <React.Fragment>
        <header className={b()}>
          <a href="/" className={b("portfolio-logo")}>
            <img src={logoSrc} alt="portfolio logo"/>
          </a>
          <section className={b("icon-container")}>
            <a href="https://pf.ucu.edu.ua/search/" className={b("search-icon")}></a>
            <a href="https://pf.ucu.edu.ua/generate-cv/48/" className={b("cv-icon")}>CV</a>
            <a href="https://pf.ucu.edu.ua/user-show-requests/" className={b("envelope-icon")}></a>
            <a href="#" onClick={() => this.onHeaderAvatarClick()} className={b("header-avatar-link")}>
              <img src={userAvatarSrc} alt="user avatar" className={b("header-avatar-img")}/>
            </a>
          </section>
        </header>
        {function() {
          if (showPopup === true) {
            return (
              <section className={b("popup")}>
                <ul className={b("popup-list")}>
                  <li className={b("popup-list-item")}><a href="/" className={b("popup-list-item-anchor")}>Profile</a>
                  </li>
                  <li className={b("popup-list-item")}><a href="https://pf.ucu.edu.ua/edit/user/"
                                                          className={b("popup-list-item-anchor")}>Edit</a></li>
                  <li className={b("popup-list-item", ["sign-out"])}><a href="https://pf.ucu.edu.ua/accounts/logout/"
                                                                        className={b("popup-list-item-anchor")}><span
                    className={b("popup-exit-icon")}></span>Sign out</a></li>
                </ul>
              </section>
            );
          }
        }()}

      </React.Fragment>
    );
  }
}

export default PortfolioHeader;
