const canvas= document.querySelector('canvas');
const c= canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;

//SHOOTER
class Player{
    constructor(x,y,radius,colour){
        this.x= x;
        this.y=y;
        this.radius=radius;
        this.colour=colour;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.fillStyle = this.colour;
        c.fill();
    }
}

// PROJECTILE
class Projectile {
    constructor(x,y,radius,colour,velocityX,velocityY){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.colour=colour;
        this.velocityX=velocityX;
        this.velocityY=velocityY;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.fillStyle = this.colour;
        c.fill();
    }
    velo_update(){
        this.draw();
        this.x=this.x+3*this.velocityX;
        this.y=this.y+3*this.velocityY;
    }
}

//ENEMY
class Enemy{
    constructor(x,y,radius,colour){
        this.x= x;
        this.y=y;
        this.radius=radius;
        this.colour=colour;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.fillStyle = this.colour;
        c.fill();
    }

}

const x=canvas.width /2;
const y= canvas.height -(canvas.height*0.1);
//color
const colorPalatte =['#ff2079','#04d9ff','#ebe91b','#d83682','#ff0000','#39ff14','#aa00ff'];
var colorpicker =Math.floor(Math.random()*7);
let colour=colorPalatte[colorpicker];

//player
let player=new Player(x,y,30,colour);
player.draw();

//enemy making hehe
const enemys =[];
makingEnemy();

function makingEnemy(){
    var noof_balls = innerWidth / (2 * 30);
    for (var i = 0; i <= noof_balls; i++) {
        var enemy_colorpicker = Math.floor(Math.random() * 7);
        let enemy_colour = colorPalatte[enemy_colorpicker];
        enemys.push( new Enemy(30*(1+2*i),30,30,enemy_colour));
    }
}

const projectiles =[];

//Projectile calling function
function projectileAni(){
    requestAnimationFrame(projectileAni); 
    c.clearRect(0,0,innerWidth,innerHeight);  
    player.draw(); 
    for(const enemy of enemys){
        enemy.draw();
    }
    for(const projectile of projectiles){
        projectile.velo_update();
    }
    enemys.forEach((enemy, index) => {
        projectiles.forEach((proj, projIndex) => {
            const dist = Math.hypot(proj.x - enemy.x, proj.y - enemy.y);
            if(proj.colour==enemy.colour){
                if (dist < 1 + 30 + 10) {
                    enemys.splice(index, 1);
                    projectiles.splice(projIndex, 1);
                }
            }else{
                if(dist<1+30+10){
                    projectiles.splice(projIndex, 1);
                }
            }
        })
    })
    
}

//click event projectile generator
window.addEventListener('click',(event)=>{
    const angle=Math.atan2(event.clientY-y,event.clientX-x)
    projectiles.push( new Projectile(x,y,10 ,colour,Math.cos(angle),Math.sin(angle)))
    colorpicker =Math.floor(Math.random()*7);
    colour=colorPalatte[colorpicker];
    player=new Player(x,y,30,colour);
})

// let player2=new Player(x+40,y,20,colour);
//draw


projectileAni();