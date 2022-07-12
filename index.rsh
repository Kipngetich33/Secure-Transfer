//Declare reach version that this file will be run on
'reach 0.1';

//create a  Participant interface
const participantInteract = {
    startingBackend: Fun([], Null),
    logInfo: Fun([Bytes(5)], Null),
};

const sendersInteract = {
    ...participantInteract,
    getRecipientAcc: Fun([],Address),
    displayContract: Fun([Contract],Null),
    recipientsAccount: Address,
};

const recieversInteract = {
    ...participantInteract,
    displayRecipientsAccount: Fun([Address],Null),
    providedRecipientAccount: Address
};

//export the main reach application 
export const main = Reach.App(() => {
    const mainView = View('Main', { recipientAccountTxt: Address, amount: UInt });

    //create contract participant
    const Sender = Participant('Sender', sendersInteract);
    const Reciever = Participant('Reciever', recieversInteract);

    //initialize contract
    init();

    //inform participants that the contract backend is running
    each([Sender,Reciever],() => { interact.startingBackend() });

    //Sender's only step
    Sender.only(() => {
    })
    Sender.publish()
    commit();

    // get contract
    const contractInfo = getContract();
    
    //Sender's only step
    Sender.only(() => {
        //Get Recipients Account
        const recipientsAccountTxt =  declassify(interact.getRecipientAcc())
        //display contract info to the backend
        interact.displayContract(contractInfo);
    })
    Sender.publish(recipientsAccountTxt)
    
    //now set the account adress and amout to send
    mainView.recipientAccountTxt.set(recipientsAccountTxt)

    //commit the changes to the network
    commit();

    //Reciever's only step
    Reciever.only(() => {
        //get provided recipient's account
        const recipientsProvidedAcc =  declassify(interact.providedRecipientAccount)
        //display the correct account provided by sender
        interact.displayRecipientsAccount(recipientsAccountTxt)
    })
    Reciever.publish(recipientsProvidedAcc)
    commit();

    Sender.only(() => {
        //check if the given account match
        // if(recipientsAccountTxt == )
    })

    each([Sender,Reciever],() => { 
        if(recipientsAccountTxt == recipientsProvidedAcc ){
            interact.logInfo("Truel")
        }else{
            interact.logInfo("False")
        }
    });

    //end contract
    exit()
})