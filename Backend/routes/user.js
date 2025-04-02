const express = require('express');
const router = express.Router();

const { signup, login, logout } = require('../controllers/auth');
const { save, constellations, deleteConstellation, updateConstellation, getUserConstellations } = require("../controllers/star");


router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/save', save);
router.get('/constellations', constellations);
router.get("/constellations/:id",getUserConstellations);
router.delete('/constellations/:id', deleteConstellation);
router.put('/constellations/update/:id', updateConstellation);


module.exports = router;