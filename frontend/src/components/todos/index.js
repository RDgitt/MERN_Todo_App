import React, { useContext, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TodosContext } from "../../context/TodosContext";
import TodoItem from "../todoItem";
import axios from 'axios';
import { fetchAllTodos } from "../../network";
import { toast } from "react-toastify";
const Todos = () => {
  const { data, setData } = useContext(TodosContext);
  const [formData] = useState({});
  const [todoId, setTodoId] = useState(null)
  const ref = useRef(null);

  const getTodos = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json', 
        'auth-token': localStorage.getItem('accessToken')
      };
  
      // Make a POST request to your API with the form values and headers
      const response = await axios.get(fetchAllTodos, { headers });
      console.log('response',response)
      if(response) {
        setData([...data, response?.data])
      }
      
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error submitting form:', error.message);
    }
    }

  const updateTodo = (todo) => {
    todo && setTodoId(todo?._id)
     const existingData = { id: todo?._id,
      title: todo?.title,
      description: todo?.description,
     }
    formik.setValues(existingData);
    ref.current.click();
  };
  const formik = useFormik({
    initialValues: {
      title: formData.title || "",
      description: formData.description || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
        try {
            const URI = `http://localhost:8000/api/updateTodo/${todoId}`
            const headers = {
              'Content-Type': 'application/json', 
              'auth-token': localStorage.getItem('accessToken')
            };

            // Make a POST request to your API with the form values and headers
            const response = await axios.put(URI, values, { headers });
            if(response) {
              getTodos();
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
          } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Error submitting form:', error.message);
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

          ref.current.close();
    },
  });

useEffect(() => {
  getTodos()
}, [])
  return (
    <div className="row">
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group my-3">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="error">{formik.errors.title}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="error">{formik.errors.description}</div>
                  ) : null}
                </div>
                <div className="my-3">
              <button
                type="button"
                className="btn btn-secondary mx-1 "
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary mx-1 "
              >
                Update
              </button>
            </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
      <h5>Your Todos</h5>
      {data[0]?.length === 0 ? <p>Nothing To Preview.</p> :  data[0]?.map((todo, index) => {
        return <TodoItem todo={todo} key={index} updateTodo={updateTodo} />;
      })}
      {/* {data[0]?.map((todo, index) => {
        return <TodoItem todo={todo} key={index} updateTodo={updateTodo} />;
      })} */}
    </div>
  );
};

export default Todos;
