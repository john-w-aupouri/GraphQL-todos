import React from 'react';
import '../App.css'

const Form = ({ createTodo, input }) => {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      createTodo({ variables: { text: input.value } });
      input.value = '';
      window.location.reload();
    }}>
      <input className="form-control" type="text" placeholder="Enter todo" ref={node => { input = node; }}></input>
      <button className="btn btn-primary px-5 my-2" type="submit">Add todo ...</button>
    </form>
  );
}

export default Form;
