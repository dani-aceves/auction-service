# Prompt:

Create a service that handles running a once-around auction for properties. The service should be created in Node, using TypeScript. The player is one of four participants in a service that will ask each participant to bid blindly once. The winning bid will be awarded the property. There are 10 properties total, and each bidder starts with 1000 dollars. Create three bot bidders who will bid against the player. Create three different bot strategies to compete against the player. Be creative. Some examples:

Random Bidder - Will bid randomly from their current remaining currency to acquire a property.
The Minmaxer - Will take a look at the history of bids, and attempt to outbid everyone based on some business logic, based on the history of bids.
Mean Bidder - Will bid based on the computed average of the winning bids.
Greedy Bidder - Will attempt to outbid everyone as much as possible based on the history of bids.

After each bid submitted by the API, the results and the winner are returned to the player. Each bot also receives an update of the data to be stored or computed for future rounds. You may add APIs to start and finalize the bidding process and report the total wins and money spent. You may provide a crude front-end harness or a Postman collection for bid testing.

# Instructions

To run the application, run `npm run dev`

Use this Postman Collection to play the game

https://material-explorer-20282297-8502788.postman.co/workspace/Daniella-Aceves's-Workspace~5e72b1bf-2773-44e3-880e-905759e9871f/collection/46948372-7f9cf7e9-40ff-4abe-ba79-38ae025e4dc5?action=share&creator=46948372

To start the game, run the Start endpoint and input your name in the `body` tab in Postman

To make bids, run the Bid enpoint and input your bid amounts in the `body` tab in Postman

To restart the game, run the Reset Endpoint

To see a summary of the game, run the Summary endpoint

Note that a summary will automatically be returned at the end of the 10th round.
