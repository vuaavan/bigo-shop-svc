const express = require("express")
const router = express.Router()
const { Dish } = require("../models")

// Route to list all dishes
router.get("/dishes", async (req, res) => {
  try {
    const dishes = await Dish.findAll()
    res.json(dishes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Route to show details of a specific dish
router.get("/dishes/:id", async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id)
    if (dish) {
      res.json(dish)
    } else {
      res.status(404).json({ error: "Dish not found" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
