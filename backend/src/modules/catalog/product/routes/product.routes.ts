import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { requireRole } from '../../../../app/middlewares/auth/require-role.js';
import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
  productSlugSchema,
} from '../validation/product.validation.js';

const productRoutes = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Catalog - Product]
 *     responses:
 *       200:
 *         description: List of products
 */
productRoutes.get('/', ProductController.getAll);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search and filter products
 *     tags: [Catalog - Product]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
productRoutes.get('/search', ProductController.search);

/**
 * @swagger
 * /products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Catalog - Product]
 *     responses:
 *       200:
 *         description: Featured products
 */
productRoutes.get('/featured', ProductController.getFeatured);

/**
 * @swagger
 * /products/new-arrivals:
 *   get:
 *     summary: Get new arrival products
 *     tags: [Catalog - Product]
 *     responses:
 *       200:
 *         description: New arrivals
 */
productRoutes.get('/new-arrivals', ProductController.getNewArrivals);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Catalog - Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 */
productRoutes.get(
  '/:id',
  validateRequest(productIdSchema),
  ProductController.getById,
);

/**
 * @swagger
 * /products/slug/{slug}:
 *   get:
 *     summary: Get product by Slug
 *     tags: [Catalog - Product]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 */
productRoutes.get(
  '/slug/:slug',
  validateRequest(productSlugSchema),
  ProductController.getBySlug,
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Catalog - Product]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug, category]
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 */
productRoutes.post(
  '/',
  authenticate,
  requireRole('Admin'),
  validateRequest(createProductSchema),
  ProductController.create,
);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Catalog - Product]
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
 *         description: Product updated
 */
productRoutes.patch(
  '/:id',
  authenticate,
  requireRole('Admin'),
  validateRequest(updateProductSchema),
  ProductController.update,
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Archive a product
 *     tags: [Catalog - Product]
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
 *         description: Product archived
 */
productRoutes.delete(
  '/:id',
  authenticate,
  requireRole('Admin'),
  validateRequest(productIdSchema),
  ProductController.delete,
);

export { productRoutes };
