
import {getConnection} from "../config/db";

// Modelo de roles para MySQL
const getAllRoles = async (req, res) => {
    const connection = await pool.getConnection();
    try {
      const roles = await connection.query('SELECT * FROM roles');
      return roles;
    } catch (error) {
      console.error('Error al obtener roles:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
};



export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Role", roleSchema);