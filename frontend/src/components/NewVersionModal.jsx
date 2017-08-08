import React from 'react';
import { Modal,Button,Form,Input,Icon } from 'antd';

const FormItem = Form.Item;

const inter = {
    "modalTitle":"新建版本",
    "cancel":"取消",
    "ok":"确认",
    "versionId":"版本号",
    "description":"版本描述",
    "titleRequired":"请输入版本号",
    "descRequired":"请输入版本描述"
}


class RawForm extends React.Component {
  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    return (
        <Form layout="vertical">
            <FormItem label={inter.versionId} >
                {getFieldDecorator('versionId', {
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


class NewVersionModal extends React.Component {
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
            this.props.dispatch({type:"projectPage/addNewVersion",version:values});
        });
    }
    handleCancel = () => {
        this.props.dispatch({type:"projectPage/showAddModal",show:false});
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

export default NewVersionModal;

