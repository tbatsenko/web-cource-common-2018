import React, {Component} from  "react"




class Recommendations extends Component{



    render(){
        return(
            <section title="who to read" className="recommendations">
                <h1 className="null_margin segoe-font-bold">Кого читать</h1>
                <section className="recommendation">
                    <img className="recommendation__photo"
                         src="https://kandl-genres.files.bbci.co.uk/kandl-genres/1231-1/images/meta-images/bbc_blocks.png"/>
                        <div className="recommendation__info">
                            <span className="segoe-font-bold">BBC</span>
                            <span className="segoe-font-italic">@bbc_official</span>
                            <br/>
                                <button className="recommendation__read_button segoe-font-bold">Читать</button>
                        </div>
                </section>
                <section className="recommendation">
                    <img className="recommendation__photo"
                         src="https://cdn.cnn.com/cnn/.e1mo/img/4.0/logos/CNN_logo_400x400.png"/>
                        <div className="recommendation__info">
                            <span className="segoe-font-bold">CNN</span>
                            <span className="segoe-font-italic">@cnn_official</span>
                            <br/>
                                <button className="recommendation__read_button segoe-font-bold">Читать</button>
                        </div>
                </section>
                <section className="recommendation">
                    <img className="recommendation__photo" src="https://a.d-cd.net/a51016as-960.jpg"/>
                        <div className="recommendation__info">
                            <span className="segoe-font-bold">smotra_ru</span>
                            <span className="segoe-font-italic">@smotra</span>
                            <br/>
                                <button className="recommendation__read_button segoe-font-bold">Читать</button>
                        </div>
                </section>
                <section className="recommendation">
                    <img className="recommendation__photo"
                         src="https://pbs.twimg.com/profile_images/1057899591708753921/PSpUS-Hp_400x400.jpg"/>
                        <div className="recommendation__info">
                            <span className="segoe-font-bold">Google</span>
                            <span className="segoe-font-italic">@google</span>
                            <br/>
                                <button className="recommendation__read_button segoe-font-bold">Читать</button>
                        </div>
                </section>
            </section>



        )
    }
}
export  default Recommendations