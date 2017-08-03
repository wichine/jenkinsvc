import React from 'react';
import { Table,Tabs,Card,Badge,Tag,Button,Dropdown,Menu,Icon,Input,Row,Col,Spin } from 'antd';
import ColorTag from './ColorTag';
import JobTable from './JobTable'
import Markdown from 'react-markdown';
import styles from './ProjectContent.less';
import CodeBlock from './CodeBlock'

import is from 'is_js';
import IconSvg from './IconSvg';

const inter = {
    "version":"版本号",
    "packTime":"生成时间",
    "description":"版本描述",
    "testcase":"测试用例",
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
    "edit":"编辑",
    "editConfirm":"确认",
    "editCancel":"取消",
    "waiting":"等待中..."
}

const TabPane = Tabs.TabPane;
class Expand extends React.Component {
    state = {
        loading:false,
        currentTab:"description",
        editMode:false,
        text:this.props.description
    }
    onSwitch = (key) => {
        this.setState({currentTab:key});
    }
    onEdit = () => {
        this.setState({editMode:true});
    }
    onEditConfirm = () => {
        this.setState({loading:true});
        this.props.dispatch({type:"projectPage/submitVersionInfo",info:this.getEditedInfo()});
    }
    onEditCancel = () => {
        this.setState({editMode:false,text:this.props.description});
        this.refs.jobTable.CancelEdit();
    }
    onTextChange = (e) => {
        this.setState({text:e.target.value});
    }
    getEditedInfo = () => {
        let editedInfo = {
            id:this.props.id,
            version:this.props.version,
            description:this.state.text,
            testcase:this.refs.jobTable.GetEditedData()
        };
        return editedInfo;
    }
    render() {
        const EditButton = (
            this.state.loading ? 
            <Button loading={true} type="primary" size="small" style={{margin:"0 8px"}} ghost >{inter.waiting}</Button>
            : 
            (
            this.state.editMode ? 
            <div>
            <Button onClick={this.onEditConfirm} type="primary" size="small" style={{margin:"0 4px",color:"#00a854",borderColor:"#00a854"}} icon="check" ghost >{inter.editConfirm}</Button>
            <Button onClick={this.onEditCancel} type="primary" size="small" style={{margin:"0 8px",color:"#f04134",borderColor:"#f04134"}} icon="close" ghost >{inter.editCancel}</Button>
            </div> 
            : 
            <Button onClick={this.onEdit} type="primary" size="small" style={{margin:"0 8px"}} icon="edit" ghost >{inter.edit}</Button>
            )
        );

        return (
            <div>
                <Tabs defaultActiveKey="description" onChange={this.onSwitch} type="card" tabBarExtraContent={EditButton}>
                    <TabPane tab={inter.description} key="description" >
                    <Spin spinning={this.state.loading}>
                    {
                        this.state.editMode ? 
                        <Row gutter={8} className={styles.detailEdit} >
                            <Col span={12}>
                                <Card noHovering={true} bordered={true} bodyStyle={{padding:"0",overflow:"auto"}}>
                                <Input.TextArea onChange={this.onTextChange} style={{height:"200px",resize:"none",border:0}} defaultValue={this.state.text} />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card noHovering={true} bordered={true} bodyStyle={{padding:"12px",height:"200px",overflow:"auto"}} >
                                <Markdown source={this.state.text} renderers={{CodeBlock:CodeBlock}} />
                                </Card>
                            </Col>
                        </Row> :
                        <Row className={styles.detailShow} >
                            <Card noHovering={true} bordered={true} bodyStyle={{padding:"12px",overflow:"auto"}} >
                            <Markdown 
                                source = {this.props.description} 
                                renderers = {{CodeBlock:CodeBlock}}
                            />
                            </Card>
                        </Row>
                    }
                    </Spin>
                    </TabPane>
                    <TabPane tab={inter.testcase} key="testcase">
                        <Spin spinning={this.state.loading}>
                        <JobTable ref="jobTable" editMode={this.state.editMode} data={this.props.testcase} jobs={this.props.jenkinsJobs} />
                        </Spin>
                    </TabPane>
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
            <Expand {...record} dispatch={this.props.dispatch} jenkinsJobs={this.props.jenkinsJobs} />
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
            if (!v.description || is.empty(v.description)) {
                v.description = "";
            }
            if (is.not.array(v.testcase)) {
                v.testcase = [];
            }

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
    {id:1,version:"1.0.123",packTime:"2017-07-27 13:04:05",status:"success",action:["build","download","download"],description:"## test test",
    testcase:[
        {jobName:"jobtest",description:"11111111111111",result:(<a href='http://192.168.9.251:9999/job/jobtest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=jobtest' /></a>)},
        {jobName:"multitest",description:"22222222222222",result:(<a href='http://192.168.9.251:9999/job/multitest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=multitest' /></a>)},
        {jobName:"pipetest",description:"33333333333",result:(<a href='http://192.168.9.251:9999/job/pipetest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=pipetest' /></a>)},
        {jobName:"test",description:"44444444444444",result:(<a href='http://192.168.9.251:9999/job/test' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=test' /></a>)}
    ]},
    {id:2,version:"1.1.234",packTime:"2017-07-28 13:04:05",status:"failed",action:["download","build"],tag:{color:"red",text:"不可用"},description:"## test test 111 ",
    testcase:[
        {jobName:"jobtest",description:"11111111111111",result:(<a href='http://192.168.9.251:9999/job/jobtest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=jobtest' /></a>)},
        {jobName:"multitest",description:"22222222222222",result:(<a href='http://192.168.9.251:9999/job/multitest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=multitest' /></a>)},
        {jobName:"pipetest",description:"33333333333",result:(<a href='http://192.168.9.251:9999/job/pipetest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=pipetest' /></a>)},
        {jobName:"test",description:"44444444444444",result:(<a href='http://192.168.9.251:9999/job/test' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=test' /></a>)}
    ]},
    {id:3,version:"1.2.102",packTime:"2017-07-29 13:04:05",status:"building",action:["download"],description:"## test test 222",
    testcase:[
        {jobName:"jobtest",description:"11111111111111",result:(<a href='http://192.168.9.251:9999/job/jobtest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=jobtest' /></a>)},
        {jobName:"multitest",description:"22222222222222",result:(<a href='http://192.168.9.251:9999/job/multitest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=multitest' /></a>)},
        {jobName:"pipetest",description:"33333333333",result:(<a href='http://192.168.9.251:9999/job/pipetest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=pipetest' /></a>)},
        {jobName:"test",description:"44444444444444",result:(<a href='http://192.168.9.251:9999/job/test' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=test' /></a>)}
    ]},
    {id:4,version:"1.3.113",packTime:"2017-07-30 13:04:05",status:"success",action:["download"],description:"## test test 3333"},
    {id:5,version:"1.4.1223",packTime:"2017-07-31 13:04:05",status:"new",action:["download"],description:"## test test 444"},
    {id:6,version:"1.4.1223",packTime:"2017-07-31 13:04:05",action:["download"]}
];