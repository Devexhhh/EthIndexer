import { JsonRpcProvider } from "ethers";
let CURRENT_BLOCK_NUMBER = 24936355;

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/dhuFXA2gtsJsGgz7diJSo")

async function main() {
    // get interested addresses from the DB
    const interestedAddress = ["0x05557f7d084b12c0b303c03e6e4aed314696533b", "0x4666462aa29602bA4F0f576f8C2312D2818838E8", "0x4666462aa29602bA4F0f576f8C2312D2818838E8", "0x5CF00a901e91702Ad5E658C39a5A9F3A64fb4151"]
    // inspect the block from native eth transactions on one of these addresses
    const block = await provider.getBlock(CURRENT_BLOCK_NUMBER, true);
    console.log(block?.transactions)
    // Bad approach => Update the balance in the database
}

interface TransactionReceipt {
    transactionHash: string;
    from: string;
    to: string;
}

interface TransactionReceiptResponse {
    result: TransactionReceipt[];
}

function getTransactionReceipt(blockNumber: string): Promise<TransactionReceiptResponse> {
    let data = JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "eth_getBlockReceipts",
        "params": [
            "0x..."
        ]
    });

    let config = {}
}

main();