matchPaths function in NFTMarketplace :
    This function is like a game where you have to arrange your numbers in order from 1 to 9.

    The function matchPaths takes a list of 9 numbers and checks if they are in the right order. Here's how it works:

    It starts with the first number (at position 0 in the list) and checks if it is 1. If not, it immediately stops and says "No, you didn't win". This is like saying "Game over" when the first number isn't 1.
    If the first number is 1, it moves to the next number (at position 1 in the list) and checks if it is 2. If not, it stops and says "No, you didn't win".
    It keeps doing this for each number in the list. If it finds a number that isn't the next number in the sequence, it stops and says "No, you didn't win".
    If it checks all the numbers and they are all in the right order, it says "Yes, you won". This is like saying "Congratulations, you've won the game" when all the numbers are in the right order.

### CONTRACT ADDRESSES (GENERATE ABI WITH OPENZEPPLIN)
0xef7d564CfA15ea18B3761e807F27b6B299165A37 -- FRACTIONTOKEN
0x33D9Df91b756360fCA9e2b030C1750cC5B55f221 -- NFTCONTRACT
0xBe1b3A0CC628666e7EeB07666191Ce4FBcA83B28 -- NFTMARKETPLACE
0x5c042e28d892087920bB5F08327626FF1dC4fB9a -- VRF
