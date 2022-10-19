const express = require('express');
const passport = require('passport');
const router = express.Router();
const shopController = require('../controllers/shopController');
const passportJWT = require('../middleware/passportJWT')

/* http://localhost:3000/shop/ */
router.get('/', shopController.index);

/* http://localhost:3000/shop/menu */
router.get('/menu', shopController.menu);

/* http://localhost:3000/shop/:id */
router.get('/:id', shopController.getShopWithMenu);

/* http://localhost:3000/shop/ */
router.post('/', shopController.insert);


module.exports = router;