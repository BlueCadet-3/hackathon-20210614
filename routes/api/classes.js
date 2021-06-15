const express = require('express');
const router = express.Router();
const classesCtrl = require('../../controllers/api/classes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// /api/classes/...
// READ all classes
router.get('/index', classesCtrl.index);

// // CREATE classes
router.post('/create', ensureLoggedIn, classesCtrl.create);
// // UPDATE classes 
router.put('/:id/edit', ensureLoggedIn, classesCtrl.edit);

// DELETE classes
router.delete('/:id/delete', ensureLoggedIn, classesCtrl.remove);

module.exports = router;
