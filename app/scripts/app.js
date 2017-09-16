(function() {
    // config function:
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
            })
            .state('album', {
                url: '/album',
                controller: 'AlbumCtrl as album',
                templateUrl: '/templates/album.html'
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileCtrl as profile',
                templateUrl: '/templates/profile.html'
            });
    }

    //defining the angular module with configuration:
    angular
        .module('myMelody', ['ui.router', 'ngCookies'])
        .config(config);
})();
