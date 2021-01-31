'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked');

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  const clickedLink = clickedElement.classList.add('active');
  //console.log(clickedLink);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const clickedArticle = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const foundArticle = document.querySelector(clickedArticle);

  /* add class 'active to the correct article */
  foundArticle.classList.add('active');
};

const optTitleListSelector = '.titles',
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log('Stała links to:', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('Articles to:', articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelectorAll(optArticleTagsSelector);
    console.log('1. tagsWrapper to:', tagsWrapper);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('2. Tagi to:', articleTags);

    /* [DONE] split tags into array */
    const splitedArticleTags = articleTags.split(' ');
    console.log('3. Splited tags to:', splitedArticleTags);

    /* [DONE] START LOOP: for each tag */
    for (let articleTag of splitedArticleTags) {

      /* [IN PROGRESS] generate HTML of the link */
      const linkHTML = '<li><a href="#"><span>' + articleTag + '</span></a></li>';
      console.log('3a. Kod linka taga to:', linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      console.log('3b. html to:', html);

    /* [DONE] END LOOP: for each tag */
    }

    /* [IN PROGRESS] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('4. tagsWrapper to:', tagsWrapper);

  /* [DONE] END LOOP: for every article: */
  }
}

generateTags();