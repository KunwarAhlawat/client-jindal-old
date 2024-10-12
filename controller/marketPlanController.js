const { QueryTypes, where } = require('sequelize');
const sequelize = require('../database/connect');
const marketPlanPigIronModel = require('../model/marketPlanPigIronModel');
const marketPlanQuantityLedgerModel = require('../model/marketPlanQuantityLedgerModel');
const marketPlanAllotmentModel = require('../model/marketPlanAllotmentModel');
const masterAreaModel = require('../model/masterAreaModel');
const masterGradeModel = require('../model/masterGradeModel');
const masterCategoriesModel = require('../model/masterCategoriesModel');
const masterCustomerModel = require('../model/masterCustomerModel');
const masterProductsModel = require('../model/masterProductsModel');
const masterTeamsModel = require('../model/masterTeamsModel');
const customerContactModel = require('../model/customerContactModel');
const customerCategoryModel = require('../model/customerCategoryModel');
const customerFirmModel = require('../model/customerFirmModel');
const customerProductModel = require('../model/customerProductModel');
const masterFirmModel = require('../model/masterFirmModel');
const masterEmployeeModel = require('../model/masterEmployeeModel');
const reportModel = require('../model/reportModel');
const moment = require('moment');
 
const allotmentModel = require("../model/allotmentMarketPlan")

const { v4: uuidv4 } = require('uuid');

