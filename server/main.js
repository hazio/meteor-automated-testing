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
        Results.insert({
            date: new Date(),
            userAgent: userAgent,
            failed: true
        });
    },
    succeed: function(userAgent) {
        Results.insert({
            date: new Date(),
            userAgent: userAgent,
            failed: false
        });
    }
});

Meteor.publish("results", function() {

    return Results.find({});
});