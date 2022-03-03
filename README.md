# free-share-challenge

### SETUP
Clone the repo, cd into it and run npm install. 

### SCRIPTS
npm run getFreeShareTests //runs tests for functions that are involved with assigning a free share
npm run brokerTests //runs tests for functions that mock a broker API

### USING THE API
You must provide the key userId on the body of the call with any random string as a value. 

### NEXT STEPS
I would create a 'free share queue' management system. If there are currently no shares available in emma's reward account within the given constraints to transfer to the user, the user and upperBound/lowerBound of their share value would be placed in 'queued rewards' sql table. At given intervals when the market is open, a microservice would top up Emma's account with a preset number of shares + whatever was currently in the 'queued rewards' table. Once those with 'queued' shares had been successfully bought they would be transferred to the user. The reason I would structure it like this is to avoid calling the broker api too many times, and also gives us an additional level of control on how many shares are being rewarded. Furthermore, topping Emma's acount up in one place at set times gives us more control over which shares go into the account. This also gives us the option to include certain shares which can be awarded in fractions. 

### ASSUMPTIONS/DEVIATIONS FROM BRIEF
I chose not to use a .env file holding min/max share prices as the use of these variables was not aligned with the way share distribution was described in the brief.
I probably spent more time/energy on the mock broker api than I should've. Nonetheless, the code is still there to look at alongside accompanying tests.
Validation of user params is more than neccessary with use of yup etc, but this is a demonstration of how I would potentially do server side validation of input params, and the seriousness with which I approach validation of user params. 

### BONUS QUESTIONS:
1. To include target cost per acquisition. I would hold records of shares awarded in an SQL table and create a new function in lieu of 'returnValueConstraint'.  This function would retrieve the average value of shares already awarded, if the current average value of shares awarded was higher than the target CPA, the function would return a constraint that meant the next share awarded must be lower than the target CPA, and vice versa if the current average value of shares awarded was lower than the target CPA. I have designed my code in a way in which new constraints on shares awarded can be interchanged simply.
2. To support fractional shares, I would simply include a preference for these in the unwritten service that tops up Emma's reward account at intervals when the market is open. I would then include additional logic where the 'isShareBetweenBounds' currently sits. For example, if share.tickerSymbol === 'AAPL', the test would be isShareBetweenBounds(share.sharePrice / 2), to award a half share. I'm aware this isn't paticularly scalable if the number of selected 'fractional shares' were to grow. If it were found that certain shares were more popular, it may be advantageous to move toward an entirely curated 'list of available shares' and different logic built around that. 
