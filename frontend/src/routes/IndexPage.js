import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Row, Col, Input, Icon,Button } from 'antd';

import styles from './IndexPage.less';

import IndexContent from '../components/IndexContent'

const { Header, Content, Footer, Sider } = Layout;

const inter = {
  "new":"新增",
  "title":"所有项目"
}

function IndexPage() {
  return (
    <Layout style={{height:"100%"}}>
      <Header className={styles.header}>
        <Row>
            <Col span={12}><span style={{color:"#fff",fontSize:20,fontWeight:"600px"}}>{inter.title}</span></Col>
            <Col span={12} style={{textAlign:"right"}}>
              <Input suffix={<Icon type="search"/>} style={{width:"50%",margin:"0"}}/>
              <Button ghost={true} style={{border:0,margin:"0 0 0 10px"}}>{inter.new}</Button>
            </Col>
        </Row>
      </Header>

      <Content className={styles.content}>
        <Row type="flex" justify="center" align="middle" style={{height:"100%"}}>
          <IndexContent />
        </Row>
      </Content>

      
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
