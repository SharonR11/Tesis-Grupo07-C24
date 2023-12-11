import mongoose from "mongoose";
const cuartoSchema = new mongoose.Schema(
    {
        nombre: {
          type: String,
          required: true,
          trim: true,
        },
        precio: {
          type: Number,
          default: 0,
        },
        descripcion: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        foto: String,
        ubicacion: {
            // Puedes definir la ubicación como un objeto con latitud y longitud, por ejemplo
            latitud: Number,
            longitud: Number,
        },
        disponibilidad: {
            type: Boolean,
            default: true, // O el valor por defecto que necesites
        },
        servicios: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Servicio",
            },
        ],
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencia al modelo de usuario
            required: true,
          },
      },
      {
        timestamps: true,
        versionKey: false,
      }
);
export default mongoose.model("Cuarto", cuartoSchema);