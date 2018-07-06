var canvas=document.getElementById('myCanvas');
var context=canvas.getContext('2d');
var me = true;//谁先走
var over = false;//是否结束
var chessBoard = [];
var start = false;
var i;
var j;
var type = document.getElementById('session_type').innerText;
type =type.replace("\"","").replace("\"","");

var num= type=="true"? 2:1;
me = type=="true"?true:false;

context.fillStyle='#F5F5F5';
context.fillRect(0,0,700,700); 

//状态描述

var myusername =document.getElementById('session_name').innerText;
var opusername = document.getElementById('session_opname').innerText;
var myname = document.getElementById('myname');
var mystatus = document.getElementById('mystatus');
var opname = document.getElementById('opname');
var opstatus = document.getElementById('opstatus');

var opnameSpan = document.getElementById('opnameSpan');
myname.innerText = myusername;
mystatus.innerText = "准备中";
if(opusername!=""){
  opname.innerText=opusername;
  opstatus.innerText="准备中";
  opnameSpan.innerText=opusername;
}



var begingame = document.getElementById('start');
var fail = document.getElementById('fail');
var regret = document.getElementById('regret');
var note = document.getElementById('note');
fail.style.color="grey";
regret.style.color="white";

  begingame.onclick=function(e){
    if(start==false){
      me = type=="true"?true:false;
      over=false;
      cleanchess();
      drawchess();
      begingame.style.color="grey";
      fail.style.color="white";
      regret.style.color="grey";
      statusSocket.send(JSON.stringify({
        'status':1,
        'username':myusername
      }));
      note.innerText="准备开始";
    }else{
      return;
    }
  }

  fail.onclick=function(e){
    if(start==false){
      return;
    }else{
      //confirm 然后展示给对方
      note.innerHTML="你输了！";
      statusSocket.send(JSON.stringify({
        'status':2,
        'username':myusername
      }));
      over=true;
      overgame(0);
      
      
    }
  }
  regret.onclick=function(e){
    if(start==false){
      
      
    }else{
      return;
    }
  }









function startgame(){

  //初始化棋盘
  for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
  }

   //清除棋盘
   cleanchess();
        
   //绘制棋盘
   drawchess(); 
   
   //初始化数据信息

   
//    me = type;
//    over = false;
  
//    onstep(7, 7, false);
//    chessBoard[7][7] = 2;



}
function cleanchess(){
  for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
  }
  canvas.height=canvas.height;
}

function drawchess(){
//test
//     var c = document.getElementById('myCanvas');
//     var cxt = c.getContext("2d");
//     cxt.moveTo(10, 10);
//     cxt.lineTo(150,50);
//     cxt.lineTo(10,50);
//     cxt.stroke();
//绘图 
  for(var i = 0; i < 15; i++){
    context.strokeStyle = "#BFBFBF";
    context.beginPath();
    context.moveTo(15 + i *30, 15);
    context.lineTo(15 + i *30, canvas.height - 15);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(15, 15 + i *30);
    context.lineTo(canvas.width - 15, 15 + i * 30);
    context.closePath();
    context.stroke();
  }
}
function overgame(result){
  start=false;
  begingame.style.color="white";
  fail.style.color="grey";
  regret.style.color="white";
  opstatus.innerHTML="准备中";  
  mystatus.innerHTML="准备中";
  var strresult= result==1?"胜利":"失败";
  $.ajax({
    url:'/game/saveresult/',
    method:'POST',
    data:{
      'opname':opname.innerText,
      'result':strresult
    },
    success:function(data){
      var obj=JSON.parse(data);
      alert(obj);
    }
  });

}

