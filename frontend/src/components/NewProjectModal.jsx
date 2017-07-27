import React from 'react';
import { Modal,Button,Form,Input,Icon } from 'antd';

const FormItem = Form.Item;

const inter = {
    "modalTitle":"添加项目",
    "cancel":"取消",
    "ok":"确认",
    "title":"项目名称",
    "description":"项目描述",
    "titleRequired":"请输入项目名称",
    "descRequired":"请输入项目描述"
}


class RawForm extends React.Component {
  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    return (
        <Form layout="vertical">
            <FormItem label={inter.title} >
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: inter.titleRequired }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label={inter.description} >
                {getFieldDecorator('description',{
                    rules: [{ required: true, message: inter.descRequired }],
                })(
                    <Input type="textarea" style={{height:"100px"}} />
                )}
            </FormItem>
        </Form>
    );
  }
}

const WrappedForm = Form.create()(RawForm);


class NewProjectModal extends React.Component {
    state = {
        loading:false
    }
    handleOk = () => {
        this.refs.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            this.setState({loading:true});
            this.props.dispatch({type:"indexPage/addNewProject",project:values});
        });
    }
    handleCancel = () => {
        this.props.dispatch({type:"indexPage/showAddModal",show:false});
    }
	render() {
		return (
            <div >
                <Modal
                    visible={this.props.show}
                    title={inter.modalTitle}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel} >{inter.cancel}</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk} loading={this.state.loading} >{inter.ok}</Button>,
                    ]}
                >
                    <WrappedForm ref="form"/>
                </Modal>
            </div>
		);
	}
}

export default NewProjectModal;

