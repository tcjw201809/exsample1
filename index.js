const express = require('express');
const multer = require('multer');// ブラウザからのデータを解釈する機能モジュール
const uuid = require('uuid/v4');// ユニークIDを扱うモジュール

const app = express();
const portNo = 3000;

app.use(multer().none()); // ファイルは扱わない
app.use(express.static('web'));// webフォルダの中身を公開する

// TODOリストデータ
const todoList = [];

// ====== Routing =====

// localhost:3000/api/v1/listにGETをかけた場合のレスポンス
app.get('/api/v1/list', (req, res) => {
    // JSONデータ送信
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

// localhost:3000/api/v1/item/:idにDELETE送信した場合の対応
app.delete('/api/v1/item/:id', (req, res) => {
    // URLの:idと同じIDを持つ項目を検索
    const index = todoList.findIndex((item) => item.id === req.params.id);

    if (index >= 0) {
        const deleted = todoList.splice(index, 1); // indexのいちにある項目を削除
        console.log('Delete: ' + JSON.stringify(deleted[0]));
    }

    res.sendStatus(200); // OKステータスを返す
});

// checkboxを連動させる
app.put('/api/v1/item/:id',(req, res) => {
    // URLで指定されたidで項目を検索
    const index = todoList.findIndex((item) => item.id === req.params.id);

    // 項目が見つかればcheckboxのdoneの値を設定
    if (index >= 0) {
        const item = todoList[index];
        if (req.body.done) {
            item.done = req.body.done === "true";
        }
        console.log('Edit: ' + JSON.stringify(item));
    }

    // OKステータスを返す
    res.sendStatus(200);
});

// 指定したポート番号でサーバー実行
app.listen(portNo, () => {console.log(`Listening on port ${portNo}`)})