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

for(let link of links){
    link.addEventListener('click', titleClickHandler);
};