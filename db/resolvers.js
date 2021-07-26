const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const TodoItem = require('../models/TodoItem');
const createToken = (user, secret, expiresIn) =>{
  const {id,email,name,last_name} = user;
  return jwt.sign({ id,email,name,last_name }, secret, {expiresIn})
}
 //resolvers
const resolvers = {
        Query:{
            //_ es para consultas anidadas, se omite con _
            obtenerUsuario: async(_,{}, ctx)=>{
                return ctx;
            },
            obtenerItems: async ()=>{
              try{
                const items = await TodoItem.find({});
                return items;
              }catch(error){
                console.log(error);
              }
            },
            obtenerItemsFolder: async(_, {id},ctx)=>{
              //review if the client exist or not
              const item = await TodoItem.find({folder: id});
              if(!item){
                throw new Error('Item no encontrado');
              }
             
              return item;
            }
        },
        Mutation:{
            nuevoUsuario:async(_, {input})=> {
              const {email, password} = input
              // Review if the user is registered
              const userExist = await Usuario.findOne({email});
              if(userExist){ 
                  throw new Error('El usuario ya está registrado')
              }
              
              try{
              //hashear su password
              const salt = await bcryptjs.genSaltSync(10);
              console.log(salt);
              input.password = await bcryptjs.hash(password,salt);
              console.log(input)
              //Save into db
             
                const user = new Usuario(input);
               user.save();
                return user;
              }catch(error){
                console.log(error);
              }
            },
            autenticarUsuario: async(_, {input}) => {
              const {email,password} = input;
              const userExist = await Usuario.findOne({email});
              //check if user exist
              if(!userExist){ 
                  throw new Error('El usuario no está registrado')
              }
              //pass is correct?
              const passwordCorrect = await bcryptjs.compare(password, userExist.password)
              if(!passwordCorrect){ 
                throw new Error('Password incorrect')
            }
              //create token
              return {
                token:createToken(userExist,process.env.SECRET_WORD, '24h')
              }
            },
            addItem: async(_,{input}) =>{
              input.done=false;
              const newItem = new TodoItem(input);
              console.log(newItem);
              newItem.save();
              return newItem;
            },
            deleteItem: async(_,{id}) =>{
              //verify if exist
              let item = await TodoItem.findById(id);
              if(!item){
                throw new Error('Item no encontrado');
              }
              client = await TodoItem.findOneAndDelete({_id : id});
              return "Item eliminado"
            },
            updateItem: async(_,{id,input},ctx)=>{
              console.log(id,input)
              //verify if exist
              let item = await TodoItem.findById(id);
              if(!item){
                throw new Error('Item no encontrado');
              }
          
              //save item
              item = await TodoItem.findOneAndUpdate({_id : id}, input, {new:true});
              return item;
            },
            updateDone: async(_,{id,input},ctx)=>{
              console.log(id,input)
              //verify if exist
              let item = await TodoItem.findById(id);
              if(!item){
                throw new Error('Item no encontrado');
              }
          
              //save item
              item = await TodoItem.findOneAndUpdate({_id : id}, input, {new:true});
              return item;
            },
            addFolder: async(_,{input}) =>{
              const newFolder = new Folder(input);
              console.log(newFolder);
              newFolder.save();
              return newFolder;
            }
        }
};

module.exports = resolvers;