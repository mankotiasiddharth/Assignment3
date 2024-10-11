 /********************************************************************************
* WEB322 – Assignment 03
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: Kunwar Siddharth Mankotia Student ID: 152030227 Date: 10/11/2024
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require ("express");
require("dotenv").config();
const legoData = require ( "./modules/legoSets");
const app = express();
const PORT = process.env.PORT || 2004;
app.use(express.static('public'));
const path = require('path');
legoData
.initialize()
.then(()=>{
    // app.get("/try", (req, res)=>{
    //     res.sendFile(path.join(__dirname, '/public/views/home.html'))
    // });
    app.get("/",(req,res)=>{
        res.sendFile(path.join(__dirname, '/public/views/home.html'));
    })
    app.get("/about",(req,res)=>{
        res.sendFile(path.join(__dirname,'/public/views/about.html'))
    })
    app.get("/lego/sets",(req,res)=>{
        const {theme} = req.query;
        if(theme){
            legoData.getSetsByTheme(theme).then((set)=>{
                res.json(set);
            }).catch((err)=>{
                res.status(404).send(err);
            })
        }else{
            legoData.getAllSets().then((sets)=>{
                res.json(sets) }).catch((err)=>{
                    res.status(500).send(err);
                })  
        }
         
    });
    // app.get("/lego/sets",(req,res)=>{
        // const {theme} = req.query;
        // legoData.getSetsByTheme(theme).then((set)=>{
        //     console.log(set)
        //     res.json(set);
        // }).catch((err)=>{
        //     res.status(404).send(err);
        // })
    // })
    
    
    app.get("/lego/sets/:numId",(req,res)=>{
        const {numId}  = req.params;
        console.log(numId)
        console.log(typeof numId);
        
        legoData.getSetByNum(numId).then((set)=>{
            res.json(set);
        }).catch((err)=>{
            res.status(404).send(err);
        })
    })
    
    app.use((req,res,next)=>{
        res.status(404).sendFile(path.join(__dirname,"/public/views/404.html"))
    })
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    
});