const asyncHandler = require('express-async-handler')

const Cat = require('../models/catModel')

// @desc    get cats
// @route   GET /api/cats
// @access  PRIVATE
const getCats = asyncHandler(async (req, res) => {
    const cats = await Cat.find({user: req.user.id})
    res.status(200).json(cats)
})

// @desc    set cat
// @route   POST /api/cats
// @access  PRIVATE
const setCat = asyncHandler(async (req, res) => {
    if (!req.body.meow) {
        res.status(400)
        throw new Error('please specify meow')
    }
    const cat = await Cat.create({
        user: req.user.id,
        meow: req.body.meow
    })
    res.status(201).json(cat)
})

// @desc    update cat
// @route   PUT /api/cats
// @access  PRIVATE
const updateCat = asyncHandler(async (req, res) => {
    const cat = await Cat.findById(req.params.id)
    if (!cat) {
        res.status(404)
        throw new Error('cat not found')
    }
    if (cat.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('unauthorized')
    }
    const updatedCat = await Cat.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedCat)
})

// @desc    delete cats
// @route   DELETE /api/cats
// @access  PRIVATE
const deleteCat = asyncHandler(async (req, res) => {
    const cat = await Cat.findById(req.params.id)
    if (!cat) {
        res.status(404)
        throw new Error('cat not found')
    }
    if (cat.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('unauthorized')
    }
    await cat.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCats,
    setCat,
    updateCat,
    deleteCat
}