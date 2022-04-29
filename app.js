const express = require("express");
const Game = require("./games/game");
const Cors = require("cors")
const app = new express();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const Admin = require("./users/admin");
const TOKEN_KEY =  "PSEUDOTOKEN";

app.use(Cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(express.static('public'));



//middleware
function auth(req,res, next)
{
    
    const tokenAuth = req.headers['authorization'];

    
    //checking if the token has been set
    if(tokenAuth != undefined)
    {
        const bearer = tokenAuth.split(" ");

        const token = bearer[1];


        //descrypting and comparing  the token
        jwt.verify(token,TOKEN_KEY,(error, data)=>{

            if(error)
            {
                res.status(401).send("invalid token!")
            }
            else{
                //setting values to authorization
                req.token = token;
                req.loggedUser = {user: data.email, id: data.id}
                next();

            }

        })

        

    }
    else{
        res.status(401).send("unauthorized")
    }
    
}


//init
app.get("/",(req,res)=>{

    res.send("on")
})


//authentication and token generation

app.post("/auth", (req, res) => {
    const { email, password } = req.body;
  
    if (email === undefined || password === undefined) {
      res.status(400).send("BAD REQUEST :/");
    } else {
      Admin.findOne({ where: { email: email } })
        .then((account) => {

            //comparing hashs
          const correct = bcrypt.compareSync(password, account.password);
  
          if (correct) {
              //generating the toke and save the data
            jwt.sign(
              {
                id: account.id,
                email: account.email,
              },TOKEN_KEY,
              { expiresIn: "48h" },
              (error, token) => {
                if (error) {
                  res.status(500).send("INTERNAL SERVER ERROR");
                } else {
                  res.status(200);
                  res.json({
                    token: token,
                  });
                }
              }
            );
          } else {
            res.status(401).send("denied");
          }
        })
  
        .catch((err) => {
          res.status(404).send("not found");
        });
    }
  });




  //create and save an account authorized- add a middleware after generate a user -> E.X app.post("/admin", auth, (req, res) => {}
  app.post("/admin", (req, res) => {
    const { email, password } = req.body;
  
    if (email === undefined || password === undefined) {
      res.status(400).send("BAD REQUEST :(");
    } else {
      Admin.findOne({ where: { email: email } }).then((account) => {
        if (account === null) {
          const salt = bcrypt.genSaltSync(10);
          const passwordHashed = bcrypt.hashSync(password, salt);
  
          Admin.create({
            email,
            password: passwordHashed,
          });
  
          res.status(201).send("successs! :)");
        } else {
          console.log(account);
          res.status(409).send("an error has ocurred");
        }
      });
    }
  });
  


  //listing the games
app.get("/games",auth,(req,res)=>{
    
    Game.findAll().then((game)=>{
        
        if(game !== undefined)
        {
            res.status(200)
            res.json(game);
            
        }
        else{
            res.status(404)
            res.send("not found 404");
        }
    })
    .catch(err =>{
        res.status(400)
    })


})


//listing a specific game by id
app.get("/game/:id",auth,(req,res)=>{
    const id =req.params.id;

    if(isNaN(id))
    {
        res.status(400).send("bad request")
    }
    else{
        Game.findOne({where:{id: id}}).then((game)=>{
        
            if(game === undefined || game === null)
            {
                res.status(404).send("not found 404");
                
            }
            else{
                res.status(200);
                res.json(game);
            }
        })
    }

})



//creating a new game
app.post("/game",auth, (req,res)=>{

    const {title, price, year} = req.body;

    if(title === undefined || price === undefined || year === undefined)
    {
        res.status(400);
        
    }
    else{
        Game.create({
            title: title,
            price:price,
            year: year
        }).then(()=>{
            res.status(201)
            res.send("OK")
        })
    }
    

})



//delete a game
app.delete("/game/:id",auth,(req,res)=>{
    const id = req.params.id;


    if(isNaN(id))
    {
        res.status(400).send("bad request")
    }
    else{
        Game.destroy({where:{id: id}}).then(()=>{
        
            
                res.status(200).send("OK")
        })
    }
})


//update a game
app.put("/game/:id",auth,(req,res)=>{
    const id = req.params.id;
    
    const {title, price, year} = req.body;

    if(isNaN(id))
    {
        res.status(400).send("bad request")
    }
    else{
       
       Game.findByPk(id).then((element)=>{


        if(element !== null)
        {

            
            if(title !== undefined)
        {
            Game.update({
                title: title
            },{
                where:{id:id}
            })
        if(year !== undefined)
        {
            Game.update({
                year:year
            },{
                where:{id:id}
            }) 
        }
        if(price !== undefined )
        {
            Game.update({
                price: price
            },{
                where:{id:id}
            })
            
        }
        res.status(200).send("edited")
        }
       
        
        }
        else{
            res.status(406).send("not Acceptable")
        }



       })
       
        
       
    
        
    }
    
})

app.listen(8080, () => console.log("api is on"))