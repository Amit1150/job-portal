const express = require('express');
const router = express.Router();

const { 
  getAllPosition,
  savePosition,
  getPositionById,
  updatePosition
} = require("../controllers/manager");

/** Render position list view */
router.get("/positions", getAllPosition);

/** Render position add view */
router.get('/position/add', function (req, res, next) {
  res.render('../views/manager/position-add', {
    message: '',
    type: ''
  });
});

router.post("/position/add", savePosition);

/** Render position edit view */
router.get("/position/edit/:id", getPositionById);
router.post("/position/edit/:id", updatePosition);


module.exports = router;
