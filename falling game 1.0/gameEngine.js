const canvas = document.querySelector("canvas#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

keyboard = canvas.width / 2;

window.addEventListener("keydown", evt => {
    if (evt.key == "ArrowRight" || evt.key == "D" || evt.key == "d") {
        if (keyboard < canvas.width) {
            keyboard += player.getIncroment();
        }
    }
    if (evt.key == "ArrowLeft" || evt.key == "A" || evt.key == "a") {
        if (keyboard > 1) {
            keyboard -= player.getIncroment();
        }
    }
});






class Game {
    simpPower = 0;
    gameFrame = 0;
    scoreP = document.querySelector("p.score");

    bonkSprite = new Image();
    onlyfansSprite = new Image();
    playerSprite = new Image();

    setSprites() {
        this.bonkSprite.src = "bonk.png";
        this.onlyfansSprite.src = "onlyfans.png";
        this.playerSprite.src = "player.png";
    }

    fallings() {
        if (this.gameFrame % 75 == 0) {
            array.push(new ScoreElement(((Math.random() * 4) < 1) ? 0 : 1));
        }
    }
}






class Player {
    #x = canvas.width / 2;
    #y = canvas.height - 50;
    #radius = 40;
    #incroment = 10;

    playerX() {return this.#x;}
    playerY() {return this.#y;}
    getIncroment() {return this.#incroment;}
    getRadius() {return this.#radius;}

    draw() {
        ctx.drawImage(game.playerSprite, this.#x - this.#radius, this.#y - this.#radius, 2 * this.#radius, 2 * this.#radius);
    };
    
    update() {
        let dx = this.#x - keyboard;

        if (keyboard != this.#x) {
            this.#x -= dx / 5;
            this.#incroment += 0.2;

            if (dx > -10 && dx < 10) {
                this.#incroment = 15;
            }
        }
    }
}






class ScoreElement {
    constructor(type) {
        this.x = Math.random() * (canvas.width - 50) + 25;
        this.speed = Math.random() * 2 + 3;
        this.y = 0;
        this.distance;
        this.counted = false;
        this.type = type;
    }

    #radius = 20;
    getRadius() {return this.#radius;}

    draw() {
        if (this.type == 1) {
            ctx.drawImage(game.onlyfansSprite, this.x - this.#radius, this.y - this.#radius, 2 * this.#radius, 2 * this.#radius);
        } else {
            ctx.drawImage(game.bonkSprite, this.x - this.#radius, this.y - this.#radius, 2 * this.#radius, 2 * this.#radius);
        }
    }

    update(index) {
        if (this.y > canvas.height && this.counted == false) {
            array.splice(index, 1);
            this.counted = true;
            return;
        }

        if (this.y < canvas.height + 20 && this.counted == false) {
            this.y += this.speed;

            const dx = this.x - player.playerX();
            const dy = this.y - player.playerY();

            this.distance = Math.sqrt(dx * dx + dy * dy);

            if (this.distance < this.#radius + player.getRadius()) {
                array.splice(index, 1);
                this.counted = true;

                if (this.type === 0) {
                    game.simpPower = 0;
                } else {
                    game.simpPower++;
                }
                
                game.scoreP.innerHTML = `Simp Power: ${game.simpPower}`;
                console.log(game.simpPower);
            }
        }
    }
}






function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.gameFrame++;
    game.fallings();
    player.draw();
    player.update();

    array.forEach((el, i) => {
        el.draw();
        el.update(i);
    })

    requestAnimationFrame(animate);
}






let game = new Game();
game.setSprites();

let player = new Player();
let array = [];

animate();