const getMarketPlanPigIron = async (req, res, next) => {
    try {
        if (req.session.isLoggedIn) {
            //console.log(`User Level: ${req.session.userLevel}`);
            
            let data, areaData, gradeData, productData, catdata, custdata, teamData, firmData, custProdData;

            if (req.session.userLevel === 1) {
                data = await marketPlanPigIronModel.findAll();
                //console.log(data);
                areaData = await masterAreaModel.findAll();
                gradeData = await masterGradeModel.findAll();
                productData = await masterProductsModel.findAll();
                catdata = await masterCategoriesModel.findAll();
                custdata = await masterCustomerModel.findAll({ where: { status: "VERIFIED" } });
                teamData = await masterTeamsModel.findAll();
                firmData = await masterFirmModel.findAll();
                custProdData = await customerProductModel.findAll();
            } else {
                data = await marketPlanPigIronModel.findAll();
                //console.log(data);
                areaData = await masterAreaModel.findAll();
                gradeData = await masterGradeModel.findAll();
                productData = await masterProductsModel.findAll();
                catdata = await masterCategoriesModel.findAll();
                custdata = await masterCustomerModel.findAll({ where: { status: "VERIFIED" } });
                teamData = await masterTeamsModel.findAll();
                firmData = await masterFirmModel.findAll();
                custProdData = await customerProductModel.findAll();
                //console.log("hello", custProdData);
            }

            res.render('marketPlanPigIron', {
                username: req.session.username,
                level: req.session.userLevel,
                data: data,
                dataFil: [],
                areaData: areaData,
                gradeData: gradeData,
                catdata: catdata,
                custdata: custdata,
                teamData: teamData,
                productData: productData,
                firmData: firmData,
                custProdData: custProdData
            });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
};

const postMarketPlanPigIron = async (req,res,next)=>{
    //console.log("checking")
    var id = req.body.id;
    if(req.body.op==="del")
    {
        marketPlanPigIronModel.destroy({
            where: { serialNumber : id}
        })
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body.op==="uedt")
    {
        //console.log("uEdit");
        const nxtDate = req.body.nextDate;
        //console.log(nxtDate)
        marketPlanPigIronModel.findAll(
            {
                where : {serialNumber : req.body.id}
            }
        )
        .then((data)=>{
            //console.log(data)
            //console.log(data[0].nextDate)
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            if(nxtDate!=data[0].nextDate && nxtDate)
            {
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                marketPlanPigIronModel.create({
                    customerName: req.body.customerName,
                    area: req.body.area,
                    grade: req.body.grade,
                    category: req.body.category,
                    product: req.body.product,
                    lastDelivery: req.body.lastDelivery,
                    representative: req.body.representative,
                    phoneNumber: req.body.phoneNumber,
                    meetingDates: nxtDate
                })
                .then((result)=>
                //console.log(result),         
                //console.log('New Market Plan added'),
                res.redirect('/marketPlanPigIron')
                )
                .catch((err)=>
                console.log(err)
                )
            }
            
            //console.log(req.body.id);
            marketPlanPigIronModel.update({
                    
                    currentRemark: req.body.currentRemark,
                    
                    nextDate: req.body.nextDate,
                    currentIssue: req.body.currentIssue,
                    
                },
                {
                    where: {serialNumber: req.body.id}
                }
                )
            .then((qwe)=>{
                res.send("kyu")
            })
            .catch((err)=>{
                    console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body.op==="edt")
    {
        const nxtDate = req.body.nextDate;
        //console.log(nxtDate)
        marketPlanPigIronModel.findAll(
            {
                where : {serialNumber : req.body.id}
            }
        )
        .then((data)=>{
            //console.log(data)
            //console.log(data[0].nextDate)
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            //console.log("****************************************")
            if(nxtDate!=data[0].nextDate && nxtDate)
            {
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                //console.log("/=/+/+/++/+/+/+/++/+/+/+/+/+/+/+/+/+/")
                marketPlanPigIronModel.create({
                    customerName: req.body.customerName,
                    area: req.body.area,
                    grade: req.body.grade,
                    category: req.body.category,
                    product: req.body.product,
                    lastDelivery: req.body.lastDelivery,
                    representative: req.body.representative,
                    phoneNumber: req.body.phoneNumber,
                    meetingDates: nxtDate
                })
                .then((result)=>
                //console.log(result),
                //console.log('New Market Plan added'),
                res.redirect('/marketPlanPigIron')
                )
                .catch((err)=>
                console.log(err)
                )
            }
            
            //console.log(req.body.id);
            marketPlanPigIronModel.update({
                    area: req.body.area,
                    grade: req.body.grade,
                    category: req.body.category,
                    product: req.body.product,
                    lastDelivery: req.body.lastDelivery,
                    representative: req.body.representative,
                    phoneNumber: req.body.phoneNumber,
                    meetingDates: req.body.meetingDates,
                    currentRemark: req.body.currentRemark,
                    remarkStatus: req.body.remarkStatus,
                    nextDate: req.body.nextDate,
                    currentIssue: req.body.currentIssue,
                    analysed: req.body.analysed,
                    updateTimeStamp: req.body.updateTimeStamp,
                    totalIssue: req.body.totalIssue
                },
                {
                        where: {serialNumber: req.body.id}
                    }
                    )
            .then((qwe)=>{
                res.send("kyu")
            })
            .catch((err)=>{
                    console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body.op==="marktrep")
    {
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        customerProductModel.findAll({
            where : {customerId : req.body.value}
        })
        .then((holidata)=>{
            //console.log(holidata);
            let custname=holidata[0].customerName;
            marketPlanPigIronModel.findAll({
                where : {customerName : custname}
            })
            .then((reprtData)=>
            {
                //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                //console.log(reprtData)
                res.send(reprtData)
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    else if(req.body.op==="cinf")
    {
        //console.log("########################################")
        //console.log(req.body.value);
        //console.log("########################################")
        
        customerContactModel.findAll({
            where : {customerName : req.body.value}
        })
        .then((cntctdata)=>{      
            //console.log("----------------------------------------------------") 
            //console.log(cntctdata) 

            masterCustomerModel.findAll({
                where : {customerName : req.body.value}
            })
            .then((data)=>
            {
                //console.log(data);
                // Object.assign(cntctdata, data);
                customerProductModel.findAll({
                    where : {customerName : req.body.value}
                })
                .then((prdctdata)=>{
                    customerCategoryModel.findAll({
                        where : {customerName : req.body.value}
                    })    
                    .then((catdata)=>{
                        customerFirmModel.findAll({
                            where : {customerName : req.body.value}
                        })
                        .then((firmData)=>{
                            marketPlanPigIronModel.findAll({
                                where : {customerName : req.body.value}
                            })
                            .then((reprtData)=>{
                                //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                                //console.log(catdata.length);
                                //console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                                //console.log(prdctdata.length);
                                //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                                //console.log(data);
                                //console.log("######################################");
                                //console.log(cntctdata.length);
                                //console.log("***************************************");

                               if(data.length!=0 && cntctdata.length!=0 && prdctdata.length!=0 && catdata.length!=0  )
                                {
                                    let sData = {
                                        ...data[0].dataValues,
                                        ...cntctdata[0].dataValues,
                                        ...catdata[0].dataValues,
                                        ...firmData[0].dataValues
                                    };
                                    let fData = { 
                                        ...sData,
                                        ...prdctdata
                                    }
                                    let tData = { 
                                        ...fData,
                                        ...reprtData
                                    }
                                    //console.log("----------------------------------------------")        
                                    //console.log(sData)  
                                    //console.log("----------------------------------------------")        
                                    //console.log(fData)
                                    //console.log("----------------------------------------------")        
                                    //console.log(tData)
                                    //console.log("----------------------------------------------")        
                                    res.send(fData)
                                }
                                else
                                {
                                    res.send(null)
                                }
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                        })
                        .catch((err)=>{
                            console.log(err);
                        })    
                    })
                    .catch((err)=>{
                        console.log(err);
                    })  
                })
                .catch((err)=>{
                    console.log(err);
                })          
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    
        
    }
        else if(req.body.op==="fil")
        {
            //console.log(req.body.customerNameFil);
            //console.log(req.body.areaFil);
            //console.log(req.body.gradeFil);
            //console.log(req.body.categoryFil);
            //console.log(req.body.productFil);
            //console.log(req.body.representativeFil);
            //console.log(req.session.username);

            const { customerNameFil, areaFil, gradeFil, categoryFil, productFil, representativeFil } = req.body;

            let filter = {};

            if (customerNameFil && customerNameFil.length > 0) {
                filter.customerName = customerNameFil;
            }

            if (areaFil && areaFil.length > 0) {
                filter.area = areaFil;
            }

            if (gradeFil && gradeFil.length > 0) {
                filter.grade = gradeFil;
            }

         
            // if (categoryFil && categoryFil.length > 0) {
            //     filter.category = categoryFil;
            // }

            // if (productFil && productFil.length > 0) {
            //     filter.product = productFil;
            // }

            if (representativeFil && representativeFil.length > 0) {
                filter.representative = representativeFil;
            }
            //console.log("filter part" , filter)

            // if there is no filter data
            if (Object.keys(filter).length === 0 && !categoryFil && !productFil ) {
                // If there are no filters and no category, fetch all customers
                const customers = await masterCustomerModel.findAll();
                //console.log("All customers:", customers);
                return res.json(customers);


            } else {

                // category filter
                if (categoryFil) {
                    let categories;
                    
                    if (Array.isArray(categoryFil)) {
                        // Fetch multiple categories
                        categories = await masterCategoriesModel.findAll({
                            where: {
                                categoriesType: categoryFil
                            }
                        });
                    } else {
                        // Fetch a single category
                        categories = await masterCategoriesModel.findOne({
                            where: {
                                categoriesType: categoryFil
                            }
                        });
                
                        // Wrap the single category in an array to unify processing
                        categories = categories ? [categories] : [];
                    }
                
                    if (categories.length === 0) {
                        return res.status(404).json({ error: 'Category not found.' });
                    }
                
                    // Extract category IDs
                    const categoryIds = categories.map(category => category.categoriesId);
                
                    // Fetch customer IDs associated with the categories
                    const customerCategories = await customerCategoryModel.findAll({
                        where: {
                            category: categoryIds // Filter by array of category IDs
                        },
                        attributes: ['customerName'] // Select only the customerName column
                    });
                
                    // Extract customerIds from the result
                    const customerIds = customerCategories.map(row => row.customerName);
                
                    //console.log("==== customer", customerIds);
                
                    // Fetch customers based on filters and associated with the category
                    const customers = await masterCustomerModel.findAll({
                        where: {
                            ...filter,
                            customerId: customerIds // Filter by customerIds associated with the category
                        }
                    });
                
                    //console.log("Filtered customers:", customers);
                    return res.json(customers);
                }

                // product filter
                if (productFil) {
                    let products;
                    
                    if (Array.isArray(productFil)) {
                        // Fetch multiple products
                        products = await masterProductsModel.findAll({
                            where: {
                                productName: productFil
                            }
                        });
                    } else {
                        // Fetch a single product
                        products = await masterProductsModel.findOne({
                            where: {
                                productName: productFil
                            }
                        });
                
                        // Wrap the single product in an array to unify processing
                        products = products ? [products] : [];
                    }
                
                    //console.log("products============", products);
                
                    if (products.length === 0) {
                        return res.status(404).json({ error: 'Product not found.' });
                    }
                
                    // Extract product IDs
                    const productIds = products.map(product => product.productId);
                
                    // Fetch customer IDs associated with the products
                    const customerProducts = await customerProductModel.findAll({
                        where: {
                            product: productIds // Filter by array of product IDs
                        },
                        attributes: ['customerName'] // Select only the customerName column
                    });
                
                    // Extract customerIds from the result
                    const customerIds = customerProducts.map(row => row.customerName);
                
                    //console.log("==== customer", customerIds);
                
                    // Fetch customers based on filters and associated with the products
                    const customers = await masterCustomerModel.findAll({
                        where: {
                            ...filter,
                            customerId: customerIds // Filter by customerIds associated with the products
                        }
                    });
                
                    //console.log("Filtered customers:", customers);
                    return res.json(customers);
                }
                

                    // all filter 
                const customers = await masterCustomerModel.findAll({
                    where: {
                        ...filter,
                     }
                });

                //console.log("Filtered customers:", customers);
                return res.json(customers);
                
                // start
                // masterCategoriesModel.findOne({
                //     where: {
                //         categoriesType: filter.category
                //       }
                // }).then(cateData => {
                //     //console.log("=====================last part===================")
                //     if (cateData) {
                //         //console.log("=====================last part2===================")

                //         filter.categoryID = cateData.categoriesId;
                //     }
                //     //console.log("=====categoryID===================" , filter.categoryID) 

                    
                //     customerCategoryModel.findAll({
                //             where: {
                //                 category: filter.categoryID
                //               }
                //         }).then(custCate => {
                //             //console.log("=====customer category part===================",custCate)
                                        
                //                     masterCustomerModel.findAll({
                //                                                 where: filter
                //                                             }).then(dataUjjwal => {
                //                                                 //console.log("=======customer part===================")

                //                                                 //console.log(dataUjjwal);
                //                                                 res.json(dataUjjwal)
                //                                             }).catch(error => {
                //                                                 console.error(error);
                //                                             });

                //             //console.log(custCate);
                //             res.json(custCate)
                //         }).catch(error => {
                //             console.error(error);
                //         });


                //     // //console.log(cateData);
                //     // res.json(cateData)
                // }).catch(error => {
                //     console.error(error);
                // });

// end
                // masterCustomerModel.findAll({
                //     where: filter
                // }).then(dataUjjwal => {
                //     //console.log("=====================last part===================")

                //     //console.log(dataUjjwal);
                //     res.json(dataUjjwal)
                // }).catch(error => {
                //     console.error(error);
                // });


            }

        
            // let cust=req.body.customerNameFil;
            // let area=req.body.areaFil;
            // let grad=req.body.gradeFil;
            // let cate=req.body.categoryFil;
            // let prod=req.body.productFil;
            // let represent=req.body.representativeFil;

    
            

            // try {
            //     if (req.session.isLoggedIn) {
            //     const categorydata = await masterCategoriesModel.findAll();
            //     if(cust){
 
            //         const data = await masterCustomerModel.findAll({ where: { customerName: cust } });
            //         res.send( 
            //             data 
            //         );
            //     }
            //     if(cate){
            //           const catdata = await masterCategoriesModel.findOne({ where: { categoriesType: cate } });

 
            //          const custCategoryData = await customerCategoryModel.findAll({ where: { category: catdata.categoriesId } });
            //          const customerIds = custCategoryData.map(cat => cat.customerName);

            //          const data = await masterCustomerModel.findAll({ where: { customerId: customerIds } });

            //         //console.log("wwwwwwwwwwwwwwwwwwwwwwwwww" , data)
            //         res.send( 
            //             data 
            //         );
            //     }
            //     if (prod) {
                  
            //         const proddata = await masterProductsModel.findOne({ where: { productName: prod } });
                
            //         const custProductData = await customerProductModel.findAll({ where: { product: proddata.productId } });
                    
            //         const customerIds = custProductData.map(prod => prod.customerName);
                  
            //         const dataProd = await masterCustomerModel.findAll({ where: { customerId: customerIds } });
                
   
            //         //console.log("product data", dataProd);
            //         res.send(dataProd);
            //     }
            //     if (area) { 
                   
            //         const areadata = await masterAreaModel.findOne({ where: { areaId: area } });
                                 
            //         const custAreaData = await masterAreaModel.findAll({ where: { area: areadata.area } });
                                 
            //         const customerIds = custAreaData.map(area => area.customerName);
                                    
            //         const dataFiltered = await masterCustomerModel.findAll({ where: { customerId: customerIds } });
                
            //         //console.log("Filtered data based on area", dataFiltered);
            //         res.send(dataFiltered);
            //     }

            //     } else {
            //     res.redirect("/");
            //     }
            // } catch (err) {
            //     console.log(err);
            //     res.status(500).json({ error: "An error occurred" });
            // }



            
            // var repUser=req.session.username;

            // if(req.session.userLevel==1)
            // {
            //     sequelize.query("SELECT * FROM market_plan_pig_irons AS market_plan_pig_iron WHERE (customerName IN (CASE WHEN ? !='' THEN (?) ELSE customerName END)) AND (area IN (CASE WHEN ? !='' THEN(?) ELSE area END)) AND (grade IN (CASE WHEN ? !='' THEN(?) ELSE grade END)) AND (category IN (CASE WHEN ? !='' THEN(?) ELSE category END)) AND (product IN (CASE WHEN ? !='' THEN(?) ELSE product END)) AND (representative IN (CASE WHEN ? !='' THEN(?) ELSE representative END)) AND (representative IN (CASE WHEN ? !='' THEN(?) ELSE representative END))",
                
            //     {
            //         replacements: [cust,cust,area,area,grad,grad,cate,cate,prod,prod,represent,represent,repUser,repUser],
            //         type: QueryTypes.SELECT
            //     })
            //     .then((dataFil)=>{
            //         //console.log(dataFil);
            //         res.send(dataFil);
                    
            //     })
            //     .catch((err)=>
            //     console.log(err)
            //     )
            // }
            // else
            // {

            //     // sequelize.query("SELECT * FROM market_plan_pig_irons AS mppi WHERE (mppi.customerName IN (?)) AND (mppi.area IN (REPLACE(?,''',''))) AND (mppi.grade IN (?)) AND (mppi.category IN (?)) AND (mppi.product IN (?)) AND (mppi.representative IN (?))",
            //     // {
            //     //     replacements: [cust,area,grad,cate,prod,represent],
            //     sequelize.query("SELECT * FROM market_plan_pig_irons AS market_plan_pig_iron WHERE (customerName IN (CASE WHEN ? !='' THEN (?) ELSE customerName END)) AND (area IN (CASE WHEN ? !='' THEN(?) ELSE area END)) AND (grade IN (CASE WHEN ? !='' THEN(?) ELSE grade END)) AND (category IN (CASE WHEN ? !='' THEN(?) ELSE category END)) AND (product IN (CASE WHEN ? !='' THEN(?) ELSE product END)) AND (representative IN (CASE WHEN ? !='' THEN(?) ELSE representative END)) ",
            //     {
            //         replacements: [cust,cust,area,area,grad,grad,cate,cate,prod,prod,represent,represent],
            //         type: QueryTypes.SELECT
            //     })
            //     .then((dataFil)=>{
            //         //console.log(dataFil);
            //         res.send(dataFil);
                    
            //     })
            //     .catch((err)=>
            //     console.log(err)
            //     )
            // }
            
        }
    else {
        const customerName = req.body.customerName;
        const categoryProduct = req.body.categoryProduct;
        const representative = req.body.representative;
        const meetingDates = req.body.meetingDates;
        const lastDelivery = req.body.lastDelivery;
    
        //console.log(categoryProduct);
        //console.log(categoryProduct.substring(0, 1));
    
        var cat;
        if (categoryProduct.substring(0, 1) == 'R') {
            cat = "Retail";
        } else if (categoryProduct.substring(0, 1) == 'T') {
            cat = "Trader";
        } else if (categoryProduct.substring(0, 1) == 'W') {
            cat = "Wholesale";
        }
    
        //console.log(cat);
        //console.log(categoryProduct.substring(1));
    
        var prd = categoryProduct.substring(1);
    
        masterCustomerModel.findAll({
            where: { customerName: customerName }
        })
            .then((custData) => {
                //console.log("custoid" , custData)
                customerContactModel.findOne({
                    where: { customerName: custData[0].customerId }
                })
                    .then((contact) => {
                        //console.log("contact" , contact)    
                        marketPlanPigIronModel.create({
                            customerName: customerName,
                            area: custData[0].area, // Uncomment and complete
                            grade: custData[0].grade, // Uncomment and complete
                            category: cat,
                            product: prd,
                            representative: representative,
                            phoneNumber: contact.mobileNumber,
                            meetingDates: meetingDates,
                            lastDelivery: lastDelivery,
                            // Uncomment and complete other fields
                        })
                            .then((result) => {
                                //console.log(result);
                                //console.log('New Market Plan added');
                                res.redirect('/marketPlanPigIron');
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch((err) => {
                console.log(err);
                // Handle the error appropriately
                res.status(500).send("Internal Server Error");
            });
    }
    
}




const getMasterCustomerApi = async (req, res, next) => {
    try {
      if (req.session.isLoggedIn) {
         const categorydata = await masterCategoriesModel.findAll();
         const custCateg = await customerCategoryModel.findAll();
        //console.log("custCateg", custCateg);
        const data = await masterCustomerModel.findAll();
 


        dataPigIro = await marketPlanPigIronModel.findAll();
        //console.log(data);
        areaData = await masterAreaModel.findAll();
        gradeData = await masterGradeModel.findAll();
        productData = await masterProductsModel.findAll();
        catdata = await masterCategoriesModel.findAll();
        custdata = await masterCustomerModel.findAll({ where: { status: "VERIFIED" } });
        teamData = await masterTeamsModel.findAll();
        firmData = await masterFirmModel.findAll();
        custProdData = await customerProductModel.findAll();
        empData = await masterEmployeeModel.findAll();



        res.render("marketPlanPigIron",{
          username: req.session.username,
          username: req.session.username,
          level: req.session.userLevel,
          data: data,
          dataFil: [],
          empData :empData,
          areaData: areaData,
          gradeData: gradeData,
          catdata: catdata,
          custdata: custdata,
          teamData: teamData,
          productData: productData,
          firmData: firmData,
          custProdData: custProdData,

          dataPigIro: dataPigIro,
          categorydata: categorydata,
           level: req.session.userLevel,
          gradeData: gradeData,
          areaData: areaData,
          firmData: firmData,
          custCateg: custCateg,
          custdata : custdata,
          msg: ""
        });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  









const getMarketPlanQuantityLedger =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        marketPlanQuantityLedgerModel.findAll()
            .then((data)=>{
                masterCategoriesModel.findAll()
                    .then((catdata)=>{
                        masterProductsModel.findAll()
                        .then((pdata)=>{
                            masterCustomerModel.findAll()
                            .then((custData)=>
                            {

                                res.render('marketPlanQuantityLedger',{
                                    data:data,
                                    catdata:catdata,
                                    pdata:pdata,
                                    custData:custData,
                                    username : req.session.username,
                                    level: req.session.userLevel,
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
    }
}
const postMarketPlanQuantityLedger =(req,res,next)=>{
    //console.log("checking")
    var id = req.body.id;
    if(req.body.op==="del")
    {
        marketPlanQuantityLedgerModel.destroy({
            where: { serialNumber : id}
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
        //console.log("ok buddy")
        //console.log(req.body.id);
        marketPlanQuantityLedgerModel.update({
            customerId: req.body.customerId,
            category: req.body.category,
            product: req.body.product,
            quantity: req.body.quantity,
            invoiceNumber: req.body.invoiceNumber,
            delivery: req.body.delivery
        },
        {
            where: {serialNumber: req.body.id}
        }
        )
        .then((qwe)=>{
            res.send("kyu")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        //console.log("king")
        marketPlanQuantityLedgerModel.create({
            customerName: req.body.customerName,
            category: req.body.category,
            product: req.body.product,
            quantity: req.body.quantity,
            invoiceNumber: req.body.invoiceNumber,
            delivery: req.body.delivery
        })
        .then((result)=>
            //console.log(result),
            //console.log('New Market QuantityLedger added'),
            res.redirect('/marketPlanQuantityLedger')
        )
        .catch((err)=>
            console.log(err)
        )
    }
}




const getMarketPlanAllotment =(req,res,next)=>{
    if(req.session.isLoggedIn)
    {
        if(req.session.userLevel == 1)
        {
            marketPlanAllotmentModel.findAll(
                {
                    where : {representative : req.session.username}
                }
            )
            .then((data)=>{
                masterAreaModel.findAll()
                    .then((adata)=>{ 
                        masterProductsModel.findAll()
                            .then((pdata)=>{
                                res.render('marketPlanAllotment',{
                                    data:data,
                                    adata:adata,
                                    pdata:pdata,
                                    username : req.session.username,
                                    level: req.session.userLevel,
                            })
                            .catch((err)=>
                                console.log(err)
                            )
                    })
                    .catch((err)=>
                        console.log(err)
                    )

                    })
            })
            .catch((err)=>
                console.log(err)
            )
        }
        else
        {
            allotmentModel.findAll()
            .then((data)=>{
                   
                masterEmployeeModel.findAll()

                    .then((adata)=>{
                        masterProductsModel.findAll()
                            .then((pdata)=>{
                                //console.log("dataaaaa" , data)

                                const newData = data.map(item => {
                                    // Return a new object with formatted dates
                                    if (item.StartDate && item.EndDate) {
                                        let startDate = moment(item.StartDate);
                                        let endDate = moment(item.EndDate);
            
                                        let formattedStartDate = startDate.format("DD MMMM YYYY"); // Adjusted format
                                            let formattedEndDate = endDate.format("DD MMMM YYYY"); // Adjusted format
            
                                        // Return the item with formatted dates
                                        return {
                                           ...item,
                                            formattedStartDate,
                                            formattedEndDate
                                        }; 
                                    } else {
                                        // If no start or end date, return the item unchanged
                                        return item;
                                    }
                                });
            
                                //console.log("dataaaaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqanewData" , newData)
                                res.render('marketPlanAllotment',{
                                    data:newData,
                                    adata:adata,
                                    pdata:pdata,
                                    username : req.session.username,
                                    level: req.session.userLevel,
                            })
                           
                    })  
                    .catch((err)=>
                        console.log(err)
                    )

                    })
            })
            .catch((err)=>
                console.log(err)
            )
        }
    }
}
const postMarketPlanAllotment =(req,res,next)=>{
    //console.log("checking")
    var id = req.body.id;
    if(req.body.op==="del")
    {
        marketPlanAllotmentModel.destroy({
            where: { serialNumber : id}
        })
        .then((result)=>
            //console.log("kios check"),
            res.redirect('/marketPlanAllotment'),
            //console.log("kios check2")
        )
        .catch((err)=>
        console.log(err)
    )
    }
    else if(req.body.op==="edt")
    {
        //console.log("ok buddy")
        //console.log(req.body.id);
        marketPlanAllotmentModel.update({
            customerId: req.body.customerId,
            phoneNumber: req.body.phoneNumber,
            area: req.body.area,
            product: req.body.product,
            representative: req.body.representative,
            meetingDates: req.body.meetingDates,
            currentIssue: req.body.currentIssue
        },
        {
            where: {serialNumber: req.body.id}
        }
        )
    }
    else{
        //console.log("king")
        marketPlanAllotmentModel.create({
            customerId: req.body.customerId,
            phoneNumber: req.body.phoneNumber,
            area: req.body.area,
            product: req.body.product,
            representative: req.body.representative,
            meetingDates: req.body.meetingDates,
            currentIssue: req.body.currentIssue
        })
        .then((result)=>
            //console.log(result),
            //console.log('New Market Allotment added'),
            res.redirect('/marketPlanAllotment')
        )
        .catch((err)=>
            console.log(err)
        )
    }
}



// api for market plan customer get
const getAllCustomerApi = async (req, res, next) => {
    try {
        // Extract customer ID from the request body
        const customerId = req.body.customerIds;
        //console.log("llllllllllllllllllllllllllllllllllllll" , customerId)
        // Query the database for the customer
        const customer = await masterCustomerModel.findAll({ where: { customerId: customerId } });

        // Check if the customer exists
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Return the customer data
        res.json({
           customer
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
    }
};


// get api with id 
// api for market plan customer get
 
 
const getAllotmentUser = async (req, res, next) => {
    try {
      if (req.session.isLoggedIn) {
        const { id } = req.params;
         console.log("iddddddddddddddddddddddddddddd" , id)

         const categorydata = await masterCategoriesModel.findAll();
         const custCateg = await customerCategoryModel.findAll();
        //console.log("custCateg", custCateg);
        const data = await masterCustomerModel.findAll({where :{ allotmentId : id}});
        const allotmentObj = await allotmentModel.findOne({where :{ allotmentId : id}});
 
        const empId = allotmentObj.EmpoyeeId


        dataPigIro = await marketPlanPigIronModel.findAll();
        //console.log(data);
        areaData = await masterAreaModel.findAll();
        gradeData = await masterGradeModel.findAll();
        productData = await masterProductsModel.findAll();
        catdata = await masterCategoriesModel.findAll();
        custdata = await masterCustomerModel.findAll({ where: { status: "VERIFIED" } });
        teamData = await masterTeamsModel.findAll();
        firmData = await masterFirmModel.findAll();
        custProdData = await customerProductModel.findAll();
        reportData = await reportModel.findAll({where : {empId  : empId}});

console.log("reportData" , reportData)

        res.render("marketPlanPigIronPage",{
          username: req.session.username,
          username: req.session.username,
          level: req.session.userLevel,
          data: data,
          dataFil: [],
          areaData: areaData,
          reportData,
          gradeData: gradeData,
          catdata: catdata,
          custdata: custdata,
          teamData: teamData,
          productData: productData,
          firmData: firmData,
          custProdData: custProdData,

          dataPigIro: dataPigIro,
          categorydata: categorydata,
           level: req.session.userLevel,
          gradeData: gradeData,
          areaData: areaData,
          firmData: firmData,
          custCateg: custCateg,
          custdata : custdata,
          empId,
          msg: ""
        });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  };


// get allotment by employee
const getAllotmentemployee = async (req, res, next) => {
    try {
      if (req.session.isLoggedIn) {

        const { id } = req.params;
         console.log("iddddddddddddddddddddddddddddd" , req.session)

//          const categorydata = await masterCategoriesModel.findAll();
//          const custCateg = await customerCategoryModel.findAll();
//         //console.log("custCateg", custCateg);
//         const data = await masterCustomerModel.findAll({where :{ allotmentId : id}});
//         const allotmentObj = await allotmentModel.findOne({where :{ allotmentId : id}});
 
//         const empId = allotmentObj.EmpoyeeId


//         dataPigIro = await marketPlanPigIronModel.findAll();
//         //console.log(data);
//         areaData = await masterAreaModel.findAll();
//         gradeData = await masterGradeModel.findAll();
//         productData = await masterProductsModel.findAll();
//         catdata = await masterCategoriesModel.findAll();
//         custdata = await masterCustomerModel.findAll({ where: { status: "VERIFIED" } });
//         teamData = await masterTeamsModel.findAll();
//         firmData = await masterFirmModel.findAll();
//         custProdData = await customerProductModel.findAll();
//         reportData = await reportModel.findAll({where : {empId  : empId}});

// console.log("reportData" , reportData)

//         res.render("getAllotmentemployee",{
//           username: req.session.username,
//           username: req.session.username,
//           level: req.session.userLevel,
//           data: data,
//           dataFil: [],
//           areaData: areaData,
//           reportData,
//           gradeData: gradeData,
//           catdata: catdata,
//           custdata: custdata,
//           teamData: teamData,
//           productData: productData,
//           firmData: firmData,
//           custProdData: custProdData,

//           dataPigIro: dataPigIro,
//           categorydata: categorydata,
//            level: req.session.userLevel,
//           gradeData: gradeData,
//           areaData: areaData,
//           firmData: firmData,
//           custCateg: custCateg,
//           custdata : custdata,
//           empId,
//           msg: ""
//         });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  };

//   create allotment 
const postAllotment = async (req, res) => {
    const { planTitle , filterBy ,status , startDate, endDate,EmpoyeeId = "8e59fef7-98db-42d7-a106-30548f6f2cf0" , customerIds } = req.body;
    
    //console.log("planTitle , Area ,PlanStatus , startDate, endDate,salesPersonId ", planTitle , filterBy ,status , startDate, endDate,EmpoyeeId  , customerIds   )
    try {

    //         // Check if a market plan with the same name already exists
    // const existingMarketPlan = await allotmentModel.findOne({
    //     where: { planTitle },
    //   });
    //   if (existingMarketPlan) {
    //     return res.status(409).json({ message: 'A market plan with the same name already exists.' });
    //   }
  
    //   // Check if another market plan with the same name and salesperson doesn't exist
    //   const existingSameNameAndSalesperson = await allotmentModel.findOne({
    //     where: {EmpoyeeId },
    //   });
    //   if (existingSameNameAndSalesperson) {
    //     return res.status(409).json({ message: 'Another market plan   salesperson already exists.' });
    //   }

 
      // Step 1: Create the market plan
      const marketPlan = await allotmentModel.create({
        allotmentId: uuidv4(),
        planTitle ,
        Area : filterBy ,
        PlanStatus : status ,
        StartDate :startDate, // Hardcoded date
        EndDate : endDate , // Hardcoded date,
        EmpoyeeId : "8e59fef7-98db-42d7-a106-30548f6f2cf0" 
      });
  
      // Step 2: Assign the market plan to a salesperson
      // Check if salesPersonId is provided
    //   if (!salesPersonId) {
    //     return res.status(400).json({ message: 'Sales Person ID is required.' });
    //   }
   
    //   if(marketPlan){
    //     await allotmentModel.update({ salesPersonId }, {
    //         where: { EmpoyeeId: salesPersonId },
    //         returning: true,
    //       });
    //   }
  
      // Step 3: Allocate the market plan to multiple customers
      // Check if customerIds array is provided and not empty
      if (!Array.isArray(customerIds) ||!customerIds.length) {
        return res.status(400).json({ message: 'At least one customer ID is required.' });
      }
      for (let customerId of customerIds) {
        await masterCustomerModel.update({ allotmentId: marketPlan.allotmentId }, {
          where: { customerId: customerId },
          returning: true,
        });
      } 
  
      res.status(201).json({ message: 'Market plan created, assigned to salesperson, and allocated to customers successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.', error });
    }
  };
  

//   create report 

const createReport = async (req, res) => {
        //console.log("dddddddddddddddddddddddddddaaaaaaaaaaa", req.body)
     const { report,
        meetingTime,
        nextMeetingTime,
        issue ,customerId , empId , } = req.body
     try {

 
 
      // Step 1: Create the market plan
      const marketPlan = await reportModel.create({
        reportId: uuidv4(),
        report,
        meetingTime,
        nextMeetingTime,
        issue,
        customerId: customerId,
        empId: empId
      });
  
      if(marketPlan){
        res.status(201).json({ message: 'report plan created, assigned to salesperson, and allocated to customers successfully.' });
      }
   
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.', error });
    }
  };


//   ger report

const getReportDetails = async (req, res, next) => {
    try {

        const { id } = req.params;
         //console.log("dddddssssssssssssssssssssss" , id)
        // Step 1: Create the market plan
        const data = await reportModel.findAll({where : { customerId : id }})
    
        if(data){
            res.render("marketPlanReport" , 
                {   username: req.session.username,
                    username: req.session.username,
                    level: req.session.userLevel,data}
            )
            
        }
     
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.', error });
      }
  };
// update report 
const updateReport = async (req, res) => {
    const { reportId ,meetingStatus } = req.body;
    console.log( "repordiD" , reportId , meetingStatus)
    try {
      // Step 1: Update the report
      const [updatedRows] = await reportModel.update(
        {
          meetingStatus:meetingStatus // Corrected assignment
        },
        {
          where: { reportId: reportId }
        }
      );
  
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Report plan updated successfully.' });
      } else {
        res.status(404).json({ message: 'Report not found or no changes made.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.', error });
    }
  };
  
  /////////////////////////////////////////////////// custoemr user ///////////////////
  const getAllCustomerUser = async(req , res)=>{
  

    try {
        if (req.session.isLoggedIn) {
        //   const { id } = req.params;
        //   //console.log("iddddddddddddddddddddddddddddd" , id)
  
           const categorydata = await masterCategoriesModel.findAll();
           const custCateg = await customerCategoryModel.findAll();
          //console.log("custCateg", custCateg);
        //   allotmetn find form employeee id
 

          const allotment = await allotmentModel.findOne({where :{ EmpoyeeId : 21}});
          const data = await masterCustomerModel.findAll({where :{ allotmentId : allotment.allotmentId}});
    
   
   
          dataPigIro = await marketPlanPigIronModel.findAll();
          //console.log(data);
          areaData = await masterAreaModel.findAll();
          gradeData = await masterGradeModel.findAll();
          productData = await masterProductsModel.findAll();
          catdata = await masterCategoriesModel.findAll();
          custdata = await masterCustomerModel.findAll({ where: { status: "VERIFIED" } });
          teamData = await masterTeamsModel.findAll();
          firmData = await masterFirmModel.findAll();
          custProdData = await customerProductModel.findAll();
  
   
  
          res.render("marketPlanPigIronUserPage",{
            username: req.session.username,
            username: req.session.username,
            level: req.session.userLevel,
            data: data,
            dataFil: [],
            areaData: areaData,
            gradeData: gradeData,
            catdata: catdata,
            custdata: custdata,
            teamData: teamData,
            productData: productData,
            firmData: firmData,
            custProdData: custProdData,
  
            dataPigIro: dataPigIro,
            categorydata: categorydata,
             level: req.session.userLevel,
            gradeData: gradeData,
            areaData: areaData,
            firmData: firmData,
            custCateg: custCateg,
            custdata : custdata,
            msg: ""
          });
        } else {
          res.redirect("/");
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
      }


      



  }


module.exports = {
    getMarketPlanPigIron,
    postMarketPlanPigIron,
    getMarketPlanQuantityLedger,
    postMarketPlanQuantityLedger,
    getMarketPlanAllotment,
    postMarketPlanAllotment,
    getMasterCustomerApi,
    getAllCustomerApi,
    getAllotmentUser,
    postAllotment,
    getAllCustomerUser,
    createReport,
    getReportDetails,
    updateReport,
    getAllotmentemployee

}