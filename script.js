'use strict';

const urlGet = 'dbHeroes.json';
const cardsWrapper = document.querySelector('.cards-wrapper');
const cards = document.querySelector('.cards');
const select = document.getElementById('film');

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getCards = (select) => {
  getData(urlGet).then((data) => {
    if (select) {
      if (select === 'Movie selection') {
        renderCards(data);
      } else {
        let filterData = data.filter((item) => item.movies?.includes(select));
        renderCards(filterData);
      }
    } else {
      renderCards(data);
    }
    renderSelect(data, select);
  });
};

const renderCards = (data) => {
  cardsWrapper.innerHTML = '';

  data.forEach((item) => {
    const div = document.createElement('div');
    const infoWrapper = document.createElement('div');
    const divName = document.createElement('div');
    const divGender = document.createElement('div');
    const divStatus = document.createElement('div');
    const divActors = document.createElement('div');
    const ulMovies = document.createElement('ul');

    div.classList.add('card');
    infoWrapper.classList.add('info-wrapper');
    ulMovies.classList.add('movies');
    div.innerHTML = `<img class= "card-photo" src="${item.photo}" alt = "photo">`;
    divName.innerHTML = `<span><b>Name:</b> ${item.name}</span>`;
    infoWrapper.append(divName);

    if (item.realName) {
      const divRealName = document.createElement('div');
      divRealName.innerHTML = `<span><b>Real name:</b> ${item.realName}</span>`;
      infoWrapper.append(divRealName);
    }
    if (item.species) {
      const divSpecies = document.createElement('div');
      divSpecies.innerHTML = `<span><b>Scpecies:</b> ${item.species}</span>`;
      infoWrapper.append(divSpecies);
    }
    divGender.innerHTML = `<span> <b>Gender:</b> ${item.gender}</span>`;
    if (item.citizenship) {
      const divCitizenship = document.createElement('div');
      divCitizenship.innerHTML = `<span><b>Citizenship:</b> ${item.citizenship}</span>`;
      infoWrapper.append(divCitizenship);
    }
    if (item.birthDay) {
      const divBirthDay = document.createElement('div');
      divBirthDay.innerHTML = `<span><b>Year of birth:</b> ${item.birthDay}</span>`;
      infoWrapper.append(divBirthDay);
    }
    if (item.deathDay) {
      const divDeathDay = document.createElement('div');
      divDeathDay.innerHTML = `<span><b>Year of death:</b> ${item.deathDay}</span>`;
      infoWrapper.append(divDeathDay);
    }
    divStatus.innerHTML = `<span><b>Status:</b> ${item.status}</span>`;
    divActors.innerHTML = `<span><b>Actors:</b> ${item.actors}</span>`;
    ulMovies.innerHTML = `<span> <b>Movies:</b></span>`;
    if (item.movies) {
      item.movies.forEach((mov) => {
        const liMovies = document.createElement('li');
        liMovies.innerHTML = `${mov}`;
        liMovies.classList.add('item-mov');
        ulMovies.append(liMovies);
      });
    } else {
      ulMovies.innerHTML = `<span> Movies: none</span>`;
    }

    cardsWrapper.append(div);
    div.append(infoWrapper);
    infoWrapper.append(divGender);
    infoWrapper.append(divStatus);
    infoWrapper.append(divActors);
    infoWrapper.append(ulMovies);
  });
};

const renderSelect = (data, selectValue) => {
  select.innerHTML = '';
  const optionStart = document.createElement('option');
  optionStart.value = 'Movie selection';
  optionStart.textContent = `Movie selection`;
  select.append(optionStart);

  let arr = [];

  data.forEach((item) => {
    if (item.movies) {
      item.movies.forEach((mov) => {
        arr.push(mov);
      });
    }
  });
  arr = arr.filter((el, ind) => ind === arr.indexOf(el));

  arr.forEach((movie) => {
    const option = document.createElement('option');
    option.value = movie;
    option.textContent = movie;
    select.append(option);
  });

  if (selectValue) {
    select.value = selectValue;
  }
};

select.addEventListener('change', () => {
  if (select.value) {
    getCards(select.value);
  }
});

getCards();
