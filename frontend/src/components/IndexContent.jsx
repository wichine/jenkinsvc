import React from 'react';
import { routerRedux } from 'dva/router';
import { Card, Col, Row, Button, Icon } from 'antd';

import IconSvg from './IconSvg'

const inter = {
    "nothing":"没有发现项目呦~~ 点击“新增”添加"
}

const ColorfulCard = (props) => {
    const color = {
        "red":{"title":"#f04134","body":"#fcdbd9"},
        "green":{"title":"#00a854","body":"#cfefdf"},
        "blue":{"title":"#108ee9","body":"#d2eafb"},
        "pink":{"title":"#f5317f","body":"#fdd8e7"},
        "orange":{"title":"#f56a00","body":"#fde3cf"},
        "purple":{"title":"#7265e6","body":"#e4e2fa"},
        "yellow":{"title":"#ffbf00","body":"#fff3cf"},
        "cyan":{"title":"#00a2ae","body":"#cfedf0"}
    };
    let titleColor = color[props.color] ? color[props.color].title : color["cyan"].title;
    let bodyColor = color[props.color] ? color[props.color].body : color["cyan"].body;
    return (
        <Card bordered={false} bodyStyle={{padding:0}}>
        <Row style={{color:"#fdfdfd",height:"48px",background:titleColor,fontSize:14,fontWeight:"500",lineHeight:"48px",padding:"0 24px"}}>
            {props.title}
        </Row>
        <Row style={{height:"100%",background:bodyColor,padding:24}}>
            {props.content}
        </Row>
        </Card>
    );
}


class IndexContent extends React.Component {
    onClick = (value) => {
        this.props.dispatch({type:"projectPage/fetchVersions",projectName:value.title});
        this.props.dispatch(routerRedux.push("/project"));
    };
    wrapContent = (value,index) => {
        const colors = ["cyan","purple","yellow","green","red","blue","pink","orange"];
        return (
            <Row key={index} style={{padding:"8px 0",cursor:"pointer"}} onClick={()=>{this.onClick(value)}} >
                <Col span={24}>
                    <ColorfulCard 
                        title = {value.title ? value.title : ""}
                        content = {value.description ? value.description : ""}
                        color = {colors[index % 8]}
                    />
                </Col>
            </Row>
        );
    };
	render() {
		return (
            <div style={{ background: '#ECECEC', padding: '30px',width:"100%",height:"100%",overflow:"auto" }}>
                {(this.props.data.length>0) ? this.props.data.map(this.wrapContent) : <div>
                    <Row style={{textAlign:"center"}}><IconSvg iconName="icon-kong" color="#bfbfbf" fontSize="128px" /></Row>
                    <Row style={{color:"#919191",textAlign:"center"}}>{inter.nothing}</Row>
                </div>}
            </div>
		);
	}
}

export default IndexContent;

