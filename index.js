const express = require('express');

const app = express();

const portNo = 3000;
// Routing

// localhost:3000/api/v1/listにGETをかけた場合のレスポンス
app.get('/api/v1/list', (req, res) => {
    // 送信データ
    const todoList = [
        {title: 'todo1', done: true},
        {title: 'todo2', done: false},
        {title: 'todo3', done: false},
    ];

    // データ送信
    res.json(todoList);
})

//app.get('/', (req, res) => res.send('Hello Test'));

// 指定したポート番号でサーバー実行
app.listen(portNo, () => {console.log(`Listening on port ${portNo}`)})