import moment from "moment";

let open = true;
let nextOpeningTime = "";
let nextClosingTime = "";

const tenSecondsInTheFuture = moment().add(10, "seconds");
const aDayInTheFuture = moment().add(1, "day");

export const isMarketOpen = async () => {
  return {
    open,
    nextOpeningTime,
    nextClosingTime,
  };
};

//TESTING FUNCTIONS
export const shutMarket = () => {
  open = false;
  nextOpeningTime = tenSecondsInTheFuture;
  nextClosingTime = aDayInTheFuture;
};

export const openMarket = () => {
  open = true;
  nextOpeningTime = aDayInTheFuture;
  nextClosingTime = tenSecondsInTheFuture;
};

// const timeStamp = moment();
// console.log(timeStamp)
// var tenSecondsInTheFuture = moment().add(10, 'seconds');
// let aDayInTheFuture = moment().add(1, 'day');
// console.log(aDayInTheFuture)
// console.log(tenSecondsInTheFuture)
// let difference = tenSecondsInTheFuture.diff(timeStamp)
// console.log(difference)

// openMarket();
// console.log(await isMarketOpen())
// shutMarket();
// console.log(await isMarketOpen())
