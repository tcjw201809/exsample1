const express = require('express');
const multer = require('multer');// ブラウザからのデータを解釈する機能モジュール
const uuid = require('uuid/v4');// ユニークIDを扱うモジュール

const app = express();
const portNo = 3000;

app.use(multer().none()); // ファイルは扱わない

// webフォルダの中身を公開する
app.use(express.static('web'));

// TODOリストデータ
const todoList = [];
// Routing

// localhost:3000/api/v1/listにGETをかけた場合のレスポンス
app.get('/api/v1/list', (req, res) => {
    // 送信データ
    /*
    const todoList = [
        {title: 'todo1', done: true},
        {title: 'todo2', done: false},
        {title: 'todo3', done: false},
    ];
    */
    // データ送信
    res.json(todoList);
})

// localhost:3000/api/v1/addにPOSTした場合の対応
app.post('/api/v1/add', (req, res) => {
    // クライアントからのデータ取得
    const todoData = req.body;
    const todoTitle = todoData.title;

    // ユニークIDを生成
    const id = uuid();

    // TODO項目を作成
    const todoItem = {
        id,
        title: todoTitle,
        done: false,
    }

    // TODOリストに項目追加
    todoList.push(todoItem);

    // コンソールに出力
    console.log('Add: ' + JSON.stringify(todoItem));

    // 追加した項目をクライアントに返す
    res.json(todoItem);
})
// 指定したポート番号でサーバー実行
app.listen(portNo, () => {console.log(`Listening on port ${portNo}`)})