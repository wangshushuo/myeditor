const fs = require('fs');
const Router = require('koa-router');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
const path = require('path');
const app = new Koa();
var router = new Router();



const main = function (ctx, next) {
  ctx.response.type = 'html';
  const editortext = fs.readFileSync('./index.html', 'utf8');
  const bolgtext = fs.readFileSync('./blog/hello.md', 'utf8');
  const a = editortext.replace('"editortext"', JSON.stringify(bolgtext.split('\n')))
  ctx.response.body = a;
  next();
};

const get = function (ctx, next) {
  ctx.response.type = 'text';
  ctx.response.body = fs.readFileSync('./blog/hello.md', 'utf8');
  next();
};

const show = function (ctx, next) {
  let body = 'ok';
  let status = 200;
  try {
    fs.writeFileSync('./blog/hello.md', ctx.request.body.value, { encoding: 'utf8' });
  } catch (err) {
    body = err;
    status = 333;
  }
  ctx.response.type = 'application/json';
  ctx.response.body = body;
  ctx.response.status = status;

  next();
};

router.get('/', main)
router.get('/get', get)
router.post('/save', show)

app.use(serve('./lib'));
app.use(serve('./src'));
app.use(serve('blog'));
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
