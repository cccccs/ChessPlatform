var depth=4;
var bestPoints;

function myaigo(){


    var max=0;
    //AI
    var point = maxmin();
 
    onstep(point[0],point[1],false);
    i=point[0];
    j=point[1];
    chessBoard[point[0]][point[1]]=2;
    
    over=win(2,i,j);
    
    if(over){
        alert("computer win!");
    }else{
        me=!me;//没有结束 轮到人下
    }

}

var maxmin=function(){
    var best = -1111111111;
    var points = gen();
    var Beta=1111111111;
    var Alpha = -1111111111;
    
    for(var i=0;i<points.length;i++){
        var p=points[i];
    
        chessBoard[p[0]][p[1]]=2;
        var v=min(depth-1,p[0],p[1],Alpha,Beta);

        if(v>Alpha){
            Alpha=v;
        }
        if(v==best){
            bestPoints.push(p);
        }
        if(v>best){
            best = v;
            bestPoints=[];
            bestPoints.push(p);
        }

        chessBoard[p[0]][p[1]]=0;
    }
    var result = bestPoints[Math.floor(bestPoints.length*Math.random())];
    
    return result;
}

// var maxmin=function(){
//     var best = -1111111111;
//     var points = gen();
    
//     for(var i=0;i<points.length;i++){
//         var p=points[i];
    
//         chessBoard[p[0]][p[1]]=2;
//         var v=min(depth-1,p[0],p[1]);

//         if(v==best){
//             bestPoints.push(p);
//         }
//         if(v>best){
//             best = v;
//             bestPoints=[];
//             bestPoints.push(p);
//         }

//         chessBoard[p[0]][p[1]]=0;
//     }
//     var result = bestPoints[Math.floor(bestPoints.length*Math.random())];
    
//     return result;
// }

function max(depth,i,j,Alpha,Beta){
    var best=-1111111111;
    if(depth<=0||win(1,i,j)){
        return Evaluate();
    }
    
    var points = genValue();
 
    for(var i=0;i<points.length;i++){
        var p=points[i];

        chessBoard[p[0]][p[1]]=2;
        var v=min(depth-1,p[0],p[1],Alpha,Beta);
        chessBoard[p[0]][p[1]]=0;

        if(v>best){
            best=v;
        }
        if(v>Alpha){
            Alpha=v;
        }
        if(v>Beta){
           return Beta;
        }
    }

    return best;
}

var min = function(depth,i,j,Alpha,Beta){
    var best =1111111111;
    if(depth <=0||win(2,i,j)){
        return Evaluate();
    }

    var points = genMinValue();
    for(var i=0;i<points.length;i++){
        var p=points[i];
        
        chessBoard[p[0]][p[1]]=1;
        var v = max(depth-1,p[0],p[1],Alpha,Beta);
        chessBoard[p[0]][p[1]]=0;
        
        if(v<best){
            best=v;
        }
        if(v<Beta){
            Beta=v;
        }
        if(v<Alpha){
            return Beta; 
        }

       
    }
    return best;
}

var gen = function(){

    var neighbors = [];
    var nextNeighbors = [];
    var pointValue=[];

    var count=0;
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard[i][j]==0){
                if(hasNeighbors([i,j])){
                    pointValue[count++]=EvaluatePoint([i,j]);
                    if(pointValue[count-1]>=99999999){
                        neighbors = [];
                        neighbors.push([i,j]);
                        return neighbors;
                    }
                    neighbors.push([i,j]);
                }
            }
        }
    }

    for(var i=0;i<count-1;i++){
        for(var j=i+1;j<count;j++){
            if(pointValue[i]<pointValue[j]){
                var t=pointValue[i];
                pointValue[i]=pointValue[j];
                pointValue[j]=t;
                t = neighbors[i];
                neighbors[i]=neighbors[j];
                neighbors[j]=t;
            }
        }
    }
  
    return neighbors;
}
var genMinValue=function(){
    var neighbors = [];
    var nextNeighbors = [];
    var pointValue=[];

    var count=0;
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard[i][j]==0){
                if(hasNeighbors([i,j])){
                    pointValue[count++]=EvaluatePoint([i,j]);
                    neighbors.push([i,j]);
                }
            }
        }
    }

    for(var i=0;i<count-1;i++){
        for(var j=i+1;j<count;j++){
            if(pointValue[i]>pointValue[j]){
                var t=pointValue[i];
                pointValue[i]=pointValue[j];
                pointValue[j]=t;
                t = neighbors[i];
                neighbors[i]=neighbors[j];
                neighbors[j]=t;
            }
        }
    }
  
    return neighbors;
}

