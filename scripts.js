let texts = [
  '1',
  '2',
  '3'
];


function getRandomElement(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

const button = document.querySelector('.randomiser__button');
const text = document.querySelector('.randomiser__text');

button.addEventListener('click', function () {
  const randomElement = getRandomElement(texts);
  text.textContent = randomElement;
});

fetch('texts.txt')
.then(response => response.text())
.then(data => {
  texts = data.split(/\n\n\n/);
});




// Подключение к Google Drive API
gapi.client.load('drive', 'v3', () => {
  // Запрос на загрузку текста из Google-документа
  gapi.client.drive.files.export({
    fileId: '1Mx7S3CttoFEIULEPtBBAvXcWcJDgweQiAdqQfPC1x-E',
    mimeType: 'text/plain'
  })
  .then(response => {
    var text = response.body;
    // Создание локального текстового файла
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'texts.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  })
  .catch(err => {
    console.error('Error loading text from Google Doc', err);
  });
});
