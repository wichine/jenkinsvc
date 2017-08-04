import React from 'react';
import { Table,Button,Dropdown,Input,Select,Icon } from 'antd';

import is from 'is_js';

const inter = {
    "jobName":"任务名",
    "description":"描述",
    "result":"执行结果",
    "action":"操作",
    "newJob":"新增",
    "clickToAdd":"点击选择Jenkins任务...",
    "getJobsFailed":"获取Jenkins任务失败...",
    "inputDescription":"输入任务描述..."
}

const normalColumns = [
    {title:inter.jobName,key:"_jobName",dataIndex:"_jobName"},
    {title:inter.description,key:"description",dataIndex:"description"},
    {title:inter.result,key:"result",dataIndex:"result",width:"80px"},
];

const editColumn = [
    {title:inter.action,key:"_action",dataIndex:"_action",width:"100px"}
];

class JobTable extends React.Component {
    state = {
        editedData:[],
        newJobDescription:"",
        newJobName:"",
        jobNameCheckfailed:false,
        jobDescCheckfailed:false
    }
    componentDidMount() {
        this.setState({editedData:[...this.props.data]});
    }
    CancelEdit() {
        this.setState({
            editedData:[...this.props.data],
            newJobDescription:"",
            newJobName:"",
            jobNameCheckfailed:false,
            jobDescCheckfailed:false
        });
    }
    GetEditedData = () => {
        return this.state.editedData;
    }
    wrapData = (value,index,array) => {
        let v = {...value};
        v.key = index;
        v._jobName = <span><img src="static/headshot.png" alt="" height="15px" /><span style={{margin:"0 0 0 8px",fontWeight:600}}>{v.jobName}</span></span>
        return v
    }
    wrapEditData = (value,index,array) => {
        let v = {...value};
        v.key = index;
        v._jobName = <span><img src="static/headshot.png" alt="" height="15px" /><span style={{margin:"0 0 0 8px",fontWeight:600}}>{v.jobName}</span></span>
        v._action = (
            <span>
                { (index > 0) ? <Button ref="btn" onClick={()=>{this.moveUp(index)}} size="small" icon="caret-up" style={{color:"#00a854",borderColor:"#00a854",margin:"0 2px"}} shape="circle"  ghost /> : "" }
                { (index != array.length-1) ? <Button onClick={()=>{this.moveDown(index)}} size="small" icon="caret-down" style={{color:"#108ee9",borderColor:"#108ee9",margin:"0 2px"}} shape="circle" ghost /> : "" }
                <Button onClick={()=>{this.deleteRow(index)}} size="small" icon="delete" style={{color:"#f04134",borderColor:"#f04134",margin:"0 2px"}} shape="circle" ghost />
            </span>
        );
        return v
    }
    moveUp = (index) => {
        if (index==0) {
            return
        }
        let moveAfter = [...this.state.editedData];
        moveAfter[index-1] = moveAfter.splice(index,1,moveAfter[index-1])[0];
        this.setState({editedData:[...moveAfter]});
    }
    moveDown = (index) => {
        if (index==this.state.editedData.length-1) {
            return
        }
        let moveAfter = [...this.state.editedData];
        moveAfter[index+1] = moveAfter.splice(index,1,moveAfter[index+1])[0];
        this.setState({editedData:[...moveAfter]});
    }
    deleteRow = (index) => {
        if (index >= this.state.editedData.length) {
            return
        }
        let moveAfter = [...this.state.editedData];
        moveAfter.splice(index,1);
        this.setState({editedData:[...moveAfter]});
    }
    getJobs = () => {
        const wrapJobItem = (value,index) => {
            return <Select.Option key={index} value={value.name} ><img src="static/headshot.png" alt="" height="15px" /><span style={{margin:"0 0 0 8px"}}>{value.name}</span></Select.Option>
        };
        if (is.not.array(this.props.jobs)) {
            return [];
        }
        return this.props.jobs.map(wrapJobItem)
    }
    onAddJobClick = () => {
        this.setState({jobNameCheckfailed:(this.state.newJobName==""),jobDescCheckfailed:(this.state.newJobDescription=="")});
        if (is.not.empty(this.state.newJobName) && is.not.empty(this.state.newJobDescription)) {
            let editedData = this.state.editedData;
            editedData.splice(0,0,{jobName:this.state.newJobName,description:this.state.newJobDescription})
            this.setState({editedData:[...editedData],newJobName:"",newJobDescription:""});
        }
    }
    onNewJobDescChanged = (e) => {
        this.setState({newJobDescription:e.target.value}); 
    }
    onNewJobSelect = (v) => {
        this.setState({newJobName:v});
    }
    render() {
        let editMode = this.props.editMode;
        let columns = editMode ? [...normalColumns,...editColumn] : normalColumns ;
        let data = this.props.data.map(this.wrapData);
        let editedData = this.state.editedData.map(this.wrapEditData);
        editedData.splice(0,0,{
            _jobName:(
                <Select 
                mode="combobox"
                onChange={this.onNewJobSelect} 
                placeholder={inter.clickToAdd} 
                value={this.state.newJobName} 
                showSearch={true}
                dropdownMatchSelectWidth={false}
                style={{ width:200,border:(this.state.jobNameCheckfailed ? "2px dashed #f04134" : "1px dashed") }} 
                notFoundContent={<div><Icon type="frown-o" style={{color:"#f04134",margin:"0 8px"}} />{inter.getJobsFailed}</div>} 
                filterOption={(input,option)=>option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.getJobs()}
                </Select>),
            description:(<Input value={this.state.newJobDescription} onChange={this.onNewJobDescChanged} style={{ width:200,border:(this.state.jobDescCheckfailed ? "2px dashed #f04134" : "1px dashed") }} placeholder={inter.inputDescription} />),
            _action:(<Button type="dashed" size="default" icon="plus" onClick={this.onAddJobClick} >{inter.newJob}</Button>),
            key:-1
        });


        return (
            <Table 
                columns = {columns}
                size = "middle"
                pagination = {false}
                dataSource = {editMode ? editedData : data}
            />
        );
    }
};

export default JobTable;

