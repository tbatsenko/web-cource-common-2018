import React, {Component} from "react"

import person_icon from  "../../img/person.jpg"
class AccountInfo extends Component{




    render(){
        return(
            <section title="account info" className="account-info">
                <div className="account-info__blue-side">
                </div>

                <div className="account-info__white-side">

                    <img src={person_icon} className="profile_image"/>
                        <div className="account-info__personal-data">
                            <p className="segoe-font-bold black null_margin">Victor</p>
                            <p className="segoe-font black null_margin">@vicyezh</p>
                        </div>
                        <div className="account-info__statistics">
                            <div>
                                <p className="segoe-font-bold grey">Твиты</p>
                                <p className="segoe-font-bold  common-twitter-color null_margin">10</p>
                            </div>
                            <div>
                                <p className="segoe-font-bold grey">Читаемые</p>
                                <p className="segoe-font-bold  common-twitter-color null_margin">10</p>
                            </div>
                        </div>
                </div>

            </section>



        )
    }



}
export default AccountInfo