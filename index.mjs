//import the reach standard library
import { loadStdlib } from '@reach-sh/stdlib';
//import all the compilled version of indexedDB.mjs i.e indexedDB.main.js
import * as backend from './build/index.main.mjs';
//import ask to allow user to interact with the backend on the terminal
import {ask} from '@reach-sh/stdlib';
//get the set environment variable for example Algo the default/fallback is Algo
const stdlib = loadStdlib(process.env);

//create helper functions below
const getBalance = async (who) => await stdlib.balanceOf(who);


//create a parcipant interact
const participantInteract = {
    startingBackend: () => {
        console.log("Contract Backend Running")
    },
};


/* create a new test account and initialiaze the amout to 1000000000 ==
1000 network tokens on algorand */
const acc = await stdlib.newTestAccount(1000000000);
//now show the balance of the account
getBalance(acc).then((bal) => {
    console.log(`bal ${bal}`)
})

const ctc = acc.contract(backend);
await ctc.participants.Sender(participantInteract);

//end the contract here
ask.done();