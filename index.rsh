//Declare reach version that this file will be run on
'reach 0.1';

//create a  Participant interface
const participantInteract = {
    startingBackend: Fun([], Null),
};

const sendersInteract = {
    ...participantInteract,
    getRecipientAddress: Fun([],Address)
};

const recieversInteract = {
    ...participantInteract,
};

//export the main reach application 
export const main = Reach.App(() => {

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

    //Reciever's only step
    Reciever.only(() => {

    })
    Reciever.publish()
    commit();

    //end contract
    exit()
})