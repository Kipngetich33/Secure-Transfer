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
const fmt = (bal) => {
    return (bal/1000000).toFixed(4);
}
//create a parcipant interact
const participantInteract = ({
    startingBackend: () => {
        console.log("Contract Backend Running")
    },
});

//create a parcipant interact
const sendersInteract = {
    ...participantInteract,

};

//create a parcipant interact
const recieversInteract = {
    ...participantInteract,
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
// Run different actions based on user's role
if(userRole == "Sender"){
    //inform the user of their role in the contract
    console.log("Your Role: Sender")
    //initialize the contract
    
    /* create 2 new test account with starting balance of 1000 and minimumBalance 
    for sender and recipients participants respectively */
    const startingBalance = stdlib.parseCurrency(1000);
    const sendersAcc = await stdlib.newTestAccount(startingBalance);
    // const recipientsAcc = await stdlib.newTestAccount(stdlib.minimumBalance);
    const recipientsAcc = await stdlib.newTestAccount(startingBalance);
    
    //show the sender's account balance
    getBalance(sendersAcc).then((bal) => {
        console.log(`Your Current Account Balance is: ${fmt(bal)}`)
    })

    //display the created recipients account address to sender
    console.log(recipientsAcc.networkAccount)
    const addrr = await recipientsAcc.getAddress()
    if(addrr){
        console.log("address")
        console.log(addrr)
    }
    // const recipientAddress = await recipientsAcc
    // if(recipientAddress){
    //     console.log(recipientAddress)
    //     console.log(`Recipient's Account Address is: ${recipientAddress}`)
    // }
   
    //initialiaze a contract
    const ctc = sendersAcc.contract(backend);

    //Show the contract info
    const constractInfo = await ctc.getInfo()
    if(constractInfo){
        console.log(`Contract Info: ${JSON.stringify(constractInfo)}`);
    }
  
    //await the contract to execute
    await ctc.participants.Sender(sendersInteract);

}else{
    //inform the user of their role in the contract
    console.log("Your Role: Reciever")

    // ask the user to enter the account secret
    const secret = await ask.ask(
        `What is your account secret?`,
        (x => x)
    );
    //find users account based on the given secret
    acc = await stdlib.newAccountFromSecret(secret);

    //show the sender's account balance
    getBalance(acc).then((bal) => {
        console.log(`Your Current Account Balance is: ${fmt(bal)}`)
    })

    //ask the user for the contract info
    const info = await ask.ask(
        `Please paste the contract information:`,
        JSON.parse
    );
    // attach to the contract using the account secret and contract info
    ctc = acc.contract(backend, info);
    await ctc.participants.Reciever(sendersInteract);
    
}


//end the contract here
// ask.done();