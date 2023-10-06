import mongoose from "mongoose";

const albumsCollection = "albums";

const album = new mongoose.Schema(
     {
         titulo: {type: String, require: [true, "Debes completar este campo"]},
         descripcion: {type: String, require: [true, "Debes completar este campo"], minLength: 2, maxLength: 200},
         añoLanzamiento: {type: Number, require: [true, "Debes completar este campo"], min: 0},
            canciones: {
                titulo: String,
                duracion: Number
            },
        url: {type: String}
  
     }
)

const albumModel = mongoose.model(albumsCollection, album)
export default albumModel;
