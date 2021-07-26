const { ApolloServer } =require('apollo-server');
const resolvers = require('./db/resolvers');
const typeDefs = require('./db/schema');
const connect = require('./config/db');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: 'variables.env'})

//
connect();

//server

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>{
        const token =req.headers['authorization'] || '';
        if(token){
            try{
                const user = jwt.verify(token.replace('Bearer ',''),process.env.SECRET_WORD);
                return user;
            }catch(error){
                console.log(error);
            }
        }
    }
});

server.listen({port: process.env.PORT || 4000}).then(({url}) =>{
    console.log(`Servidor listo en la URL ${url}`)
});