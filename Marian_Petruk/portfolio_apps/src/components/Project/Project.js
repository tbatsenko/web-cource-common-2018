import React, { Component } from "react";


import "./Project.scss";


import BEM from "../../helpers/BEM";

const b = BEM("project");

class Project extends Component {
  static defaultProps = {
    mainTitle: "Main title",
    title: "title",
    link: "https://www.project.com",
    duration: "Yesterday - today",
    description: "description",
    volunteering: false,
  };

  render() {
    const { mainTitle, title, link, duration, description, volunteering } = this.props;
    return (
      <React.Fragment>
        <section className={volunteering === false ? b() : b("", ["volunteering"])}>
          <h3 className={volunteering === false ? b("main-title") : b("main-title", ["volunteering"])}>{mainTitle}</h3>
          {title !== Project.defaultProps.title ? <h5 className={b("title")}>{title}</h5> : ""}
          {link !== Project.defaultProps.link ? <h5 className={b("title")}>{link}</h5> : ""}
          {duration !== Project.defaultProps.duration ? <span>{duration}</span> : ""}
          <br/>About:
          {description !== Project.defaultProps.description ?
            <section className={b("description")}>{description}</section> : ""}
        </section>
      </React.Fragment>
    );
  }
}

export default Project;
