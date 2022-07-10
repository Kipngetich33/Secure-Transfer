//Declare reach version that this file will be run on
'reach 0.1';

//create a  Participant interface
const participantInteract = {};

//export the main reach application 
export const main = Reach.App(() => {
    const P = Participant('Participant', participantInteract);
    init();

    //just create a publication to avoid publication warning
    P.only(() => {});
    P.publish()
    commit();

    //end contract
    exit()
})