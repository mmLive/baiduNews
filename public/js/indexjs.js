
$(document).ready(function(){


// nav folding
var f=1;
$('nav .more').click(function(){
 if(f){
    $(this).find('i').css({
        'background-position':'0 -16px'
    })
   $($(this).siblings('.list')).css({"white-space":"normal"});
   $($(this).siblings('.list')).find('p').css({'display':'block'});
   $($(this).siblings('.list')).find('li').css({"padding":"0"});
   $('#cover').css({"display":"block" });

    f=0;
 }else{
    $(this).find('i').css({
        'background-position':'-16px -16px'
    })
    $($(this).siblings('.list')).css({"white-space":"nowrap"});
    $($(this).siblings('.list')).find('p').css({'display':'none'})
    $($(this).siblings('.list')).find('li').css({"padding":"0 4px"});
    $('#cover').css({"display":"none" });
    f=1;
 }
})




function  createSwiper(){
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
        pagination: {
            el: '.swiper-pagination',
          },
    })
}



//Get all news data from database
$.ajax({
   url:'/getNews',
   type:'get',
   success:function(data){
    // console.log(data);
    if(data===null){
        console.log("数据库中没有任何数据");
    }
    else{
        data.forEach(function(ele,index){
         switch(ele.category){
             case '推荐':     
                    if(ele.content ==='0'){
                        $('#tab1 .swiper-wrapper').append(`<div class="swiper-slide myswiper"><img src="${ele.img}" alt=""><p class="swiper-title">${ele.title}</p></div>`);
                    }  
                    else{
                        $('#tab1').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                    } 
                      createSwiper();
                  break;
             case '百家':
                   if(ele.tag==='0'){
                      $('#tab2').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
                    }
                    else{
                       $('#tab2').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                   }
                    break;
            case '本地':
            if(ele.tag==='0'){
                // console.log(ele);
                $('#tab3').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
              }
              else{
                 $('#tab3').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
             }
                  
                    break;
            case '娱乐':
                      console.log(ele);
                      if(ele.tag==='0'){
                        $('#tab4').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
                      }
                      else{
                         $('#tab4').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                     }
                      break;
            case '社会':
                      console.log(ele);
                      if(ele.tag==='0'){
                        $('#tab5').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
                      }
                      else{
                         $('#tab5').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                     }
                      break;
            case '军事':
                        console.log(ele);
                        if(ele.tag==='0'){
                            $('#tab6').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
                          }
                          else{
                             $('#tab6').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                         }
                      break;
            case '女人':
                        console.log(ele);
                        if(ele.tag==='0'){
                            $('#tab7').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
                          }
                          else{
                             $('#tab7').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                         }
                      break;
            case '搞笑':
                          console.log(ele);
                          if(ele.tag==='0'){
                            $('#tab8').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
                          }
                          else{
                             $('#tab8').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                         }
                      break;
            case '互联网':
                          console.log(ele);
                          if(ele.tag==='0'){
                            $('#tab9').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b></dd></dl>`);
                          }
                          else{
                             $('#tab9').append(`<dl><dt><img src="${ele.img}" alt=""></dt><dd><h6>${ele.title}</h6><b>${ele.source}</b><i>${ele.tag}</i></dd></dl>`);
                         }
                      break;
            default:
             console.log('无法识别新闻类别');

        }
     })
    }
   }
})

$('.list li').eq(0).click(function(){
    // $(this).css({"class":"active"}).siblings().css({"class":""}); 

    // $(this).addClass({"class":"active"}).siblings().removeClass("class"); 开始一直不能实现切换 样式变化 注意错误写法

    $(this).addClass("active").siblings().removeClass();   

    $('#tab1').css({"display":"block"}).siblings().css({"display":"none"})
    createSwiper();
})

$('.list li').eq(1).click(function(){
    $(this).addClass("active").siblings().removeClass();   
    $('#tab2').css({"display":"block"}).siblings().css({"display":"none"})

})
$('.list li').eq(2).click(function(){
    $(this).addClass("active").siblings().removeClass();     
    $('#tab3').css({"display":"block"}).siblings().css({"display":"none"})

})
$('.list li').eq(3).click(function(){
    $(this).addClass("active").siblings().removeClass();      
    $('#tab4').css({"display":"block"}).siblings().css({"display":"none"})

})

$('.list li').eq(4).click(function(){
    $(this).addClass("active").siblings().removeClass();   
    $('#tab5').css({"display":"block"}).siblings().css({"display":"none"})

})

$('.list li').eq(5).click(function(){
    $(this).addClass("active").siblings().removeClass();   
    $('#tab6').css({"display":"block"}).siblings().css({"display":"none"})

})

$('.list li').eq(6).click(function(){
    $(this).addClass("active").siblings().removeClass();   
    $('#tab7').css({"display":"block"}).siblings().css({"display":"none"})

})
$('.list li').eq(7).click(function(){
    $(this).addClass("active").siblings().removeClass();   
    $('#tab8').css({"display":"block"}).siblings().css({"display":"none"})

})

$('.list li').eq(8).click(function(){
    $(this).addClass("active").siblings().removeClass();   
    $('#tab9').css({"display":"block"}).siblings().css({"display":"none"})

})



// for(var i = 0 ; i < tabHead.length;i++){
//     ~function(n){   // n是形参  执行的时候会把实参i传递过来
//         tabHead[n].onclick = function(){
//             for(var j = 0 ; j< tabHead.length;j++){
//                   tabHead[j].className = '';
//                   tabContent[j].className = '';
//             }
//             this.className =  'active';
//             tabContent[n].className = 'active';
//         }
    
//     }(i) // 实参
// }




  
})//$(document).ready()
  