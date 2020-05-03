'use strict';
export default function api() {
  this.HOST = "https://api.github.com"
  this.headers = {
    "Authorization": "token " + window.localStorage.getItem('personal_access_token'),
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  };

  this.repos = async () => {
    const r = await fetch(`${this.HOST}/user/repos`, {
      headers: this.headers,
      method: 'GET'
    });
    return await r.json();
  }
  this.content = async (repo_full_name, path = 'content/posts') => {
    const res = await fetch(`${this.HOST}/repos/${repo_full_name}/contents/${path}`, {
      headers: this.headers,
      method: 'GET'
    });
    return await res.json();
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