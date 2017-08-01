import React from 'react';
import { Tag,Dropdown,Menu,Icon,Input } from 'antd';

import is from 'is_js';

const inter = {
    "untag":"未标记"
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
        setTimeout(this.afterBlur,300); // waiting for "onColorSelect" called for setting state.editing to false will destroy the color menu component .not a good solution yet!  
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
                {!this.state.editing && <Tag ref="tag" color={color} onClick={this.onTagClick} ><span hidden={!this.state.shouldUpdate}><Icon type="loading-3-quarters" spin={true} style={{margin:"0 8px 0 0"}}/></span>{text}</Tag>}
                {this.state.editing && 
                    <Input ref="input" defaultValue={text} onChange={this.onInputChange} style={{width:"76px"}} size="small" onBlur={this.onInputBlur} suffix={colorSelector()}/>
                }
            </div>
        );
    }
};

export default ColorTag;