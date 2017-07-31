import React from 'react';
import { Table,Tabs,Card,Badge,Tag,Button,Dropdown,Menu,Icon,Input } from 'antd';
import Markdown from 'react-markdown';
import styles from './ProjectContent.less'

import is from 'is_js'
import IconSvg from './IconSvg'

const inter = {
    "version":"版本号",
    "packTime":"生成时间",
    "description":"版本描述",
    "testcase":"测试结果",
    "status":"状态",
    "tag":"标记",
    "action":"操作",
    "success":"成功",
    "building":"构建中",
    "failed":"失败",
    "undefined":"未知",
    "new":"新建",
    "build":"构建",
    "download":"下载",
    "untag":"未标记"
}

const TabPane = Tabs.TabPane;
class Expand extends React.Component {
    onChange = (key) => {
        console.log("change to ",key);
    }
    render() {
        return (
            <div>
                <Tabs onChange={this.onChange} type="card">
                    <TabPane tab={inter.description} key="description">
                        <Markdown source="# markdown test" />
                    </TabPane>
                    <TabPane tab={inter.testcase} key="testcase">Content of Tab Pane 2</TabPane>
                </Tabs>
            </div>
        );
    }
}

class ColorTag extends React.Component {
    state = {
        editing:false,
        textChanged:false,
        colorChanged:false,
        currentText:( is.string(this.props.text) ) ? this.props.text : inter.untag ,
        currentColor:( is.string(this.props.color) ) ? this.props.color : "#d9d9d9" ,
        colorMenuOpening:false,
        shouldUpdate:false
    }
    afterChange = () => {
        // todo: dispatch to backend
        console.log(this.state.currentText);
        console.log(this.state.currentColor);
    }
    afterBlur = () => {
        let update = (this.state.textChanged || this.state.colorChanged)
        this.setState({editing:false,shouldUpdate:update},this.afterChange);
    }
    onTagClick = () => {
        this.setState({editing:true},()=>{ this.refs.input.focus(); });
    }
    onInputBlur = () => {
        if (this.state.colorMenuOpening) {
            return
        }      
        setTimeout(this.afterBlur,100);     
    }
    onInputChange = (e) => {
        this.setState({textChanged:true,currentText:e.target.value});
    }
    onColorSelect = ({item, key, keyPath}) => {
        this.setState({colorChanged:true,currentColor:key});
    }
    colorMenuOpen = (status) => {
        this.setState({colorMenuOpening:status});
    }
    render() {
        let text = this.state.currentText;
        let color = this.state.currentColor;
        let editMenu = (onMenuClick) => {
            return(
                <Menu onClick={onMenuClick} >
                    <Menu.Item key="pink" >
                        <Tag color="pink" style={{width:"56px",textAlign:"center"}} >pink</Tag>
                    </Menu.Item>
                    <Menu.Item key="red" >
                        <Tag color="red" style={{width:"56px",textAlign:"center"}} >red</Tag>
                    </Menu.Item>
                    <Menu.Item key="orange" >
                        <Tag color="orange" style={{width:"56px",textAlign:"center"}} >orange</Tag>
                    </Menu.Item>
                    <Menu.Item key="green" >
                        <Tag color="green" style={{width:"56px",textAlign:"center"}} >green</Tag>
                    </Menu.Item>
                    <Menu.Item key="cyan" >
                        <Tag color="cyan" style={{width:"56px",textAlign:"center"}} >cyan</Tag>
                    </Menu.Item>
                    <Menu.Item key="blue" >
                        <Tag color="blue" style={{width:"56px",textAlign:"center"}} >blue</Tag>
                    </Menu.Item>
                    <Menu.Item key="purple" >
                        <Tag color="purple" style={{width:"56px",textAlign:"center"}} >purple</Tag>
                    </Menu.Item>
                </Menu>
            );
        }
        const colorSelector = () => {
            return (
                <Dropdown ref="dropdown" overlay={editMenu(this.onColorSelect)} trigger={["hover"]}>
                    <Icon type="skin" onMouseOver={()=>{this.colorMenuOpen(true)}} onMouseOut={()=>{this.colorMenuOpen(false)}} />
                </Dropdown>
            );
        }
        return (
            <div>
                {!this.state.editing && <Tag ref="tag" color={color} onClick={this.onTagClick} ><span hidden={!this.state.shouldUpdate}><Icon type="loading" spin={true} style={{margin:"0 8px 0 0"}}/></span>{text}</Tag>}
                {this.state.editing && 
                    <Input ref="input" defaultValue={text} onChange={this.onInputChange} style={{width:"76px"}} size="small" onBlur={this.onInputBlur} suffix={colorSelector()}/>
                }
            </div>
        );
    }
}

