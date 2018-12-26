import React, {Component} from "react"
import people from "../../img/people.png"
import search from "../../img/search.png"
import chat from "../../img/chat.png"

class Greatings extends Component {


    render() {


        return (
            <div>
                <div className="introduction-text__row"><img src={search}
                                                             className="introduction-text__img"/>
                    <span className="introduction-text segoe_white">Читайте о том, что вам интересно.</span></div>
                <div className="introduction-text__row">
                    <img src={people} className="introduction-text__img"/>
                    <span className="introduction-text segoe_white"> Узнавайте, что обсуждают люди.  </span></div>
                <div className="introduction-text__row">
                    <img src={chat} className="introduction-text__img"/><span
                    className="introduction-text segoe_white">Присоединяйтесь к переписке.     </span></div>
            </div>
        )


    }

}

export  default Greatings