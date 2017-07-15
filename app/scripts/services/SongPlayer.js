(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /*
        * @desc Current album playing
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

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
                stopSong(SongPlayer.currentSong);
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    // check to see if song has ended, and play next one if so
                    if(currentBuzzObject.getTime() === currentBuzzObject.getDuration()) {
                        SongPlayer.next();
                    }
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            currentBuzzObject.bind('volumechange', function() {
                $rootScope.$apply(function() {
                    SongPlayer.volume = currentBuzzObject.getVolume();
                });
            });

            SongPlayer.currentSong = song;
            SongPlayer.isMuted = false;
        };

        /*
        * @function playSong
        * @desc Plays the currentBuzzObject audio file and sets playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /*
        * @function stopSong
        * @desc Stops the currentBuzzObject audio file and sets playing to null
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

        /*
        * @function getSongIndex
        * @desc Returns index of current song in the album's song array
        * @param {Object} song
        * @returns {Number}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /*
        * @desc Active song object from song list
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /*
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /*
        * @desc Current volume of current Buzz sound object (0 - 100)
        * @type {Number}
        */
        SongPlayer.volume = null;

        /*
        * @desc Stores last volume value before mute button is clicked
        * @type {Boolean}
        */
        SongPlayer.isMuted = false;

        /*
        * @function play
        * @desc Sets and plays a new song if different from current song, otherwise plays current song if paused
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if(SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /*
        * @function pause
        * @desc Pauses currently playing song and sets playing to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /*
        * @function previous
        * @desc Plays previous song in track list
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if(currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /*
        * @function next
        * @desc Plays next song in track list
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if(currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /*
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if(currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /*
        * @function setVolume
        * @desc Set the volume (from 0 - 100) of currently playing song
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if(currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };

        /*
        * @function toggleMute
        * @desc Turns mute functionality on/off when volume icon is clicked
        */
        SongPlayer.toggleMute = function() {
            if(currentBuzzObject) {
                if(!SongPlayer.isMuted) {
                    currentBuzzObject.mute();
                    SongPlayer.isMuted = true;
                } else if(SongPlayer.isMuted) {
                    currentBuzzObject.unmute();
                    SongPlayer.isMuted = false;
                }
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
