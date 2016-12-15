FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('applicationLayout', {
            main: 'main',
        });
    },
    name: 'home'
});

FlowRouter.route('/loginWithFacebook', {
    action: function() {
        BlazeLayout.render('applicationLayout', {
            main: 'loginWithFacebook',
        });
    },
    name: 'home'
});