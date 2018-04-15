(function() {

  "use strict"

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var frameCount = 0;


  var score = 0;
  var bestScore = 0;

  var isGameOver = false;

  var alienship = {

    size: 35,
    speed: 2,
    chaseSpeed: 1,
    maxAliens: 1,
    array: [],

    add: function() {
      let x = canvas.width + 40;
      let y = alienship.size + (Math.floor(Math.random() * canvas.height) - alienship.size);

      alienship.array.push({"x": x, "y": y, "speed": alienship.speed, "size": alienship.size});
    },

    render: function() {

      if (alienship.array.length < alienship.maxAliens && !isGameOver) {
        alienship.add();
      }

      let alien = new Image();
      alien.src = 'alienship.png';

      for (let i = 0; i < alienship.array.length; i++) {
        let currentAlien = alienship.array[i];

        ctx.drawImage(alien, currentAlien.x -= currentAlien.speed, currentAlien.y, currentAlien.size, currentAlien.size);

        if (currentAlien.x < -40) {
          alienship.array.pop();
        }
      }




    }

  }

  var ammoPack = {

    size: 15,
    speed: 2,
    maxNumber: 1,
    array: [],

    add: function() {
      let x = canvas.width + 40;
      let y = Math.floor(Math.random() * canvas.height);

      ammoPack.array.push({"x": x, "y": y, "speed": ammoPack.speed, "size": ammoPack.size});
    },

    render: function() {

      if (ammoPack.array.length < ammoPack.maxNumber && !isGameOver) {
        ammoPack.add();
      }

      let ammo = new Image();
      ammo.src = 'ammo-pack.png';

      for (let i = 0; i < ammoPack.array.length; i++) {
        let currentAmmo = ammoPack.array[i];

        ctx.drawImage(ammo, currentAmmo.x -= currentAmmo.speed, currentAmmo.y, currentAmmo.size, currentAmmo.size);

        if (currentAmmo.x < -40) {
          currentAmmo.speed = 0;
        }
      }

    }

  }

  var asteroid = {

    size1: 20,
    size2: 30,
    size3: 40,
    maxNumber: 4,
    array: [],

    add: function() {
      let x = canvas.width + 50;
      let y = Math.floor(Math.random() * canvas.height) - 20;
      let speed = Math.floor(Math.random() * 3) + 1;
      let size = Math.floor(Math.random() * 3) + 1;

      asteroid.array.push({"x": x, "y": y, "speed": speed, "size": size});

    },

    render: function() {

      while (asteroid.array.length !== asteroid.maxNumber && !isGameOver) {
        asteroid.add();
      }

      let theAsteroidLarge = new Image();
      theAsteroidLarge.src = 'asteroid.png';

      let theAsteroidMedium = new Image();
      theAsteroidMedium.src = 'asteroid-medium.png';

      let theAsteroidSmall = new Image();
      theAsteroidSmall.src = 'asteroid-small.png';

      for (let x = 0; x < asteroid.array.length; x++) {
        let newAsteroid = asteroid.array[x];

        if (newAsteroid.size == 1) {
          ctx.drawImage(theAsteroidSmall, newAsteroid.x -= newAsteroid.speed + 3, newAsteroid.y, asteroid.size1, asteroid.size1);
        } else if (newAsteroid.size == 2) {
          ctx.drawImage(theAsteroidMedium, newAsteroid.x -= newAsteroid.speed + 2, newAsteroid.y, asteroid.size2, asteroid.size2);
        } else {
          ctx.drawImage(theAsteroidLarge, newAsteroid.x -= newAsteroid.speed + 1, newAsteroid.y, asteroid.size3, asteroid.size3);
        }

        if (newAsteroid.x < -40) {
          asteroid.array.splice(x, 1);
        }
      }

    }

  }

  var control = {

    up: false,
    down: false,
    left: false,
    right: false,
    space: false,

    keyDown: function(evt) {
      switch (evt.keyCode) {
        case 37: control.left = true; break;
        case 39: control.right = true; break;
        case 38: control.up = true; break;
        case 40: control.down = true; break;
        case 32: control.space = true; break;
      }
      evt.preventDefault;
    },

    keyUp: function(evt) {
      switch (evt.keyCode) {
        case 37: control.left = false; break;
        case 39: control.right = false; break;
        case 38: control.up = false; break;
        case 40: control.down = false; break;
        case 32: control.space = false; break;
      }
      evt.preventDefault;
    }

  }

  var display = {

    width: canvas.width,
    height: canvas.height,
    color: 'black',
    stars: [],

    addStar: function() {
      let x = display.width + 10;
      let y = Math.floor(Math.random() * display.height);
      let speed = Math.floor(Math.random() * 2) + 1;

      display.stars.push({ "x": x, "y": y, "speed": speed });
    },

    render: function() {

      ctx.fillStyle = display.color;
      ctx.fillRect(0, 0, display.width, display.height);

      display.addStar();

      for (let star = 0; star < display.stars.length; star++) {
        if (display.stars[star].speed == 1) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(display.stars[star].x -= 1 * 0.7, display.stars[star].y, 1, 1);
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(display.stars[star].x -= 1 * 0.7, display.stars[star].y, 1, 1);
        }

        if (display.stars[star].x < 0) {
          display.stars.splice(star, 1);
        }
      }

    }

  }

  var life = {

    size: 15,
    speed: 2,
    maxNumber: 1,
    array: [],

    add: function() {
      let x = canvas.width + 40;
      let y = Math.floor(Math.random() * canvas.height);

      life.array.push({"x": x, "y": y, "speed": life.speed, "size": life.size});
    },

    render: function() {

      if (life.array.length < life.maxNumber && !isGameOver) {
        life.add();
      }

      let heart = new Image();
      heart.src = 'heart.png';

      for (let i = 0; i < life.array.length; i++) {
        let currentHeart = life.array[i];

        ctx.drawImage(heart, currentHeart.x -= currentHeart.speed, currentHeart.y, currentHeart.size, currentHeart.size);

        if (currentHeart.x < -40) {
          currentHeart.speed = 0;
        }
      }

    }

  }

  var spaceship = {

    width: 40,
    height: 40,
    x: 40,
    y: display.height / 2 - 20,
    oldX: 0,
    oldY: 0,
    velocityY: 5,
    velocityX: 4,
    lives: 3,

    render: function() {
      let theSpaceship = new Image();
      theSpaceship.src = 'spaceship.png';
      ctx.drawImage(theSpaceship, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
    },

    movement: function() {

      if (control.up) {
        spaceship.y -= spaceship.velocityY;
      } else if (control.down) {
        spaceship.y += spaceship.velocityY;
      }

      if (control.left) {
        spaceship.x -= spaceship.velocityX;
      } else if (control.right) {
        spaceship.x += spaceship.velocityX;
      }

      if (spaceship.y <= 0) {
        spaceship.y = 0;
      } else if (spaceship.y + spaceship.height >= canvas.height) {
        spaceship.y = canvas.height - spaceship.height;
      }

      if (spaceship.x <= 0) {
        spaceship.x = 0;
      } else if (spaceship.x + spaceship.width >= canvas.width) {
        spaceship.x = canvas.width - spaceship.width;
      }

    },

    // Ammo info
    hasAmmo: false,
    maxShot: 1,
    bulletSpeed: 6,
    ammo: [],
    shot: [],

  }

  // Drawing the game
  function renderGame() {

    display.render();
    spaceship.render();

  }

  // Game logic
  function gameLoop() {
    console.log(5000 % 2000);
    // Score and lives for player
    document.querySelector('.score').innerHTML = "<strong>Score:</strong> " + score;
    document.querySelector('.lives').innerHTML = "<strong>Lives:</strong> " + spaceship.lives;

    renderGame();
    spaceship.movement();

    if (display.stars.length > 1150) {

      frameCount++;

      asteroid.render();

      // Asteroid and spaceship collision detection
      for (let i = 0; i < asteroid.array.length; i++) {

        let check = asteroid.array[i];

        if (check.x + 30 >= spaceship.x &&
            check.x <= spaceship.x + spaceship.width - 10 &&
            check.y  + 30 >= spaceship.y &&
            check.y <= spaceship.y + spaceship.height) {

              asteroid.array.splice(i, 1);
              spaceship.lives--;

        }

        if (spaceship.hasAmmo && spaceship.shot.length !== 0) {

          let bullet = spaceship.shot[0];

          if (check.x + 30 >= bullet.x &&
              check.x <= bullet.x + bullet.width &&
              check.y  + 30 >= bullet.y &&
              check.y <= bullet.y + bullet.height) {

                asteroid.array.splice(i, 1);

                score = score + 25;

          }
        }

      }

      // Add alien spaceships
      if (frameCount > 1000) {

        alienship.render();

        // Have alien chase down player
        // Also alien collision detection
        for (let i = 0; i < alienship.array.length; i++) {

          let theAlien = alienship.array[i];

          // Chase down spaceship
          if (theAlien.y < spaceship.y) {
            theAlien.y += alienship.chaseSpeed;
          } else if (theAlien.y > spaceship.y) {
            theAlien.y -= alienship.chaseSpeed;
          }

          // Alien and player collision detection
          if (theAlien.y <= spaceship.y  + spaceship.height &&
              theAlien.y + 20 >= spaceship.y &&
              theAlien.x  + 20 >= spaceship.x &&
              theAlien.x <= spaceship.x + spaceship.width)  {

                alienship.array.pop();
                spaceship.lives--;

              }
        }

        if (frameCount >= 1500 && frameCount % 500 == 0 && alienship.speed < 4) {
          alienship.speed++;
        }

        if (frameCount % 3000 == 0) {
          alienship.chaseSpeed++;
        }

      }

      // Add hearts to gain extra life
      if (frameCount > 2000) {

        life.render();

        for (let i = 0; i < life.array.length; i++) {
          let theHeart = life.array[i];

          if (theHeart.x + theHeart.size >= spaceship.x &&
              theHeart.x <= spaceship.x + spaceship.width &&
              theHeart.y + theHeart.size >= spaceship.y &&
              theHeart.y <= spaceship.y + spaceship.height) {

                spaceship.lives++;
                theHeart.x = -30;

              }
        }

        if (frameCount % 2000 == 0 && life.array.length !== 0) {
          life.array.pop();
        }
      }

      // Add a ammo packs
      if (frameCount > 3000) {

        ammoPack.render();

        // AmmoPack collision and detection and addition to spaceship's ammo reserve
        for (let i = 0; i < ammoPack.array.length; i++) {
          let theAmmo = ammoPack.array[i];

          if (theAmmo.x + theAmmo.size >= spaceship.x &&
              theAmmo.x <= spaceship.x + spaceship.width &&
              theAmmo.y + theAmmo.size >= spaceship.y &&
              theAmmo.y <= spaceship.y + spaceship.height) {

                theAmmo.x = -30;

                spaceship.hasAmmo = true;

                for (let b = 0; b < 3; b++) {
                  spaceship.ammo.push({
                    "x": spaceship.x + spaceship.width,
                    "y": spaceship.y + spaceship.height/2,
                    "speed": spaceship.ammoSpeed,
                    "width": 10,
                    "height": 5
                  });
                }

          }
        }

        if (frameCount % 2000 == 1000 && ammoPack.array.length !== 0) {
          ammoPack.array.pop();
        }

        // If the player has ammo, they can shoot
        if (spaceship.hasAmmo && control.space &&
            spaceship.shot.length < spaceship.maxShot) {

              spaceship.ammo.pop();
              spaceship.oldX = spaceship.x;
              spaceship.oldY = spaceship.y;

              spaceship.shot.push({
                "x": spaceship.oldX + spaceship.width,
                "y": spaceship.oldY + spaceship.height/2,
                "speed": 6,
                "width": 8,
                "height": 3
              });

        }

        // Rendering the bullet and bullet collision
        for (let x = 0; x < spaceship.shot.length; x++) {
          let bullet = spaceship.shot[x];

          ctx.fillStyle = '#fff';
          ctx.fillRect(bullet.x += bullet.speed, bullet.y, bullet.width, bullet.height);

          if (bullet.x + bullet.width >= alienship.array[0].x &&
              bullet.x <= alienship.array[0].x + alienship.array[0].size &&
              bullet.y + bullet.height >= alienship.array[0].y &&
              bullet.y <= alienship.array[0].y + alienship.array[0].size) {

                spaceship.shot.pop();
                alienship.array.pop();

                score = score + 100;

          }

          if (bullet.x > canvas.width) {
            spaceship.shot.pop();
          }
        }

        if (spaceship.ammo.length == 0) {
          spaceship.hasAmmo = false;
        }

      }

      // Display ammo count
      let ammoCount = spaceship.ammo.length;

      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.fillText('Ammo: ' + ammoCount, 50, 50, 100, 50);

      // Increase score while alive
      if (spaceship.lives !== 0) {
        score++;
      }

      // Add one more asteroid to screen as time increases
      if (frameCount % 500 == 0 && asteroid.maxNumber < 8) {
        asteroid.maxNumber++;
      }

      // Detect death and if it's game over
      // Also check if new score is the best score
      if (spaceship.lives == 0) {

        isGameOver = true;

        if (score > bestScore) {
          bestScore = score;
        }

        if (bestScore > 0) {
          document.querySelector('.best-score').innerHTML = "<strong>Best Score:</strong> " + bestScore;
        }

        gameOver();
      }

    }

    requestAnimationFrame(gameLoop);
  }

  function gameOver() {

    // Removes things from screen
    asteroid.array = [];
    alienship.array = [];
    life.array = [];
    spaceship.shot = [];
    spaceship.ammo = [];
    ammoPack.array = [];

    // Resets the variables and restarts game
    document.addEventListener('click', function(evt){
      gameReset();
    });

  }

  function gameReset() {

    isGameOver = false;
    asteroid.maxNumber = 4;
    alienship.speed = 2;
    alienship.chaseSpeed = 1;
    score = 0;
    frameCount = 0;
    spaceship.lives = 3;

  }

  window.addEventListener('keydown', control.keyDown);
  window.addEventListener('keyup', control.keyUp);

  requestAnimationFrame(gameLoop);

})();
