import {getRandomInteger} from './util.js';

const PHOTO_COUNT = 25;
const likesRange = {
  MIN: 15,
  MAX: 200
};
const avatarRange = {
  MIN: 1,
  MAX: 6
};
const commentsRange = {
  MIN: 0,
  MAX: 30
};
const messagesRange = {
  MIN: 1,
  MAX: 2
};
//Массив описаний
const description = ['На даче', 'У моря', 'На работе', 'В кино','На прогулке'];

const message = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


const names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];


const createMsg = () => {
  let messages = [];
  while (messages.length < getRandomInteger(messagesRange.MIN, messagesRange.MAX)) {
    const indexMsg = getRandomInteger(0,message.length - 1);
    messages.push(message[indexMsg]);
    messages = messages.filter((v, i, arr) => arr.indexOf(v) === i);
  }
  return messages.toString().replaceAll(',', ' ');
};

const createComment = (id) => ({
  id: id,
  avatar: `photos/${getRandomInteger(avatarRange.MIN,avatarRange.MAX)}.jpg`,
  message: createMsg(),
  name: names[getRandomInteger(0, names.length - 1)]
});

const createComments = () => Array.from({length: getRandomInteger(commentsRange.MIN,commentsRange.MAX)}, (_, index) => createComment(index + 1));


const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(likesRange.MIN, likesRange.MAX),
  comments: createComments()
});

const createPhotos = () => Array.from({length: PHOTO_COUNT}, (_, index) => createPhoto(index + 1));
const thumbnailsList = createPhotos();

export {thumbnailsList};
