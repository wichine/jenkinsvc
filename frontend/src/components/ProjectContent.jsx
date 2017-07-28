import React from 'react';
import { Table,Tabs,Card,Badge,Tag,Button,Dropdown,Menu,Icon } from 'antd';
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
    "download":"下载"
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
            {title:inter.tag,key:"_tag",dataIndex:"_tag"},
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
    {version:"1.1.234",packTime:"2017-07-28 13:04:05",status:"failed",action:["download","build"]},
    {version:"1.2.102",packTime:"2017-07-29 13:04:05",status:"building",action:["download"]},
    {version:"1.3.113",packTime:"2017-07-30 13:04:05",status:"success",action:["download"]},
    {version:"1.4.1223",packTime:"2017-07-31 13:04:05",status:"new",action:["download"]},
    {version:"1.4.1223",packTime:"2017-07-31 13:04:05",action:["download"]}
];