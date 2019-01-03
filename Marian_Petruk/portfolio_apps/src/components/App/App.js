import React, { Component } from "react";
import "./App.css";
import Student from "../Student";
import HistoryPubSub from "../../helpers/HistoryPubSub";

class App extends Component {
  constructor(props) {
    super(props);

    let url = window.location.href;
    const urlSplit = url.split("#");
    this.whichProjects = urlSplit.length === 1 ? "projects" : urlSplit[1];
  }

  render() {
    const whichProjects = this.whichProjects;
    const user = {
      headerAvatarSrc: "https://res.cloudinary.com/firex/image/upload/c_scale,r_30,w_35/v1546077102/portfolio_apps_refactoring/48.jpg",
      userName: "Marian Petruk",
      userOccupation: "BA Computer Science, 3",
      userAvatarSrc: "https://res.cloudinary.com/firex/image/upload/w_120/v1546077102/portfolio_apps_refactoring/48.jpg",
      userFacebookUrl: "https://www.facebook.com/marian.petruk",
      userGithubUrl: "https://github.com/marianpetruk",
      skills: {
        languages: [["English", "C1"],
          ["Italian", "B1"],
          ["German", "A2"],
          ["Polish", "A1"],
          ["Russian", "C1"],
          ["Ukrainian", "C2"],
        ],
        hardSkills: ["Kotlin", "Bootstrap", "Flask",
          "Linux/Unix administration", "AWS", "Adobe Photoshop",
          "Adobe Illustrator", "CI/CD", "OOP",
          "Networking theory (TCP/IP)", "Bash", "Git",
          "Microsoft Office Suite",
          "Experience with cutting-edge technological trends",
          "Understanding of business process modeling",
          "Understanding of SDLC"],
        programingLanguages: ["Python", "C", "C++", "Java", "JavaScript",
          "R", "MySql", "Scratch", "HTML&CSS", "Pascal",
          "Unix shell"],
        softSkills: ["Communication", "Team work", "Collaboration",
          "Attention to Detail", "Problem-Solving",
          "Self-Motivated", "Self-management"],
        professionalInterests: ["Artificial intelligence", "Data Science",
          "Machine learning", "Computer vision",
          "Information Security", "Computer Networks",
          "Concurrent, Parallel and Distributed Systems",
          "Robotics"],
        hobbies: ["Cycling", "Hiking", "Travelling"],
      },
      projects: {
        projects: [],
        internships: [{
          projectId: "1",
          mainTitle: "SoftServe",
          title: "Intern at R&D department",
          link: "https://www.softserveinc.com/en-us/",
          duration: "Aug. 13, 2018 - None",
        }],
        volunteering: [{
          projectId: "1",
          mainTitle: "Volunteer",
          description: "Translated from English and voiced the video (https://youtu.be/S5ucb9A6j78) for Code.org organisation into Ukrainian",
        }],
      },
    };
    return (
      <Student userAvatarUrl={user.headerAvatarSrc} userName={user.userName} userOccupation={user.userOccupation}
               userAvatarSrc={user.userAvatarSrc} userFacebookUrl={user.userFacebookUrl}
               userGithubUrl={user.userGithubUrl} skills={user.skills} showProjects={whichProjects}
               projects={user.projects}/>
    );
  }
}

export default App;
