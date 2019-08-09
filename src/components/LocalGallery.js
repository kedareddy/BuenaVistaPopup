import React, { Component } from "react";
import { Row, Col, Card} from 'antd';
import 'antd/dist/antd.css';
import Gallery from "react-photo-gallery";

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const photos = [
  {
    src: '/1.png',
    width: 2,
    height: 3
  },
  {
    src: '/2.png',
    width: 2,
    height: 3
  },
  {
    src: '/3.png',
    width: 2,
    height: 3
  },
  {
    src: '/4.png',
    width: 3,
    height: 2
  },
  {
    src: '/5.png',
    width: 3,
    height: 2
  },
  {
    src: '/6.png',
    width: 3,
    height: 2
  },
  {
    src: '/7.png',
    width: 3,
    height: 2
  },
];


class LocalGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
          <Row type="flex">
            <Col span={24}>
              <Gallery photos={photos}/>
            </Col>
          </Row>
        );
    }
}

export default LocalGallery;
