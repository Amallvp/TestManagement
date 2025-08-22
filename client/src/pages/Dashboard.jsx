import React, { useEffect, useState } from "react";
import { Layout, Card, Dropdown, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/header";
import ModelPopup from "../components/ModelPopup";
import { questionFields, testFields, fileUpload } from "../utils/constant";
import adminApi from "../config.js/adminApi";
import { BASE_URL } from "../config.js/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Content } = Layout;

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [allTest, setAllTest] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState(null);

  console.log(allTest);

  const handleSubmit = async (values) => {
    try {
      const res = await adminApi.post(`${BASE_URL}/tests`, {
        title: values.title,
        description: values.description,
      });
      const newTest = res.data;
      // Show success toast
      setAllTest((prev) => [
        ...prev,
        {
          ...newTest,
          questions: [],
        },
      ]);
      toast.success("Test created successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create test. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await adminApi.get(`${BASE_URL}/tests`);
        if (response) {
          setAllTest(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("No Questions Available");
      }
    };
    fetchTests();
  }, []);

  const handleAddQuestion = async (values) => {
    const payload = {
      questionText: values.question,
      options: [values.A, values.B, values.C, values.D],
      answer: values.answer,
    };
    if (!selectedTestId) return;

    try {
      const res = await adminApi.post(
        `${BASE_URL}/questions/${selectedTestId}`,
        payload
      );
      toast.success("Question added successfully!");
      setAllTest((prev) =>
        prev.map((test) =>
          test._id === selectedTestId
            ? { ...test, questions: [...test.questions, res.data.question] }
            : test
        )
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add question");
    }
  };

  const handleMenuClick = ({ key }, testId) => {
    setSelectedTestId(testId); // store the clicked test
    if (key === "1") {
      setIsModalOpen(true); // Add question modal
    } else if (key === "2") {
      setIsImportOpen(true); // CSV import modal
    }
  };

  const handleCSVUpload = async (values) => {

    if (!selectedTestId) return;
    const file = values.csvFile[0].originFileObj;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await adminApi.post(
        `${BASE_URL}/questions/${selectedTestId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message);

      setAllTest((prev) =>
        prev.map((test) =>
          test._id === selectedTestId
            ? {
                ...test,
                questions: [...(test.questions || []), ...res.data.questions],
              }
            : test
        )
      );

      setIsImportOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to upload CSV");
    }
  };

  const toggleExpand = async (index, testId) => {
    if (expandedCard === index) {
      setExpandedCard(null);
      return;
    }

    try {
      const res = await adminApi.get(`/questions/${testId}`);
      const questions = res.data || []; // directly take the array

      setAllTest((prev) =>
        prev.map((test, i) => (i === index ? { ...test, questions } : test))
      );

      setExpandedCard(index);
    } catch (error) {
      console.error(error);
      toast.error("No Question Available");
    }
  };

  return (
    <>
      <Layout className="min-h-screen bg-gray-100">
        <Header />
        {/* Toast container MUST be rendered */}
        <ToastContainer position="top-center" autoClose={1000} />
        <Content className="p-6 ">
          <div className="max-w-7xl mx-auto flex alisgn-center justify-between mb-6">
            <h2 className="text-2xl text-gray-500 font-semibold mb-10">
              Dashboard
            </h2>
            <Button
              className="input-button bg-gray-600 p-5"
              onClick={() => setIsTestOpen(true)}
            >
              New Test
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {allTest.map((card, index) => (
              <Card
                key={index}
                className="rounded-xl shadow-md hover:shadow-lg"
                title={
                  <span className="text-lg font-semibold">{card.title}</span>
                }
                extra={
                  <Dropdown
                    menu={{
                      items: [
                        { key: "1", label: "Add Questions" },
                        { key: "2", label: "Import Questions" },
                      ],
                      onClick: (info) => handleMenuClick(info, card._id),
                    }}
                    trigger={["click"]}
                  >
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      className="hover:bg-gray-100"
                    />
                  </Dropdown>
                }
              >
                <p className="text-gray-600">{card.description}</p>
                <div type="link" onClick={() => toggleExpand(index, card._id)}>
                  {expandedCard === index
                    ? "Hide All Questions"
                    : "Show All Questions"}
                </div>

                {expandedCard === index &&
                  card.questions &&
                  card.questions.length > 0 && (
                    <div className="mt-2 max-h-64 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
                      {card.questions.map((q, i) => (
                        <div
                          key={i}
                          className="mb-4 p-2 border-b border-gray-200 last:border-b-0"
                        >
                          {/* Question */}
                          <p className="font-semibold text-gray-700 mb-2">
                            Q{i + 1}: {q.questionText}
                          </p>

                          {/* Options */}
                          <ul className="ml-4 space-y-1">
                            {q.options.map((opt, idx) => (
                              <li
                                key={idx}
                                className={`p-1 rounded ${
                                  opt === q.answer
                                    ? "bg-green-100 text-green-800 font-semibold"
                                    : ""
                                }`}
                              >
                                {opt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
      {/* Modals for adding and importing questions */}
      {isModalOpen && (
        <ModelPopup
          title="Add Questions"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onSubmit={handleAddQuestion}
          fields={questionFields}
        />
      )}

      {isImportOpen && (
        <ModelPopup
          title="Import Questions"
          visible={isImportOpen}
          onCancel={() => setIsImportOpen(false)}
          onSubmit={handleCSVUpload}
          fields={fileUpload}
        />
      )}

      {isTestOpen && (
        <ModelPopup
          title="Add Test"
          visible={isTestOpen}
          onCancel={() => setIsTestOpen(false)}
          onSubmit={handleSubmit}
          fields={testFields}
        />
      )}
    </>
  );
};

export default Dashboard;
