const fs = require('fs.promised');
const _ = require('koa-route');
const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');
const app = new Koa();


const static = serve('lib');

const main = async function (ctx, next) {
  ctx.response.type = 'html';
  const editortext = await fs.readFile('./index.html', 'utf8');
  const bolgtext = await fs.readFile('./hello.md', 'utf8');
  const a = editortext.replace('{{editortext}}', bolgtext)
  ctx.response.body = a;
};

const get = async function (ctx, next) {
  ctx.response.type = 'text';
  ctx.response.body = await fs.readFile('./hello.md', 'utf8');
};

const show = async function (ctx, next) {
  ctx.response.type = 'text';
  ctx.response.body = await fs.readFile('./hello.md', 'utf8');
};

app.use(static);
app.use(_.get('/', main));
app.use(_.get('/get', get));
app.use(_.get('/save', show));

app.listen(3000);