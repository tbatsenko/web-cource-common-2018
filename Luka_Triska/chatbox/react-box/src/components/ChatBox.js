import React, {Component} from 'react'

export default class ChatBox extends Component {
  render() {
    return (<main className="main-container">
        <header className="chat-header">
          <section className="chat-header__user-info">
            <div className="chat-header__user-info--icon">

            </div>
            <p className="chat-header__user-info--name">Mykhailo Ivankiv</p>
          </section>
          <div className="chat-header__action-buttons">
            <button className="chat-header__action-button">
              <img className="chat-header__action-button-img" src="../../images/Plus.png" alt="Plus"/>
            </button>
            <button className="chat-header__action-button">
              <img className="chat-header__action-button-img" src="../../images/Video.png" alt="Video"/>
            </button>
            <button className="chat-header__action-button">
              <img className="chat-header__action-button-img" src="../../images/Cog.png" alt="Setting"/>
            </button>
            <button className="chat-header__action-button">
              <img className="chat-header__action-button-img" src="../../images/Close.png" alt="Close"/>
            </button>
          </div>
        </header>
        <section className="chat-messages" id="chat-messages-kris">
        </section>
        <section className="chat-input--layout">
          <form className="chat-input__form" onKeyPress="return event.keyCode !== 13">
            <input className="chat-input" id="chat-user-input-kris" type="text" placeholder="Type a message..."/>
          </form>
          <footer className="chat-user__icon-footer">

          </footer>
        </section>
      </main>
    )
  }
}