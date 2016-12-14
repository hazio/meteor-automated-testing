import {
    Template
} from 'meteor/templating';
import {
    Results
} from '/lib/collections.js';

import './main.html';

Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err) {
            if (err)
                Meteor.call('failed', navigator.userAgent);
            else
                Meteor.call('succeed', navigator.userAgent);
        });
    },

    'click #logout': function(event) {
        Meteor.logout(function(err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        });
    }
});

Template.login.helpers({
    results: function() {
        return Results.find({}, {
            sort: {
                date: -1
            }
        });
    },
});

Template.login.onCreated(function() {
    this.subscribe('results');
});