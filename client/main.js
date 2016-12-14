import {
    Results
} from '/lib/collections.js';
import {
    Template
} from 'meteor/templating';

import './main.html';

Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.call('failed', navigator.userAgent);
        Meteor.loginWithFacebook({}, function(err) {
            if (!err)
                Meteor.call('succeed', navigator.userAgent);
        });
    },
    'click #facebook-login-redirect': function(event) {
        Meteor.call('failed', navigator.userAgent);
        Meteor.loginWithFacebook({loginStyle: 'redirect'}, function(err) {
            if (!err)
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