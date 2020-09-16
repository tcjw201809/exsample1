const express = require('express');

const app = express();

const portNo = 3000;
// Routing
app.get('/', (req, res) => res.send('Hello Test'));

// 指定したポート番号でサーバー実行
app.listen(portNo, () => {console.log(`Listening on port ${portNo}`)})