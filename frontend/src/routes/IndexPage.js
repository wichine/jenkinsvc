import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Input, Button } from 'antd';
import IconSvg from '../components/IconSvg';
import NewProjectModal from '../components/NewProjectModal';

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
  const onAddNewClicked = () => {
    props.dispatch({type:"indexPage/showAddModal",show:true});
  };
  return (
    <div>
    <NewProjectModal show={props.showAddNew} dispatch={props.dispatch} key={new Date()}/>
    <Layout style={{height:"100%"}}>
      <Header className={styles.header}>
        <Row>
            <Col span={12}><span style={{color:"#fff",fontSize:20,fontWeight:"600px",letterSpacing:"2px"}}><IconSvg iconName="icon-liebiao" />{inter.title}</span></Col>
            <Col span={12} style={{textAlign:"right"}}>
              <Input.Search onSearch={onSearch} placeholder={inter.search} style={{width:"50%",margin:"0"}}/>
              <Button ghost={true} style={{border:0,margin:"0 0 0 10px"}} onClick={onAddNewClicked}>{inter.new}</Button>
            </Col>
        </Row>
      </Header>

      <Content className={styles.content}>
        <Row type="flex" justify="center" align="middle" style={{height:"100%"}}>
          <IndexContent data={dataDisplay} dispatch={props.dispatch}/>
        </Row>
      </Content>

      
    </Layout>
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps({indexPage}) {
  return {...indexPage};
}

export default connect(mapStateToProps)(IndexPage);

