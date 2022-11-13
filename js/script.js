'use strict';

/* 6.3 */
const titleClickHandler = function(event){
    const clickedElement = this;
    event.preventDefault();
    console.log('Link was clicked!');
    console.log(event);
  
/* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

/* w for  jesli jest let/const to oznacza dla kazderj nowo stworznej */
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
        }

/* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

/* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
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
}
  

/* 6.4 */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
    // console.log('funckja', generateTitleLinks);
/* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

/* for each article */ 
    const articles = document.querySelectorAll(optArticleSelector);
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