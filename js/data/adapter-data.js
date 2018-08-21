import {QuestionType} from './game-data';

const getAnswersArtist = (data, item) => {
  item.answers.forEach((answer) => {
    const adaptAnswer = {
      artist: answer.title,
      image: answer.image.url,
      name: answer.title,
      src: item.src
    };

    if (answer.isCorrect) {
      adaptAnswer.result = () => true;
      data.correct.push(adaptAnswer);
    } else {
      adaptAnswer.result = () => false;
    }

    data.answers.push(adaptAnswer);
  });
};

const getGenreArtist = (data, item) => {
  item.answers.forEach((answer) => {
    const adaptAnswer = {
      src: answer.src,
      genre: answer.genre
    };

    if (answer.genre === item.genre) {
      adaptAnswer.result = () => true;
      data.correct.push(adaptAnswer);
    } else {
      adaptAnswer.result = () => false;
    }

    data.answers.push(adaptAnswer);
  });
};

export const adapterData = (serverData) => {
  const adaptData = [];
  serverData.forEach((item) => {
    const itemData = {
      gameType: item.type,
      title: item.question,
      answers: [],
      correct: []
    };

    if (item.type === QuestionType.ARTIST) {
      getAnswersArtist(itemData, item);
    }

    if (item.type === QuestionType.GENRE) {
      getGenreArtist(itemData, item);
    }

    adaptData.push(itemData);
  });

  return adaptData;
};
