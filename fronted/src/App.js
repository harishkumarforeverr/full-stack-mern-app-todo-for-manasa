import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Form, Table, Button, Modal, Input, DatePicker } from "antd";
import moment from "moment";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const App = () => {
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, seteditingRecord] = useState([]);
  const showModal = (record) => {
    setIsModalOpen(true);
    seteditingRecord(record);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Task",
      dataIndex: "Task",
    },
    {
      title: "Date",
      dataIndex: "Date",
      render: (text) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },
    {
      title: "Priority",
      dataIndex: "Priority",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      render: (text, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                showModal(record);
              }}
              type="primary"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                handleTheDelete(record);
              }}
              style={{
                background: "red",
                color: "white",
                marginLeft: "1rem",
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const handleTheEdit = async (record) => {
    console.log("dddddddddd", record);
  };
  const handleTheDelete = async (record) => {
    console.log("dddddddddd", record);
    await axios.delete(`http://localhost:9000/users/${record._id}`);
    getTodo();
  };
  const getTodo = async () => {
    const res = await axios.get("http://localhost:9000/users");
    const data = res.data;
    console.log("rrrrrrrrrrrrr", data);
    setData(data);
    form.resetFields();
  };
  const postTodo = async (data) => {
    const res = await axios.post("http://localhost:9000/users", data);
    getTodo();
  };
  useEffect(() => {
    getTodo();
  }, []);

  const onFinish = (values) => {
    console.log("ssssssssssss", values);

    postTodo(values);
    // console.log('Success:', obj);
  };
  const postTodoEdit = async (data) => {
    await axios.put(`http://localhost:9000/users/${editingRecord._id}`, data);
    getTodo();
    setIsModalOpen(false);
    formEdit.resetFields();
  };
  const onFinishEdit = (values) => {
    console.log("ssssssssssss", values);

    postTodoEdit(values);
    // console.log('Success:', obj);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleTheSort = async (arg) => {
    if (arg == "date") {
      const res = await axios.get("http://localhost:9000/users/sortByDate");
      const data = res.data;
      console.log("rrrrrrrrrrrrr", data);
      setData(data);
    }
    if (arg == "Priority") {
      const res = await axios.get("http://localhost:9000/users/sortByPriory");
      const data = res.data;
      console.log("rrrrrrrrrrrrr", data);
      setData(data);
    }
  };
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Task"
          name="Task"
          rules={[
            {
              required: true,
              message: "Please input your Task!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="Priority"
          rules={[
            {
              required: true,
              message: "Please input your Priority!",
            },
          ]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="Date"
          rules={[
            {
              required: true,
              message: "Please enter the Date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={
            {
              // offset: 8,
              // span: 16,
            }
          }
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* //#b0779a */}
      {/* #4fb8b6 */}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          style={{
            background: "#b0779a",
            color: "white",
            marginLeft: "1rem",
          }}
          onClick={() => {
            handleTheSort("date");
          }}
        >
          sort Date
        </Button>
        <Button
          style={{
            background: "#4fb8b6",
            color: "white",
            marginLeft: "1rem",
          }}
          onClick={() => {
            handleTheSort("Priority");
          }}
        >
          sort Priority
        </Button>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={formEdit} onFinish={onFinishEdit} autoComplete="off">
          <Form.Item
            label="Task"
            name="Task"
            rules={[
              {
                // required: true,
                message: "Please input your Task!",
              },
            ]}
          >
            <Input defaultValue={editingRecord.Task} />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="Priority"
            rules={[
              {
                // required: true,
                message: "Please input your Priority!",
              },
            ]}
          >
            <Input
              type="number"
              min={0}
              defaultValue={editingRecord.Priority}
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="Date"
            rules={[
              {
                // required: true,
                message: "Please enter the Date!",
              },
            ]}
          >
            <DatePicker defaultValue={moment(editingRecord.Date)} />
          </Form.Item>

          <Form.Item
            wrapperCol={
              {
                // offset: 8,
                // span: 16,
              }
            }
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* editingRecord */}
      </Modal>
    </div>
  );
};
export default App;
