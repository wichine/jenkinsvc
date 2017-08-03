import { notification } from 'antd';
import { getVersions,submit } from '../services/project.js';
import { getJobs } from '../services/jenkins.js';
import is from 'is_js';

export default {

  namespace: 'projectPage',

  state: {
    jenkinsJobs:[]
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
    *fetchJenkinsJobs({payload},{call,put}) {
      let jobs = yield call(getJobs);
      if (is.array(jobs)) {
        yield put({type:"refreshJobs",jobs:jobs});
      }
    }
  },

  reducers: {
    refresh(state, {payload}) {
      // console.log("refresh");
      return { ...state };
    },
    refreshJobs(state,{jobs}) {
      return { ...state,jenkinsJobs:[...jobs]}
    }
  },

};
