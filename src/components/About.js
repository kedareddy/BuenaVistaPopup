import React, { Component } from "react";
import { Row, Col, Typography} from 'antd';

const { Text, Title } = Typography;

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
          <Row type="flex" justify="center">
            <Col span={24} style={{minHeight:"50vh"}}>
              <Row type="flex" justify="center" align="middle">
                <Col span={10}>
                  <Title style={{textAlign: "center", margin: "5em"}}> About Us </Title>
                </Col>
                <Col span={14}>
                  <Title level={4} style={{textAlign: "center", margin: "5em"}}>
                    This is collaboration between IDEO CoLab and the City of San Jose to collect the needs of residents in the Buen Vista neighborhood as it relates to their mobility.
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>
        );
    }
}

export default About;
