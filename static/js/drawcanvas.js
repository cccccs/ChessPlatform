
      var canvas=document.getElementById('myCanvas');
      
      var context=canvas.getContext('2d');

      var opcanvas=document.getElementById('opchess');
      var opcontext=opcanvas.getContext('2d');

      var mycanvas=document.getElementById('mychess');
      var mycontext=mycanvas.getContext('2d');

      
      
      var opalltime=1;
      var myalltime=1;
      var myt;
      var opt;

      var me = true;//谁先走
      var over = false;//是否结束
      var chessBoard = [];
      var i;
      var j;
      var rectx,recty;
      var lasti,lastj;
      

      context.fillStyle='#F5F5F5';
      context.fillRect(0,0,700,700); 
            
     
     var start= document.getElementById('start');
     var fail= document.getElementById('fail');

     var mytimetext =document.getElementById('mytime');
     var optimetext =document.getElementById('optime');

   
      start.onclick=function(e){
        startgame();

      };
      fail.onclick=function(e){
        overgame();
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
        
      mycontext.beginPath();
      mycontext.arc(15 , 15 , 13, 0, 2 * Math.PI);
      mycontext.closePath();
      var gradient = mycontext.createRadialGradient(15+ 2, 15 - 2, 13, 15  + 2, 15  - 2, 0);

      gradient.addColorStop(0, "#D1D1D1");
      gradient.addColorStop(1, "#F9F9F9");
     
      mycontext.fillStyle = gradient;
      mycontext.fill();
        //初始化数据信息

      opcontext.beginPath();
      opcontext.arc(15 , 15 , 13, 0, 2 * Math.PI);
      opcontext.closePath();
      var gradient = opcontext.createRadialGradient(15+ 2, 15 - 2, 13, 15  + 2, 15  - 2, 0);

      gradient.addColorStop(0, "#0A0A0A");
      gradient.addColorStop(1, "#636766");
      opcontext.fillStyle = gradient;
      opcontext.fill();
        
        me = true;
        over = false;
        onstep(7, 7, false);
        chessBoard[7][7] = 2;
        opalltime=1;
        myalltime=1;
        optimetext.innerHTML= "10:00";
        clearTimeout(opt);
        clearTimeout(myt);
        beginMyTime();
       

      }
      
      function beginMyTime(){
        var minute=parseInt((10*60-myalltime)/60);
        
        var second=(10*60-myalltime-minute*60);
        mytimetext.innerHTML= minute+":"+second;
        myalltime=myalltime+1;
        myt=setTimeout("beginMyTime()",1000);
        
      } 

      function endMyTime(){
        clearTimeout(myt);
      
      }

      function beginOpTime(){
        var minute=parseInt((10*60-opalltime)/60);
        
        var second=(10*60-opalltime-minute*60);
        optimetext.innerHTML= minute+":"+second;
        opalltime=opalltime+1;
        opt=setTimeout("beginOpTime()",1000);
      }

      function endOpTime(){
        clearTimeout(opt);
       
      }

      function overgame(){
        var r=confirm("确认认输？");
        if (r==true)
        {
          over=true;
        }
      else
        {
        
        }
      }
      function cleanchess(){
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
    
    function starttime(){

    }


    //设置点击事件画圆
    canvas.onclick=function(e){
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
        endMyTime();
        beginOpTime();
        if(onstep(i,j,me)){
         
        chessBoard[i][j]=1;
        over=win(1,i,j);
        
        if(over){
          alert("you win!");
          endOpTime();
        }else{
          
          me=!me;
         
          myaigo();
          endOpTime();
          if(!over){
            beginMyTime();
          }
        }
      }
      //   for(var k=0;k<count;k++){
      //     if(win[i][j][k]){
      //         mywin[k]++;
             
      //         computerwin[k]=6;
      //         if(mywin[k]==5){
      //             alert("you win");
      //             over=true;
      //         }
      //     }
      // }


      }

     
    };


var onstep = function(i,j,me){
      context.beginPath();
      context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
      context.closePath();
      var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
      if(me){
      gradient.addColorStop(0, "#D1D1D1");
      gradient.addColorStop(1, "#F9F9F9");
      }else{
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
      }
      context.fillStyle = gradient;
      context.fill();
      if(!me){
        lasti=i;
        lastj=j;
        // context.strokeStyle = "red";  //图形边框的填充颜色
        // context.strokeRect(i * 30,j * 30,30,30);
      }
     return true;
      
    }
    