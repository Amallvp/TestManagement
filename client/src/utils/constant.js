export const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const questionFields = [
  {
    name: "question",
    label: "Question",
    rules: [{ required: true }],
  },
  {
    name: "A",
    label: "Option-A",
    rules: [{ required: true }],
  },
  {
    name: "B",
    label: "Option-B",
    rules: [{ required: true }],
  },
  {
    name: "C",
    label: "Option-C",
    rules: [{ required: true }],
  },
  {
    name: "D",
    label: "Option-D",
    rules: [{ required: true }],
  },
  {
    name: "answer",
    label: "Answer",
    rules: [{ required: true }],
  },
];

export const testFields = [
  {
    name: "title",
    label: "Title",
    rules: [{ required: true, message: "Title required" }],
  },
  {
    name: "description",
    label: "Description",
  },
];
export const fileUpload = [
  {
    name: "csvFile",
    label: "Upload CSV",
    type: "upload",
    accept: ".csv",
    placeholder: "Select CSV file",
  },
];


