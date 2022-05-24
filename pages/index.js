/**
 * Получает и устанавливает допинформацию для ссылок
 * @param {function} func - Функция, которая получает информацию
 * @param {*} userId - Параметр пользователя для передачи функции
 * @param {*} element - Элемент, в который нужно добавить ниформацию
 */
async function setExtraInfo(func, userId, element) {
  const dataProperty = 'content';
  element.dataset[dataProperty] = '...';

  try {
    const data = await func(userId);
    element.dataset[dataProperty] = data;
  } catch (error) {
    console.log(error);
  }
}

// Github
async function getGithubRepsNumber(userId) {
  return fetch(`https://api.github.com/users/${userId}`)
    .then(res => {
      if (res.ok) return res.json();
      return new Error(res.status);
    })
    .then(res => {
      return res.public_repos;
    })
}

const githubLink = document.querySelector('.add-extra_type_github');
const githubId = githubLink.href.split('/').reverse()[0];

setExtraInfo(getGithubRepsNumber, githubId, githubLink);


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

setExtraInfo(getStackoverflowReputation, stackoverflowId, stackoverflowLink);

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

setExtraInfo(getCodewarsHonor, codewarsId, codewarsLink);









