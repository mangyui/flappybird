var game=document.getElementById("game");
var birdEle=document.getElementById("bird");
var bg=document.getElementById("bg");
var num=document.getElementById("num");
var choose=document.getElementById("choose");
var light=document.getElementById("light");
var night=document.getElementById("night");  
var start=document.getElementById("start");
var red=document.getElementById("red");
var blue=document.getElementById("blue");
var yellow=document.getElementById("yellow");  
var ready=document.getElementById("ready");
var over=document.getElementById("over");
var tap=document.getElementById("tap"); 
var audio1=document.getElementById("audio1"); 
var audio2=document.getElementById("audio2"); 
var mask=document.getElementById("mask");   

var c=0;  //分数
var myW=200;   //初始管宽
var myH=200;   //随机范围
var myS=2;
light.onclick=function(){
   game.style.background="url(bg2.png) repeat-x";
   game.style.backgroundSize="43%";
}
night.onclick=function(){
   game.style.background="url(bg.png) repeat-x";
   game.style.backgroundSize="43%";
} 
red.onclick=function(){
   birdEle.style.background="url(red.gif) no-repeat";
   myW=200;
   myH=200;
   myS=2;      
}

yellow.onclick=function(){
   birdEle.style.background="url(yellow.gif) no-repeat";
   myW=170;
  myH=100;
   myS=5;  
}   
blue.onclick=function(){
   birdEle.style.background="url(blue.gif) no-repeat";
    myW=130;
   myH=20;
   myS=8;
}
var sky={
    x:0,
    g:0
}

var bird={
    speedX:5,
    speedY:5,
    x:birdEle.offsetLeft,
    y:birdEle.offsetTop
}
var running =false;
start.onclick=function(){
    start.style.display="none";
    var DH=document.documentElement.clientHeight;
    ready.style.top=parseInt(DH)/2-50+"px";
    ready.style.opacity=1;
    CreateP(400);
   CreateP(600);
   CreateP(800);
 CreateP(1000);

    setTimeout(function(){
   choose.style.display="none";
    
    ready.style.top=50+"px";
    ready.style.opacity=0;             
    },2000)

    setTimeout(function(){
    running=true;
    },3000)
}

//游戏结束
function myover(){
   var DH=document.documentElement.clientHeight;
    over.style.top=parseInt(DH)/2-50+"px";
    over.style.opacity=1;
    tap.style.top=parseInt(DH)/2+50+"px";
    tap.style.opacity=1;    
    mask.style.display="block";
    audio1.play();
    num.className="num1";
}
tap.onclick=function(){
    window.location.reload();
}
setInterval(function(){
    if(running){
        //鸟的动态
        if(bird.speedY==-10){
           audio2.cloneNode().play();
    birdEle.style.backgroundPositionY=-50+"px";                 
        }
        if(bird.speedY==0){
           birdEle.style.backgroundPositionY=-25+"px";        
        }
        if(bird.speedY>0){
           birdEle.style.backgroundPositionY=0+"px";                  
        }

    sky.x-=5;
    sky.g-=3;
    game.style.backgroundPositionX=sky.x+"px";
    bg.style.backgroundPositionX=sky.g+"px";
    bird.speedY+=1;
    bird.y+=bird.speedY;
    if(bird.y<0){
        running=false;
        bird.y=0;
        myover();

    }
    if(bird.y+birdEle.offsetHeight>600){
        running=false;
        bird.y=600-birdEle.offsetHeight;
        myover();
    }
    birdEle.style.top=bird.y+"px";
}
},30)
document.onclick=function(){
    bird.speedY=-10;
    birdEle.style.backgroundPositionY=-25+"px";
    
}

function CreateP(position){
    var pipe={};
    pipe.x=position;
    pipe.uHeight=myH+parseInt(Math.random()*(300-myH));
    pipe.dHeight=600-pipe.uHeight-myW;
    pipe.dTop=pipe.uHeight+myW;

    var uPipe=document.createElement("div");
    uPipe.style.width="52px";
    uPipe.style.height=pipe.uHeight+"px";
    uPipe.style.background="url(gd.png) no-repeat center bottom";
    uPipe.style.position="absolute";
    uPipe.style.top=0;
    uPipe.style.left=pipe.x+"px";
    game.appendChild(uPipe);        
    
    var dPipe=document.createElement("div");
    dPipe.style.width="52px";
    dPipe.style.height=pipe.dHeight+"px";
    dPipe.style.background="url(gd.png) no-repeat center top";
    dPipe.style.position="absolute";
    dPipe.style.top=pipe.dTop+"px";
    dPipe.style.left=pipe.x+"px";
    game.appendChild(dPipe);

    setInterval(function(){
        if(running){
            pipe.x-=2;

            uPipe.style.left=pipe.x+"px";
            dPipe.style.left=pipe.x+"px";  
            if(pipe.x==-60){
                game.removeChild(uPipe);
                game.removeChild(dPipe);
            }
            if(pipe.x==0)
            {CreateP(800);}

             if(pipe.x+52==bird.x){
              c++;
              num.innerHTML="<img src='n"+Math.floor(c/100)+".png'><img src='n"+Math.floor((c%100)/10)+".png'><img src='n"+c%10+".png'>"
             }
           var uCheck=bird.x+34>pipe.x&&bird.x<pipe.x+52&&(bird.y<pipe.uHeight||bird.y+25>pipe.uHeight+myW);
           if(uCheck)
           {running=false;
               myover();}
        }
    },20)
}