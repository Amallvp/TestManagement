import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ModelPopup = ({ title, visible, onCancel, onSubmit, fields }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFinish = (values) => {
    const uploadedFiles = fields
      .filter((f) => f.type === "upload")
      .map((f) => ({ [f.name]: fileList }));
    const finalValues = { ...values, ...Object.assign({}, ...uploadedFiles) };

    onSubmit(finalValues);
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  return (
    <Modal
      title={<span className="text-xl font-semibold">{title}</span>}
      open={visible}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        onCancel();
      }}
      footer={null}
      centered
      bodyStyle={{ padding: "24px 20px" }}
      width={420}
      className="rounded-xl"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
      >
        {fields.map((field, index) => {
          if (field.type === "upload") {
            return (
              <Form.Item
                key={index}
                label={
                  <span className="text-black font-semibold">
                    {field.label}
                  </span>
                }
                name={field.name}
              >
                <Upload
                  accept={field.accept || "*"}
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={({ fileList: newFileList }) =>
                    setFileList(newFileList)
                  }
                  className="w-full"
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {field.placeholder || "Upload File"}
                  </Button>
                </Upload>
                <Text type="secondary" className="text-sm mt-1 block">
                  {field.helpText || ""}
                </Text>
              </Form.Item>
            );
          }

          return (
            <Form.Item
              key={index}
              label={
                <span className="text-black font-semibold">{field.label}</span>
              }
              name={field.name}
              rules={field.rules || []}
            >
              <Input
                placeholder={field.placeholder}
                className="rounded-md text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100"
              />
            </Form.Item>
          );
        })}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModelPopup;
