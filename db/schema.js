
const {gql } =require('apollo-server');

//schema
const typeDefs = gql`
    type Usuario {
        id: ID
        name: String
        last_name: String
        email: String
        created_at: String
    }
    type Token {
        token: String
    }
    input UsuarioInput {
        name: String!
        last_name: String!
        email: String!
        password: String!
    }
    input AutenticarInput{
        email: String!
        password: String!
    }
    type Query {
        #user
        obtenerUsuario: Usuario
        #Items
        obtenerItems: [TodoItem]
        obtenerItem(id: ID!): TodoItem
        #Folder
        obtenerItemsFolder(id: ID!):[TodoItem]

    }
    type TodoItem {
        id:ID
        name: String
        done: Boolean
    }
    input TodoItemInput {
        name:String!
    }
    input TodoItemDoneInput {
        done:Boolean!
    }
    input FolderInput{
        name: String!
    }
    type Folder{
        id: ID
        name: String
    }
    type Mutation {
        #USER
        nuevoUsuario(input: UsuarioInput) : Usuario
        autenticarUsuario(input: AutenticarInput): Token
        #TodoItem
        addItem(input: TodoItemInput!):TodoItem
        deleteItem(id: ID!): String
        updateItem(id: ID!, input:TodoItemInput!): TodoItem
        updateDone(id: ID!, input:TodoItemDoneInput!): TodoItem
        #Folder
        deleteItems(id: ID!): String
        addFolder(input: FolderInput!):Folder
    }
`;

module.exports = typeDefs;