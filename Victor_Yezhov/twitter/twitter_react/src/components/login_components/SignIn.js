import React, {Component} from "react"


class SignIn extends Component{

    render() {
        return (<div>
                <form className="login-form">
                    <input name="email" type="email" placeholder="Телефон, адресс електронной почты"
                           className="login-form__input"/>
                        <input name="password" type="password" placeholder="Пароль"
                               className="login-form__input"/>
                    <button className="enter_button segoe_blue button_eggy">Войти</button>
                </form>
                <section className="sign_up_block">
                    <img src="http://pngimg.com/uploads/twitter/twitter_PNG34.png" className="twitter_icon"/>
                    <h1 className="heading_text_major segoe_black">Узнайте, что происходит<br/> в мире прямо сейчас.
                    </h1>
                    <h2 className="heading_text_minor segoe_black">Присоединяйтесь к Твиттеру прямо<br/> сейчас!</h2>

                    <button onClick="fb_login()" className="registration_button segoe_white button_round">Войти с
                        facebook
                    </button>
                </section>
            </div>
        )


    }


}

export default SignIn