canvas = document.getElementById('mkad');
ctx = canvas.getContext('2d');
let raf;
let runner = {
    x: 10,
    y: 140,
    w: 10,
    h: 10,
    vx: 3,
    color: 'red',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }
}
let button_arrow = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
}

let up, left, down, right = false;

let palka = {
    x: 100,
    y: 1,
    w: 10,
    h: 50,
    vy: 1,
    count: 0,
    speed: 1,
    color: 'black',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }
}

let arr = [];
for (let i = 0; i < 14; i++) {
    palka.x += 20;
    palka.y = Math.random() * 300;
    palka.vy = (Math.random() + 1) * 0.5;
    arr.push({...palka});
   
}
let death = {
    count: 0,
    draw: function() {
        ctx.fillText(`Death: ${this.count}`, 10,10  )

    }
};
let level = {
    count: 0,
    draw: function() {
        ctx.fillText(`Level: ${this.count}`, 10, 30)
    }
}
function touch(arr) {
    for (elem of arr) {
       
        if (( runner.x <= elem.x + elem.w && runner.x > elem.x || runner.x + runner.w >= elem.x && runner.x + runner.w < elem.x + elem.w) && runner.y >= elem.y && runner.y < elem.y + elem.h) {
            death.count += 1;
            runner.x = 10;
            runner.y = 140;
        }

    }
}
function pokazi_popy() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    touch(arr);
    death.draw();
    level.draw();
    if (left === true) {
        runner.x -= runner.vx;
    }  
    if (up === true) {
        runner.y -= runner.vx
    }  
    if (down === true) {
        runner.y += runner.vx
    }  
    if (right === true) {
        runner.x += runner.vx
    }
    runner.draw();
    for (elem of arr) {
        if (elem.y > 300) {
            elem.y = -150;
        }
        elem.draw();
        elem.y += elem.vy;
    }
    if (level.count > 10) {
        ctx.clearRect(0,0,canvas.width, ctx.canvas.height);
        ctx.font =  'bold 54px serif';
        ctx.fillText('КОНГРАТЮЛЕЙШЕНС', 0,170);
        
    }
    raf = window.requestAnimationFrame(pokazi_popy)
}


pokazi_popy();
window.addEventListener('keydown', function (event) {
   
    if (event.keyCode == button_arrow.left) {
       left = true;
    } else if (event.keyCode == button_arrow.up) {
        up = true;
    } else if (event.keyCode == button_arrow.right) {
        right = true;
    } else if (event.keyCode == button_arrow.down) {
        down = true;
    }
    if (runner.x > 400) {
        runner.x = 10;
        runner.y = 140;
        level.count +=1;
        for( elem of arr) {
            elem.vy += 1;
        }
    }

    
 });
 window.addEventListener('keyup', function (event) {
    if (event.keyCode == button_arrow.right) {
        right = false;
    } else if (event.keyCode == button_arrow.down) {
        down = false;
    } else if (event.keyCode == button_arrow.up) {
        up = false;
    } else if (event.keyCode == button_arrow.left) {
        left = false;
    }
    
    
    
 });
