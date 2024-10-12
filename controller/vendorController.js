const vendorContactModel = require('../model/vendorContactModel');
const masterVendorsModel = require('../model/masterVendorsModel');
const masterFirmModel = require('../model/masterFirmModel');
const vendorFirmModel = require('../model/vendorFirmModel');
const masterProductsModel = require('../model/masterProductsModel');
const vendorProductsModel = require('../model/vendorProductsModel');

const getVendorContacts =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        
        masterVendorsModel.findAll()
        .then((vendorData)=>{
            vendorContactModel.findAll()
            .then((data)=>{
                //console.log(data);
                res.render('vendorContact',{
                    username : req.session.username,
                    data:data,
                    vendorData:vendorData,
                    level: req.session.userLevel
                })
            })
            .catch((err)=>
                console.log(err)
            )
        })
        .catch((err)=>
        console.log(err)
        )
    }
    else 
    {
        res.redirect('/')
    }
}

const postVendorContacts =(req,res,next)=>{
    //console.log(`check1 ${req.body.id}`);
    //console.log(`check2 ${req.body.category}`);
    const id = req.body.id;
    if(req.body.op==="del")
    {
        vendorContactModel.destroy({
            where: { vendorId : id}
        })
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body.op==="edt")
    {
        //console.log("new yr");
        vendorContactModel.update({
            vendorName: req.body.vendorName,
            mobileNumber: req.body.mobileNumber,
            designation :req.body.designation,
            email :req.body.email
          },
          {
              where: {vendorId: req.body.id}
          }
        )
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else
    {
        const vendorName = req.body.vendorName
        const contacts = req.body.contact || null
        const designations = req.body.designation
        const emails = req.body.email
        
        if(contacts)
        {
            //console.log(contacts)
            //console.log(designations)
            //console.log(emails)
            for (let i = 0; i < contacts.length; i++) {
                const contact = contacts[i];
                const designation = designations[i];
                const email = emails[i];
            
                vendorContactModel
                .create({
                    vendorName: vendorName,
                    mobileNumber: contact,
                    designation: designation,
                    email: email,
                })
                .then((res2) => {
                    //console.log(res2);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }

        res.redirect('/vendorContacts')
                
               
            
    }
    
}






const getVendorFirm =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        
        masterVendorsModel.findAll()
        .then((vendorData)=>{
            masterFirmModel.findAll()
            .then((firmData)=>{
                vendorFirmModel.findAll()
                .then((data)=>{
                    //console.log(data);  
                    res.render('vendorFirm',{
                        username : req.session.username,
                        data:data,
                        vendorData:vendorData,
                        firmData:firmData,
                        level: req.session.userLevel
                    })
                })
                .catch((err)=>
                    console.log(err)
                )
            })
            .catch((err)=>
                console.log(err)
            )
        })
        .catch((err)=>
        console.log(err)
        )
    }
    else 
    {
        res.redirect('/')
    }
}



const postVendorFirm =(req,res,next)=>{
    //console.log(`check1 ${req.body.id}`);
    const id = req.body.id;
    if(req.body.op==="del")
    {
        vendorFirmModel.destroy({
            where: { id : id}
        })
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body.op==="edt")
    {
        //console.log("new yr");
        vendorFirmModel.update({
            vendorName: req.body.vendorName,
            firm :req.body.firm
          },
          {
              where: {id: req.body.id}
          }
        )
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else
    {
        vendorFirmModel.create({
            vendorName :req.body.vendorName,
            firm :req.body.firm
        })
        .then((result)=>{
            //console.log(result),
            res.redirect('/vendorFirm');
        })
        .catch((err)=>
            console.log(err)
        )
    }
    
}







const getVendorProduct =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        
        masterVendorsModel.findAll()
        .then((vendorData)=>{
            masterProductsModel.findAll()
            .then((prodData)=>{
                vendorProductsModel.findAll()
                .then((data)=>{
                    //console.log(data);
                    res.render('vendorProduct',{
                        username : req.session.username,
                        data:data,
                        vendorData:vendorData,
                        prodData:prodData,
                        level: req.session.userLevel
                    })
                })
                .catch((err)=>
                    console.log(err)
                )
            })
            .catch((err)=>
                console.log(err)
            )
        })
        .catch((err)=>
        console.log(err)
        )
    }
    else 
    {
        res.redirect('/')
    }
}



const postVendorProduct =(req,res,next)=>{
    //console.log(`check1 ${req.body.id}`);
    const id = req.body.id;
    if(req.body.op==="del")
    {
        vendorProductsModel.destroy({
            where: { id : id}
        })
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body.op==="edt")
    {
        //console.log("new yr");
        vendorProductsModel.update({
            vendorName: req.body.vendorName,
            product: req.body.product
          },
          {
              where: {id: req.body.id}
          }
        )
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else
    {
        vendorProductsModel.create({
            vendorName: req.body.vendorName,
            product: req.body.product
        })
        .then((result)=>{
            //console.log(result),
            res.redirect('/vendorProduct');
        })
        .catch((err)=>
            console.log(err)
        )
    }
    
}

module.exports = {
    getVendorContacts,
    postVendorContacts,
    getVendorFirm,
    postVendorFirm,
    getVendorProduct,
    postVendorProduct
}