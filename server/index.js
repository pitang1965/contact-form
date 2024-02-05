const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

const app = express();

// フォームデータの解析
app.use(bodyParser.urlencoded({ extended: false }));

// 静的ファイル配信
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  console.log('/submit')
  // 送信されたフォームデータ
  const name = req.body.name;
  const email = req.body.email;
  const tel = req.body.tel;
  const company = req.body.company;
  const message = req.body.message;

  // コンソールログに出力
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Tel: ${tel}`);
  console.log(`Company: ${company}`);
  console.log(`Message: ${message}`);

  res.send('<button disabled id="thanks">送信されました。お問い合わせありがとうございます。</button>')
});

app.listen(port, () => {
  console.log('Server is listening on port 3000');
});
