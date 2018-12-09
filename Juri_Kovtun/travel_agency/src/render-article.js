// Antarctica articles category: categories.0: 8
// Cuba articles category: categories.0: 6
// Cuba photo gallery category: categories.0: 7

const CUBA_ARTICLES = 6;
const postsURL = endPoint + 'posts';

fetch(postsURL)
    .then(r => r.json())
    .then((posts) => {
        renderArticles(posts);
    });


// !!!render articles
function renderArticles(posts) {
    const articleEntry = document.querySelector('.articles');
    const articlePosts = posts.filter(el => el.categories[0] === CUBA_ARTICLES);
    const orderedArticles = articlePosts.sort((a, b) => a.slug - b.slug);
    let articleInnerHTML = "";

    function substringContent(el) {
        return el.content.rendered.slice(3, el.content.rendered.length - 5);
    }

    orderedArticles.map((el, i) => {
        articleInnerHTML += `
            <article class="article">
                <img class="article__picture article__picture--${i % 2 > 0 ? "odd" : "even"}" src="${el.picture}">
                <div class="article__caption article__caption--${i % 2 > 0 ? "odd" : "even"}">
                    <h3 class="article__heading heading3">${el.title.rendered}</h3>
                    <p class="article__reading reading">${substringContent(el)}</p>
                </div>
            </article>`
    });

    articleEntry.innerHTML = articleInnerHTML;
}















