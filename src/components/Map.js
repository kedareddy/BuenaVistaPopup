import React, { Component } from "react";
import { Row, Col, Typography, Card, Form, Input, Button, Radio, Upload, Icon } from 'antd';
import ReactMapboxGl, { GeoJSONLayer,Popup } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import firebase from './../firebase.js';

const GeoJSON = require('geojson');

const { Text, Title } = Typography;
const { TextArea } = Input;

const Mapbox =  ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

const {Meta} = Card;


const symbolLayout: MapboxGL.SymbolLayout = {
  'text-field': '{place}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
};
const symbolPaint: MapboxGL.SymbolPaint = {
  'text-color': 'white'
};

const circleLayout: MapboxGL.CircleLayout = { visibility: 'visible' };
const circlePaint: MapboxGL.CirclePaint = {
  'circle-color': 'blue'
};

class Map extends Component {


    constructor(props) {
        super(props);
        this.state = {
          geoJSON: null,
          popupInfo: null,
          showInput: false,
          textAreaText: "",
          messageType: "happy",
          fileToUpload: null,
          viewport: {
             width: '100%',
             height: '60vh',
             latitude: 51.507351,
             longitude: -122.4376,
             zoom: 8
          },
        };
        //long, lat for react-mapbox-gl plugin
        this.center = [-121.9224, 37.3193];
    }

    componentDidMount() {
       this.getData();
    }

    componentWillUnmount(){
      delete this.center;
    }

    getData=()=>{
      const db = firebase.firestore();
      db.collection('WestSanJose').get()
      .then(snapshot => {
        let wholeData = [];
        snapshot.forEach(doc => {
          wholeData.push(doc.data())
        });
        let geo = GeoJSON.parse(wholeData, {Point: ['lat', 'long']});
        this.setState({geoJSON: geo});
      })
      .catch(error => {
        console.log('Error!', error);
      })
    }

    onClickCircle = (evt) => {
      console.log("clicked!");
      console.table(evt);
      console.log(evt.features[0].properties['description']);
      let popupInfo = {};
      popupInfo.position =  [evt.lngLat['lng'],evt.lngLat['lat']];
      popupInfo.properties = evt.features[0].properties;
      this.setState({popupInfo: popupInfo, showInput: false});
    }

    onClickMap = (map, evt) =>{
      console.table(evt);
      let popupInfo = {};
      popupInfo.position =  [evt.lngLat['lng'],evt.lngLat['lat']];
      this.setState({popupInfo: popupInfo, showInput: true});
    }

    // handleSubmit = e => {
    //
    //   e.preventDefault();
    //   console.table(e.target);
    //   this.props.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values);
    //       console.table(values);
    //     }
    //   });
    // };

    // handleTextAreaChange = e =>{
    //     console.log(e.target.value);
    //     this.setState({textAreaText: e.target.value});
    // }
    //
    handleRadioChange = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        messageType: e.target.value,
      });
    };

    handleUpload = (file,fileList) =>{
      console.log("files: " + file);
      console.table(file);
      this.setState({fileToUpload: file});
    }

    handleFormSubmit=(formProps)=>{
      let obj = this;
      formProps.preventDefault();
      console.table(formProps.target)
      console.log(formProps.target.elements[2].value);
      this.setState({textAreaText:formProps.target.elements[2].value}, ()=>{
        let storageRef = firebase.storage().ref();
        let mainImage = storageRef.child(this.state.fileToUpload.name);
        mainImage.put(this.state.fileToUpload).then((snapshot) => {
          mainImage.getDownloadURL().then((url)=>{
            const db = firebase.firestore();
            db.collection('WestSanJose').add({
              description: obj.state.textAreaText,
              lat:obj.state.popupInfo.position[1],
              long: obj.state.popupInfo.position[0],
              pointtype: obj.state.messageType,
              url: url,
            })
            this.setState({popupInfo: null}, ()=>{
              obj.getData();
            });

          })
        })
      });

    }

    render() {
      //const { getFieldDecorator } = this.props.form;
      const uploadProps = {
         beforeUpload: this.handleUpload,
         multiple: false,
      };
        return (
          <Row type="flex">
            <Col span={24} style={{marginTop: "5em", marginBottom: "5em"}}>
              <Title level={1} style={{textAlign: "center", margin: "1em"}}>
                Tell us About Your Neighborhood
              </Title>
              <Text style={{textAlign: "center", margin:'auto', display: "block"}}>
                Click on the Map to Add Your Story!
              </Text>
              <Mapbox
                style="mapbox://styles/mapbox/light-v9"
                center={this.center}
                onClick={this.onClickMap}
                containerStyle={{
                  height: '85vh',
                  width: '80%',
                  margin: "auto",
                }}
              >
                <GeoJSONLayer
                  data={this.state.geoJSON}
                  circleLayout={circleLayout}
                  circlePaint={circlePaint}
                  circleOnClick={this.onClickCircle}
                  symbolLayout={symbolLayout}
                  symbolPaint={symbolPaint}
                />
                {this.state.popupInfo && (
                  <Popup
                    key={Date.now()}
                    offset={{
                      'bottom': [0, -20],  'top': [0, 20]
                    }}
                    coordinates={this.state.popupInfo.position}
                  >
                    {this.state.showInput ? (
                        <Form onSubmit={this.handleFormSubmit}>
                          <Text style={{marginBottom: "0.5em", display: "block"}}>
                            This is a place that...
                          </Text>
                          <Radio.Group style={{marginBottom: "2em"}} defaultValue="issue" value={this.state.messageType} name="messagetype" onChange={this.handleRadioChange} >
                            <Radio.Button value="happy">makes me happy</Radio.Button>
                            <Radio.Button value="issue">needs love</Radio.Button>
                          </Radio.Group>
                          <Form.Item>
                            <TextArea placeholder="Tell us why" name="textArea"/>
                          </Form.Item>
                          <Upload style={{marginBottom: "2em"}} {...uploadProps} listType="picture" name="upload">
                            <Text style={{marginBottom: "0.5em", display: "block"}}>
                              Upload an Image
                            </Text>
                            <Button>
                              <Icon type="upload" /> Click to upload
                            </Button>
                          </Upload>
                          <Form.Item >
                            <Button type="primary" htmlType="submit" style={{marginTop: "2em"}}>Submit</Button>
                          </Form.Item>
                        </Form>
                      ):(
                        <Card
                          style={{ width: '12em', height:"auto" }}
                          cover={<img alt="example" src={this.state.popupInfo.properties['url']} />}
                        >
                          <Meta title={this.state.popupInfo.properties['pointtype']} description={this.state.popupInfo.properties['description']} />
                        </Card>
                      )
                    }
                  </Popup>
                )}
              </Mapbox>

            </Col>
          </Row>
        );
    }
}
//const WrappedMap = Form.create({ name: 'map_form' })(Map);
export default Map;
