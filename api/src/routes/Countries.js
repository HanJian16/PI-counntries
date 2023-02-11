const express = require('express');
const {getCountries, getCountriesId} = require('../Controllers/countrys.route.js')
const router = express.Router();

router.get('/countries', getCountries);
router.get('/countries/:id', getCountriesId);

module.exports = router