const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth.middleware');

// All routes are protected and for admins only
router.use(protect);

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

router.put('/:id/toggle', toggleTaskStatus);

module.exports = router;
