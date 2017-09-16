(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";
    }

    angular
        .module('myMelody')
        .controller('LandingCtrl', LandingCtrl);
})();
