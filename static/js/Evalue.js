var resolveChess=[];
var flag=0;
var  Evaluate = function(){
   var AiValue=chessValue(2,1); 
   var UserValue=chessValue(1,2);
   
   return AiValue-UserValue;
}

var chessValue=function(myown,opponent){
    var value=0;

    for(var i=0;i<6;i++){
        resolveChess[i]=[];
        for(var j=0;j<17;j++){
            resolveChess[i][j]=0;
        }
    } 

    //方便检查边界
    for(var i=0;i<6;i++){
        resolveChess[i][0]=opponent;
        resolveChess[i][16]=opponent;
    }

    for(var i=0;i<15;i++){
        var lineP = 1;
        flag=i;
        for(var j=0;j<15;j++){
            
            resolveChess[0][lineP]=chessBoard[i][j];// -
            resolveChess[1][lineP]=chessBoard[j][i];// |
            
            if(i+j<15){
            resolveChess[2][lineP]=chessBoard[j][i+j];// \  00 11 22 33 44 01 12    014 114
            resolveChess[4][lineP]=chessBoard[i+j][j];// \ 00 11 22 10 21           140 141  
            }
            
            if(i-j>0){
            resolveChess[3][lineP]=chessBoard[j][i-j];// / 00    0-1 0-2  01 10 ..   20 11 02
            resolveChess[5][lineP]=chessBoard[14-j][14-(i-j)];//1414      1413 1314  1412 1313 1214
            }

            ++lineP;
                
        }
            var special = i==0?4:6;
            for(var p=0;p<special;p++){
                value+=lineValue(resolveChess[p],myown,opponent);
            }

    }
    return value;

}


var lineValue =function(line,myown,opponent){
    var value=0;//评估值
    var cnt=0;//连子数
    var blk=0;//封闭数
    
    for(var i=1;i<16;i++){
        if(line[i]==myown){
            cnt=1;
            blk=0;
            //查看左侧是否封闭
            if(line[i-1]==opponent)++blk;
            //计算连子数
            for(i=i+1;i<16&&line[i]==myown;++i,++cnt);
            if(line[i]==opponent)++blk;
            value+=getValue(cnt,blk,line);
        }
    }
    
    return value;
}

var getValue = function(cnt,blk,line){
    if(blk==0){
        switch(cnt){
            case 1:return 10;
            case 2:return 100;
            case 3:return 1000;
            case 4:return 10000;
            default:{
                return 99999999;
            }      
        }
    }else if(blk==1){
        switch(cnt){
            case 1:return 1;
            case 2:return 10;
            case 3:return 100;
            case 4:return 1000;
            default:return 99999999;
        }
    }else{
        if(cnt>=5)return 99999999;
        else return 0;
    }
}


var EvaluatePoint=function(p){
    var value=0;//评估值
    var cnt=1;//连子数
    var blk=0;//封闭数
    var i=p[0];//
    var j=p[1];//
    

    //竖向判断|
    for(i=p[0]+1;i<15&&chessBoard[i][j]==2;i++,cnt++);
    if(i<15&&chessBoard[i][j]==1)blk++;
    if(i==15)blk++;

    for(i=p[0]-1;i>=0&&chessBoard[i][j]==2;i--,cnt++);
    if(i>=0&&chessBoard[i][j]==1)blk++;
    if(i<0)blk++;

    value+=getPointValue(blk,cnt);
    
    cnt=1;
    blk=0;
    i=p[0];
    j=p[1];
    //横向判断
    for(j=p[1]+1;j<15&&chessBoard[i][j]==2;j++,cnt++);
    if(j<15&&chessBoard[i][j]==1)blk++;
    if(j==15)blk++;

    for(j=p[1]-1;j>=0&&chessBoard[i][j]==2;j--,cnt++);
    if(j>=0&&chessBoard[i][j]==1)blk++;
    if(j<0)blk++;

    value+=getPointValue(blk,cnt);

    cnt=1;
    blk=0;
    i=p[0];
    j=p[1];
    //左斜向45°判断
    for(i=p[0]+1,j=p[1]+1;j<15&&i<15&&chessBoard[i][j]==2;i++,j++,cnt++);
    if(j<15&&i<15&&chessBoard[i][j]==1)blk++;
    if(j==15||i==15)blk++;
    
    for(i=p[0]-1,j=p[1]-1;j>=0&&i>=0&&chessBoard[i][j]==2;i--,j--,cnt++);
    if(j>=0&&i>=0&&chessBoard[i][j]==1)blk++;
    if(j<0||i<0)blk++;

    value+=getPointValue(blk,cnt);

    cnt=1;
    blk=0;
    i=p[0];
    j=p[1];
    //右斜向45°判断
    for(i=p[0]-1,j=p[1]+1;i>=0&&j<15&&chessBoard[i][j]==2;i--,j++,cnt++);
    if(i>=0&&j<15&&chessBoard[i][j]==1)blk++;
    if(i<0||j==15)blk++;

    for(i=p[0]+1,j=p[1]-1;i<15&&j>=0&&chessBoard[i][j]==2;i++,j--,cnt++);
    if(i<15&&j>=0&&chessBoard[i][j]==1)blk++;
    if(i==15||j<0)blk++;
    
    value+=getPointValue(blk,cnt);


 
    return value;
}

var getPointValue = function(blk,cnt){
    if(blk==0){
        switch(cnt){
            case 1:return 10;
            case 2:return 100;
            case 3:return 1000;
            case 4:return 10000;
            default:{
                return 99999999;
            }      
        }
    }else if(blk==1){
        switch(cnt){
            case 1:return 1;
            case 2:return 10;
            case 3:return 100;
            case 4:return 1000;
            default:return 99999999;
        }
    }else{
        if(cnt>=5)
        return 99999999;
        else return 0;
    }
}