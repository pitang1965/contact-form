function processInquiry(name, email, tel, company, message) {
  // コンソールログに出力
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Tel: ${tel}`);
  console.log(`Company: ${company}`);
  console.log(`Message: ${message}`);
}

module.exports = {
  processInquiry,
};
