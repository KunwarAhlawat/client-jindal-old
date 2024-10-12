const { QueryTypes } = require('sequelize');
const sequelize = require('../database/connect');
const masterAreaModel = require('../model/masterAreaModel')
const transportDetailModel = require('../model/transportDetailModel');
const transportContactModel = require('../model/transportContactModel');
const transportStationModel = require('../model/transportStationModel');
const transportTruckModel = require('../model/transportTruckModel');




const getTransportDetails =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        
        //console.log(`User Level :  ${req.session.userLevel}`);
        transportDetailModel.findAll()
        .then((data)=>{
            //console.log(data);
            masterAreaModel.findAll()
            .then((areaData)=>{
                res.render('transportDetail',{
                    username : req.session.username,
                    data:data,
                    areaData:areaData,
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

const postTransportDetails =(req,res,next)=>{
    //console.log(`check1 ${req.body.id}`);
    //console.log(`check2 ${req.body.op}`);
    const id = req.body.id;
    if(req.body.op==="del")
    {
        transportDetailModel.destroy({
            where: { transportId : id}
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
        transportDetailModel.update({
            transportName: req.body.transportName,
            transportArea: req.body.transportArea,
            transportStation: req.body.transportStation,
            transportOwner: req.body.transportOwner,
            bankName: req.body.bankName,
            bankAccountNumber: req.body.bankAccountNumber,
            ifscCode: req.body.ifscCode
          },
          {
              where: {transportId: req.body.id}
          }
        )
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body.op==='filterTruck')
    {
        //console.log("truck")
        //console.log(req.body.transportId)
        transportTruckModel.findAll(
            {
                where : {transportName : req.body.transportId}
            }
        ).then((result)=>res.send(result))
        .catch((err)=>console.log(err))
    }
    else if(req.body.op==='fil')
    {
        //console.log(req.body.transportAreaFil);
        let area=req.body.transportAreaFil;

        sequelize.query("SELECT * FROM transport_details AS transport_detail WHERE (transportArea IN (CASE WHEN ? !='' THEN (?) ELSE transportArea END))",
        {
            replacements: [area,area],
            type: QueryTypes.SELECT
        })
        .then((dataFil)=>{
            //console.log(dataFil);
            res.send(dataFil);
                
        })
        .catch((err)=>
            console.log(err)
        )
    }
    else
    {
        const contacts = req.body.contact || null
        const contactNames = req.body.contactName
        const designations = req.body.designation
        const emails = req.body.email
        const transportTrucks = req.body.transportTruck || [];
        const capacities = req.body.capacity || [];
        const bodyTypes = req.body.bodyType || [];
        const ownerNames = req.body.ownerName || [];
        const driverNames = req.body.driverName || [];
        const ownerMobileNumbers = req.body.ownerMobileNumber || [];
        const driverMobileNumbers = req.body.driverMobileNumber || [];

        transportDetailModel.create({
            transportName :req.body.transportName,
            transportArea :req.body.transportArea,
            transportStation :req.body.transportStation,
            transportOwner :req.body.transportOwner,
            bankName :req.body.bankName,
            bankAccountNumber :req.body.bankAccountNumber,
            ifscCode :req.body.ifscCode
        })
        .then((result)=>{
            if(contacts)
            {
                for (let i = 0; i < contacts.length; i++) {
                    const contactName = contactNames[i];
                    const contact = contacts[i];
                    const designation = designations[i];
                    const email = emails[i];
                
                    transportContactModel.create({
                        transportName: result.transportId,
                        contactName: contactName,
                        mobileNumber: contact,
                        designation: designation,
                        email: email,
                    })
                    .then((result) => {
                        //console.log(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            }

            if(transportTrucks)
            {
                for (let i = 0; i < transportTrucks.length; i++) {
                    const transportTruck = transportTrucks[i];
                    const capacity = capacities[i];
                    const bodyType = bodyTypes[i];
                    const ownerName = ownerNames[i];
                    const driverName = driverNames[i];
                    const ownerMobileNumber = ownerMobileNumbers[i];
                    const driverMobileNumber = driverMobileNumbers[i];
                  
                    transportTruckModel
                      .create({
                        transportName: result.transportId,
                        transportTruck: transportTruck,
                        capacity: capacity,
                        bodyType: bodyType,
                        ownerName: ownerName,
                        driverName: driverName,
                        ownerMobileNumber: ownerMobileNumber,
                        driverMobileNumber: driverMobileNumber
                      })
                      .then((result) => {
                        //console.log(result);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
            }

            if(req.body.transportSource)
            {
                transportStationModel.create({
                    transportName :result.transportId,
                    transportSource :req.body.transportSource,
                    transportDestination :req.body.transportDestination                  
                })
                .then((result) => {
                    //console.log(result);
                })
                .catch((err) => 
                {
                    console.log(err);
                });
            }
            res.redirect('/transportDetails')
        })
        .catch((err)=>
            console.log(err)
        )
    }
    
}





const getTransportContacts =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        transportDetailModel.findAll()
        .then((transData)=>{

            //console.log(`User Level :  ${req.session.userLevel}`);
            transportContactModel.findAll()
            .then((data)=>{
                
                //console.log(data);
                res.render('transportContact',{
                    username : req.session.username,
                    data:data,
                    transData:transData,
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


const postTransportContacts =(req,res,next)=>{
    //console.log(`check1 ${req.body.id}`);
    //console.log(`check2 ${req.body.category}`);
    const id = req.body.id;
    if(req.body.op==="del")
    {
        transportContactModel.destroy({
            where: { transportId : id}
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
        transportContactModel.update({
            transportName: req.body.transportName,
            mobileNumber: req.body.mobileNumber,
            designation :req.body.designation,
            email :req.body.email
          },
          {
              where: {transportId: req.body.id}
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
        transportContactModel.create({
            transportName :req.body.transportName,
            mobileNumber :req.body.mobileNumber,
            designation :req.body.designation,
            email :req.body.email
        })
        .then((result)=>{
            //console.log(result),
            transportContactModel.findAll()
            .then((data)=>{
                //console.log(data);
                res.redirect('/transportContacts');
            })
            .catch((err)=>
                console.log(err)
            )
        })
        .catch((err)=>
            console.log(err)
        )
    }
    
}










const getTransportStations =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        
        //console.log(`User Level :  ${req.session.userLevel}`);
        transportStationModel.findAll()
        .then((data)=>{
            transportDetailModel.findAll()
            .then((transData)=>{
                //console.log(data);
                res.render('transportStation',{
                    username : req.session.username,
                    data:data,
                    transData:transData,
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


const postTransportStations =(req,res,next)=>{
    //console.log(`check1 ${req.body.transportName}`);
    const id = req.body.id;
    if(req.body.op==="del")
    {
        transportStationModel.destroy({
            where: { transportId : id}
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
        transportStationModel.update({
            transportName: req.body.transportName,
            transportSource: req.body.transportSource,
            transportDestination: req.body.transportDestination
          },
          {
              where: {transportId: req.body.id}
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
        const transportName = req.body.transportName;
        const transportSource = req.body.transportSource;
        const transportDestination = req.body.transportDestination;
        transportStationModel.create({
            transportName :transportName,
            transportSource :transportSource,
            transportDestination :transportDestination
        })
        .then((result)=>{
            //console.log(result),
            transportStationModel.findAll()
            .then((data)=>{
                //console.log(data);
                res.redirect('/transportStations');
            })
            .catch((err)=>
                console.log(err)
            )
        })
        .catch((err)=>
            console.log(err)
        )
    }
    
}












const getTransportTrucks =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        
        //console.log(`User Level :  ${req.session.userLevel}`);
        transportTruckModel.findAll()
        .then((data)=>{
            transportDetailModel.findAll()
            .then((transData)=>{            
                //console.log(data);
                res.render('transportTruck',{
                    username : req.session.username,
                    data:data,
                    transData:transData,
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


const postTransportTrucks =(req,res,next)=>{
    //console.log(`check1 ${req.body.transportId}`);
    const id = req.body.id;
    if(req.body.op==="del")
    {
        transportTruckModel.destroy({
            where: { transportId : id}
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
        transportTruckModel.update({
            transportName: req.body.transportName,
            transportTruck: req.body.transportTruck,
            ownerName: req.body.ownerName,
            driverName: req.body.driverName,
            ownerMobileNumber: req.body.ownerMobileNumber,
            driverMobileNumber: req.body.driverMobileNumber,
            capacity: req.body.capacity,
            ...(req.body.bodyType !== "null" && { bodyType: req.body.bodyType })

          },
          {
              where: {transportId: req.body.id}
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
        const transportNames = req.body.transportName; // Assuming transportNames is an array of transport names

        // Loop through each transport name and create a separate entry in the database
        Promise.all(
          transportNames.map(transportName => {
            const transportTruck = req.body.transportTruck;
            const ownerMobileNumber = req.body.ownerMobileNumber;
            const driverMobileNumber = req.body.driverMobileNumber;
            const ownerName = req.body.ownerName;
            const driverName = req.body.driverName;
            const bodyType = req.body.bodyType;
            const capacity = req.body.capacity;
            
            return transportTruckModel.create({
              transportName: transportName,
              transportTruck: transportTruck,
              ownerMobileNumber: ownerMobileNumber,
              driverMobileNumber: driverMobileNumber,
              ownerName: ownerName,
              driverName: driverName,
              bodyType: bodyType,
              capacity: capacity
            });
          })
        )
          .then(() => {
            transportTruckModel.findAll()
              .then(data => {
                //console.log(data);
                res.redirect('/transportTrucks');
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
    }
    
}











module.exports = {
    getTransportDetails,
    postTransportDetails,
    getTransportContacts,
    postTransportContacts,
    getTransportStations,
    postTransportStations,
    getTransportTrucks,
    postTransportTrucks
}