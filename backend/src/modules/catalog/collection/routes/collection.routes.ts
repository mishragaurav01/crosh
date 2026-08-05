import { Router } from 'express';
import { CollectionController } from '../controllers/collection.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { authorize } from '../../../../app/middlewares/auth/authorize.js';
import {
    createCollectionSchema,
    updateCollectionSchema,
    collectionIdSchema
} from '../validation/collection.validation.js';

const collectionRoutes = Router();

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get all collections
 *     tags: [Catalog - Collection]
 *     responses:
 *       200:
 *         description: List of collections
 */
collectionRoutes.get('/', CollectionController.getAll);

/**
 * @swagger
 * /collections/{id}:
 *   get:
 *     summary: Get collection by ID
 *     tags: [Catalog - Collection]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collection found
 *       404:
 *         description: Collection not found
 */
collectionRoutes.get('/:id', validateRequest(collectionIdSchema), CollectionController.getById);

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Create a new collection
 *     tags: [Catalog - Collection]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug]
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       201:
 *         description: Collection created
 */
collectionRoutes.post('/', authenticate, authorize('Admin'), validateRequest(createCollectionSchema), CollectionController.create);

/**
 * @swagger
 * /collections/{id}:
 *   patch:
 *     summary: Update a collection
 *     tags: [Catalog - Collection]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Collection updated
 */
collectionRoutes.patch('/:id', authenticate, authorize('Admin'), validateRequest(updateCollectionSchema), CollectionController.update);

/**
 * @swagger
 * /collections/{id}:
 *   delete:
 *     summary: Soft delete a collection
 *     tags: [Catalog - Collection]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collection deleted
 */
collectionRoutes.delete('/:id', authenticate, authorize('Admin'), validateRequest(collectionIdSchema), CollectionController.delete);

export { collectionRoutes };
