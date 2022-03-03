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
