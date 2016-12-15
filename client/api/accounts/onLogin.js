Accounts.onLogin(function() {

   	// track login here. 
    Meteor.call('succeed', navigator.userAgent);            
});
Accounts.onLoginFailure(function() {

   	// track failed login here. 
    Meteor.call('failed', navigator.userAgent);
});