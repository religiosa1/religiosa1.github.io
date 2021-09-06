---
title: "Тестовый сервер express"
layout: $/components/ArticleLayout.astro
---


Простенький сервер-express, чтобы можно было проверять работу ajax-запросов.

```javascript
const express = require('express');

let app = express();

[
  // Здесь статика отдаваемая от корня
  'css',
  'js',
  'media',
  'img',
  'fonts'
].forEach((item) => {
  app.use( '/'+item, express.static(item) );
  console.log('Serving static: ', item);
});

// Сюда можно подложить статические json-файлы, для эмуляции api
app.use('/api', express.static("api", {extensions:"json"}) );

// Эмуляция post-запроса
app.post('/api/filter', function (req, res) {
  res.sendFile('api/filter.json', { root: __dirname});
});

// Тут просто отдаем html-ку
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname});
});

app.listen(3000, '127.0.0.1', function () {
  console.log('App listening on http://127.0.0.1:3000/');
});
```