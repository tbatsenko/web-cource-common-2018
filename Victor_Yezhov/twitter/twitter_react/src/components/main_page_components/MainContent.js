import React, {Component} from "react"

import person_icon from  "../../img/person.jpg"
import image_icon from "../../img/image.png"
import gif_icon from "../../img/gif.png"
import chart_icon from "../../img/chrt.png"
import location_icon from "../../img/location.png"
class MainContent extends Component{




    render(){
        return (
            <main className="main-content-container">

                <section className="twit-area">
                    <div className="twit-area__visible-row">
                        <img className="profile_image_small" src={person_icon}/>
                            <input type="text" className="twit-area__twit-input" placeholder="Что нового?"/>
                    </div>
                    <div className="twit-area__additional-row">
                        <div>
                            <img className="twit-area__icon" src={image_icon}/>
                                <img className="twit-area__icon" src={gif_icon}/>
                                    <img className="twit-area__icon" src={chart_icon}/>
                                        <img className="twit-area__icon" src={location_icon}/>
                        </div>
                        <div>
                            <button>
                                +
                            </button>
                            <button className="twitt-button segoe-font-bold">
                                Твитнуть
                            </button>
                        </div>

                    </div>
                </section>


            </main>
        )
    }

}
export default MainContent