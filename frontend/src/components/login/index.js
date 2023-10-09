import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../network";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        // Make a POST request to your API with the form values and headers
        const response = await axios.post(login, values, { headers });
        if (response?.data?.success) {
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
          localStorage.setItem("accessToken", response?.data?.accessToken);
          navigate("/");
        }

        // Reset the form fields after a successful submission
        resetForm();
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
    },
  });
  return (
    <div className="add-todo">
      <div className="add-todo-sub">
        <h4>Login</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="username">UserName:</label>
            <div class="form-floating">
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="error " style={{color:'red'}}>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div class="form-floating">
            <input
              type="text"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error" style={{color:'red'}}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="submit-btn-main my-3">
          <button type="submit">Submit</button>
          </div>
          <div className="d-flex">
          <p>Not a member?</p>  
          <Link to="/register">
            <span>Register</span>
          </Link>
          </div>
         
          
        </form>
      </div>
    </div>
  );
};

export default Login;
