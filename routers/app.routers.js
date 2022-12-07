const express = require('express');
const { webAuth, homeAuth } = require('../middlewares/auth');
const router = express.Router();
const authRoutes = require('./auth/auth.routers')
const productsRoutes = require('./products/products.routers')
const path = require('path');
const Products = require('../models/products.mongo');

const infoRoutes = require('./info/info.routers')
const randomRoutes = require('./random/random.router')



const ProductsModel = new Products()



router.use('/auth', authRoutes)
router.use('/info', infoRoutes)
router.use('/random', randomRoutes)

router.get('/', webAuth, async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/home', homeAuth, async (req, res) => {
    res.render(path.resolve(__dirname, '../public/index.ejs'), { products: ProductsModel.getAll(), user: req.user });
});

router.get('/register', webAuth, async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/signup.html'));
});

router.get('/loginError', (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/loginError.ejs'))
})
router.get('/signupError', (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/signupError.ejs'))
})
router.post('/products', productsRoutes)

router.get('*', (req, res) => {
    res.status(404).send('Página no encontrada')
})


module.exports = router;