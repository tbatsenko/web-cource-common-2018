import React, { Component } from 'react';
import StudentInfo from '../StudentInfo';
import StudentPayload from '../StudentPayload';

import './UserLayout.scss';

import BEM from '../../helpers/BEM';

const b = BEM('UserLayout');

class UserLayout extends Component {
  render() {
    const {
      userName,
      userOccupation,
      userAvatarSrc,
      userFacebookUrl,
      userGithubUrl,
      skills,
      showProjects,
      projects,
    } = this.props;
    return (
      <main className={b()}>
        <StudentInfo
          userName={userName}
          userOccupation={userOccupation}
          userAvatarSrc={userAvatarSrc}
          userFacebookUrl={userFacebookUrl}
          userGithubUrl={userGithubUrl}
        />
        <StudentPayload
          skills={skills}
          showProjects={showProjects}
          projects={projects}
        />
      </main>
    );
  }
}

export default UserLayout;
