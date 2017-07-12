(function() {
    function SongPlayer(Fixtures) {
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

            SongPlayer.currentSong = song;
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

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
