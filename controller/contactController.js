const masterVendorsModel = require('../model/masterVendorsModel');
const vendorContactModel = require('../model/vendorContactModel');
const masterCustomerModel = require('../model/masterCustomerModel');
const customerContactModel = require('../model/customerContactModel');
const transportDetailModel = require('../model/transportDetailModel');
const transportContactModel = require('../model/transportContactModel');
const transportTruckModel = require('../model/transportTruckModel');
const masterEmployeeModel = require('../model/masterEmployeeModel');

const getContacts =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        transportDetailModel.findAll()
        .then((transportData)=>{
            masterVendorsModel.findAll()
            .then((vendorData)=>{
                vendorContactModel.findAll()
                .then((vendorContactData)=>{
                    masterCustomerModel.findAll()
                    .then((customerData)=>{
                        customerContactModel.findAll()
                        .then((customerContactData)=>{
                            transportContactModel.findAll()
                            .then((transportContactData)=>{
                                masterEmployeeModel.findAll()
                                .then((employeeData)=>{
                                    transportTruckModel.findAll()
                                    .then((truckData)=>{
                                        res.render('contacts',{
                                            username : req.session.username,
                                            level: req.session.userLevel,
                                            vendorData:vendorData,
                                            customerData:customerData,
                                            customerContactData:customerContactData,
                                            transportData:transportData,
                                            employeeData:employeeData,                                        
                                            transportContactData:transportContactData,                                        
                                            vendorContactData:vendorContactData,                                        
                                            truckData:truckData,                                        
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

const postContacts =(req,res,next)=>{
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
        
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            const designation = designations[i];
            const email = emails[i];
        
            vendorContactModel.create({
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
        res.redirect('/vendorContact')
                
               
            
    }
    
}

module.exports = {
    getContacts,
    postContacts
}