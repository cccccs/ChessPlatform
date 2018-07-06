var aibutton = document.getElementById("ai");
var note = document.getElementById('note');
aibutton.onclick=function(){
    
}

$(".myself").click(function(){
    location.href='./randompvp';
    note.innerText="匹配玩家中...";
})

$(".ai").click(function(){
    location.href='./ai';
})

$(".myroom").click(function(){
    var name=prompt("请输入要开启的房间号","");
  if (name!=null && name!="")
    {
        location.href='./pvp/'+name+'/';
    }
}
);
