const userModel = require('../model/userModel');


const getRegister = (req,res,next)=>{
    
    if(req.session.userLevel==3)
    {
        res.render('reg',{
            username : req.session.username,
            level:req.session.userLevel
        });
    }
    else
    { 
        res.redirect('/userDashboard')
    }
}

const postRegister = (req,res,next)=>{
    //console.log(req.body)
   const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    userModel.findOne({ 
        where: { username: username }
    })
    .then(user => {
        if (user) {
            //console.log("User already exists");
            // res.send("User already exists");
            res.render("dashboard", {
                username: username,
                 role: role,
                level: level,
                msg: "User already exists",
              });
        } else {
            var level;
            if (role === 'User') {
                level = 1;
            } else if (role === 'Moderator') {
                level = 2;
            } else {
                level = 3;
            }
            //console.log(`level: ${level}`);
            userModel.create({
                username: username,
                password: password,
                role: role,
                level: level
            })
            .then(result => {
                //console.log(result);
                //console.log("New user registered");
                res.redirect('/userDashboard');
            })
            .catch(err => {
                console.log(err) ;
            });
        }
    })
    .catch(err => {
        console.log(err) ;
    });
}













const getLogin=(req,res,next)=>{
    res.render('login_simple');
    
}

const postLogin=(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    userModel.findOne(
        {
            where : { username : username }
        }
    )
    .then(user=>{
        if(!user){
            //console.log("User not found");

            return res.redirect('/login')
        }
        else
        {
            //console.log(user.role);
            //console.log(role);

            if(user.password === password && user.role === role)
            {
                req.session.isLoggedIn = true;
                req.session.username = username;
                req.session.userId = user.id;
                req.session.role = user.role;
                req.session.userLevel = user.level;

                //console.log("successful Login")
                res.redirect('/userDashboard')
            }
            else 
            {
                res.redirect('/login');

            }
        }
    })
    .catch(
        err=>console.log(err) 
        )
}
















const getUserDashboard=(req,res,next)=>{
    //console.log(req.session);
    //console.log(`check kra hu ${req.session.isLoggedIn}`)
    if(req.session.isLoggedIn)
    {
        userModel.findOne(
            {
                where : {id : req.session.userId}
            }
        )
        .then(user=>{
            res.render('dashboard',{
                username : user.username,
                password : user.password,
                role : user.role,
                level : user.level,
                msg : ""
            });
        })
        .catch(
            err=>console.log(err) 
        )
    }
    else
    {
        res.redirect('/');
    }
}










const getRegisteredUsers = (req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        if(req.session.userLevel>1)
        {
            userModel.findAll()
                .then((data)=>{
                    res.render('registeredUsers',{
                        data:data, 
                        username : req.session.username,
                        level:req.session.userLevel
                    })
                })
                .catch((err)=>
                console.log(err) 
                )
        }
        else 
        {
            res.redirect('/userDashboard')
        }
    }
    else
    {
        // res.redirect('/');
        res.redirect('/userDashboard')
    }
}







const postRegisteredUsers =(req,res,next)=>{
    var id = req.body.id;
    if(req.body.op==="del")
    {
        userModel.destroy({
            where: { id : id}
        })
        .then((result)=>
            res.redirect('/registeredUsers'),
        )
        .catch((err)=>
        console.log(err) 
    )
    }
    else if(req.body.op==="edt")
    {
        //console.log(req.body.id);
        userModel.update({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        },
        {
            where: {id: id}
        }
        )
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err) ;
        })
    }
}









const getLogout = (req,res,next)=>{
    req.session.isLoggedIn = false;
    req.session.destroy();
    res.redirect('/');
}

const getProducts = (req,res,next)=>{
    res.render('products',{
        data:req.session.isLoggedIn
      });
}

const getDistribution = (req,res,next)=>{
    res.render('distribution',{
        data:req.session.isLoggedIn
      });
}

const getVendors = (req,res,next)=>{
    res.render('vendors',{
        data:req.session.isLoggedIn
      });
}

const getTeam = (req,res,next)=>{
    res.render('team',{
        data:req.session.isLoggedIn
      });
}

const getCoal = (req,res,next)=>{
    res.render('coal',{
        data:req.session.isLoggedIn
      });
}

const getCoke = (req,res,next)=>{
    res.render('coke',{
        data:req.session.isLoggedIn
      });
}

const getCharcoal = (req,res,next)=>{
    res.render('charcoal',{
        data:req.session.isLoggedIn
      });
}

const getCoaldust = (req,res,next)=>{
    res.render('coaldust',{
        data:req.session.isLoggedIn
      });
}

const getPigiron = (req,res,next)=>{
    res.render('pigiron',{
        data:req.session.isLoggedIn
      });
}

const getFerroalloys = (req,res,next)=>{
    res.render('ferroalloys',{
        data:req.session.isLoggedIn
      });
}




module.exports = {
    getLogin,
    postLogin,
    getUserDashboard,
    getRegister,
    postRegister,
    getRegisteredUsers,
    postRegisteredUsers,
    getLogout,
    getProducts,
    getDistribution,
    getVendors,
    getTeam,
    getCoal,
    getCoke,
    getCharcoal,
    getCoaldust,
    getPigiron,
    getFerroalloys
}