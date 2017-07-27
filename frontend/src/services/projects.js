import request from '../utils/request';

const mockProjects = [
    {"title":"Card title 000","content":"Card content card content\ntest test test!"},
    {"title":"Card title 111","content":"Card content card content\ntest test test!"},
    {"title":"Card title 222","content":"Card content card content\ntest test test!"},
    {"title":"Card title 333","content":"Card content card content\ntest test test!"},
    {"title":"Card title 444","content":"Card content card content\ntest test test!"},
    {"title":"Card title 555","content":"Card content card content\ntest test test!"},
    {"title":"Card title 666","content":"Card content card content\ntest test test!"},
    {"title":"Card title 777","content":"Card content card content\ntest test test!"},
    {"title":"Card title 888","content":"Card content card content\ntest test test!"},
    {"title":"Card title 999","content":"Card content card content\ntest test test!"},
    {"title":"Card title aaa","content":"Card content card content\ntest test test!"},
    {"title":"Card title bbb","content":"Card content card content\ntest test test!"},
    {"title":"Card title ccc","content":"Card content card content\ntest test test!"},
    {"title":"Card title ddd","content":"Card content card content\ntest test test!"},
    {"title":"Card title eee","content":"Card content card content\ntest test test!"},
    {"title":"Card title fff","content":"Card content card content\ntest test test!"}
];
export async function getProjects() {
  // return request('/vc/projects');
  return mockProjects;
}
