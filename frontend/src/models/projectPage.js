import { notification } from 'antd';
import { getVersions,submit } from '../services/project.js';
import { getJobs } from '../services/jenkins.js';
import is from 'is_js';

export default {

  namespace: 'projectPage',

  state: {
    jenkinsJobs:[],
    versions:[],
    loading:false,
    projectName:"Project"
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:"fetchJenkinsJobs"});
    },
  },

  effects: {
    *submitVersionInfo({ info }, { call, put }) {  // eslint-disable-line
      let versionInfo = yield call(submit);
      if (is.array(versionInfo)) {
        yield put({ type: "refresh" });
      }
    },
    *fetchJenkinsJobs({payload},{call,put,select}) {
      let jobs = yield call(getJobs);
      if (is.array(jobs)) {
        yield put({type:"refreshJobs",jobs:jobs});
      }
    },
    *fetchVersions({projectName},{call,put,select}) {
      yield put({type:"refreshing",projectName:projectName});
      let versions = yield call(getVersions,projectName);
      yield put({type:"refresh",versions:versions});
    }
  },

  reducers: {
    refresh(state, {versions}) {
      // console.log("refresh");
      return { ...state,versions:[...versions],loading:false};
    },
    refreshJobs(state,{jobs}) {
      return { ...state,jenkinsJobs:[...jobs]}
    },
    refreshing(state,{projectName}) {
      return { ...state,loading:true,projectName:projectName };
    }
  },

};
