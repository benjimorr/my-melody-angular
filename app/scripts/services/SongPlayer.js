(function() {
    function SongPlayer() {
        var SongPlayer = {};

        /*
        * @desc The currently playing song object
        * @type {Object}
        */
        var currentSong = null;

        /*
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /*
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if(currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };

        /*
        * @function playSong
        * @desc Plays the currentBuzzObject audio file and sets playing to true
        */
        var playSong = function() {
            currentBuzzObject.play();
            song.playing = true;
        };

        /*
        * @function play
        * @desc Sets and plays a new song if different from current song, otherwise plays current song if paused
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if(currentSong !== song) {
                setSong(song);
                playSong();
            } else if(currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };

        /*
        * @function pause
        * @desc Pauses currently playing song and sets playing to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
