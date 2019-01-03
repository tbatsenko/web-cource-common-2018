import React, { Component } from "react";
import Project from "../Project";
import "./Projects.scss";


import BEM from "../../helpers/BEM";
import HistoryPubSub from "../../helpers/HistoryPubSub";

const b = BEM("projects");


class Projects extends Component {
  static defaultProps = {
    showProjects: "projects",
  };

  constructor(props) {
    super(props);
    this.state = { visible: props.initialProjects };


    this.pubSub = new HistoryPubSub();
    this.pubSub.subscribe((event) => this.setState(event.state));
    this.pubSub.pushState(this.state, "#" + this.state.visible);
  }


  onProjectsClick() {
    this.setState({
      visible: "projects",
    });
    this.pubSub.subscribe((event) => this.setState(event.state));
    this.pubSub.pushState(this.state, "#" + this.state.visible);
  }

  onInternshipsClick() {
    this.setState({
      visible: "internships",
    });
    this.pubSub.subscribe((event) => this.setState(event.state));
    this.pubSub.pushState(this.state, "#" + this.state.visible);

  }

  onVolunteeringClick() {
    this.setState({
      visible: "volunteering",
    });
    this.pubSub.subscribe((event) => this.setState(event.state));
    this.pubSub.pushState(this.state, "#" + this.state.visible);
  }

  render() {
    const { visible } = this.state;
    const { projects } = this.props;
    const workProjects = projects.projects;
    const internships = projects.internships;
    const volunteering = projects.volunteering;
    return (
      <React.Fragment>
        <section className={b()}>
          <nav className={b("project-type-switchers")}>
            <a href="#projects" onClick={() => this.onProjectsClick()}
               className={visible === "projects" ? b("switch", ["active"]) : b("switch")}>Projects</a>
            <a href="#internships" onClick={() => this.onInternshipsClick()}
               className={visible === "internships" ? b("switch", ["active"]) : b("switch")}>Internships</a>
            <a href="#volunteering" onClick={() => this.onVolunteeringClick()}
               className={visible === "volunteering" ? b("switch", ["active"]) : b("switch")}>Volunteering</a>
          </nav>
          <section className={b("wrapper")}>
            {(() => {
              if (visible === "projects") {
                return (
                  workProjects.map(function(project) {
                      return (<React.Fragment><Project key={project.projectId} mainTitle={project.mainTitle}
                                                       title={project.title} link={project.link}
                                                       duration={project.duration}/></React.Fragment>);
                    },
                  ));
              } else if (visible === "internships") {
                return (
                  internships.map(function(project) {
                      return (<React.Fragment><Project key={project.projectId} mainTitle={project.mainTitle}
                                                       title={project.title} link={project.link}
                                                       duration={project.duration}/></React.Fragment>);
                    },
                  ));
              } else if (visible === "volunteering") {
                return (
                  volunteering.map(function(project) {
                      return (<React.Fragment><Project key={project.projectId} mainTitle={project.mainTitle}
                                                       title={project.title} link={project.link}
                                                       duration={project.duration} description={project.description}
                                                       volunteering={true}/></React.Fragment>);
                    },
                  ));
              }
            })()}
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default Projects;