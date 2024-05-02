import mongoose from "mongoose";

export const ROLES = ["user", "admin", "alumno","arrendador"];

const roleSchema = new mongoose.Schema(
  {
    name: String,
    // menu: String,
    // viewBienve: String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Role", roleSchema);
