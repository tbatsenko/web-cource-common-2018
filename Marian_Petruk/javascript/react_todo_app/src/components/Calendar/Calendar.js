import React, { Component } from "react";
import "./Calendar.scss";
import BEM from "../../helpers/BEM";

import moment from "moment";

const b = BEM("calendar");


class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
      selected: moment().startOf("day"),
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous() {
    const {
      month,
    } = this.state;

    this.setState({
      month: month.subtract(1, "month"),
    });
  }

  next() {
    const {
      month,
    } = this.state;

    this.setState({
      month: month.add(1, "month"),
    });
  }

  select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone(),
    });
    console.log(day.date.month());
    console.log(day.date.date());

  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month.clone().startOf("month").day("Monday");
    let count = 0;
    let monthIndex = date.month();



    const {
      selected,
      month,
    } = this.state;


    while (!done) {
      let days = [];
      date = date.clone();
      for (let i = 0; i < 7; i++) {
        let day = {
          name: date.format("dd").substring(0, 1),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), "day"),
          date: date,
        };

        // days.push(
        //   <Day day={day}
        //        selected={selected}
        //        select={select}/>
        // );

        let dayClassName = "";
        let mods = [];
        if(day.isToday){
          mods.push("today");
        }
        if(!day.isCurrentMonth){
          mods.push("different-month");
        }
        if(date.isSame(selected)){
          mods.push("selected");
        }
        dayClassName = b("day", mods);

        days.push(
          <span
            key={date.toString()}
            className={dayClassName}
            onClick={() => this.select(day)}>{day.number}</span>
        );

        date = date.clone();
        date.add(1, "day");
      }

      // weeks.push(
      //   <Week key={date}
      //         date={date.clone()}
      //         month={month}
      //         select={(day)=>this.select(day)}
      //         selected={selected} />
      // );

      weeks.push(
        <div className={b("row-week")} key={days[0]}>
          {days}
        </div>,
      );

      // date.add(1, "w");

      done = count++ > 2  && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  renderMonthLabel() {
    const {
      month,
    } = this.state;

    return <span className={b("month-label")}>{month.format("MMMM YYYY")}</span>;
  }

  render() {
    return (
      <section className={b()}>
        <header className={b("header")}>
          <div className={b("month-display")}>
            <button className={b("arrow")} onClick={this.previous}>&lt;</button>
            {this.renderMonthLabel()}
            <button className={b("arrow")} onClick={this.next}>&gt;</button>
          </div>
          <div className={b("day-names")}>
            <span className={b("day")}>Mon</span>
            <span className={b("day")}>Tue</span>
            <span className={b("day")}>Wed</span>
            <span className={b("day")}>Thu</span>
            <span className={b("day")}>Fri</span>
            <span className={b("day")}>Sat</span>
            <span className={b("day")}>Sun</span>
          </div>
        </header>
        {this.renderWeeks()}
        <p className="calendar-wrapper__date-picked">Date picked: {this.state.selected.format("DD/MM/YYYY")}</p>
      </section>

  );
  }
}


export default Calendar;