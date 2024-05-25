import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Fetch todos error", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [backendUrl, token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTodos();
  }, [token, fetchTodos, navigate]);

  const addOrUpdateTodo = async () => {
    const url = isEditing
      ? `${backendUrl}/todos/${currentTodoId}`
      : `${backendUrl}/todos`;
    const method = isEditing ? "put" : "post";
    const todoData = { name, age, weight, height, gender };

    try {
      await axios[method](url, todoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
      setName("");
      setAge("");
      setWeight("");
      setHeight("");
      setGender("");
      setIsEditing(false);
      setCurrentTodoId(null);
    } catch (error) {
      console.error("Add/Update todo error", error);
    }
  };

  const editTodo = (todo) => {
    setName(todo.name);
    setAge(todo.age);
    setWeight(todo.weight);
    setHeight(todo.height);
    setGender(todo.gender);
    setIsEditing(true);
    setCurrentTodoId(todo._id);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${backendUrl}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (error) {
      console.error("Delete todo error", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Info List</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={addOrUpdateTodo}>
        {isEditing ? "Update Todo" : "Add Todo"}
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Weight</th>
            <th scope="col">Height</th>
            <th scope="col">Gender</th>
            <th scope="col">Actions</th>
            <th scope="col">Sum</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo._id}>
              <th scope="row">{index + 1}</th>
              <td>{todo.name}</td>
              <td>{todo.age}</td>
              <td>{todo.weight}</td>
              <td>{todo.height}</td>
              <td>{todo.gender}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => editTodo(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </td>
              <td>{todo.age + todo.weight + todo.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
