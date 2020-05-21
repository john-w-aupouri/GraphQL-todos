import React from 'react'
import '../App.css'

const Todos = ({ updateTodo, deleteTodo, data }) => {
  return (
    <ul>
      {data.todos.map((todo) =>
        <li key={todo.id} className="w-100">
          <span className={todo.completed ? "done" : "pending"}>{todo.text}</span>
          <button className="btn btn-sm btn-danger rounded-circle float-right" onClick={() => {
            deleteTodo({ variables: { id: todo.id } });
            window.location.reload();
          }}>X</button>
          
          <button className={`btn btn-sm float-right ${todo.completed ? "btn-success" : "btn-info"}`} onClick={() => {
            updateTodo({ variables: { id: todo.id } });
            window.location.reload();
          }}>{todo.completed ? <span>Completed</span> : <span>Not completed</span>}</button>
        </li>
      )}
    </ul>
  )
}

export default Todos
