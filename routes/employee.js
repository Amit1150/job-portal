const express = require('express');
const router = express.Router();

const { 
  getAllPosition,
  getPositionById,
  applyForPosition
} = require("../controllers/employee");

/** Get the position list */
router.get('/', getAllPosition);

/** View Position */
router.get('/view/:id', getPositionById);

/** Apply for given position id */
router.post('/apply', applyForPosition);


module.exports = router;
