import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { requireRole } from '../../../../app/middlewares/auth/require-role.js';
import {
    createCategorySchema,
    updateCategorySchema,
    categoryIdSchema
} from '../validation/category.validation.js';

const categoryRoutes = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Catalog - Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
categoryRoutes.get('/', CategoryController.getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Catalog - Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
categoryRoutes.get('/:id', validateRequest(categoryIdSchema), CategoryController.getById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Catalog - Category]
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
 *         description: Category created
 */
categoryRoutes.post('/', authenticate, requireRole('Admin'), validateRequest(createCategorySchema), CategoryController.create);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Catalog - Category]
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
 *         description: Category updated
 */
categoryRoutes.patch('/:id', authenticate, requireRole('Admin'), validateRequest(updateCategorySchema), CategoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Soft delete a category
 *     tags: [Catalog - Category]
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
 *         description: Category deleted
 */
categoryRoutes.delete('/:id', authenticate, requireRole('Admin'), validateRequest(categoryIdSchema), CategoryController.delete);

export { categoryRoutes };
