"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface Todo {
  id: number
  text: string
  description: string
  completed: boolean
  createdAt: Date
  completedAt: Date | null
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [newDescription, setNewDescription] = useState("")
  // Remove this line:
  // const [showDescriptionInput, setShowDescriptionInput] = useState(false)

  const addTodo = () => {
    if (newTodo.trim() === "") return

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      description: newDescription,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    }

    setTodos([...todos, todo])
    setNewTodo("")
    setNewDescription("")
    // And remove these lines in the addTodo function:
    // setShowDescriptionInput(false)
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : null,
            }
          : todo,
      ),
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addTodo()
    }
  }

  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy h:mm a")
  }

  // Function to get a pastel color based on the task ID
  const getPastelColor = (id: number) => {
    const colors = ["bg-pastel-pink", "bg-pastel-blue", "bg-pastel-green", "bg-pastel-yellow", "bg-pastel-purple"]
    return colors[id % colors.length]
  }

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="bg-pastel-purple rounded-t-lg">
        <CardTitle className="text-2xl text-center">My Todo List</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Replace the section with the Input and the showDescriptionInput toggle with: */}
        <div className="space-y-4 mb-6">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-2 focus:border-pastel-purple"
          />

          <Textarea
            placeholder="Add description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border-2 focus:border-pastel-purple"
            rows={3}
          />

          <Button
            onClick={addTodo}
            className="w-full bg-pastel-purple hover:bg-pastel-purple/80 text-black"
            disabled={newTodo.trim() === ""}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your to-do list is empty. Add a task to get started!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`rounded-lg border-2 overflow-hidden ${
                  todo.completed ? "border-pastel-green" : "border-gray-200"
                }`}
              >
                <div className={`p-4 ${getPastelColor(todo.id)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        className="border-2 border-gray-400"
                      />
                      <label
                        htmlFor={`todo-${todo.id}`}
                        className={`font-medium ${todo.completed ? "line-through text-gray-500" : ""}`}
                      >
                        {todo.text}
                      </label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete ${todo.text}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Replace the conditional rendering of description and dates with: */}
                <div className="p-4 bg-white">
                  {todo.description && <p className="text-sm text-gray-600 mb-3">{todo.description}</p>}

                  <div className="flex flex-col gap-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Created: {formatDate(todo.createdAt)}</span>
                    </div>

                    {todo.completed && todo.completedAt && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Completed: {formatDate(todo.completedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