const Action = (action) => {
    if (is.not.array(action) || action.length==0) {
        return "";
    }
    const actionProps = {
        "build":{"icon":"play-circle-o","text":inter.build},
        "download":{"icon":"download","text":inter.download}
    }
    const OptionMenu = () => {
        const getMenuItems = (value,index) => {
            if (is.not.propertyDefined(actionProps,value)) {
                return (<Menu.Item />);
            }
            return (
                <Menu.Item key={index}>
                    <Button style={{border:0,padding:0,margin:"0 10px"}} type="primary" ghost >
                    <Icon type={actionProps[value].icon} />
                    {actionProps[value].text}
                    </Button>
                </Menu.Item>
            );
        };
        let optActions = action.slice(1);
        return (
            <Menu>
                {optActions.map(getMenuItems)}
            </Menu>
        );
    }

    return (
        <div>
            <Button style={{border:0,padding:0}} type="primary" ghost icon={actionProps[action[0]].icon} >{actionProps[action[0]].text} </Button>
            {
                (action.length>1) ? 
                (<Dropdown overlay={OptionMenu()} trigger={['hover']} >
                    <Button style={{border:0}} type="primary" ghost icon="down" ></Button>
                </Dropdown>) : (<div></div>) 
            }
        </div>
    );
};

class ProjectContent extends React.Component {
    expandRender = (record) => {
        return (
            <Expand />
        );
    }
    render() {
        const columns = [
            {title:inter.version,key:"_version",dataIndex:"_version"},
            {title:inter.packTime,key:"packTime",dataIndex:"packTime"},
            {title:inter.status,key:"_status",dataIndex:"_status"},
            {title:inter.tag,key:"_tag",dataIndex:"_tag",width:"300px"},
            {title:inter.action,key:"_action",dataIndex:"_action",width:"120px"}
        ];
        const wrapData = (value,index) => {
            let v = {...value};
            v.key = index;
            const colors = {
                "new":"#d9d9d9",
                "success":"green",
                "failed":"red",
                "building":"blue",
                "undefined":"orange"
            };
            v._version = (is.propertyDefined(v,"version")) ? <Tag color={(v.status) ? colors[v.status] : colors["undefined"]}>{v.version}</Tag> : "";
            
            const wrapStatus = {
                "new":<Badge status="default" text={inter.new} />,
                "success":<Badge status="success" text={inter.success} />,
                "failed":<Badge status="error" text={inter.failed} />,
                "building":<Badge status="processing" text={inter.building} />,
                "undefined":<Badge status="warning" text={inter.undefined} />
            }
            v._status = (is.propertyDefined(v,"status")) ? wrapStatus[v.status] : wrapStatus["undefined"];
            
            v._tag = <ColorTag color={v.tag && v.tag.color} text={v.tag && v.tag.text} />;

            v._action = (is.propertyDefined(v,"action") && is.array(v.action)) ? Action(v.action) : "";
            return v;
        };
		return (
            <div style={{ padding: '30px',width:"100%",height:"100%",overflow:"auto" }}>
                <Card bordered={false} bodyStyle={{padding:"24px 24px 0 24px"}}>
                <Table 
                    columns = {columns}
                    dataSource = {mockVersions.map(wrapData)}
                    expandedRowRender = {this.expandRender}
                    bordered = {false}
                />
                </Card>
            </div>
		);
	}
}

export default ProjectContent;


let mockVersions = [
    {version:"1.0.123",packTime:"2017-07-27 13:04:05",status:"success",action:["build","download","download"]},
    {version:"1.1.234",packTime:"2017-07-28 13:04:05",status:"failed",action:["download","build"],tag:{color:"red",text:"不可用"}},
    {version:"1.2.102",packTime:"2017-07-29 13:04:05",status:"building",action:["download"]},
    {version:"1.3.113",packTime:"2017-07-30 13:04:05",status:"success",action:["download"]},
    {version:"1.4.1223",packTime:"2017-07-31 13:04:05",status:"new",action:["download"]},
    {version:"1.4.1223",packTime:"2017-07-31 13:04:05",action:["download"]}
];