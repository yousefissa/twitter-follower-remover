const Twitter = require('twitter');

// fill in with your twitter info
const twitterClient = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});
const screenName = '' // fill in with your screenName
let userIDList = []


// removes all of your followers by block and unblocking them
let removeFollowers = function(followerList) {
    for (let memberIndex = 0; memberIndex < followerList.length; memberIndex++) {
        let member = followerList[memberIndex];
        twitterClient.post('blocks/create', {
            user_id: member
        }, function(error, user, response) {
            if (!error) {
                twitterClient.post('blocks/destroy', {
                    user_id: member
                }, function(error, user, response) {
                    if (!error) {
                        console.log(`${member} has been removed as a follower.`);
                    } else {
                        console.log(error);
                    }
                })
            } else {
                console.log(error);
            }
        })
    }
}


// gets your followers then calls remove on them
let getFollowers = function() {
    twitterClient.get('followers/ids', {
        screen_name: screenName,
        stringify_ids: true
    }, function(error, userList, response) {
        if (!error) {
            console.log(`${userList['ids'].length} followers will be removed`);
            removeFollowers(userList['ids']);
        } else {
            console.log(error);
        }
    })
}


getFollowers();