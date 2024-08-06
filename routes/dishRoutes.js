const express = require("express")
const router = express.Router()
const { Dish } = require("../models")
const generateDishName = require("../services/shop.service")

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

router.get("/generate", async (req, res) => {
  try {
    const totalDishes = parseInt(req.query.total, 10)
    if (isNaN(totalDishes) || totalDishes <= 0) {
      return res.status(400).json({ error: "Invalid 'total' query parameter" })
    }

    const dishesData = []
    for (let i = 0; i < totalDishes; i++) {
      const name = generateDishName()
      const description = "Random description" // Or generate a random description if needed
      const price = Math.floor(Math.random() * (50 - 2 + 1)) + 2 // Random integer between 2 and 50
      const qty = Math.floor(Math.random() * (100 - 2 + 1)) + 2 // Random integer between 2 and 100

      dishesData.push({ name, description, price, qty })
    }

    const newDishes = await Dish.bulkCreate(dishesData)

    res.status(201).json(newDishes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
