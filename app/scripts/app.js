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
            templateUrl: '/templates/landing.html'
        })
        .state('album', {
            url: '/album',
            templateUrl: '/templates/album.html'
        })
        // collection state here
}

//defining the angular module:
(function() {
    angular
        .module('blocJams', ['ui.router'])
        .config(config, 'config');
})();
