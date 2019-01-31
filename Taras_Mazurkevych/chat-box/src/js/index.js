import '../styles/index.scss';
import Handlebars from 'handlebars/dist/cjs/handlebars'

Handlebars.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});

const messagesTemplateText = `
<div id="comments">
  {{#each messages}}
    {{#ifvalue type value="friend"}}
      <div class="messages__friend-message-wrapper">
        <div>
          <img srcset="{{imageUrlSet}}" src="{{imageUrl}}" alt="Sender avatar" class="messages__friend-message-avatar-img">
        </div>
        <div class="messages__friend-message-texts">
         {{#each texts}}
           <span class="messages__friend-message-texts-message">
              {{this}}
           </span>
         {{/each}}
        </div>
      </div>
    {{/ifvalue}}
    
    {{#ifvalue type value="you"}}
      <div class="messages__your-message-wrapper">
         {{#each texts}}
         <span class="messages__your-message-text">
            {{this}}
         </span>
         {{/each}}
      </div>
    {{/ifvalue}}

    {{#ifvalue type value="date"}}
      <time class="messages-datetime">
        {{text}}
      </time>
    {{/ifvalue}}
  {{/each}}
</div>
`

const messagesTemplate = Handlebars.compile(messagesTemplateText);

const messages = {
  "messages": [
    {
      "type": "friend",
      "imageUrlSet": "public/img/sender-avatar1x.jpg 1x, public/img/sender-avatar2x.jpg 2x",
      "imageUrl": "public/img/sender-avatar1x.jpg",
      "texts": [
        "Yo, Can you update views?"
      ]
    },
    {
      "type": "date",
      "text": "FRI 11:30AM"
    },
    {
      "type": "friend",
      "imageUrlSet": "public/img/sender-avatar1x.jpg 1x, public/img/sender-avatar2x.jpg 2x",
      "imageUrl": "public/img/sender-avatar1x.jpg",
      "texts": [
        "I can't see updated views yet"
      ]
    },
    {
      "type": "you",
      "imageUrlSet": "public/img/sender-avatar1x.jpg 1x, public/img/sender-avatar2x.jpg 2x",
      "imageUrl": "public/img/sender-avatar1x.jpg",
      "texts": [
        "Hi, as I noted in Email last week - I am on vacation.",
        "I will be back next week"
      ]
    },
    {
      "type": "friend",
      "imageUrlSet": "public/img/sender-avatar1x.jpg 1x, public/img/sender-avatar2x.jpg 2x",
      "imageUrl": "public/img/sender-avatar1x.jpg",
      "texts": [
        "Ahh, sorry, missed that!",
        "Let's talk next week"
      ]
    }
  ]
}

document.getElementById('messages').innerHTML = messagesTemplate(messages);
