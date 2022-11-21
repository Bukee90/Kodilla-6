'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

/* 6.3 */
const titleClickHandler = function (event) {
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  /* w for - jesli jest let/const to oznacza dla kazderj nowo stworznej */
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('link was clicked', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('link was clicked', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('clickedElement:', clickedElement);
};


/* 6.4 */
function generateTitleLinks(customSelector = '') {
  // console.log('funckja', generateTitleLinks);
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
  /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList */
    html = html + linkHTML;
    // console.log('html', html)
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  // console.log(links);
  }
  
}
generateTitleLinks();


/* 7.2 + 7.3 */
function calculateTagsParams (tags) {
  const params = {max: '0', min: '999999'};
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
};


function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
};


function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
  /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    // console.log('tagsWrapper', tagsWrapper);
  /* make html variable with empty string */
    let html = '';
  /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
  /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
  /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      // console.log(articleTagsArray);
  /* generate HTML of the link */
      const linkHTML = '<li><a class="' + '" href="#tag-' + tag + '">' + tag + '</a></li>'; 
      // console.log(linkHTML);
  /* add generated code to html variable */
      html = html + linkHTML + ' ';
    /* [NEW] check if this link is NOT already in allTags */
    if(!allTags[tag]){
      /* [NEW] add generated code to allTags array */
      allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
  /* END LOOP: for each tag */
    }
  /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  // console.log('html', html)
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = ' ';
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>'; 
    console.log('tagLinkHTML:', tagLinkHTML);
    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    allTagsHTML += tagLinkHTML;
  /* [NEW] END LOOP: for each tag in allTags: */
  }
  console.log('alltags:', allTags);
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML; /* to muszę komentować */ 
};
generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagHrefs = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagHref of tagHrefs) {
    /* add class active */
    tagHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
  /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();


/* 7.2 - Author*/
function generateAuthors () {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    // console.log('author-wrapper', authorsWrapper);
    let html = '';
    const author = article.getAttribute('data-author');
    // console.log('author', author);
    const articleAuthorArray = author.split(' ');
      const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
      html = html + linkHTML;
      if (!allAuthors[author]) {
        allAuthors[author] = 1;
        } else {
        allAuthors[author] ++;
      }
  authorsWrapper.innerHTML = html;  
  console.log('Authors', allAuthors)
  } 
  const authorList = document.querySelector(optAuthorsListSelector);
  let allAuthorsList = '';
  for (let author in allAuthors) {
    allAuthorsList += '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li> ';
  }
  authorList.innerHTML = allAuthorsList;
}
generateAuthors();


function authorClickHandler (event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const authorHrefs = document.querySelectorAll('a[href="#author-' + href + '"]');
  for (let authorHref of authorHrefs) {
    authorHref.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
};


function addClickListenersToAuthors () {
  const authorLinks = document.querySelectorAll ('a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

