import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Row, Col, Input, Icon,Button } from 'antd';

import styles from './IndexPage.less';

import IndexContent from '../components/IndexContent'

const { Header, Content, Footer, Sider } = Layout;

const inter = {
  "new":"新增",
  "title":"所有项目",
  "search":"输入项目名过滤..."
}

function IndexPage(props) {
  let dataDisplay = props.projectsDisp;
  const onSearch = (value) => {
    props.dispatch({type:"indexPage/filter",value:value});
  };
  return (
    <Layout style={{height:"100%"}}>
      <Header className={styles.header}>
        <Row>
            <Col span={12}><span style={{color:"#fff",fontSize:20,fontWeight:"600px"}}>{inter.title}</span></Col>
            <Col span={12} style={{textAlign:"right"}}>
              <Input.Search onSearch={onSearch} placeholder={inter.search} style={{width:"50%",margin:"0"}}/>
              <Button ghost={true} style={{border:0,margin:"0 0 0 10px"}}>{inter.new}</Button>
            </Col>
        </Row>
      </Header>

      <Content className={styles.content}>
        <Row type="flex" justify="center" align="middle" style={{height:"100%"}}>
          <IndexContent data={dataDisplay}/>
        </Row>
      </Content>

      
    </Layout>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps({indexPage}) {
  return {...indexPage};
}

export default connect(mapStateToProps)(IndexPage);

