import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Map from "./components/Map";
import LocalGallery from "./components/LocalGallery";
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        //this.callAPI();
    }

    render() {
        return (
          <Layout className="layout">
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px', float: "right" }}
              >
                <Menu.Item key="1">Spanish</Menu.Item>
                <Menu.Item key="2">English</Menu.Item>
              </Menu>
            </Header>
            <Content>
              <Hero/>
              <About/>
              <Map/>
              <LocalGallery/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>IDEO CoLab ©2019 Created by Team San Jose</Footer>
          </Layout>

        );
    }
}

export default App;
