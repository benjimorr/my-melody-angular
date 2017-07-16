(function() {
    function ProfileCtrl(ProfileUpdater) {
        this.profileUpdater = ProfileUpdater;
    }

    angular
        .module('blocJams')
        .controller('ProfileCtrl', ['ProfileUpdater', ProfileCtrl]);
})();
