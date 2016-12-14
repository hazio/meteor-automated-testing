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
        if(navigator.userAgent.match('CriOS')) {
            Meteor.loginWithFacebook({loginStyle: 'redirect'});
            if (Meteor.user())
                Meteor.call('succeed', navigator.userAgent);            
        }
        else {
            Meteor.loginWithFacebook({}, function(err) {
                if (!err)
                    Meteor.call('succeed', navigator.userAgent);
            });
        }
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