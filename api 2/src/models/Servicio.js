import mongoose from "mongoose";

export const SERVICIOS = ["agua", "luz", "internet"];


const servicioSchema = new mongoose.Schema(
    {
        nombre: String,
    },
    {
        versionKey: false,
    }
);
export default mongoose.model("Servicio", servicioSchema);