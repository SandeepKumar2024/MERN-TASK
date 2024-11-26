const express = require('express');
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeControllers');
const authMiddleware = require('../middleware/authMiddleware.js');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + uniqueSuffix + "_" + file.originalname);
  },
});
const upload = multer({ storage }).single("image");


router.use(authMiddleware);

router.post('/', upload, createEmployee);
router.get('/all', getEmployees);
router.put('/:id', upload, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
