const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

const app = express()

app.use(cors())
app.use(express.json())

const users = []

function checkIfUserAccountExists(request, response, next) {
  const { username } = request.headers
  const user = users.find((user) => user.username === username)

  if (!user) {
    return response.status(404).json({ error: "User not found!" })
  }

  request.user = user

  return next()
}

app.post("/users", (request, response) => {
  const { name, username } = request.body

  const userAlreadyExists = users.some((user) => user.username === username)

  if (userAlreadyExists) {
    return response
      .status(400)
      .json({ error: "User already exists, try using a different username." })
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  }

  users.push(newUser)

  return response.status(201).json(newUser)
})

app.get("/todos", checkIfUserAccountExists, (request, response) => {
  const { user } = request

  return response.json(user.todos)
})

app.post("/todos", checkIfUserAccountExists, (request, response) => {
  const { user } = request
  const { title, deadline } = request.body

  const formattedDeadline = new Date(deadline.replace(/-/g, "/"))
  const deadlineIsPastDate =
    formattedDeadline.getTime() < new Date().setHours(0, 0, 0, 0)

  if (!formattedDeadline.valueOf() || deadlineIsPastDate) {
    return response
      .status(400)
      .json({ error: "Insert a valid date (e.g., yyyy-mm-dd)!" })
  }

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: formattedDeadline,
    created_at: new Date(),
  }

  user.todos.push(newTodo)

  return response.status(201).json(newTodo)
})

app.put("/todos/:id", checkIfUserAccountExists, (request, response) => {
  const { user } = request
  const { title, deadline } = request.body
  const { id } = request.params

  const formattedDeadline = new Date(deadline.replace(/-/g, "/"))
  const deadlineIsPastDate =
    formattedDeadline.getTime() < new Date().setHours(0, 0, 0, 0)

  if (!formattedDeadline.valueOf() || deadlineIsPastDate) {
    return response
      .status(400)
      .json({ error: "Insert a valid date (e.g., yyyy-mm-dd)!" })
  }

  const todo = user.todos.find((todo) => todo.id === id)

  if (!todo) {
    return response
      .status(404)
      .json({ error: "Todo not found, insert a valid id." })
  }

  todo.title = title
  todo.deadline = formattedDeadline

  return response.json(todo)
})

app.patch("/todos/:id/done", checkIfUserAccountExists, (request, response) => {
  const { user } = request
  const { id } = request.params

  const todo = user.todos.find((todo) => todo.id === id)

  if (!todo) {
    return response
      .status(404)
      .json({ error: "Todo not found, insert a valid id." })
  }

  todo.done = true

  return response.json(todo)
})

app.delete("/todos/:id", checkIfUserAccountExists, (request, response) => {
  const { user } = request
  const { id } = request.params

  const todoIndex = user.todos.findIndex((todo) => todo.id === id)

  if (todoIndex === -1) {
    return response
      .status(404)
      .json({ error: "Todo not found, insert a valid id." })
  }

  user.todos.splice(todoIndex, 1)

  return response.status(204).send()
})

module.exports = app
