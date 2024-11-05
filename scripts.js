//рандомайзер текстов по клику на кнопку
let texts = [];
let remainingTexts = []; // Массив для невыданных элементов

function getRandomElement(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

const button = document.querySelector('.randomiser__button');
const text = document.querySelector('.randomiser__text');

button.addEventListener('click', function () {
  if (remainingTexts.length === 0) {
    // Если невыданные элементы закончились, начинаем заново
    remainingTexts = [...texts]; // Копируем все элементы в массив невыданных
  }

  // Выбор случайного элемента из невыданных
  const randomIndex = Math.floor(Math.random() * remainingTexts.length);
  const randomElement = remainingTexts[randomIndex];

  // Удаляем выданный элемент из массива невыданных
  remainingTexts.splice(randomIndex, 1);
  
  text.textContent = randomElement; // Отображаем случайный элемент
});

// Загрузка текстов из файла
fetch('texts.txt')
  .then(response => response.text())
  .then(data => {
    texts = data.split(/(?:\r?\n){3}/);
    remainingTexts = [...texts]; // Инициализируем массив невыданных элементов
    
    // Устанавливаем случайный элемент в текст при загрузке страницы
    const initialRandomElement = getRandomElement(remainingTexts); // Изменено на remainingTexts
    text.textContent = initialRandomElement;

    // Удаляем начальный элемент из массива невыданных
    const initialIndex = remainingTexts.indexOf(initialRandomElement);
    if (initialIndex !== -1) {
      remainingTexts.splice(initialIndex, 1);
    }
  });




//вращение шарика

class Sphere {
	constructor({
		container,
		radius = 100,
		polygonsPerMeridian = 15,
		texture = null,
		rotationTime = 1000,
	}) {
		this.container = container;
		this.radius = radius;
		this.polygonsPerMeridian = polygonsPerMeridian;
		this.texture = texture;
		this.rotationTime = rotationTime;
		this.diameter = radius * 2;
		this.polygonSize = Math.ceil(radius * (2 * Math.tan(Math.PI / ((polygonsPerMeridian - 1) * 2))));
		this.parts = {
			sphere: null,
			meridians: [],
			polygons: []
		};
		this.currentAngle = 0; // Начальный угол
		this.isAnimating = false; // Флаг для отслеживания анимации

		this.renderSphere();
	}

	createSphereElement() {
		let sphere = document.createElement("div");
		sphere.style.position = "relative";
		sphere.style.transformStyle = "preserve-3d";
		sphere.style.width = `${this.diameter}px`;
		sphere.style.height = `${this.diameter}px`;
		this.parts.sphere = sphere;
		return sphere;
	}

	createMeridianElement() {
		let meridian = document.createElement("div");
		meridian.style.transformStyle = "preserve-3d";
		this.parts.meridians.push(meridian);
		return meridian;
	}

	createPolygonElement(m, p) {
		let x = this.radius * Math.cos((p * (Math.PI * 2)) / (this.polygonsPerMeridian - 1));
		let scaleXK = (1 - (.3 * (100 - (((this.radius - x) * 100) / (this.radius * 2))) / 100)); // Увеличиваем коэффициент сжатия ближе к полюсам

		let polygon = document.createElement("div");
		polygon.style.position = "absolute";
		polygon.style.margin = "auto";
		polygon.style.backfaceVisibility = "hidden";
		polygon.style.backgroundImage = `url('${this.texture}')`;
		polygon.style.backgroundPosition = `${-m * this.polygonSize}px ${-(p * this.polygonSize)}px`;
		polygon.style.backgroundSize = `${((this.polygonsPerMeridian - 1) * 2) * this.polygonSize}px ${this.polygonsPerMeridian * this.polygonSize}px`;
		polygon.style.backgroundColor = `rgb(${0}, ${0}, ${(p * 255) / this.polygonsPerMeridian})`;
		polygon.style.transformOrigin = `center center ${-this.radius}px`;
		polygon.style.width = `${this.polygonSize}px`;
		polygon.style.height = `${this.polygonSize}px`;
		polygon.style.transition = "transform 1s ease-in-out";
		polygon.style.transform = `translateX(${((this.diameter / 2) - (this.polygonSize / 2))}px) translateY(${((this.diameter / 2) - (this.polygonSize / 2))}px) translateZ(${this.radius}px) rotateY(${(m * (180 * 2)) / ((this.polygonsPerMeridian - 1) * 2)}deg) rotateZ(${((p * 180) / (this.polygonsPerMeridian - 1)) - 90}deg) rotate3d(0, 1, 0, 90deg) scaleX(${scaleXK})`;
		return polygon;
	}

	attachClickEvent(sphere) {
		sphere.addEventListener("click", () => this.startAnimation());
	}

	startAnimation() {
		if (this.isAnimating) return; // Если анимация уже идет, выходим
		this.isAnimating = true; // Устанавливаем флаг анимации

		// Вращение сферы
		this.currentAngle += 900; // Увеличиваем текущий угол
		this.parts.sphere.style.transition = `transform ${this.rotationTime / 3000}s ease-out`;
		this.parts.sphere.style.transform = `translateX(50px) rotateY(${this.currentAngle}deg)`; // Обновляем угол поворота и перемещение вправо

		// Возврат сферы на место через 1 секунду
		setTimeout(() => {
			this.parts.sphere.style.transform = `translateX(0) rotateY(${this.currentAngle}deg)`; // Возвращаем обратно
			this.isAnimating = false; // Сбрасываем флаг анимации
		}, this.rotationTime/4); // Возвращаем обратно
	}

	renderSphere() {
		let sphere = this.createSphereElement();
		for (let m = 0; m < ((this.polygonsPerMeridian - 1) * 2); m++) {
			let meridian = this.createMeridianElement();
			for (let p = 0; p < this.polygonsPerMeridian; p++) {
				let polygon = this.createPolygonElement(m, p);
				this.parts.polygons.push(polygon);
				meridian.appendChild(polygon);
				sphere.appendChild(meridian);
			}
		}
		this.container.appendChild(sphere);
		this.attachClickEvent(sphere);
	}

	setTexture(texture) {
		this.parts.polygons.forEach(item => item.style.backgroundImage = `url('${texture}')`);
	}
}

new Sphere({
	container: document.getElementById("ball"),
	radius: 30,
	polygonsPerMeridian: 22,
	texture: "./images/sphere_texture_2x1.png",
	rotationTime: 1500,
});
