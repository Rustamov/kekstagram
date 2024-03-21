// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const COMMENT_NAMES = [
  'Артём',
  'Сергей',
  'Мухучъ',
  'Муртуз',
  'Анатолий',
  'Владимир'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function checkStringLength(string, length) {
  return string.length <= length;
}

getRandomPositiveInteger(1, 10);
checkStringLength('Some text!', 10);

function getRandomArrayElement(array) {
  return array[getRandomPositiveInteger(0, array.length - 1)];
}


function generateComments() {
  const comments = [];

  for (let index = 0; index < getRandomPositiveInteger(1, 6); index++) {
    const id = index + 1;
    const comment = {
      id,
      avatar: `img/avatar-${id}.svg`,
      message: generateCommentMessage(),
      name: getRandomArrayElement(COMMENT_NAMES),
    };

    comments.push(comment);
  }

  function generateCommentMessage() {
    const messages = [];

    for (let index = 0; index < getRandomPositiveInteger(1, 2); index++) {
      let message = getRandomArrayElement(COMMENT_MESSAGES);

      while(messages.indexOf(message) !== -1) {
        message = getRandomArrayElement(COMMENT_MESSAGES);
      }

      messages.push(message);
    }

    return messages.join(' ');
  }

  return comments;
}

function generatePost(id) {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'Yes queen!! Splay it',
    likes: getRandomPositiveInteger(15, 200),

    comments: generateComments(),
  };
}

const users = [];
for (let index = 1; index <= 25; index++) {
  const id = index + 1;

  users.push(generatePost(id));
}
