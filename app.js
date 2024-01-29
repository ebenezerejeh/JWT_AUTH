const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config()
require('./helpers/init_mongodb.js')();
const {verifyAccessToken} = require('./helpers/jwt_helper.js')

const AuthRoute = require('./Routes/Auth.route.js')

const app = express();
//use morgan after the express function
app.use(morgan('dev'));
app.use(express.json())

//Initialize DB



    app.get('/',verifyAccessToken,(req, res, next)=>{
     
        res.send('hello from express')
    })


    app.use('/auth', AuthRoute);


    app.use((req, res, next)=>{
        next(createError.NotFound('This route does not exist'))
    });

    app.use((err, req, res, next)=> {
        res.status(err.status || 500)
        res.send({
            error: {
                status: err.status || 500,
                message: err.message,
            }
        })

    })



const PORT = process.env.PORT || 3000;

        app.listen(PORT, ()=>{
            console.log(`server is running on ${PORT}`)
        })