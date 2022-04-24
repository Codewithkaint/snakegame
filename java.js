let last = 0;
let speed = 2;
let num=0;


let input ={x:1,y:0};
let lastinput ={x:1,y:0};
let exp = 2;
let score=document.querySelector('.sco')
let box = document.querySelector('#main')
let snakebody = [
    { x: 8, y: 8 },
 
    

  
]


let food=randompos();
do{
    user=prompt("ENTER NAME","GUEST")
}while(!user);
function main(ctime) {
    window.requestAnimationFrame(main)
    let sec = (ctime - last) / 1000;
    if (sec < (1 / speed)) return
    last = ctime;
    draw()
    update()
}
window.requestAnimationFrame(main)
function draw() {
    drawsnake()
    drawfood()
}
function update() {
    snakemove()
    snkefood()
}





function drawsnake() {
    box.innerHTML="";

    snakebody.forEach((e,index) => {
        let div = document.createElement('div');
        div.style.gridColumnStart = e.x
        div.style.gridRowStart = e.y
        if (index === 0) {div.style.transform='rotate(0deg)'
            div.classList.add('head')
            if(input.x===1){
                div.style.transform='rotate(-90deg)'
            }
            else if(input.x===-1){
                div.style.transform='rotate(90deg)'
            }
            else if(input.y===1){
                div.style.transform='rotate(0deg)'
            }
            else if(input.y===-1){
                div.style.transform='rotate(180deg)'
            }
        }
        else {
            div.classList.add('body')
        }
        box.appendChild(div);

    });

}
function drawfood(){
    div=document.createElement('div');
    div.classList.add('fod');
    div.style.gridColumnStart=food.x;
    div.style.gridRowStart=food.y;
    box.appendChild(div);
}

function snakemove(){  
     input=getdir()
    for(i=snakebody.length-2;i>=0;i--){
        snakebody[i+1]={...snakebody[i]}
    }
    snakebody[0].x+=input.x;
    snakebody[0].y+=input.y;
 checks()
}


        

  
function getdir(){
    window.addEventListener('keydown',e=>{
        switch(e.key){
            case 'ArrowUp':
                if(lastinput.y==1) break
                    input={x:0,y:-1}
            break;
        
            case 'ArrowDown':   if(lastinput.y==-1) break
                input={x:0,y:1}
            break;
        
            case 'ArrowLeft':   if(lastinput.x==1) break
                input={x:-1,y:0}
            break;
        
            case 'ArrowRight':   if(lastinput.x==-1) break
                input={x:1,y:0}
            break;
            default:  input={x:0,y:0}
            
        }
    })
    lastinput=input

    return input;
    
}
function snkefood(){
    if(eat()){
        console.log("EATED");
        num=num+10;
        let nwe=`SCORE = ${num}`
        score.innerHTML=nwe
       food=randompos()
        expand()
        speed+=2;
    }
}
function eat(){
    return ((snakebody[0].x===food.x)&&(snakebody[0].y===food.y))
}
function randompos(){

    let a,b, check = true;
    while(check){
        a = Math.ceil(Math.random()*15);
        b = Math.ceil(Math.random()*15);

        check = snakebody.some(e=>{
             return( e.x === a && e.y === b);
        })
    }
    return {x : a, y : b};

}
function expand(){
    for(i=0;i<exp;i++){
        snakebody.push(snakebody[snakebody.length-1])
    }
     
}

function checks(){
    if(isCollide()){
     
        location.reload()
        alert("Game Over. Press any key to play again!");
    
        
    }
}

function isCollide() {
   
    for (let i = 1; i < snakebody.length; i++) {
        if(snakebody[i].x === snakebody[0].x && snakebody[i].y === snakebody[0].y){
            return true;
        }
    }

    if(snakebody[0].x >16 || snakebody[0].x <0 || snakebody[0].y >16 || snakebody[0].y <0){
        return true;
    }
    

   
}



   
