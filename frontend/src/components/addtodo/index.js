import React, { useContext, useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TodosContext } from "../../context/TodosContext";
import { addTodo, fetchAllTodos } from "../../network";
import { toast } from "react-toastify";
const AddTodo = () => {
  const { data, setData } = useContext(TodosContext);
  const getTodos = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("accessToken"),
      };

      // Make a POST request to your API with the form values and headers
      const response = await axios.get(fetchAllTodos, { headers });
      if (response) {
        setData([...data, response?.data]);
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting form:", error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const headers = {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("accessToken"),
        };

        // Make a POST request to your API with the form values and headers
        const response = await axios.post(addTodo, values, { headers });
        resetForm();
        if (response) {
          setData([...data, response?.data]);
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
        console.error("Error submitting form:", error);
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
    },
  });
 useEffect(() => {
  getTodos()
 }, [])
  return (
    <div className="add-todo">
      <div className="add-todo-sub">
        <h4>ADD TODO</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="title">Title:</label>
            <div class="form-floating">
              <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </div>
            {formik.touched.title && formik.errors.title ? (
              <div className="error" style={{color:'red'}}>{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a Todo here"
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div className="error" style={{color:'red'}}>{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="submit-btn-main my-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
