'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

const optTitleListSelector = '.titles',
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  const clickedLink = clickedElement.classList.add('active');
  console.log(clickedLink);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const clickedArticle = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const foundArticle = document.querySelector(clickedArticle);

  /* [DONE] add class 'active to the correct article */
  foundArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log('customSelector to:',customSelector);

  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagClass(count,params) {
  
  /* Zaczęliśmy od odjęcia 2 od 6, czyli: */
  const normalizedCount = count - params.min;
    
  /* Następnie zmniejszyliśmy 10 – również o 2: */
  const normalizedMax = params.max - params.min;
    
  /* W kolejnym kroku podzieliliśmy te dwie liczby – 4 i 8: */
  const percentage = normalizedCount / normalizedMax;
    
  /* I wreszcie, zastosowaliśmy algorytm znany z losowania liczby całkowitej: */
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    
  return optCloudClassPrefix + classNumber;
}

function calculateTagsParams(tags) {
    
  const params = {
    max: 0,
    min: 999999,
  };
    
  for(let tag in tags){
    //console.log(tag + ' is used ' + tags[tag] + ' times ');

    /* standardowy if */
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
      
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
      
    /* short if */
    //params.max = tags[tag] > params.max ? tags[tag] : params.max;
    /* Math.max */
    //params.max = Math.max(tags[tag], params.max);
  }

  return params;
}

function generateTags(){
    
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
    
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    //console.log('tagsWrapper to:', tagsWrapper);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const splitedArticleTags = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for (let tag of splitedArticleTags) {

      /* [DONE] generate HTML of the link */
      const linkHTMLData = {tag: tag}
      const linkHTML = templates.articleTag(linkHTMLData);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
        
      /* W PRZYPADKU TABLICY [NEW] check if this link is NOT already in allTags */
      //if(allTags.indexOf(linkHTML) == -1){
      /* [NEW] add generated code to allTags array */
      //allTags.push(linkHTML);  
      //}
        
      /* W PRZYPADKU OBIEKTU [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;  
      } else {
        allTags[tag]++;
      }
      //console.log(allTags);
        
      /* [NEW] add HTML from allTags to tagList */
      // tagList.innerHTML = allTags.join(' ');
        
    /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
    
  /* W PRZYPADKU TABLICY [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
    
  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams to:',tagsParams);
    
  /* [NEW] create variable for all links HTML code */
  let allTagsData = {tags: []};
    
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
        
    /* [NEW] END LOOP: for each tag in allTags: */
  }
    
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('1. Link was clicked', clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('2. Atrybut href klikniętego elementu to:', href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log('3. Extracted tag from href to:', tag);

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log('4. Tag links z klasą active to:', activeTagLinks);

  /* [DONE] START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks) {

    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log('5. FoundTagLinks to:', foundTagLinks);

  /* [DONE] START LOOP: for each found tag link */
  for(let foundTagLink of foundTagLinks){

    /* [DONE] add class active */
    foundTagLink.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  
  /* [DONE] START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
    
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};
    
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    
    /* [DONE] find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log('1. Authors wrapper to:', authorWrapper);
    
    /* [DONE] make html variable with empty string */
    let html = '';
    //console.log('2. Kod html jest teraz:', html);
    
    /* [DONE] get authors from data-author attribute */
    const author = article.getAttribute('data-author');
    //console.log('3. Author to:', author);
    
    /* [DONE] generate HTML of the link */
    const linkHTMLData = {author: author};
    const linkHTML = templates.articleAuthor(linkHTMLData);
    //console.log('4. Nowy html linka autora to:', linkHTML);
    
    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
      
      
    if(!allAuthors[author]) {
      /* [NEW] add generated code to allTags array */
      allAuthors[author] = 1;  
    } else {
      allAuthors[author]++;
    }
    console.log(allAuthors);
      
    
    /* [DONE] insert HTML of all the aothors into the authors wrapper */
    authorWrapper.innerHTML = html;
    
  /* [DONE] END LOOP: for every article */
  }
    
  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  console.log('authorList to:', authorList);
        
  //const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams to:',tagsParams);
    
  /* [NEW] create variable for all links HTML code */
  let allAuthorsData = {allAuthors: []};
    
  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
    
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsData.allAuthors.push({
      author: author,
      count: allAuthors[author]
    });
    //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + (allAuthors[author]) + ')</a></li>';
        
  /* [NEW] END LOOP: for each tag in allTags: */
  }
    
  /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make a new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('I. Link was clicked', clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('II. Atrybut href klikniętego elementu to:', href);
    
  /* [DONE] make a new constant "author" and extract author name from the "href" constant */
  const author = href.replace('#author-', '');
  //console.log('IIa.', author);

  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log('III. Author links z klasą active to:', activeAuthorLinks);

  /* [DONE] START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks) {

    /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active');

  /* [DONE] END LOOP: for each active author link */
  }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log('IV. FoundTagLinks to:', foundAuthorLinks);

  /* [DONE] START LOOP: for each found author link */
  for(let foundAuthorLink of foundAuthorLinks){

    /* [DONE] add class active */
    foundAuthorLink.classList.add('active');

  /* [DONE] END LOOP: for each found author link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* [DONE] find all links to author */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */
  for(let authorLink of authorLinks){

    /* [DONE] add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors();