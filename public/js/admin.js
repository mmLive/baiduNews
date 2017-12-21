
//News release
//Folding button

var flag=1;
$('.p-left h3 span').click(function(){
    console.log(123);
    if(flag){
        $(this).text('>>');
        $('.main>.p-left').animate({width:"15%"},500);
        $('.main>.p-right').animate({width:"82%"},500);
        flag=0;
    }
    else{
        $(this).text('<<');
        $('.main>.p-left').animate({width:"30%"},500);
        $('.main>.p-right').animate({width:"67%"},500);
        flag=1;
    }   
})

 //News management hover

$('tbody').on('mouseover mouseout','td',function(e){
      var txt= $(this).text();
      $(this).prop('title',`${txt}`);  //hover 新闻管理 每一行 可以出现里面的内容 赋值给title 用title显示
        // if(e.type == "mouseover"){
        //    var txt= $(this).text();
        //     $(this).prop('type',`${txt}`);
        //    }else if(e.type == "mouseout"){
        //     $(this).removeProp('type');
        //    }
})

//时间转换 北京位于东八区,比格林尼治时间早八个小时.
function GMTToStr(time){
    let date = new Date(time)
    let Str=date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate() 
    return Str;
}

 //Get all news
         getAllNews();
       function getAllNews(){
          $.ajax({
           url:'/users/getAllNews',
           type:'GET',
           success:function(data){
             if(data!==null){
                 data.forEach(function(ele,index){

            var newTime = GMTToStr(ele.time);
            console.log(newTime);

                  $('table').show();
                  $('tbody').append(`<tr><td id="newsId">${ele.id}</td><td >${ele.category}</td><td >${ele.title}</td><td >${ele.content}</td> <td >${ele.source}</td> <td >${ele.tag}</td><td >${ele.img}</td><td >${newTime}</td><td><button  class="update btn btn-info">修改</button><button class='del btn btn-danger'>删除</button></td></tr>`);
                
                })
             }
             else{
                 $('table').hide();
                 console.log("data为空");
             }
           }
         })
    }


//下面正式进入数据的增删改查

// Insert news

$('#submitBtn').click(function(e){
      //阻止form 表单默认行为
       e.preventDefault();
        // console.log($('#title').val());
     var json={
        category:$('#category').find("option:selected").text(),
        title:$('#title').val(),
        content:$('#content').val(),
        source:$('#source').val(), 
        tag:$('#tag').val(),
        img:$('#img').val(),
        time:$('#time').val()
      }
     $.ajax({
         url:'/users/insertNews',
         type:'post',
         data:json,
         success:function(reData){
             console.log(reData);
            $("input[type=reset]").trigger("click"); //清除表单中数据
             
            $('tbody').append(`<tr><td id="newsId">${reData[0].id}</td><td >${reData[0].category}</td><td >${reData[0].title}</td> <td >${reData[0].content}</td> <td >${reData[0].source}</td> <td >${reData[0].tag}</td><td >${reData[0].img}</td><td >${reData[0].time}</td> <td><button  class="update btn btn-info">修改</button><button class='del btn btn-danger' >删除</button></td></tr>`);
         }
     })
})

//delete news
//给未来元素绑定事件

$('tbody').on('click','.del',function(){
    // console.log(123);
   if( confirm('确认删除？')===true){
            var curId=$(this).parent().siblings('#newsId').text();
            // console.log(curId);
            var json2={
            id:curId
        }
        $.ajax({
            url:'/users/deleteNews',
            type:'post',
            data:json2,
            success:function(infoData){
                $('tbody tr').remove();
                getAllNews();
            }
          })

   }else{
       console.log('Delete failure');
   }
  })

  //update news  
  //给未来元素绑定事件
var curId;
$('tbody').on('click','.update',function(){
    
         curId= $(this).parent().siblings('#newsId').text();
        // console.log(curId);

        var curTitle = $(this).parent().siblings('#newsId').next().next().text();
        var curContent = $(this).parent().siblings('#newsId').next().next().next().text();
        var curCategory = $(this).parent().siblings('#newsId').next().text();
        
        var curSource = $(this).parent().siblings('#newsId').next().next().next().next().text();
        var curTag = $(this).parent().siblings('#newsId').next().next().next().next().next().text();
        var curImg = $(this).parent().siblings('#newsId').next().next().next().next().next().next().text();
        var curTime = $(this).parent().siblings('#newsId').next().next().next().next().next().next().next().text();
   
        $('#title').val(curTitle) ;
        $('#content').val(curContent);
        $('#category').val(curCategory);
        $('#source').val( curSource);
        $('#tag').val( curTag) ;
        $('#img').val(curImg);
        $('#time').val(curTime);

})

$('#saveBtn').click(function(e){
    e.preventDefault();
    var json3={
          id:curId,
          title:$('#title').val(),
          content:$('#content').val(),
          category:$('#category').find("option:selected").text(),
          source:$('#source').val(), 
          tag:$('#tag').val(),
          img:$('#img').val(),
          time:$('#time').val()
    }

    $.ajax({
        url:'/users/updateNews',
        type:'post',
        data:json3,
         success:function(data){
          $('tbody tr').remove();
          getAllNews();
          $("input[type=reset]").trigger("click"); //清除表单中数据
         }
    })

    
})


 //search 
 $('#searchBtn').click(function(e){
    //  console.log(  $('#search').val());
    // e.preventDefault();

    if($('#search').val()=='全部'){
        $('tbody tr').remove();
        getAllNews();
    }
    else{
        var json4={
            category: $('#search').val()
        }
  
       $.ajax({
          url:'/users/searchCategory',
          type:'post',
          data:json4,
          success:function(data){
            $('tbody tr').remove();
            if(data!==null){
              data.forEach(function(ele,index){
                  var newTime = GMTToStr(ele.time);
                  console.log(newTime);
                 $('tbody').append(`<tr><td id="newsId">${ele.id}</td><td >${ele.category}</td><td >${ele.title}</td><td >${ele.content}</td> <td >${ele.source}</td> <td >${ele.tag}</td><td >${ele.img}</td><td >${newTime}</td><td><button  class="update btn btn-info">修改</button><button class='del btn btn-danger'>删除</button></td></tr>`);            
               })
            }
            else{
                console.log("data为空");
            }
          }
        })
  
    }
     
 })



