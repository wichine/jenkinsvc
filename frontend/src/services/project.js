import request from '../utils/request';
import is from 'is_js';

let mockVersions = [
    {id:1,version:"1.0.123",packTime:"2017-07-27 13:04:05",status:"success",action:["build","download","download"],description:"## test test",
    testcase:[
        {jobName:"jobtest",description:"11111111111111",result:(<a href='http://192.168.9.251:9999/job/jobtest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=jobtest' /></a>)},
        {jobName:"multitest",description:"22222222222222",result:(<a href='http://192.168.9.251:9999/job/multitest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=multitest' /></a>)},
        {jobName:"pipetest",description:"33333333333",result:(<a href='http://192.168.9.251:9999/job/pipetest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=pipetest' /></a>)},
        {jobName:"test",description:"44444444444444",result:(<a href='http://192.168.9.251:9999/job/test' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=test' /></a>)}
    ]},
    {id:2,version:"1.1.234",packTime:"2017-07-28 13:04:05",status:"failed",action:["download","build"],tag:{color:"red",text:"不可用"},description:"## test test 111 ",
    testcase:[
        {jobName:"jobtest",description:"11111111111111",result:(<a href='http://192.168.9.251:9999/job/jobtest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=jobtest' /></a>)},
        {jobName:"multitest",description:"22222222222222",result:(<a href='http://192.168.9.251:9999/job/multitest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=multitest' /></a>)},
        {jobName:"pipetest",description:"33333333333",result:(<a href='http://192.168.9.251:9999/job/pipetest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=pipetest' /></a>)},
        {jobName:"test",description:"44444444444444",result:(<a href='http://192.168.9.251:9999/job/test' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=test' /></a>)}
    ]},
    {id:3,version:"1.2.102",packTime:"2017-07-29 13:04:05",status:"building",action:["download"],description:"## test test 222",
    testcase:[
        {jobName:"jobtest",description:"11111111111111",result:(<a href='http://192.168.9.251:9999/job/jobtest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=jobtest' /></a>)},
        {jobName:"multitest",description:"22222222222222",result:(<a href='http://192.168.9.251:9999/job/multitest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=multitest' /></a>)},
        {jobName:"pipetest",description:"33333333333",result:(<a href='http://192.168.9.251:9999/job/pipetest' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=pipetest' /></a>)},
        {jobName:"test",description:"44444444444444",result:(<a href='http://192.168.9.251:9999/job/test' target="_blank" ><img src='http://192.168.9.251:9999/buildStatus/icon?job=test' /></a>)}
    ]},
    {id:4,version:"1.3.113",packTime:"2017-07-30 13:04:05",status:"success",action:["download"],description:"## test test 3333"},
    {id:5,version:"1.4.1223",packTime:"2017-07-31 13:04:05",status:"new",action:["download"],description:"## test test 444"},
    {id:6,version:"1.4.1223",packTime:"2017-07-31 13:04:05",action:["download"]}
];

export async function getVersions() {
  return mockVersions;
}


export async function submit(versionInfo) {
  // return request('/vc/projects');
  for (let i=0;i<mockVersions.length;i++) {
    if ( versionInfo.id && mockVersions[i].id==versionInfo.id) {
      return [...mockVersions[i],description:versionInfo.description,testcase:versionInfo.testcase]
    }
  }
  return [];
}