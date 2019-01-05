import React, { Component } from 'react';
import PortfolioHeader from '../PortfolioHeader';
import UserLayout from '../UserLayout';
import './AppLayout.scss';

import BEM from '../../helpers/BEM';

const b = BEM('AppLayout');

class AppLayout extends Component {
  render() {
    const { user } = this.props;
    return (
      <section className={b()}>
        <PortfolioHeader userAvatarSrc={user.userAvatarSrc} />
        <UserLayout
          userName={user.userName}
          userOccupation={user.userOccupation}
          userAvatarSrc={user.userAvatarSrc}
          userFacebookUrl={user.userFacebookUrl}
          userGithubUrl={user.userGithubUrl}
          skills={user.skills}
          projects={user.projects}
        />
      </section>
    );
  }
}

export default AppLayout;
