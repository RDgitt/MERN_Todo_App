const Todos = require("../models/Todo");

exports.fetchAllTodos = async (req, res) => {
  try {
    const todos = await Todos.find({ user: req.user.userId });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new todo
    const todo = new Todos({
      user: req.user.userId,
      title,
      description,
    });

    const tod̥os = await todo.save();

    res.status(201).json({ data: tod̥os, message: 'Todo is added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // update a todo
    const newTodo = {};
    if (title) newTodo.title = title;
    if (description) newTodo.description = description;

    let todo = await Todos.findById(req.params.id);
    if (!todo) return res.status(404).send("Todo is not found");

    //   if(todo.user.toString() !== req.user.id) return res.status(401).send('Not allowed')

    todo = await Todos.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { $new: true }
    );
    res.json({ data: todo, message: 'todo is updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let todo = await Todos.findById(req.params.id);
    if (!todo) return res.status(404).send("Todo is not found");

    //   if(todo.user.toString() !== req.user.id) return res.status(401).send('Not allowed')

    todo = await Todos.findByIdAndDelete(req.params.id);
    res.json({ data: todo, message: " todo is deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
