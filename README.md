# contact-form

* [htmx](https://htmx.org/)を用いたコンタクトフォームの実験
* 問い合わせ内容をGoogleスプレッドシートに記録します。
* [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts?hl=ja)を使用。
* APIは[Express](https://expressjs.com/ja/)で実装。
* [Vercel](https://vercel.com/)にサーバーレスファンクションを用いてデプロイ。
  * [Using Express.js with Vercel](https://vercel.com/guides/using-express-with-vercel)

![animation](https://github.com/pitang1965/contact-form/assets/47315420/c7fa87be-a989-40ca-b2ba-0cea654cc4fc)

## 必要な作業
1. `server\inquiryProcessor.js`の`SPREADSHEET_ID`にGoogleスプレッドシートのIDを設定する。これは、`https://docs.google.com/spreadsheets/d/スプレッドシートID/edit`の`スプレッドシート`の部分です。
2. Googleスプレッドシートの共有設定で、`.env`ファイルにある`client_email`のメールアドレスを編集者として設定する。
3. 以下のような内容の`.env`ファイルが必要です。

```
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='
{
  "type": "service_account",
  "project_id": "contact-form-******",
  "private_key_id": "d00be****\n-----END PRIVATE KEY-----\n",
  "client_email": "contact-form-api@contact-form-******.iam.gserviceaccount.com",
  "client_id": "********",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/contact-form-api%40contact-form-******.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}'
SPREADSHEET_ID = 'xxxxx';
```
