import React, {Component} from "react"



class ActualNews extends Component{



    render(){
        return(
            <section title="actual news" className="relative_news">
                <h3 className="segoe-font-bold" style={{textAlign:'center'}}>Актуальные темы для вас</h3>
                <ol>
                    <li>
                        <p className="hash-tag"><a href="#"
                                                   className="segoe-font-bold common-twitter-color">#AvengersEndgame</a>
                        </p>
                        <p className="segoe-font grey null_margin">Твитов: 97,2 тыс.</p>
                    </li>
                    <li>
                        <p className="hash-tag"><a href="#"
                                                   className="segoe-font-bold common-twitter-color">#CopaLibertadores2018</a>
                        </p>
                        <p className="segoe-font grey null_margin">Твитов: 44,9 тыс.</p>
                    </li>
                    <li>
                        <p className="hash-tag"><a href="#"
                                                   className="segoe-font-bold common-twitter-color">#MelhoresDoAno</a>
                        </p>
                        <p className="segoe-font grey null_margin">Твитов: 66,5 тыс.</p>
                    </li>
                    <li>
                        <p className="hash-tag"><a href="#" className="segoe-font-bold common-twitter-color">#Juan
                            Fernando Quintero</a></p>
                        <p className="segoe-font grey null_margin">Твитов: 15,5 тыс.</p>
                    </li>
                    <li>
                        <p className="hash-tag"><a href="#"
                                                   className="segoe-font-bold common-twitter-color">#نهايي_القرن</a></p>
                        <p className="segoe-font grey null_margin">Твитов: 69,4 тыс.</p>
                    </li>
                    <li>
                        <p className="hash-tag"><a href="#" className="segoe-font-bold common-twitter-color">#Boca</a>
                        </p>
                        <p className="segoe-font grey null_margin">Твитов: 73,7 тыс.</p>
                    </li>
                    <li>
                        <p className="hash-tag"><a href="#"
                                                   className="segoe-font-bold common-twitter-color">#VOXalNatural</a>
                        </p>
                        <p className="segoe-font grey null_margin">Твитов: 38,2 тыс.</p>
                    </li>
                </ol>
            </section>
        )
    }

}

export default ActualNews