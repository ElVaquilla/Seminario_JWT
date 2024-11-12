import express from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser, login, profile } from '../controllers/userController';
import { TokenValidation } from '../middleware/verifyJWT';
import { verifyOwnership } from '../middleware/verifyOwner';
import { AdminValidation } from '../middleware/verifyAdmin';

const router = express.Router();

// Ruta para obtener todos los usuarios, accesible solo para administradores
router.get("/", TokenValidation, AdminValidation, getUsers);

// Ruta para crear un usuario (registro)
router.post("/", createUser);

// Ruta para obtener un usuario por id, solo para el propietario o administrador
router.get("/:id", TokenValidation, verifyOwnership, getUser);

// Ruta para actualizar un usuario por id, solo para el propietario
router.put("/update/:id", TokenValidation, verifyOwnership, updateUser);

// Ruta para eliminar un usuario por id, solo para administradores
router.delete('/delete/:id', TokenValidation, AdminValidation, deleteUser);

// Ruta para hacer login
router.post("/login", login);

// Ruta para ver el perfil del usuario, solo accesible por el propietario
router.get("/:id/profile", TokenValidation, verifyOwnership, profile);

export default router;
