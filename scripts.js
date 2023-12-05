let texts = [
  '1',
  '2',
  '3'
];

function getRandomElement(arr) {
  let randIndex = Math.floor(Math.random() * arr.length);
  console.log(randIndex);
  return arr[randIndex];
}

let button = document.querySelector('.randomiser__button');
let text = document.querySelector('.randomiser__text');

button.addEventListener('click', function () {
  let randomElement = getRandomElement(texts);
  text.textContent = randomElement;
});


$.getJSON(
  "https://docs.google.com/document/d/e/2PACX-1vTj_xPZTVOydGcE0ZjRG7YBaluUH11cWmgXEXxuE5P5q41YoQBnFdj-chY_ckyIqsekvQR11nH7Oq75/pub",
  function(data){
  console.log(data);
})
