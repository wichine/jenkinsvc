import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Row, Col, Input, Button, Icon, Spin } from 'antd';
import IconSvg from '../components/IconSvg';
import ProjectContent from '../components/ProjectContent';
import NewVersionModal from '../components/NewVersionModal'

import styles from './ProjectPage.less';

const { Header, Content, Footer, Sider } = Layout;

const inter = {
  "new":"新建版本",
  "main":"主页"
}

function ProjectPage(props) {
  const onAddNewClicked = () => {
    // console.log("add new clicked!");
    props.dispatch({type:"projectPage/showAddModal",show:true});
  };
  const gotoMain = () => {
    props.dispatch(routerRedux.push("/"));
  };
  return (
    <div>
    <NewVersionModal show={props.showAddNew} dispatch={props.dispatch} key={new Date()} />
    <Layout style={{height:"100%"}}>
      <Header className={styles.header}>
        <Row>
            <Col span={12}><span style={{color:"#fff",fontSize:20,fontWeight:"600px",letterSpacing:"2px"}}><Icon type="flag" style={{margin:"0 8px 0 0"}} />{props.projectName}</span></Col>
            <Col span={12} style={{textAlign:"right"}}>
              <Button ghost={true} style={{border:0,margin:"0 0 0 10px"}} onClick={gotoMain}>{inter.main}</Button>
              <Button ghost={true} style={{border:0,margin:"0 0 0 10px"}} onClick={onAddNewClicked}>{inter.new}</Button>
            </Col>
        </Row>
      </Header>
      
      <Content className={styles.content}>
        <Spin spinning={props.loading}>
        <Row type="flex" justify="center" align="middle" style={{height:"100%"}}>
          <ProjectContent {...props} />
        </Row>
        </Spin>
      </Content>

      
    </Layout>
    </div>
  );
}

ProjectPage.propTypes = {
};

function mapStateToProps({projectPage}) {
  return {...projectPage};
}

export default connect(mapStateToProps)(ProjectPage);


