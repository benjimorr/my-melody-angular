(function() {
    function ProfileUpdater($cookies) {
        var ProfileUpdater = {};

        /*
        * @desc The first name of the user, stored in cookies
        * @type {String}
        */
        ProfileUpdater.firstName = $cookies.get('firstName') || "";

        /*
        * @desc The last name of the user, stored in cookies
        * @type {String}
        */
        ProfileUpdater.lastName = $cookies.get('lastName') || "";

        /*
        * @desc The email address of the user, stored in cookies
        * @type {String}
        */
        ProfileUpdater.email = $cookies.get('email') || "";

        /*
        * @desc The hometown of the user, stored in cookies
        * @type {String}
        */
        ProfileUpdater.hometown = $cookies.get('hometown') || "";

        /*
        * @desc The full name of the user, stored in cookies
        * @type {String}
        */
        ProfileUpdater.fullName = $cookies.get('fullName') || "Edit Profile";

        /*
        * @function saveProfile
        * @desc Saves the user's profile data to local cookies
        */
        ProfileUpdater.saveProfile = function() {
            //functionality here
        };

        return ProfileUpdater;
    }

    angular
        .module('blocJams')
        .factory('ProfileUpdater', ['$cookies', ProfileUpdater]);
})();
