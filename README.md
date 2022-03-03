# free-share-challenge

### SETUP
Clone the repo, cd into it and run npm install. 

### SCRIPTS
npm run modelHelpersTests //runs tests for helper functions that are called from the model
npm run brokerTests //runs tests for functions that mock broker API
npm run appTests //runs tests for the api endpoints
npm run api //runs api on http://localhost:3001/

### USING THE API
Start the api by running the command npm run api. The available endpoint is api/claim-free-share, to which you must make a post request with the following body: {"userId": "randomUserId"} to transfer a share to the user.

### NEXT STEPS
I would create a 'free share queue' management system. If there are currently no shares available in emma's reward account within the given constraints to transfer to the user, the user's id and upperBound/lowerBound of their share value would be placed in 'queued rewards' sql table. At given intervals when the market is open, a microservice would top up Emma's account with a preset number of shares + whatever was currently in the 'queued rewards' table. Once the queued shares had been bought they'd be transferred to the respective user. The reason I would structure it like this is to avoid calling the broker api too many times. This structure would also give us an additional level of control on how many shares are being rewarded over a given timeframe and which shares are being awarded, which opens the option to include fractions of specific 'popular' shares. 

To test more comprehensively how the api would function in different circumstances i.e. when the emma reward account was empty, I would create different testing environments. 

### ASSUMPTIONS/DEVIATIONS FROM BRIEF
I chose not to use a .env file holding min/max share prices as the use of these variables was not aligned with the way share distribution was described in the brief.
I probably spent more time/energy on the mock broker api than I should've, building functionality in the broker functions that ended up not being utilised by my api. Nonetheless, the code is still there to look at alongside accompanying tests.
Validation of user params in place (use of yup etc.) is more than required, but is a demonstration of how I would potentially do server side validation of input params, and the seriousness with which I approach validation of user params. 

### BONUS QUESTIONS:
1. To include target cost per acquisition. I would hold records of shares awarded in an SQL table and create a new function in lieu of 'returnValueConstraint'.  This function would retrieve the average value of shares already awarded, and if the current average value of shares awarded was higher than the target CPA, the function would return a constraint that meant the next share awarded must be lower than the target CPA, and vice versa if the current average value of shares awarded was lower than the target CPA. I have designed my code in a way in which new constraints on shares awarded can be interchanged simply.
2. To support fractional shares, I would simply include a preference for these in the unwritten service that tops up Emma's reward account at intervals when the market is open. I would then include additional logic where the 'isShareBetweenBounds' currently sits. For example, if share.tickerSymbol === 'AAPL', the test would be isShareBetweenBounds(share.sharePrice / 2), to award a half share. I'm aware this isn't paticularly scalable if the number of selected 'fractional shares' were to grow. If the company wanted to award specific shares that are more popular rather than those that are a certain price, it may be advantageous to move toward an entirely curated 'list of available shares' and different logic built around that. 
