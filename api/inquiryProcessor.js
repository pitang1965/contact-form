require('dotenv').config();
const { google } = require('googleapis');

// サービスアカウントの認証情報を環境変数から取得
const SERVICE_ACCOUNT = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
);

// スプレッドシートID
//  これは、https://docs.google.com/spreadsheets/d/スプレッドシートID/edit
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// スコープ：https://developers.google.com/sheets/api/scopes?hl=ja
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
// Google スプレッドシートのすべてのスプレッドシートの表示、編集、作成、削除を行えます。

async function processInquiry(name, email, tel, company, message, referer, clientIp) {
  log(name, email, tel, company, message, referer);
  const ret = await appendSpreadsheetRow(name, email, tel, company, message, referer, clientIp);

  return ret;
}

// コンソールログに出力
function log(name, email, tel, company, message, referer, clientIp) {
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Tel: ${tel}`);
  console.log(`Company: ${company}`);
  console.log(`Message: ${message}`);
  console.log(`Referer: ${referer}`);
  console.log(`Client IP: ${clientIp}`);
}

// Googleスプレッドシートの行を追加
// spreadsheets.values.append メソッドのリファレンス：
//   https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append?hl=ja

async function appendSpreadsheetRow(name, email, tel, company, message, referer, clientIp) {
  const auth = new google.auth.GoogleAuth({
    credentials: SERVICE_ACCOUNT,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = SPREADSHEET_ID;
  const range = 'シート1!A:F'; // AからE列にデータを追加
  const valueInputOption = 'USER_ENTERED'; // ユーザーが入力するかのようにデータを解釈
  const values = [
    [name, email, tel, company, message, referer, clientIp], // 追加する行のデータ
  ];

  const request = {
    spreadsheetId,
    range,
    valueInputOption,
    resource: {
      values,
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    return { status: 200, data: response.data };
  } catch (err) {
    return { status: err.code || 500, message: err.message };
  }
}

module.exports = {
  processInquiry,
};
