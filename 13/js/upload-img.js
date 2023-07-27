const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const previewEffects = form.querySelectorAll('.effects__preview');


const showPreviewImg = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    previewEffects.forEach((previewEffect) =>{
      previewEffect.style.backgroundImage = `url(${preview.src})`;
    });
  }
};

export {showPreviewImg};