var genValue = function(){

    var neighbors = [];
    var nextNeighbors = [];
    var pointValue=[];

    var count=0;
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard[i][j]==0){
                if(hasNeighbors([i,j])){
                    pointValue[count++]=EvaluatePoint([i,j]);
                    neighbors.push([i,j]);
                }
            }
        }
    }

    for(var i=0;i<count-1;i++){
        for(var j=i+1;j<count;j++){
            if(pointValue[i]<pointValue[j]){
                var t=pointValue[i];
                pointValue[i]=pointValue[j];
                pointValue[j]=t;
                t = neighbors[i];
                neighbors[i]=neighbors[j];
                neighbors[j]=t;
            }
        }
    }
  
    return neighbors;
}

var hasNeighbors = function(points){
    //横向
    
    for(var i=0;i<2;i++){
        var a=points[0]-i;
        if(a>=0){    
             if(chessBoard[a][points[1]]!=0)return true;
        }
    }
    for(var i=0;i<2;i++){
        var a=points[0]+i;
        if(a<15){
        if(chessBoard[a][points[1]]!=0)return true;
        }
    }
    //纵向
    for(var i=0;i<2;i++){
        var b=points[1]-i;
        if(b>=0){
        if(chessBoard[points[0]][points[1]-i]!=0)return true;
        }
    }
    for(var i=0;i<2;i++){
        var b=points[1]+i;
        if(b<15){
        if(chessBoard[points[0]][points[1]+i]!=0)return true;
        }
    }
    //斜项
    for(var i=0;i<2;i++){
        var a=points[0]-i;
        var b=points[1]-i;
        if(a>=0&&b>=0){
            if(chessBoard[a][points[1]-i]!=0)return true;
        }
    }

    for(var i=0;i<2;i++){
        var a=points[0]+i;
        var b=points[1]+i;
        if(a<15&&b<15){
            if(chessBoard[a][points[1]+i]!=0)return true;
        }
        }
    //逆向
    for(var i=0;i<2;i++){
        var a=points[0]-i;
        var b=points[1]+i;
        if(a>=0&&b<15){
        if(chessBoard[a][points[1]+i]!=0)return true;
        }
    }
    for(var i=0;i<2;i++){
        var a=points[0]+i;
        var b=points[1]-i;
        if(a<15&&b>=0){
        if(chessBoard[points[0]+i][points[1]-i]!=0)return true;
        }
    }
    return false;

}


//赢法判断
var win=function(tag,i,j){

    // for(var i=0;i<15;i++){
    //     var str="";
    //     for(var j=0;j<15;j++){
    //        str+=chessBoard[i][j]+" ";
    //     }
    //     console.log(str);
    // }
    
    var num=0;
    //横向判断
    for(var k=i-4;k<=i;k++){
        num=0;
        for(var l=k;l<k+5;l++){
            if(l<0)break;
            if(l>=15)break;
            if(chessBoard[l][j]==tag)
            num++;
            if(chessBoard[l][j]!=tag){
            num--;
            break;
            }
        }
        if(num==5){
            return true;
        }
    }

    //纵向判断
    for(var k=j-4;k<=j;k++){
        num=0;
        for(var l=k;l<k+5;l++){
            if(chessBoard[i][l]==tag){
            num++;
            }
            if(chessBoard[i][l]!=tag){
            num--;
            break;
            }
        }
        
        if(num==5){
            return true;
        }
    }
    //左倾斜135°
    for(var m=0;m<=4;m++){
        num=0;
        for(var l=m;l<m+5;l++){
            if(i-4+l<0){
                break;
            }
            if(i-4+l>=15){
                break;
            }
            if(chessBoard[i-4+l][j-4+l]==tag){
            num++;
            
            }
            if(chessBoard[i-4+l][j-4+l]!=tag){
            num--;
            break;
            }
        }
       
        if(num==5){
            return true;
        }
    }
    //右倾斜45°
    for(var m=0;m<=4;m++){
        num=0;
        for(var l=m;l<m+5;l++){
            if(i+4-l<0){
                break;
            }
            if(i+4-l>=15){
                break;
            }
        
            if(chessBoard[i+4-l][j-4+l]==tag)
            num++;
            if(chessBoard[i+4-l][j-4+l]!=tag){
            num--;
            break;
            }
        }
    
        if(num==5){
            return true;
        }
        
    }

}