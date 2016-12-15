import {
    Results
} from '/lib/collections.js';
import {
    Template
} from 'meteor/templating';

import './loginWithFacebook.html';

Template.loginWithFacebook.events({
    'click #facebook-login': function(event) {

        // The test is failed unless the Accounts.onLogin is called.
        Meteor.call('failed', navigator.userAgent);

        // The callback cannot be called if you are using the "redirect" loginStyle, because the app will have reloaded.
        // The "redirect" style can be used in situations where a popup window can't be opened, such as in a mobile UIWebView.
        // Source: https://docs.meteor.com/api/accounts.html#Meteor-loginWith\<ExternalService\>
        Meteor.loginWithFacebook({loginStyle: 'redirect'});
    },
    'click #logout': function(event) {
        Meteor.logout(function(err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        });
    }
});

Template.loginWithFacebook.helpers({
    results: function() {
        return Results.find({}, {
            sort: {
                date: -1
            }
        });
    },
});

Template.loginWithFacebook.onCreated(function() {
    this.subscribe('results');
});