(function() {
    function ProfileCtrl(ProfileUpdater) {
        this.profileUpdater = ProfileUpdater;
    }

    angular
        .module('myMelody')
        .controller('ProfileCtrl', ['ProfileUpdater', ProfileCtrl]);
})();
