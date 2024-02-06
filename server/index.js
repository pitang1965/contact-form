const express = require('express');
const bodyParser = require('body-parser');
const { processInquiry } = require('./inquiryProcessor');

const port = 3000;

const app = express();

// フォームデータの解析
app.use(bodyParser.urlencoded({ extended: false }));

// 静的ファイル配信
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  // 送信されたフォームデータ
  const name = req.body.name;
  const email = req.body.email;
  const tel = req.body.tel;
  const company = req.body.company;
  const message = req.body.message;

  // 問い合わせ内容を処理
  processInquiry(name, email, tel, company, message);

  res.send(
    '<button disabled id="thanks">送信されました。お問い合わせありがとうございます。</button>'
  );
});

app.listen(port, () => {
  console.log('Server is listening on port 3000');
});