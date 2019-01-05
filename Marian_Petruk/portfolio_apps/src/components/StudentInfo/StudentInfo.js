import React, { Component } from 'react';
import './StudentInfo.scss';
import facebookLogo from './images/facebook.svg';
import githubLogo from './images/github.svg';
import defaultUserAvatar from './images/default-user.svg';

import BEM from '../../helpers/BEM';

const b = BEM('StudentInfo');

class StudentInfo extends Component {
  static defaultProps = {
    userName: 'Name Surname',
    userOccupation: 'occupation',
    userAvatarSrc: defaultUserAvatar,
    userFacebookUrl: 'https://www.facebook.com/',
    userGithubUrl: 'https://github.com/',
  };

  render() {
    const {
      userName,
      userOccupation,
      userAvatarSrc,
      userFacebookUrl,
      userGithubUrl,
    } = this.props;
    return (
      <React.Fragment>
        <header className={b()}>
          <img
            src={userAvatarSrc}
            alt="student avatar"
            className={b('student-avatar')}
          />
          <section className={b('student-short-info')}>
            <span className={b('student-name')}>{userName}</span>
            <span className={b('student-occupation')}>{userOccupation}</span>
            <section className={b('social-info')}>
              <a href={userFacebookUrl} className={b('facebook-logo')}>
                <img src={facebookLogo} alt="facebook logo" />
              </a>
              <a href={userGithubUrl} className={b('github-logo')}>
                <img src={githubLogo} alt="github logo" />
              </a>
            </section>
          </section>
        </header>
      </React.Fragment>
    );
  }
}

export default StudentInfo;
