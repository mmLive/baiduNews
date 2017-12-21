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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{state:'ok',message:'Get into index.ejs'});
});

//Get login page
router.get('/login', function(req, res, next) {
   res.render('login');
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('user');
  res.redirect('/login');
  // res.render('login');
});


//register 
router.post('/registerUser',function(req,res,next){
    var username=req.body.username;
    var pwd=req.body.password;
    console.log(username,pwd);

    // SELECT `user_id`, `user_name`, `user_pwd` FROM `users` WHERE 1
    var sql=`SELECT *  FROM users WHERE user_name='${username}'`;
    console.log(sql)

    connection.query(sql,function(error,results,fields){
      if(error){
             console.log(error);
             console.log('查询用户是否存在数据库出错！');
         }
     else{
          console.log(results);
          if(results.length===0){
             // 数据库中 没有此用户 插入
             // INSERT INTO `users`(`user_id`, `user_name`, `user_pwd`) VALUES ([value-1],[value-2],[value-3])

              var sql1 = `INSERT INTO users (user_name, user_pwd) VALUES ('${username}','${pwd}')`;
              connection.query(sql1,function(error,results,fields){
                  if(error){console.log(error)}
                  else{
                    // console.log(results.insertId); 
                    //插入之后，再查询出来返回前端
                    connection.query(`SELECT *  FROM users WHERE user_id=${results.insertId}`,function(error,results,fields){
                      if(error){console.log(error)}
                      else{
                        console.log(666);
                        console.log(results);
                         res.json(results);//直接返回到页面，不用输入
                      }
                    })
                  }
              })
            }
          else{
             // 数据库中已存在该用户
              console.log(results);  //{ user_id: 3, user_name: '12', user_pwd: '12' } ]
             res.json({state:'ok',message:'用户已注册，请直接登录！'});
              // res.json(results);
          }     
    }
  });
});


//Sign in
 router.post('/submitUser',function(req,res,next){
  var username=req.body.username;
  var pwd=req.body.password;
  console.log(username,pwd);

  // SELECT `user_id`, `user_name`, `user_pwd` FROM `users` WHERE 1
   var sql=`SELECT *  FROM users WHERE user_name='${username}'`;
    console.log(sql)

  connection.query(sql,function(error,results,fields){
    if(error){
           console.log(error);
           console.log('查询用户是否存在数据库出错！');
       }
   else{
        console.log(results);//[{ user_id: 13, user_name: 'jj', user_pwd: 'jj' } ]
        console.log(results[0].user_name);
        console.log(results[0].user_pwd);

        if(results.length===1 && results[0].user_name==username &&results[0].user_pwd==pwd){
            // 数据库有该用户名的用户
            
            //设置cookie
            //  res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true }) 也就是登录时选择了页面上的‘记住’ 就可以设置cookie下次（有效期内）可以直接进入页面  这里我们直接设置cookie  
            res.cookie('user', {'username':username}, { maxAge: 60000, httpOnly: false }) 

           res.send({state:'ok',message:'登录成功'});//和res.json的区别就是传字符串对象的时候 后者不用转换成json对象
           
            }
        else{
             // 数据库无此用户
            console.log(results); 
           res.json({state:'no',message:'用户不存在，请先注册！'});
           
        }     
  }
});


  
  });


//The following is the page configuration that can be viewed directly without logging in

 router.get('/getNews', function(req, res, next) {
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



module.exports = router;