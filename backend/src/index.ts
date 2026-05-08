import express from "express";
import { Client } from "pg";
import { HDNodeWallet } from "ethers";
import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { MNEMONICS } from "./config.js";

const client = new Client("postgres://postgres:mysecretpassword@localhost:5432/mynewdb");
client.connect()

const seed = mnemonicToSeedSync(MNEMONICS);

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const result = await client.query('INSERT INTO binanceUsers (username, password, depositAddress, privateKey, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id', [username, password, "", "", 0]);

    const userId = result.rows[0].id;

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);

    await client.query('UPDATE binanceUsers SET depositAddress=$1, privateKey=$2', [child.address, child.privateKey]);

    res.json({
        userId
    })
})

app.get("/depositAddress/:userId", (req, res) => {

})

app.listen(3000);