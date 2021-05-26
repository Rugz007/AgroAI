import { Card, Col, Row, Form, Select, Button, Divider, Input } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { crops, districts, states, seasons } from "./List";
const axios = require("axios").default;
const { Option } = Select;

export default function Home() {
  const [details, setDetails] = useState({
    state: "",
    district: "",
  });
  const [response, setResponse] = useState(null);
  const onChangeState = (e) => {
    console.log(e);
    setDetails({
      ...details,
      state: e,
      district: null,
    });
  };
  const Submit = (e) => {
    e["area"] = parseInt(e["area"]);
    e["district"] = e["district"].toUpperCase();
    console.log(e);
    try {
      axios.post(`http://localhost:8000/model/production`, e).then((response) => setResponse(response.data));
    } catch {}
  };
  return (
    <Layout>
      <Layout>
        <Content style={{ height: "100vh" }}>
          <Row>
            <Col span={4} />
            <Col span={16}>
              <Card
                style={{ width: "100%", borderRadius: "10px", marginTop: "5%" }}
              >
                <p style={{ fontSize: "5rem", marginBottom: "0" }}>
                  <img src="corn.png" alt="logo" />
                  <span style={{ color: "green" }}>Agro</span>AI
                </p>
                <Divider />
                <Row style={{ textAlign: "left" }}>
                  <Col span={10}>
                    <h2>Input Details</h2>
                    <Form onFinish={Submit}>
                      <Form.Item name="state">
                        <Select
                          mode="single"
                          placeholder="Please select state"
                          onChange={onChangeState}
                        >
                          {states.map((state) => {
                            return <Option key={state}>{state}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="district">
                        <Select
                          mode="single"
                          placeholder="Please select district"
                        >
                          {details.state &&
                            districts[details.state].map((district) => {
                              return <Option key={district}>{district}</Option>;
                            })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="season">
                        <Select
                          mode="single"
                          placeholder="Please select season"
                        >
                          {seasons.map((district) => {
                            return <Option key={district}>{district}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="crop">
                        <Select mode="single" placeholder="Please select crop">
                          {crops.map((district) => {
                            return <Option key={district}>{district}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="area">
                        <Input type="number" placeholder="Please enter Area in Hectare" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Predict
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col
                    span={2}
                    style={{
                      backgroundColor: "#f0f0f0",
                      backgroundClip: "content-box",
                      padding: "0 4.1%",
                    }}
                  ></Col>
                  <Col span={12} style={{ textAlign: "center" }}>
                    {response ? (
                      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>
                        Predicted Crop Produce is {response} tonnes.
                      </h1>
                    ) : (
                      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>
                        Input your details and let the AI predict how much
                        produce you will have this year!
                      </h1>
                    )}
                    <img
                      src="robot.png"
                      alt="ai pic"
                      style={{ height: "50%" }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={4} />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
