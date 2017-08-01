import React from 'react';
import { Table,Button } from 'antd';

import is from 'is_js';

const inter = {
    "jobName":"任务名",
    "description":"描述",
    "result":"执行结果",
    "action":"操作"
}

const normalColumns = [
    {title:inter.jobName,key:"jobName",dataIndex:"jobName"},
    {title:inter.description,key:"description",dataIndex:"description"},
    {title:inter.result,key:"result",dataIndex:"result",width:"80px"},
];

const editColumn = [
    {title:inter.action,key:"_action",dataIndex:"_action",width:"100px"}
];

class JobTable extends React.Component {
    state = {
        editedData:[]
    }
    componentDidMount() {
        this.setState({editedData:[...mockData]});
    }
    GetEditedData = () => {
        return this.state.editedData;
    }
    wrapData = (value,index,array) => {
        let v = {...value};
        v.key = index;
        return v
    }
    wrapEditData = (value,index,array) => {
        let v = {...value};
        v.key = index;
        v._action = (
            <span>
                { (index > 0) ? <Button ref="btn" onClick={()=>{this.moveUp(index)}} size="small" icon="caret-up" style={{color:"#00a854",margin:"0 2px"}} shape="circle"  ghost /> : "" }
                { (index != array.length-1) ? <Button onClick={()=>{this.moveDown(index)}} size="small" icon="caret-down" style={{color:"#7265e6",margin:"0 2px"}} shape="circle" ghost /> : "" }
                <Button onClick={()=>{this.deleteRow(index)}} size="small" icon="delete" style={{color:"#f04134",margin:"0 2px"}} shape="circle" ghost />
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
    render() {
        let editMode = this.props.editMode;
        let columns = editMode ? [...normalColumns,...editColumn] : normalColumns ;
        let data = mockData.map(this.wrapData);
        let editedData = this.state.editedData.map(this.wrapEditData);

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


const mockData = [
    {jobName:"jobtest",description:"11111111111111",result:(<a href='http://192.168.9.251:9999/job/jobtest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=jobtest' /></a>)},
    {jobName:"multitest",description:"22222222222222",result:(<a href='http://192.168.9.251:9999/job/multitest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=multitest' /></a>)},
    {jobName:"pipetest",description:"33333333333",result:(<a href='http://192.168.9.251:9999/job/pipetest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=pipetest' /></a>)},
    {jobName:"test",description:"44444444444444",result:(<a href='http://192.168.9.251:9999/job/test' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=test' /></a>)}
]