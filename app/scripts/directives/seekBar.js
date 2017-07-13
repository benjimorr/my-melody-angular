(function() {
    function seekBar($document) {
        /*
        * @function calculatePercent
        * @desc Calculates horizontal percent along the seek bar where the event occurred
        * @params {Object} seekBar, event
        * @return {Number}
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;

                /*
                * @desc the seek-bar element that was clicked on
                * @type {Object}
                */
                var seekBar = $(element);

                /*
                * @function percentString
                * @desc Calculates percent based on the value and max value of a seek bar
                * @return {Number}
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100
                    return percent + "%";
                };

                /*
                * @function fillStyle
                * @desc Returns the width of the seek bar fill element based on the calculated percentage
                * @return {Object}
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };

                /*
                * @function thumbStyle
                * @desc Returns the position of the seek bar thumb element based on the calculated percentage
                * @return {Object}
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };

                /*
                * @function onClickSeekBar
                * @desc Updates the seek bar value based on the width and the location of the event
                * @param event
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };

                /*
                * @function trackThumb
                * @desc Uses $apply to constantly apply change in value of scope.value as seek bar thumb is dragged
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
