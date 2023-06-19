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

//Генератор случайных чисел
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Функциb для генерации объектов photo
const createPhoto = (id) => ({
  id: ++id,
  url: `photos/${id}.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(likesRange.MIN, likesRange.MAX),
  comments: createComments()
});
//функция для генерации comments
const createComment = (id) => ({
  id: ++id,
  avatar: `photos/${getRandomInteger(avatarRange.MIN,avatarRange.MAX)}.jpg`,
  message: message[getRandomInteger(0, message.length - 1)],
  name: names[getRandomInteger(0, names.length - 1)]
});

const createComments = () => Array.from({length: getRandomInteger(commentsRange.MIN,commentsRange.MAX)}, (_, index) => createComment(index));
//Заполняем массив с помощью метода .from и назначаем аргументом в createPhoto индекс создаваемого массива (счётчик)
const createPhotos = Array.from({length: PHOTO_COUNT}, (_, index) => createPhoto(index));
