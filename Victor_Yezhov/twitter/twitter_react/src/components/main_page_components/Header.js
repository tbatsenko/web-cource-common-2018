import React, {Component} from "react"
import bird_icon from "../../img/bird.png"
import search_icon from "../../img/search_main_page.png"
import person_icon from  "../../img/person.jpg"


class Header extends Component {


    render() {
        return (
            <header className="twitter-header">
                <nav className="twitter-header__navigation">
                    <div className="twitter-header__navigation__row">
                        <img src="https://cdn4.iconfinder.com/data/icons/user-interface-33/80/Home-512.png"
                             className="twitter-header__navigation__icon"/>
                        <span className="segoe-font grey twitter-header__navigation__text">Главная</span>
                    </div>
                    <div className="twitter-header__navigation__row">
                        <img src="https://image.flaticon.com/icons/png/128/633/633584.png"
                             className="twitter-header__navigation__icon"/>
                        <span className="segoe-font grey twitter-header__navigation__text">Уведомления</span>
                    </div>
                    <div className="twitter-header__navigation__row">
                        <img src="https://image.flaticon.com/icons/png/128/126/126516.png"
                             className="twitter-header__navigation__icon"/>
                        <span className="segoe-font grey twitter-header__navigation__text"> Сообщения</span>
                    </div>
                </nav>
                <img src={bird_icon} className="bird-icon"/>
                <section className="account-section">
                    <form className="search-form">
                        <input className="search-form__input segoe-font grey" placeholder="Поиск в Твиттере"/>
                        <img src={search_icon} className="twitter-header__navigation__icon"/>
                    </form>
                    <img className="profile_image_small" src={person_icon}/>
                    <button className="twitt-button segoe-font-bold" onClick="fb_logout()">
                        Log out
                    </button>
                </section>
            </header>
        )


    }

}
export default Header