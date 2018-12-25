import React, {Component} from "react"
import Greatings from "./Greatings.js"
import SignIn from "./SignIn";
import Footer from "./Footer"
import "../../css/login/all-css.css"
import "../../fonts/fonts.css"


class Login extends Component{


    render(){
        return(
            <main className="main-container">
                <section className="left-side introduction_blue introduction-text-container">
                    <Greatings/>
                </section>
                <section className="right-side">
                    <SignIn/>
                </section>
                <footer className="footer">
                    <Footer/>
                </footer>
            </main>
        )
    }


}

export default Login
