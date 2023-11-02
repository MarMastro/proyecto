import mongoose from "mongoose";

const userCollection = "users";

const usuario = new mongoose.Schema(
    {
        nombre: {type: String, require: [true, "Escriba su nombre"], minLength: 2},
        apellido: {type: String, require: [true, "Escriba su apellido"], minLength: 2},
        email: {
            type: String,
            required: true,
            validate: {
              validator: function(value) {
                const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
                return regex.test(value);
              },
              message:  ' No es un email válido'
            },      
          },
        contraseña: {type: String},
           
        }
    
)

const userModel = mongoose.model(userCollection, usuario);
export default userModel;
