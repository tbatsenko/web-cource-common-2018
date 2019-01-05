import React, { Component } from 'react';
import './PortfolioHeader.scss';
import portfolioLogo from './images/portfolio-logo.svg';
import defaultUserAvatar from './images/default-user.svg';

import BEM from '../../helpers/BEM';

const b = BEM('PortfolioHeader');

class PortfolioHeader extends Component {
  static defaultProps = {
    userAvatarSrc: defaultUserAvatar,
  };

  constructor(props) {
    super(props);

    this.onHeaderAvatarClick = this.onHeaderAvatarClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      showPopup: false,
    };
  }

  onHeaderAvatarClick() {
    if (!this.state.showPopup) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.onHeaderAvatarClick();
  }

  render() {
    const { showPopup } = this.state;
    const { userAvatarSrc } = this.props;
    return (
      <React.Fragment>
        <header className={b()}>
          <a href="/" className={b('portfolio-logo')}>
            <img src={portfolioLogo} alt="portfolio logo" />
          </a>
          <section className={b('icon-container')}>
            <a
              href="https://pf.ucu.edu.ua/search/"
              className={b('search-icon')}
            />
            <a
              href="https://pf.ucu.edu.ua/generate-cv/48/"
              className={b('cv-icon')}
            >
              CV
            </a>
            <a
              href="https://pf.ucu.edu.ua/user-show-requests/"
              className={b('envelope-icon')}
            />
            <a
              href="#"
              onClick={this.onHeaderAvatarClick}
              className={b('header-avatar-link')}
              ref={node => {
                this.node = node;
              }}
            >
              <img
                src={userAvatarSrc}
                alt="user avatar"
                className={b('header-avatar-img')}
              />
            </a>
          </section>
        </header>
        {showPopup && (
          <section className={b('popup')}>
            <ul className={b('popup-list')}>
              <li className={b('popup-list-item')}>
                <a href="/" className={b('popup-list-item-anchor')}>
                  Profile
                </a>
              </li>
              <li className={b('popup-list-item')}>
                <a
                  href="https://pf.ucu.edu.ua/edit/user/"
                  className={b('popup-list-item-anchor')}
                >
                  Edit
                </a>
              </li>
              <li className={b('popup-list-item', ['sign-out'])}>
                <a
                  href="https://pf.ucu.edu.ua/accounts/logout/"
                  className={b('popup-list-item-anchor')}
                >
                  <span className={b('popup-exit-icon')} />
                  Sign out
                </a>
              </li>
            </ul>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default PortfolioHeader;
