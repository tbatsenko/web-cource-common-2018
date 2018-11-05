var content = {
    videoSections:[
        {
            header: "Recommended",
            videos: [
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kokoko",
                    duration: "10:20",
                    channelName: "Channel1",
                    isVerified: false,
                    views: 100000,
                    uploadDate: "1 day ago"
                },
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kikiki",
                    duration: "20:10",
                    channelName: "Channel2",
                    isVerified: true,
                    views: 1000,
                    uploadDate: "2 days ago"
                },
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kokoko",
                    duration: "10:20",
                    channelName: "Channel1",
                    isVerified: false,
                    views: 100000,
                    uploadDate: "1 day ago"
                },
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kikiki",
                    duration: "20:10",
                    channelName: "Channel2",
                    isVerified: true,
                    views: 1000,
                    uploadDate: "2 days ago"
                },
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kokoko",
                    duration: "10:20",
                    channelName: "Channel1",
                    isVerified: false,
                    views: 100000,
                    uploadDate: "1 day ago"
                },
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kikiki",
                    duration: "20:10",
                    channelName: "Channel2",
                    isVerified: true,
                    views: 1000,
                    uploadDate: "2 days ago"
                }
            ]
        },
        {
            header: "Watch later",
            videos: [
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kekeke",
                    duration: "10:20",
                    channelName: "Channel101",
                    isVerified: false,
                    views: 100000,
                    uploadDate: "1 day ago"
                },
                {
                    coverImage: "img/cover-image.jpg",
                    name: "Kukuku",
                    duration: "20:10",
                    channelName: "Channel3",
                    isVerified: true,
                    views: 1000,
                    uploadDate: "2 days ago"
                }
            ]
        }
    ]
};

var source = document.getElementById("template").innerHTML;
var template = Handlebars.compile(source);
var html = template(content);

document.getElementById("template-target").innerHTML = html;