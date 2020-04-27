export default class GithubAPI {
  // token wss1942 
  GITHUB_ACCESS_TOKEN = window.localStorage.getItem('personal_access_token');
  OWNER = "wss1942";
  REPO = "wss1942-1";
  HOST = "https://api.github.com"
  headers = {
    "Authorization": "token " + this.GITHUB_ACCESS_TOKEN,
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  };
  constructor() {
    // curd使用一样的crud_url，method不同，update比create多了sha字段
  }
  async init() {
    return fetch(`${this.HOST}/user`, {
      headers: this.headers,
      method: 'GET'
    }).then(r => r.json())
      .then(user => {
        this.OWNER = user.name;
        this.repo = new Repo(this.HOST, this.OWNER, this.headers);
      })
  }

  selectRepo(repo) {
    this.crud_url = `${this.HOST}/repos/${this.OWNER}/${repo}/contents/${file_path}`;
  }
  async repos() {
    return this.repo.allRepo();
  }
  async blogs(owner,repo) {
    return fetch(`${this.HOST}/repos/${owner}/${repo}/contents/${'content/posts'}`, {
      headers: this.headers,
      method: 'GET'
    }).then(res => res.json())
  }
}

// 使用utf-8字符集进行base64编码
function utoa(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
// 使用utf-8字符集解析base64字符串 
function atou(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

class Repo {
  constructor(host, owner, headers) {
    this.HOST = host;
    this.OWNER = owner;
    this.headers = headers;
  }
  async allRepo() {
    const page = 0;
    const per_page = 50;
    return fetch(this.HOST + `/users/${this.OWNER}/repos?page=${page}&per_page=${per_page}&affiliation=owner`, {
      headers: this.headers,
      method: 'GET'
    }).then(res => res.json())
  }
  async getPosts(owner, repo) {
    return fetch(`${this.HOST}/repos/${owner}/${repo}/contents/${'content/posts'}`, {
      headers: this.headers,
      method: 'GET'
    }).then(res => res.json())
  }
}

export class Post extends GithubAPI {
  constructor(owner, repo_name, file_path) {
    super();
    this.crud_url= `${this.HOST}/repos/${owner}/${repo_name}/contents/${file_path}`
  }
  async getAllPosts() {
    return fetch(`${this.HOST}/repos/${this.OWNER}/${repo}/contents/${'content/posts'}`, {
      headers: this.headers,
      method: 'GET'
    }).then(res => res.json())
  }
  async create(content) {
    fetch(this.crud_url, {
      headers: this.headers,
      method: 'PUT',
      body: JSON.stringify({
        "message": new Date().toLocaleString(),
        "committer": {
          "name": "wangshushuo",
          "email": "wangshushuo@qq.com"
        },
        "content": utoa(content),
      })
    }).then(res => res.json())
      .then(res => console.log(res))
  }
  async update(content) {
    fetch(this.crud_url, {
      headers: this.headers,
      method: 'PUT',
      body: JSON.stringify({
        "message": new Date().toLocaleString(),
        "committer": {
          "name": "wangshushuo",
          "email": "wangshushuo@qq.com"
        },
        "content": utoa(content),
        "sha": this.sha
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.commit.sha) {
          alert("💯完成修改🧾")
        }
      })
  }
  async read() {
    return fetch(this.crud_url, {
      headers: this.headers,
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.file = res;
        this.sha = res.sha;
        this.content = atou(res.content)
        return this.content;
      })
  }
}