import React, { Component } from "react";
import { Row, Col, Typography} from 'antd';

const { Text, Title } = Typography;

class Hero extends Component {
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
            <Col span={24} style={{backgroundImage: "url('/Hero1.png')", backgroundRepeat: "no-repeat", backgroundPosition:"center", backgroundAttachment: "fixed", minHeight:"100vh"}}>
              <Row type="flex" justify="center">
                <Col span={20} style={{marginTop: "30em", backgroundColor: "rgba(255, 255, 255, 0.65)", borderRadius: "1em"}}>
                  <div>
                    <img src="/favicon_d.png" style={{textAlign:"center", margin: "auto", display:"block"}}/>
                  </div>
                  <Title style={{textAlign: "center", marginTop: "2em"}}>A Buena Vista Pop-Up</Title>
                  <Title level={4} style={{textAlign: "center"}}>Connecting Residents with the City of San Jose</Title>
                </Col>
              </Row>
            </Col>
          </Row>
        );
    }
}

export default Hero;
