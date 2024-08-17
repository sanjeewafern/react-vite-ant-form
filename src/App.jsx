import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  message,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./App.css";

const MyForm = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      /* 
        let backendUrl
        const response = await axios.post(backendUrl, values);
        if (response.status === 200) {
          message.success("Registration successful!");
        }
      */
      message.success("Registration successful!");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };
  const onFinishFailed = (error) => {
    console.log({ error });
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject("Please confirm your password!");
    }
    if (value !== form.getFieldValue("password")) {
      return Promise.reject("The two passwords do not match!");
    }
    return Promise.resolve();
  };

  const phoneNumberRules = [
    {
      required: true,
      message: "Please input your phone number!",
    },
    {
      pattern: /^[1-9]\d{8}$/,
      message:
        "Phone number must be exactly 9 digits long and numeric (e.g., 779156399, 112418311).",
    },
  ];

  const passwordRules = [
    {
      required: true,
      message: "Please input your password!",
    },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must be at least 8 characters long and include letters, numbers, and special characters.",
    },
  ];

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields(); // Resets all fields in the form
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      name="register_form"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Enter your username" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
      </Form.Item>

      <Form.Item name="gender" label="Gender" requiredMark="optional">
        <Select placeholder="Select your gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dob"
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: "Please provide your date of birth",
          },
        ]}
        hasFeedback
      >
        <DatePicker
          style={{ width: "100%" }}
          picker="date"
          placeholder="Chose date of birth"
        />
      </Form.Item>

      <Form.Item name="phone" label="Phone Number" rules={phoneNumberRules}>
        <Input
          prefix={<PhoneOutlined />}
          addonBefore="+94"
          maxLength={9}
          placeholder="Enter your phone number"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={passwordRules}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[{ validator: validatePassword }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm your password"
        />
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked">
        <Checkbox>
          I have read and agree to the <a href="#">terms and conditions</a>.
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          style={{ marginLeft: "8px" }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
