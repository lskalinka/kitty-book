const line = document.querySelector('#line');
const kitty = document.querySelector('.kitty');
kitty.style.backgroundImage = "url('./images/kitty.png')";


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
            line: line,
            meridians: [],
            polygons: []
        };
        this.currentAngle = 0; // Начальный угол
        this.isAnimating = false; // Флаг для отслеживания анимации
        this.renderSphere();
        this.attachHoverEvents(); // Подключаем события ховера
    }

    createSphereElement() {
        let sphere = document.createElement("div");
        sphere.classList.add("sphere-transorm");
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
        let scaleXK = (1 - (.3 * (100 - (((this.radius - x) * 100) / (this.radius * 2))) / 100));
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
        kitty.addEventListener("click", () => this.startAnimation());
    }

    attachHoverEvents() {
        kitty.addEventListener('mouseenter', () => {
            if (!this.isAnimating) {
                kitty.style.backgroundImage = "url('./images/kittypaw.png')";
                kitty.style.left = '7px'; // Изменение позиции при наведении
            }
        });

        kitty.addEventListener('mouseleave', () => {
            if (!this.isAnimating) {
                kitty.style.backgroundImage = "url('./images/kitty.png')";
                kitty.style.left = '10px'; // Возврат к исходной позиции
            }
        });

        this.parts.sphere.addEventListener('mouseenter', () => {
            if (!this.isAnimating) {
                kitty.style.backgroundImage = "url('./images/kittypaw.png')";
                kitty.style.left = '7px'; // Изменение позиции при наведении
            }
        });

        this.parts.sphere.addEventListener('mouseleave', () => {
            if (!this.isAnimating) {
                kitty.style.backgroundImage = "url('./images/kitty.png')";
                kitty.style.left = '10px'; // Возврат к исходной позиции
            }
        });
    }

    startAnimation() {
        if (this.isAnimating) return; // Если анимация уже идет, выходим
        this.isAnimating = true; // Устанавливаем флаг анимации
        kitty.style.backgroundImage = "url('./images/kitty.png')"; // Устанавливаем изображение kitty
        kitty.style.left = '10px'; // Возврат к исходной позиции перед анимацией

        this.currentAngle += 360; // Увеличиваем текущий угол
        this.parts.sphere.style.transition = `transform ${this.rotationTime / 4000}s linear`;
        this.parts.line.style.transition = `transform ${this.rotationTime / 4000}s linear`; // Добавляем переход для line

        // Сначала перемещение вправо на 80 пикселей и подъем на 8 пикселей
        this.parts.sphere.style.transform = `translate(80px, -8px) rotateY(${this.currentAngle}deg)`;
        this.parts.line.style.transform = `rotate(${-55}deg) translateY(27px)`;

        // Используем setTimeout для плавного перехода на следующую анимацию
        setTimeout(() => {
            this.currentAngle += 200; // Увеличиваем текущий угол
            this.parts.sphere.style.transform = `translate(0, 0) rotateY(${this.currentAngle}deg)`;
            this.parts.line.style.transform = `rotate(${0}deg) translateY(0)`;

            setTimeout(() => {
                this.currentAngle += 180; // Увеличиваем текущий угол
                this.parts.sphere.style.transform = `translate(-45px, -6px) rotateY(${this.currentAngle}deg)`;
                this.parts.line.style.transform = `rotate(${34}deg) translateY(15px)`;

                // Добавляем перемещение вправо на 10 пикселей перед возвратом
                setTimeout(() => {
                    this.currentAngle += 100; // Увеличиваем текущий угол
                    this.parts.sphere.style.transform = `translate(25px, -2px) rotateY(${this.currentAngle}deg)`;
                    this.parts.line.style.transform = `rotate(${-17}deg) translateY(6px)`;

                    // Возвращаем обратно на исходные координаты
                    setTimeout(() => {
                        this.currentAngle += 60; // Увеличиваем текущий угол
                        this.parts.sphere.style.transform = `translate(0, 0) rotateY(${this.currentAngle}deg)`;
                        this.parts.line.style.transform = `rotateY(${0}deg) translateY(0)`;
                        this.isAnimating = false; // Сбрасываем флаг анимации
                        // Проверяем состояние kitty после завершения анимации
                        this.updateKittyState();
                    }, this.rotationTime / 4);
                }, this.rotationTime / 4);
            }, this.rotationTime / 4);
        }, this.rotationTime / 4);
    }

    updateKittyState() {
        if (this.isAnimating) {
            // Если анимация идет, kitty в обычном состоянии
            kitty.style.backgroundImage = "url('./images/kitty.png')";
            kitty.style.left = '10px'; // Возврат к исходной позиции
        } else {
            // Если анимация не идет, проверяем состояние ховера
            if (this.parts.sphere.matches(':hover') || kitty.matches(':hover')) {
                kitty.style.backgroundImage = "url('./images/kittypaw.png')";
                kitty.style.left = '7px'; // Изменение позиции при наведении
            } else {
                kitty.style.backgroundImage = "url('./images/kitty.png')";
                kitty.style.left = '10px'; // Возврат к исходной позиции
            }
        }
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
    polygonsPerMeridian: 14,
    texture: "./images/sphere_texture.png",
    rotationTime: 1000,
});
