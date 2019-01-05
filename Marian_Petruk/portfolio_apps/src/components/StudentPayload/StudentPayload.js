import React, { Component } from 'react';
import './StudentPayload.scss';

import BEM from '../../helpers/BEM';
import Projects from '../Projects';
import Skills from '../Skills';

const b = BEM('StudentPayload');

class StudentPayload extends Component {
  render() {
    const { skills, projects, showProjects } = this.props;
    return (
      <section className={b()}>
        <Skills
          additionalClassName={b('aside-left')}
          isHobbies={false}
          languages={skills.languages}
          hardSkills={skills.hardSkills}
          programmingLanguages={skills.programingLanguages}
          softSkills={skills.softSkills}
        />
        <Projects
          additionalClassName={b('main')}
          initialProjects={showProjects}
          projects={projects}
        />
        <Skills
          additionalClassName={b('aside-right')}
          isHobbies={true}
          professionalInterests={skills.professionalInterests}
          hobbies={skills.hobbies}
        />
      </section>
    );
  }
}

export default StudentPayload;
