
/**
 * @swagger
 * /api/v1/addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Address]
 *   post:
 *     summary: Add an address
 *     tags: [Address]
 * /api/v1/addresses/{id}:
 *   patch:
 *     summary: Update address
 *     tags: [Address]
 *   delete:
 *     summary: Delete address
 *     tags: [Address]
 */
import { Router } from 'express';
import { AddressController } from '../controllers/address.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';
import { validateRequest } from '../../../../app/middlewares/validate.middleware.js';
import { addressSchema, updateAddressSchema } from '../validation/address.validation.js';

const router = Router();

router.use(authenticate);

router.get('/', AddressController.getAddresses);
router.post('/', validateRequest(addressSchema), AddressController.addAddress);
router.patch('/:id', validateRequest(updateAddressSchema), AddressController.updateAddress);
router.delete('/:id', AddressController.deleteAddress);

export { router as addressRoutes };
