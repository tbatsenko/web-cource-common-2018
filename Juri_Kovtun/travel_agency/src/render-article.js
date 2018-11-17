const CubaArticles = [
    {
        "picture": "assets/cuba/cuba-article01.png",
        "heading": "Historical Heritage",
        "reading": "Bereft of modern interference, Cuba’s colonial cities haven’t changed much since musket-toting pirates stalked the Caribbean. Atmosphere and architecture is particularly stirring in Havana, Trinidad and Camagüey where grandiose squares and cobbled streets tell erstwhile tales of opulence and intrigue.",
        "polarity": "odd"
    },
    {
        "picture": "assets/cuba/cuba-article02.png",
        "heading": "Astonishing Beaches",
        "reading": "Whether you’re staying in a luxury hotel in Havana or exploring the rural charms of Vinales, in some ways it’s all the real Cuba. Some travellers might opt to miss the beach resort town of Varadero, but this energetic beachside paradise should still  be an option to consider as part of your Cuban travel plans.",
        "polarity": "even"
    }
];

const articleEntry = document.getElementsByClassName("articles")[0];

let articleInnerHTML = "";

CubaArticles.map((el) => {
    articleInnerHTML += `
<article class="article">
    <img class="article__picture article__picture--${el.polarity}" src="${el.picture}">
    <div class="article__caption article__caption--${el.polarity}">
    <h3 class="article__heading heading3">${el.heading}</h3>
<p class="article__reading reading">${el.reading}</p>
</div>
</article>`
});

articleEntry.innerHTML = articleInnerHTML;












