const moment = require("moment");

module.exports.splitPrice = function (price, textPrice) {
  if (price) {
    let nums = price.split(",");
    let num = nums[0];
    let text = textPrice.split(" ");

    let pos = text.indexOf("рублей");
    let n = text.length - pos;
    let remove = text.splice(pos, n);
    let newText = text.join(" ");
    let remText = remove.join(" ");

    let result = `${num} (${newText}) белорусских ${remText}`;
    return result;
  } else {
    return " ______ (_______________________) белорусских рублей ____ копеек";
  }
};

module.exports.splitDate = function (date) {
  if (date == "___.___.2022 по ___.___.2022") {
    return " ___ _________ 2022 года.";
  }
  let dates = date.split("по");
  let lastDate = dates[1];
  moment.locale("ru");
  let newDate = moment(lastDate, "DD.MM.YYYY").format("LL");
  return newDate;
};