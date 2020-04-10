export default class GithubAPI {
  GITHUB_ACCESS_TOKEN = "be723071de74353ea07d5707cf6ebe4af121fa41";
  OWNER = "wss1942";
  REPO = "wss1942-1";
  HOST = "https://api.github.com"
  constructor(file_path) {
    // curd使用一样的url，method不同，update比create多了sha字段
    this.url = `${this.HOST}/repos/${this.OWNER}/${this.REPO}/contents/${file_path}`
  }
  headers = {
    "Authorization": "token " + this.GITHUB_ACCESS_TOKEN,
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  };
  async create(content) {
    fetch(this.url, {
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
    fetch(this.url, {
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
    return fetch(this.url, {
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

// 使用utf-8字符集进行base64编码
function utoa(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
// 使用utf-8字符集解析base64字符串 
function atou(str) {
  return decodeURIComponent(escape(window.atob(str)));
}