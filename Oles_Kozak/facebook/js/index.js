var template = require("../templates/post.hbs");

var context = {
    name: "Oles Kozak",
    post: {
        photo: "img/post_pic.jpg",
        comment: "2",
        date: "Yesterday at 13:20"
    }
};

document.getElementById('feed').innerHTML += template(context);