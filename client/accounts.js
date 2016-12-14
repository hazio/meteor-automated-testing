import {
    Session
} from 'meteor/session';

Accounts.onLoginFailure(function() {
    // track failed login here. 
    Meteor.call('failed', navigator.userAgent);
});

Accounts.onLogin(function() {
    // track successful login here. You can just use Meteor.user() to find out which user.
    Session.set('logged', true);
});