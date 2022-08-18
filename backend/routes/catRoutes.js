const express = require('express')
const router = express.Router()
const {
    getCats, 
    setCat,
    updateCat,
    deleteCat
} = require('../controllers/catController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getCats).post(protect, setCat)
router.route('/:id').put(protect, updateCat).delete(protect, deleteCat)

module.exports = router

