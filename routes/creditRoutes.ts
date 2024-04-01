import express from 'express';
import { CreditController } from '../controllers/creditController';

const router = express.Router();
const creditController = new CreditController();

/**
 * @swagger
 * /credits:
 *   get:
 *     tags:
 *     - Obtener todos los creditos
 *     summary: Obtiene todos los créditos
 *     description: Obtiene todos los créditos disponibles.
 *     responses:
 *       200:
 *         description: Lista de créditos obtenida con éxito
 *       500:
 *         description: Error interno del servidor
 * */
router.get('/credits', creditController.getAllCredits);
/**
 * @swagger
 * /credits/(id):
 *   get:
 *     tags:
 *     - Obtener un credito por id
 *     summary: Obtiene un credito
 *     description: Obtener credito por id de usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del recurso que se desea obtener.
 *     responses:
 *       200:
 *         description: Lista de un crédito
 *       500:
 *         description: Error interno del servidor
 * */
router.get('/credits/:id', creditController.getCreditByID);

/**
 * @swagger
 * /credits:
 *   post:
 *     tags:
 *       - Guardar crédito
 *     summary: Crea un nuevo crédito
 *     description: Crea un nuevo crédito con los datos proporcionados.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - identification
 *               - department
 *               - municipio
 *               - income
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Nombre del solicitante
 *               lastName:
 *                 type: string
 *                 description: Apellido del solicitante
 *               email:
 *                 type: string
 *                 description: Correo electrónico del solicitante
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del solicitante
 *               identification:
 *                 type: string
 *                 description: Identificación del solicitante
 *               department:
 *                 type: string
 *                 description: Departamento del solicitante
 *               municipio:
 *                 type: string
 *                 description: Municipio del solicitante
 *               direction:
 *                 type: string
 *                 description: Dirección del solicitante
 *               document:
 *                 type: file
 *                 description: Documento del solicitante
 *               selfie:
 *                 type: string
 *                 format: base64
 *                 description: Selfie del solicitante
 *               income:
 *                 type: number
 *                 description: Ingreso del solicitante
 *     responses:
 *       200:
 *         description: Crédito creado con éxito
 *       400:
 *         description: La solicitud es inválida
 *       500:
 *         description: Error interno del servidor
 */

router.post('/credits', creditController.uploadDocumentPhoto, creditController.resizePhoto, creditController.createCredit);

export { router as creditRoutes };
