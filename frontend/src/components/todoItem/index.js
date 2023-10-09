import React, { useContext, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { fetchAllTodos } from "../../network";
import { TodosContext } from "../../context/TodosContext";
import { toast } from "react-toastify";
const TodoItem = ({ todo, updateTodo }) => {
  const { data, setData } = useContext(TodosContext);
  const getTodos = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("accessToken"),
      };

      // Make a POST request to your API with the form values and headers
      const response = await axios.get(fetchAllTodos, { headers });
      console.log("response", response);
      if (response) {
        setData([...data, response?.data]);
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting form:", error.message);
    }
  };
  const handleClick = async (todo) => {
    try {
      const URI = `http://localhost:8000/api/deleteTodo/${todo?._id}`;
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("accessToken"),
      };

      // Make a POST request to your API with the form values and headers
      const response = await axios.delete(URI, { headers });
      if(response) {
        toast.success(response?.data?.message || 'Success Message', {
          position: "top-right", // You can adjust the toast position
          autoClose: 3000, // Time in milliseconds to close the toast automatically (3 seconds in this example)
          hideProgressBar: false, // Show or hide the progress bar
          closeOnClick: true, // Close the toast when clicked
          pauseOnHover: true, // Pause the timer when the mouse is over the toast
          draggable: true, // Allow the toast to be draggable
          progress: undefined, // A progress indicator (undefined means use the default)
          // You can add other options as needed
          description: response?.data?.message, // Your description goes here
        });
      }
      console.log("response", response);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting form:", error.message);
      toast.error('Error Message', {
        position: "top-right", // You can adjust the toast position
        autoClose: 3000, // Time in milliseconds to close the toast automatically (3 seconds in this example)
        hideProgressBar: false, // Show or hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the timer when the mouse is over the toast
        draggable: true, // Allow the toast to be draggable
        progress: undefined, // A progress indicator (undefined means use the default)
        // You can add other options as needed
        description: `${error?.message}`, // Your error description goes here
      });
    }
  };

  useEffect(() => {
    getTodos()
  }, [])
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <div className="icon">
            <h5 className="card-title">{todo?.title}</h5>
            <div>
              <BiEditAlt style={{margin:'6px', fontSize:'24px', cursor:'pointer'}} onClick={() => updateTodo(todo)} />
              <RiDeleteBin6Line style={{margin:'6px', fontSize:'22px', cursor:'pointer'}} onClick={() => handleClick(todo)} />
            </div>
          </div>
          <p className="card-text">{todo?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
