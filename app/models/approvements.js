var connectDB = require("./connectDB");
var ModelOperationsUser = require("./users")
var ModelOperationsTimeUtility = require("./time_utility")

const strCurrentCollection ="approvement";

// add function
/**
 * As name states.
 * @param strUserID
 * @param strStatement
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementTutorApplication = async function (strUserID, strStatement){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.insertOne({type:"tutor_application",status:"need_approvement",userID:o_id, statement: strStatement});
        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @param strStatement
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementMentorApplication = async function (strUserID, strStatement){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.insertOne({type:"mentor_application",status:"need_approvement",userID:o_id, statement: strStatement});
        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param objectIdTuteeID
 * @param objectIdTutorID
 * @param objectIdUnitOfStudyID
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementTutorSelection = async function (objectIdTuteeID, objectIdTutorID, objectIdUnitOfStudyID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutee = new ObjectId(objectIdTuteeID);
        let o_id_tutor = new ObjectId(objectIdTutorID);
        let o_id_unitOfStudy = new ObjectId(objectIdUnitOfStudyID);

        let result = await dCollection.insertOne({type:"tutor_selection",status:"need_approvement",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param objectIdTuteeID
 * @param objectIdTutorID
 * @param objectIdUnitOfStudyID
 * @param objectIdTimePointID
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementTutorialAppointment = async function (objectIdTuteeID, objectIdTutorID,
                                                                   objectIdUnitOfStudyID, objectIdTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutee = new ObjectId(objectIdTuteeID);
        let o_id_tutor = new ObjectId(objectIdTutorID);
        let o_id_unitOfStudy = new ObjectId(objectIdUnitOfStudyID);
        let o_id_TimePoint = new ObjectId(objectIdTimePointID);

        let result = await dCollection.insertOne({type:"tutorial_appointment",status:"need_approvement",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy, timePointID: o_id_TimePoint});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param strUserID
 * @returns {Promise<Object._id|ObjectId|null>}
 */


module.exports.addApprovementMentorMatching = async function (objectIdMenteeID, objectIdMentorID, strDescription){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_mentee = new ObjectId(objectIdMenteeID);
        let o_id_mentor = new ObjectId(objectIdMentorID);

        let result = await dCollection.insertOne({type:"mentor_matching",status:"need_approvement",
            menteeID: o_id_mentee, mentorID:o_id_mentor, mentorDescription: strDescription});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

/**
 * As name states.
 * @param objectIdTuteeID
 * @param objectIdTutorID
 * @param objectIdUnitOfStudyID
 * @returns {Promise<Object._id|ObjectId|null>}
 */
module.exports.addApprovementFlaggedItem = async function (objectIdTuteeID, objectIdTutorID, objectIdUnitOfStudyID,strStatement){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutee = new ObjectId(objectIdTuteeID);
        let o_id_tutor = new ObjectId(objectIdTutorID);
        let o_id_unitOfStudy = new ObjectId(objectIdUnitOfStudyID);

        let result = await dCollection.insertOne({type:"tutor_selection",status:"need_approvement",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy,statement:strStatement});

        return result.insertedId;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};






// query function
module.exports.queryApprovement = async function (strType){
    let client, db;
    try{
        let dCollection = connectDB.getdb().collection("approvement");

        let result = await dCollection.find({status: "need_approvement", type: strType} ).sort({$natural:-1}).limit(20).toArray();


        for (let i = 0; i < result.length; i++)
        {
            let objTimeStamp = result[i]._id.getTimestamp();
            //result[i].establishedTS = objTimeStamp.toJSON();
            result[i].establishedTS = await ModelOperationsTimeUtility.getOutputTimeString(objTimeStamp);
            result[i]._id = result[i]._id.toString();
        }

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getApprovementTypeViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.type;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUserIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.userID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getUnitOfStudyIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.unitOfStudyID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTuteeIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.tuteeID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTutorIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.tutorID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTimePointIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.timePointID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};


module.exports.getMatchingDescriptionIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.matchingDescription;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getMentorMatchingMenteeIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.menteeID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getMentorMatchingMentorIDViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let result = await dCollection.findOne({_id:o_id});
        return result.mentorID;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getWholeApprovementViaID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        return await dCollection.findOne({_id:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getApprovementsIDViaUserID = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        let result = await dCollection.findOne({_id:o_id});
        return result._id;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getStatementViaApprovementID = async function (strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let result = await dCollection.findOne({_id:o_id});
        return result.statement;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkIfApprovementMentorApplicationExist = async function (strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        return await dCollection.findOne({type:"mentor_application", status:"need_approvement", userID:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkIfApprovementTutorApplicationExist = async function (strUserID){

    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID);

        return await dCollection.findOne({type:"tutor_application",status:"need_approvement",userID:o_id});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkApprovementTutorSelectionExist = async function (objectIdTuteeID, objectIdTutorID, objectIdUnitOfStudyID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutee = new ObjectId(objectIdTuteeID);
        let o_id_tutor = new ObjectId(objectIdTutorID);
        let o_id_unitOfStudy = new ObjectId(objectIdUnitOfStudyID);

        return await dCollection.findOne({type:"tutor_selection",status:"need_approvement",
            tuteeID: o_id_tutee, tutorID:o_id_tutor, unitOfStudyID: o_id_unitOfStudy});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.checkIfApprovementMentorMatchingExist = async function (objectIdMenteeID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_mentee = new ObjectId(objectIdMenteeID);

        return await dCollection.findOne({type:"mentor_matching",status:"need_approvement", menteeID: o_id_mentee});
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};


//update function
module.exports.changeStatusToApproved = async function(strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {status: "approved"} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
}


module.exports.changeStatusToReject = async function(strApprovementID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {status:"rejected"} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
}


module.exports.markApprovementStatusViaID = async function (strApprovementID, strNewStatus){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {status: strNewStatus} };

        return await dCollection.updateOne({_id:o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.updateAfterMentorMatchingApprovementIsApprovedViaID = async function (
    strApprovementID, objectIDMenteeActionableNotification, objectIDMentorActionableNotification){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);
        let o_idMenteeNotification = new ObjectId(objectIDMenteeActionableNotification);
        let o_idMentorNotification = new ObjectId(objectIDMentorActionableNotification);

        let objNewValues = { $set: {isMentorAgreed: false, isMenteeAgreed: false,
                menteeNotificationID: o_idMenteeNotification, mentorNotificationID: o_idMentorNotification} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.updateMentorMatchingApprovementMentorDecisionViaID = async function (strApprovementID, bDecision){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {isMentorAgreed: bDecision} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.updateMentorMatchingApprovementMenteeDecisionViaID = async function (strApprovementID, bDecision){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strApprovementID);

        let objNewValues = { $set: {isMenteeAgreed: bDecision} };

        return await dCollection.updateOne({_id: o_id}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.addAdminID = async function (strApprovementID,strUserID){
    try{
        let dCollection = connectDB.getdb().collection(strCurrentCollection);

        let ObjectId = require('mongodb').ObjectId;
        let o_id_approvement = new ObjectId(strApprovementID);
        let o_id_user = new ObjectId(strUserID)
        let objNewValues = { $set: {adminID: o_id_user} };

        return await dCollection.updateOne({_id: o_id_approvement}, objNewValues);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};