canvas.onclick=function(e){
    
    if(!start){
      return;
    }
    if(over){
      return;
    }
    if(!me){
      return;
    }
    var x= e.offsetX;
    var y= e.offsetY;
    
    i= Math.floor(x/30);
    j= Math.floor(y/30);
    if(chessBoard[i][j] == 0) {
      onstep(i,j,num);
      chessBoard[i][j]=num;
      over=win(num,i,j);
      
      chessSocket.send(JSON.stringify({
        'ctype': type,
        'x':i,
        'y':j
      }));
     
          
         
      
      if(over){
        alert("you win!");
        note.innerText="你赢了！";
        overgame(1);
         
      }else{
        me=!me;
        note.innerText="对方正在思考";
      }

    }

   
  };


  function onstep(i,j,me){
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if(me==2){
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }else{
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
     
    }
    context.fillStyle = gradient;
    context.fill();
  }

  
  var roomName = document.getElementById('room_name').innerText;
  roomName =roomName.replace("\"","").replace("\"","");
  var chessSocket=new WebSocket(
       'ws://' + window.location.host +
       '/ws/game/pvp/chess/' + roomName + '/');

   var chatSocket = new WebSocket(
       'ws://' + window.location.host +
       '/ws/game/pvp/chat/' + roomName + '/');

  var statusSocket = new WebSocket(
  'ws://' + window.location.host +
  '/ws/game/pvp/status/' + roomName + '/');

   chessSocket.onmessage = function(e){
    var data = JSON.parse(e.data);
    var optype = data['ctype'];//true white false black
    var x = data['x'];
    var y = data['y'];
    if(optype==type)
    return;
    var opnum= optype=="true"? 2:1;
    onstep(x,y,opnum);

    chessBoard[x][y]=opnum;
    over=win(opnum,x,y);
      
      if(over){
        alert("you lose!");
        note.innerText="你输了";
        overgame(0);
       
       
        
      }else{
        note.innerText="请下棋";
        me=!me;
      }

   }  

   chatSocket.onmessage = function(e) {
       var data = JSON.parse(e.data);
       var message = data['message'];
       var username = data['username'];
       document.querySelector('#chat-log').value += (username+":"+message + '\n');
   };

   chessSocket.onclose = function(e){
       console.error('chess socket closed unexpectedly');
   }

   chatSocket.onclose = function(e) {
       console.error('Chat socket closed unexpectedly');
   };
   
   statusSocket.onmessage = function(e) {
    var data = JSON.parse(e.data);
    var status = data['status'];
    var username = data['username'];
    
    solveStatus(status,username);
  };
    function solveStatus(status,username){
      switch(status){
        case 0:
          if(username!=myusername){
            opname.innerHTML=username;
            opstatus.innerHTML="准备中"; 
            opnameSpan.innerText=username;
              
          }
        break;
        case 1:
        if(username!=myusername){
          opstatus.innerHTML="准备完成";     
        }else{
          mystatus.innerHTML="准备完成";
        }
        if( opstatus.innerHTML=="准备完成" &&  mystatus.innerHTML=="准备完成"){
          start = true;
          if(num==2){
            note.innerText="请下棋";
          }else{
            note.innerText="对方正在思考";
          }
        }
        break;
        case 2:
        if(username!=myusername){
          overgame(1);
          over=true;
        
          note.innerHTML="对方认输，你赢了！";
        }
        break;
      }
    }
  statusSocket.onclose = function(e){
    console.error('chess socket closed unexpectedly');
  }


   document.querySelector('#chat-message-input').focus();
   document.querySelector('#chat-message-input').onkeyup = function(e) {
       if (e.keyCode === 13) {  // enter, return
           document.querySelector('#chat-message-submit').click();
       }
   };

   document.querySelector('#chat-message-submit').onclick = function(e) {
       var messageInputDom = document.querySelector('#chat-message-input');
       var message = messageInputDom.value;
      if(message==""){
        return;
      }

       chatSocket.send(JSON.stringify({
           'message': message,
          'username':myusername
        }));

       messageInputDom.value = '';
   };
   setTimeout("send()",1500);
   function send(){
    statusSocket.send(JSON.stringify({
      'status':0,
      'username':myusername
    }));
   }