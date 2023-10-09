const express = require('express');
const todosController = require('../controllers/todosController');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

router.get('/fetchAllTodos', fetchuser, todosController.fetchAllTodos);
router.post('/addTodo', fetchuser, todosController.addTodo);
router.put('/updateTodo/:id', fetchuser, todosController.updateTodo);
router.delete('/deleteTodo/:id', fetchuser, todosController.deleteTodo);

module.exports = router;
