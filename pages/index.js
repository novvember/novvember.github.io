import {doneCards, studyCards, todoCards} from '../utils/initialCards.js';

import ExtraInfo from '../components/ExtraInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';

/**
 * Генерация карточек
 */

const doneList = document.querySelector('#done .cards');

const doneSection = new Section(
  doneCards,
  doneList,
  function (data) {
    const card = new Card(data, '.template__card');
    return card.render();
});
doneSection.renderItems();


const studyList = document.querySelector('#study .cards');

const studySection = new Section(
  studyCards,
  studyList,
  function (data) {
    const card = new Card(data, '.template__card');
    return card.render();
});
studySection.renderItems();


/**
 * Получение доп информации из профиля пользователя
 */

// Github
async function getGithubRepsNumber(userId) {
  return fetch(`https://api.github.com/users/${userId}`)
    .then(res => {
      if (res.ok) return res.json();
      return new Error(res.status);
    })
    .then(res => {
      return res.public_repos;
    });
}

const githubLink = document.querySelector('.add-extra_type_github');
const githubId = githubLink.href.split('/').reverse()[0];
const githubExtra = new ExtraInfo(githubLink, githubId, getGithubRepsNumber);
githubExtra.set();

// Stackoverflow
async function getStackoverflowReputation(userId) {
  return fetch(`https://api.stackexchange.com/2.2/users/${userId}?site=ru.stackoverflow`)
    .then(res => {
      if (res.ok) return res.json();
      return new Error(res.status);
    })
    .then(res => {
      return res.items[0].reputation;
    })
}

const stackoverflowLink = document.querySelector('.add-extra_type_stackoverflow');
const stackoverflowId = stackoverflowLink.href.split('/').reverse()[0];
const stackoverflowExtra = new ExtraInfo(stackoverflowLink, stackoverflowId, getStackoverflowReputation);
stackoverflowExtra.set();

// Codewars
async function getCodewarsHonor(userId) {
  return fetch(`https://www.codewars.com/api/v1/users/${userId}`)
    .then(res => {
      if (res.ok) return res.json();
      return new Error(res.status);
    })
    .then(res => {
      return res.honor;
    })
}

const codewarsLink = document.querySelector('.add-extra_type_codewars');
const codewarsId = codewarsLink.href.split('/').reverse()[0];
const codewarsExtra = new ExtraInfo(codewarsLink, codewarsId, getCodewarsHonor);
codewarsExtra.set();

// Количество карточек для пунктов меню
function getCardsNumber(sectionId) {
  return document.querySelector(`#${sectionId} ul`).children.length;
}

const menuLinks = document.querySelectorAll('.intro__menu-link');

menuLinks.forEach(link => {
  const id = link.hash.slice(1);
  const extra = new ExtraInfo(link, id, getCardsNumber);
  extra.set();
});
