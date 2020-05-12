import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { Paper } from '@material-ui/core';
import graphqlLogo from './graphql.svg';
import './App.css';

const READ_TODOS = gql`
  query todos{
    todos {
      id
      text
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!) {
    updateTodo(id: $id)
  }
`;


function App() {

  let input;
  const { data, loading, error } = useQuery(READ_TODOS);

  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  
  return (
    <div className="App">

      <header className="header">
        <img id="graphql-svg" src={graphqlLogo} alt="graphql-logo" />
        <h1>Todos</h1> 
      </header>

      <form onSubmit={e => {
        e.preventDefault();
        createTodo({ variables: { text: input.value } });
        input.value = '';
        window.location.reload();
      }}>
        <input className="form-control" type="text" placeholder="Enter todo" ref={node => { input = node; }}></input>
        <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
      </form>
      <ul>
        {data.todos.map((todo) =>
          <li key={todo.id} className="w-100">
            <span className={todo.completed ? "done" : "pending"}>{todo.text}</span>
            <button className="btn btn-sm btn-danger rounded-circle float-right" onClick={() => {
              deleteTodo({ variables: { id: todo.id } });
              window.location.reload();
            }}>X</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App
      
      







