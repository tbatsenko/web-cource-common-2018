var code = document.querySelector('.sidebar__template').innerHTML;
var template = Handlebars.compile(code);

var context = {
    "links": [
        {"icon": "star", "text": "Starred"},
        {"icon": "watch_later", "text": "Snoozed"},
        {"icon": "send", "text": "Sent"},
        {"icon": "insert_drive_file", "text": "Drafts"},
        {"icon": "delete", "text": "Trash"},
        {"icon": "expand_more", "text": "More"}
    ]
};

document.querySelector(".sidebar__menu").insertAdjacentHTML('beforeend', template(context));
