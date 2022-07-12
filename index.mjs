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
const fmt = (bal) => { return stdlib.formatCurrency(bal,4) }


//create a parcipant interact
const participantInteract = ({
    startingBackend: () => {
        console.log("Contract Backend Running")
    },
    logInfo: (status) => {
        console.log(`Accounts Matches: ${status}`)
    },
});

//create a parcipant interact
const sendersInteract = {
    ...participantInteract,
    getRecipientAcc: async () => {
        const relayAcc = await stdlib.newTestAccount(startingBalance);
        console.log("Relay Network Account")
        console.log(relayAcc.networkAccount)
        //now return the entered relay
        return relayAcc
    },
    displayContract: (contractInfo) => {
        console.log(`Contract Info: ${JSON.stringify(contractInfo)}`);
    }
};

//create a parcipant interact
const recieversInteract = {
    ...participantInteract,
    displayRecipientsAccount:  (recipeintsAcc) => {
        console.log(`Recipients Account : ${recipeintsAcc}`);
    }
};

// sendersInteract.startingBackend = () => 

//determine the role of the participant in the contract
const userRole = await ask.ask('Please Enter Role: Sender or Reciever', (role) => {
    if(role == "Sender" || role == "Reciever"){
        return role
    }else{
        console.log("Invalid input role. Role is either 'Sender' or 'Reciever'")
    }
});

let acc = null;
let ctc = null;
let recipientsAccount = null
const startingBalance = stdlib.parseCurrency(1000);
// Run different actions based on user's role
if(userRole == "Sender"){
    console.log("************************************************Starting Contract******************************************")
    //inform the user of their role in the contract
    console.log("Your Role: Sender")
    //initialize the contract
    
    // create senders account
    const sendersAcc = await stdlib.newTestAccount(startingBalance);   

    //show the sender's account balance
    getBalance(sendersAcc).then((bal) => {
        console.log(`Your Current Account Balance is: ${fmt(bal)}`)
    })
   
    //initialiaze a contract
    ctc = sendersAcc.contract(backend);

    //await the contract to execute
    await ctc.participants.Sender(sendersInteract);

}else{
    //inform the user of their role in the contract
    console.log("Your Role: Reciever")
    //create a recipeint account address
    const recipientsAcc1 = await stdlib.newTestAccount(startingBalance);

    //ask the user for the contract info
    const info = await ask.ask(
        `Please paste the contract information:`,
        JSON.parse
    );

    // ask the user to enter the account secret
    const recipientsAccount = await ask.ask(
        `Please Enter your recipient account`,
        (x => x)
    );
    recieversInteract.providedRecipientAccount = recipientsAccount

    //show the sender's account balance
    getBalance(recipientsAcc1).then((bal) => {
        console.log(`Your Current Account Balance is: ${fmt(bal)}`)
    })

    // attach to the contract using the account secret and contract info
    ctc = recipientsAcc1.contract(backend, info);
    await ctc.participants.Reciever(recieversInteract); 
}

//end the contract here
ask.done();