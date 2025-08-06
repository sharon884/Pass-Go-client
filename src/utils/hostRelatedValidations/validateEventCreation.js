const { body } = require("express-validator")

module.exports = [
  body("location").notEmpty().withMessage("Event location is required (GeoJSON object)"),
  body("location.type").equals("Point").withMessage("Location type must be 'Point'"),
  body("location.coordinates")
    .isArray({ min: 2, max: 2 })
    .withMessage("Coordinates must be an array of [longitude, latitude]"),
  body("location.coordinates[0]") // Longitude
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
  body("location.coordinates[1]") // Latitude
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),
  // Additional validation rules can be added here
]
