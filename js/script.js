const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked');
    
    /* remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    
    /* add class 'active' to the clicked link */
    const clickedLink = clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');
    
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    
    /* get 'href' attribute from the clicked link */
    const clickedArticle = clickedElement.getAttribute('href');
    console.log('clickedArticle:', clickedArticle);
    
    /* find the correct article using the selector (value of 'href' attribute) */
    const foundArticle = document.querySelector(clickedArticle);
    console.log('clicked article:', foundArticle);
    
    /* add class 'active to the correct article */
    foundArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');
console.log('links:', links);

for(let link of links){
    link.addEventListener('click', titleClickHandler);
};

{    
const optTitleListSelector = '.titles',
      optArticleSelector = '.post',
      optTitleSelector = '.post-title';

function generateTitleLinks (){
    console.log('wywołałem funkcję generateTitliLinks');
    
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optArticleSelector).innerHTML = '';
        console.log('wyczyściłem listę linków');
    
    /* [IN PROGRESS] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles:', articles);
    
    for(let article of articles){
    
        /* get the article id */
        
        const articleId = article.getAttribute('id');
        console.log('articleId:', articleId);
        
        /* find the title element */
        /* get the title from title element */
        /* create HTML of link */
        /* insert link into titleList */   
    }
}
generateTitleLinks();
}
