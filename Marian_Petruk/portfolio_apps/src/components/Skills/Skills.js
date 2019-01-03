import React, { Component } from "react";

import "./Skills.scss";

import BEM from "../../helpers/BEM";

const b = BEM("skills");

class Skills extends Component {
  static defaultProps = {
    isHobbies: false,
    languages: {},
    hardSkills: [],
    programmingLanguages: [],
    softSkills: [],
    professionalInterests: [],
  };


  render() {
    const { languages, hardSkills, isHobbies, programmingLanguages, softSkills, professionalInterests, hobbies } = this.props;
    if (isHobbies === false) {
      return (
        <React.Fragment>
          <aside className={b("", ["aside1"])}>
            <h3 className={b("block-title", ["hard-skills"])}>LANGUAGES</h3>
            <dl className={b("block", ["languages"])}>
              {languages.map(function(d) {
                return (<React.Fragment>
                  <dt key={d[0].toString()} className={b("item", ["language"])}>{d[0]}</dt>
                  <dd key={d[0].toString() + d[1].toString()}
                      className={b("item-value", ["language-level"])}>{d[1]}</dd>
                </React.Fragment>);
              })}
            </dl>
            <h3 className={b("block-title")}>HARD SKILLS</h3>
            <ul className={b("block")}>
              {hardSkills.map(function(d) {
                return (<li key={d.toString()} className={b("item")}>{d}</li>);
              })}
            </ul>
            <h3 className={b("block-title")}>PROGRAMMING LANGUAGES</h3>
            <ul className={b("block")}>
              {programmingLanguages.map(function(d) {
                return (<li key={d.toString()} className={b("item")}>{d}</li>);
              })}
            </ul>
            <h3 className={b("block-title")}>SOFT SKILLS</h3>
            <ul className={b("block")}>
              {softSkills.map(function(d) {
                return (<li key={d.toString()} className={b("item")}>{d}</li>);
              })}
            </ul>
          </aside>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <aside className={b("", ["aside2"])}>
            <h3 className={b("block-title")}>PROFESSIONAL INTERESTS</h3>
            <ul className={b("block", ["interests"])}>
              {professionalInterests.map(function(d) {
                return (<li key={d.toString()} className={b("item", ["interests"])}>{d}</li>);
              })}
            </ul>
            <h3 className={b("block-title")}>HOBBIES</h3>
            <ul className={b("block")}>
              {hobbies.map(function(d) {
                return (<li key={d.toString()} className={b("item")}>{d}</li>);
              })}
            </ul>
          </aside>
        </React.Fragment>
      );
    }
  }
}

export default Skills;