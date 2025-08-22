import React from "react";
import { Layout, Menu, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    message.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <Header className="bg-gray-900 flex justify-between items-center px-6 shadow-md">
      {/* Logo */}
      <div className="text-white text-3xl font-bold ms-20">Test Management</div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="bg-gray-900"
      >
        <Menu.Item key="1" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
