import React, { Component } from "react";
import PortfolioHeader from "../PortfolioHeader";
import StudentHeader from "../StudentHeader";
import Skills from "../Skills";
import Projects from "../Projects";

import "./Student.scss";


import BEM from "../../helpers/BEM";

const b = BEM("student");


class Student extends Component {
  render() {
    const { userAvatarUrl, userName, userOccupation, userAvatarSrc, userFacebookUrl, userGithubUrl, skills, showProjects, projects } = this.props;
    return (
      <React.Fragment>
        <PortfolioHeader userAvatarSrc={userAvatarUrl}/>
        <main className={b()}>
          <StudentHeader userName={userName} userOccupation={userOccupation} userAvatarSrc={userAvatarSrc}
                         userFacebookUrl={userFacebookUrl} userGithubUrl={userGithubUrl}/>
          <Projects initialProjects={showProjects} projects={projects}/>
          <Skills isHobbies={false} languages={skills.languages} hardSkills={skills.hardSkills}
                  programmingLanguages={skills.programingLanguages} softSkills={skills.softSkills}/>
          <Skills isHobbies={true} professionalInterests={skills.professionalInterests} hobbies={skills.hobbies}/>
        </main>
      </React.Fragment>
    );
  }
}

export default Student;
