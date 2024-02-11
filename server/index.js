const express = require('express');
const bodyParser = require('body-parser');
const { processInquiry } = require('./inquiryProcessor');

const port = process.env.PORT || 3000;;
const app = express();

// フォームデータの解析
app.use(bodyParser.urlencoded({ extended: false }));

// 静的ファイル配信
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
  // 送信されたフォームデータ
  const name = req.body.name;
  const email = req.body.email;
  const tel = req.body.tel;
  const company = req.body.company;
  const message = req.body.message;

  try {
    // 問い合わせ内容を処理
    const ret = await processInquiry(name, email, tel, company, message);

    if (ret.status == 200) {
      res.send(
        `<button disabled id="api-success">送信されました。${name}さん、お問い合わせありがとうございます。</button>`
      );
    } else {
      res.send(
        `<button disabled id="api-error">エラーのため送信できませんでした。申し訳ございません。${ret.message}</button>`
      );
    }
  } catch (error) {
    console.error('Error processing inquiry:', error);
    res.send(
      `<button disabled id="api-error">エラーのため送信できませんでした。申し訳ございません。${error}</button>`
    );
  }
});

app.listen(port, () => {
  console.log('Server is listening on port 3000');
});
