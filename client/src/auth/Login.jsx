import React from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import "../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config.js/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      // Send login request
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      const { token } = response.data;

      // Store JWT in localStorage
      localStorage.setItem("adminToken", token);

      // Show success toast
      toast.success("Login successful!");

      // Redirect to dashboard after short delay
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-[#121212] px-4">
      {/* Toast container MUST be rendered */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-gray-700 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <Form
          name="login"
          initialValues={{
            email: "",
            password: "",
            // role: "",
          }}
          onFinish={handleLogin}
          onFinishFailed
          layout="vertical"
        >
          {/* Email */}
          <Form.Item label="Email" name="email">
            <Input
              className="font-bold "
              placeholder="Enter email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              className="font-bold"
              placeholder="Enter password"
            />
          </Form.Item>

          {/* <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="user">Viewer</Option>
            </Select>
          </Form.Item> */}

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full p-6 bg-blue-800 hover:bg-teal-900 font-bold text-xl"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
