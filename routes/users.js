var express = require('express');
var router = express.Router();



//import mysql module
var mysql = require('mysql');

//create mysql connection
var connection = mysql.createConnection({
    host:'localhost',
    port:8889,
    user:'root',
    password:'root',
    database:'baidu_news'
});
// connecte mysql
connection.connect();



//router :  /users

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



//The following is the configuration of the page after the administrator logged in

router.get('/admin', function(req, res, next) {
  console.log(req.cookies);

  var json = null;
  if( req.cookies.user !== null){
     json={
       user:req.cookies.user
     }
  }
    res.render('admin',json);
});



 //Get all news
router.get('/getAllNews', function(req, res, next) {
   connection.query('SELECT * FROM news',function(error,results,fields){
          if(error){
            console.log('Get all users error!');
        }
        else{
            // console.log(results)
          res.json(results);
        }

   });
});


//insertNews
router.post('/insertNews', function(req, res, next) {
  console.log(req.body);
  var title=req.body.title;
  var content=req.body.content;
  var category=req.body.category;
  var source=req.body.source;
  var tag=req.body.tag;
  var img=req.body.img;
  var time=req.body.time;

// INSERT INTO `news`(`id`, `title`, `content`, `category`, `source`, `tag`, `time`, `img`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8])
  var sql=`INSERT INTO news ( title, content, category, source, tag, time, img) VALUES ('${title}','${content}','${category}','${source}','${tag}','${time}','${img}')`;

   connection.query(sql,function(error,results,fields){
      console.log(results.insertId);
      if(!error){
         connection.query(`SELECT * FROM news WHERE id=${results.insertId}`,function(error,results1,fields){
              if(error){
                  console.log('Get the newest news error!');
              }
            else{
                console.log(results1)
                res.json(results1);
            }
          });
      }else{
            console.log('InsertNews error！')
      }  
   
    // res.json({state:'ok',message:'Insert into database success'});
  });
});

//deleteNews
router.post('/deleteNews',function(req,res,next){
  var curId= req.body.id;
  // DELETE FROM `news` WHERE 1
   var sql2=`DELETE FROM news WHERE id=${curId}`;
  connection.query(sql2,function(error,results,fields){
   // console.log(results);
        if(error){
          console.log('Delete  user error!');
        }
      else{
         res.json(results);
      }    
  })
})


//update

router.post('/updateNews',function(req,res,next){
  
    var curId= req.body.id;
    var curTitle = req.body.title;
    var curContent = req.body.content;
    var curCategory = req.body.category;
    
    var curSource =req.body.source;
    var curTag = req.body.tag;
    var curImg = req.body.img;
    var curTime = req.body.time;

    
     var sql3=`UPDATE news SET title='${curTitle}',content='${curContent}',category= '${curCategory}',source='${curSource}',tag='${curTag}',img='${curImg}',time='${curTime}' WHERE id = ${curId}`;
    
     connection.query(sql3,function(error,results,fields){
      console.log(results);
          if(error){
            console.log('Update  user error!');
          }
        else{
            res.json(results);
        }    
    }) 
  })


 //search



  router.post('/searchCategory',function(req,res,next){
      console.log(req.body.category);
      var category = req.body.category;

      connection.query(`SELECT * FROM news WHERE category='${category}'`,function(error,results,fields){
        if(error){
          console.log('Get all users error!');
      }
      else{
          // console.log(results)
          res.json(results);
      }

 });



  })

  

module.exports = router;
