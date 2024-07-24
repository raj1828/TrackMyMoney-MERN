const express = require('express');
const { getAllTransections, addTransection, editTransection, deleteTransection } = require('../controllers/transectionCtrl');
// router obj
const router = express.Router();
//routers
// Get all Transaciton
router.post('/get-transection', getAllTransections);

// Add Transection
router.post('/add-transection', addTransection);
// Edit Transection
router.post('/edit-transection', editTransection);

// Delete Transection
router.post('/delete-transection', deleteTransection);



module.exports = router;