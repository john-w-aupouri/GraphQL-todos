import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Todos from './components/Todos';

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

      <Header />
      <Form createTodo={createTodo} input={input} />
      <Todos deleteTodo={deleteTodo} updateTodo={updateTodo} data={data} />
     
    </div>
  );
}

export default App
      
      







