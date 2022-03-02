# free-share-challenge
[scripts] 
npm run getFreeShareTests //runs tests for functions that are involved with assigning a free share
npm run brokerTests //runs tests for functions that mock a broker API


ASSUMPTIONS/DEVIATIONS FROM BRIEF:
I chose not to use a .env file holding min/max share prices as the use of this was not aligned with the way share distribution was described in the brief.

BONUS QUESTIONS:
1. To include cost per acquisition, I would hold records of shares awarded in an SQL table. I would retrieve the average value of shares awarded
