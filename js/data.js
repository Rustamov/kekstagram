import {getRandomPositiveInteger} from './util.js';

const commentNames = [
  'Артём',
  'Сергей',
  'Мухучъ',
  'Муртуз',
  'Анатолий',
  'Владимир'
];

const commentLines = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Отдыхаем... #chill #relax #group #photo',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка! #wow #car #carwow #drive',
  '#fun #party #cool #young',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Норм',
];

const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];


const generateComments = () => {
  const comments = [];

  const generateCommentMessage = () => {
    const messages = [];

    for (let index = 0; index < getRandomPositiveInteger(1, 2); index++) {
      let message = getRandomArrayElement(commentLines);

      while(messages.indexOf(message) !== -1) {
        message = getRandomArrayElement(commentLines);
      }

      messages.push(message);
    }

    return messages.join(' ');
  };

  for (let index = 0; index < getRandomPositiveInteger(6, 16); index++) {
    const id = index + 1;
    const comment = {
      id,
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: generateCommentMessage(),
      name: getRandomArrayElement(commentNames),
    };

    comments.push(comment);
  }

  return comments;
};

const createPicture = (id) =>
  ({
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomPositiveInteger(15, 200),

    comments: generateComments(),
  });


const getPictures = () =>
  Array.from({ length: 25 }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );


export {getPictures};
