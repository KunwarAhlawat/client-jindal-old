const express = require('express'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const masterCtrl = require('./controller/masterController');

const moment = require('moment');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))      
app.use('/images',express.static(path.join(__dirname,'images')))      
app.use(session({secret: 'my secret',resave: false, saveUninitialized: false}));

app.use(express.json())
app.locals.moment = moment;
const fileStorage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,'images');
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toISOString().replace(/:/g, '-')+'-'+file.originalname)
  }
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
  {
    cb(null,true)
  }else{
    cb(null,false)
  }
}



app.set("view engine","ejs"); 
app.set("views","./views");

const sequelize = require('./database/connect');
const userRoutes = require('./routes/userRoutes');
const masterRoutes = require('./routes/masterRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transportRoutes = require('./routes/transportRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const marketPlanRoutes = require('./routes/marketPlanRoutes');
const contactRoutes = require('./routes/contactRoutes');


app.use(multer({ storage : fileStorage,fileFilter: fileFilter}).single('photo'))
// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });
// app.post('/upload-csv', upload.single('csvFile'), masterCtrl.importCsv);

app.use(userRoutes);
app.use(masterRoutes);
app.use(customerRoutes);
app.use(transportRoutes);
app.use(vendorRoutes);
app.use(marketPlanRoutes);
app.use(contactRoutes);

app.use('/',(req,res,next)=>{
    console.log(req.session);
    res.render('index',{
      data:req.session.isLoggedIn
    });
});

  



const port = process.env.PORT || 3000;

sequelize.sync()
    .then(result => {
        app.listen(port,()=>{
            console.log(`Server is running at port no ${port}`);
        });
    })
    .catch(err =>{
        console.log(err);
    });
