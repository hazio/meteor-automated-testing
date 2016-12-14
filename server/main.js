import {
    Meteor
} from 'meteor/meteor';

import {
    Results
} from '/lib/collections.js';

Meteor.startup(() => {
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: process.env.FACEBOOK_APPID,
        secret: process.env.FACEBOOK_SECRET
    });
});

Meteor.methods({

    failed: function(userAgent) {
        Meteor.call('do', userAgent, true);
    },
    succeed: function(userAgent) {
        Meteor.call('do', userAgent, false);
    },
    do: function(userAgent, failed) {
        if (Results.findOne({
                userAgent: userAgent
            }))
            Results.update({
                userAgent: userAgent,
            }, {
                $set: {
                    failed: failed,
                    date: new Date()
                }
            });
        else
            Results.insert({
                userAgent: userAgent,
                failed: failed,
                date: new Date()
            });
    }
});

Meteor.publish("results", function() {

    return Results.find({});
});