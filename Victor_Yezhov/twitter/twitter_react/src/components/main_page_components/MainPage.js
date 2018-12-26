import React, {Component} from "react"
import Header from "./Header"
import AccountInfo from "./AccountInfo.js"
import ActualNews from "./ActualNews"
import MainContent from "./MainContent"
import Recommendations from "./Recommendations"
import Navigation from "./Navigation"

import "../../css/main_page/all-css.css"
import "../../fonts/fonts.css"


class MainPage  extends Component{


    render(){
        return(
            <div>
                <Header/>
                <div className="main_layout">
                    <aside className="account-info-container">
                        <AccountInfo/>
                        <ActualNews/>
                    </aside>
                    <MainContent/>
                    <aside className="recommendation-container">
                        <Recommendations/>
                        <Navigation/>
                    </aside>
                </div>
            </div>
        )
    }


}

export default MainPage