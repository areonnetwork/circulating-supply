const Web3 = require('web3');
const express = require('express');
const app = express();
const port = 3010;

const web3js = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/"));

const contractABI = [
    {
        "inputs": [],
        "name": "getTotalTokenBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contract = new web3js.eth.Contract(contractABI, "0x93d0a91b3831d67ebe982c21b4b0768153d5b25d");

const main = async () => {
    const maxSupply = 500000000;
    let areaBalance = await contract.methods.getTotalTokenBalance().call();
    const circSupply = maxSupply - areaBalance;
    return circSupply;
}

app.get('/', async (req, res) => {
    try {
        const supply = await main();
        res.status(200).json(supply);
    } catch (e) {
        res.status(404).json(e.message);
    }

});

app.listen(port, () => {
    console.log(`Starting on port ${port}`)
});