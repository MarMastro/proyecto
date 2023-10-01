import { Router } from "express";
import albumModel from "../models/albumModels.js";

const router = Router();

router.get("/", async (req, res) => {
    try{
        const albums = await albumModel.find();
        res.json({ status: "Success", data: albums });
    } catch (error) {
        console.log("No se pueden obtener los albums: " + error);
        res.json({status: "Error", error: "Error al mostrar los albums" });
    }
});

router.post("/", async (req, res) => {
    const {
        titulo,
        descripcion,
        añoSalida,
        url
    } = req.body;
    if (
        !titulo ||
        !descripcion ||
        !añoSalida 
    )
        return res.json({ status: "error", error: "Datos faltantes"});
    try {
        const album = await albumModel.create({
            titulo,
            descripcion,
            añoSalida,
            url,            
        });
        res.status(201).json({ status: "Success", data: album });
    } catch (error) {
        console.log("No se pudo cargar el album: " + error);
        res.json({ status: "error", error: "Error al cargar el album" });
    }
});

router.put("/:albumId", async (req, res) => {
    const { albumId } = req.params;
    const newAlbum = req.body
    try {
        await albumModel.findByIdAndUpdate(albumId, newAlbum);
        res.json({ status: "Success", data: newAlbum });
    }catch (error) {
        console.log("No se pudo modificar el album: " + error);
        res.json({ status: "Error", error: "Error al modificar el album" });
    }
});

router.post("/:albumId/agregarCancion", async (req, res) => {
    console.log("Agregando Canción")
    const { albumId } = req.params;
    const { nombreCancion, duracionCancion } = req.body;
    console.log(albumId, nombreCancion, duracionCancion)
    try {
        const album = await albumModel.findById(albumId);
        if (!album) {
            res.json({ status: "error", error: "Album no encontrado"});
            return;
        }
        album.canciones.push({ nombreCancion, duracionCancion });
        await album.save();

        res.status(201).json({ status: "Success", data: album});
    } catch (error) {
        console.log("No se pudo agregar la canción: " + error);
        res.json({ status: "Error", error: "Error al agregar la canción "});
    }
});

router.delete("/:albumId/eliminar-cancion/:cancionId", async (req, res) => {
    const { albumId, cancionId } = req.params;

    try{
        const updatedAlbum = await albumModel.findOneAndUpdate(
            { _id: albumId, "canciones._id" : cancionId},
            { $pull: { canciones: { _id: cancionId } } },
            { new: true}
        );
        if (!updateAlbum) {
            res.json({ status: "error", error: "Album no encontrado" });
            return;
        }
        res.status(200).json({ status: "Success", data: updatedAlbum });
    }catch (error) {
        console.log("No se pudo eliminar la cancion: " + error);
        res.json({ status: "error", error: "Error al eliminar la canción" });
    }
});

router.delete("/:albumId", async (req, res) => {
    const { albumId } = req.params;
    try{
        const deletedAlbum = await albumModel.findOneAndDelete({_id: albumId });
        if (!deleteAlbum) {
            res.json({ status: "error", error: "Album no encontrado" });
            return;
        }
        res
          .status(200)
          .json({ status: "Success", message: "Album eliminado exitosamente" });
    }catch (error) {
        console.log("No se pudo eliminar el album: " + error);
        res.json({ status: "error", error: "Error al eliminar el album" });
    }
});

router.get("/:albumId", async (req, res) => {
    const { albumId } = req.params;
    try {
        const albumPorId = await albumModel.findById(albumId);
        if (!albumId) {
            res.json({ status: "error", error: "Album no encontrado" });
            return;
        }
        res.json({ status: "Success", data: albumPorId });
    }catch (error) {
        console.log("No se pudo obtener el album: " + error);
        res.json({ status: "Error", error: "Error al obtener el album" });
    }
});

export default router;