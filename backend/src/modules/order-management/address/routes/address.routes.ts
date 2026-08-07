import { Router } from 'express';
import { AddressController } from '../controllers/address.controller.js';
import { authenticate } from '../../../../app/middlewares/auth/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', AddressController.getAddresses);
router.post('/', AddressController.addAddress);
router.patch('/:id', AddressController.updateAddress);
router.delete('/:id', AddressController.deleteAddress);

export { router as addressRoutes };
