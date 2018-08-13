const musicData = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: ` Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

musicData.forEach((item) => {
  item.result = () => false;
});

const getRandomData = (dataAnswers, indexes, title, gameType) => {
  const answers = [];
  dataAnswers.forEach((answer) => {
    answers.push(Object.assign({}, answer));
  });

  const data = {
    gameType,
    title,
    answers,
    correct: []
  };

  data.answers.forEach((item) => {
    item.result = () => false;
    for (let index of indexes) {
      if (item === answers[index]) {
        data.correct.push(item);
        item.result = () => true;
      }
    }
  });

  return data;
};

const gameData = [
  getRandomData(musicData.slice().splice(0, 3), [2], `Кто исполняет эту песню?`, `artist`),
  getRandomData(musicData.slice().splice(1, 4), [0, 1], `Выберите Country треки? 2`, `genre`),
  getRandomData(musicData.slice().splice(3, 3), [0], `Кто исполняет эту песню? 3`, `artist`),
  getRandomData(musicData.slice().splice(2, 4), [1, 2], `Выберите Pop треки? 4`, `genre`),
  getRandomData(musicData.slice().splice(2, 3), [2], `Кто исполняет эту песню? 5`, `artist`),
  getRandomData(musicData.slice().splice(0, 4), [0, 2], `Выберите Country треки? 6`, `genre`),
  getRandomData(musicData.slice().splice(3, 3), [1], `Кто исполняет эту песню? 7`, `artist`),
  getRandomData(musicData.slice().splice(0, 4), [0, 3], `Выберите R&B треки? 8`, `genre`),
  getRandomData(musicData.slice().splice(2, 3), [1], `Кто исполняет эту песню? 9`, `artist`),
  getRandomData(musicData.slice().splice(2, 4), [0, 3], `Выберите Electronic треки? 10`, `genre`)
];

export const getCurrentDataGame = (index) => gameData[index];
