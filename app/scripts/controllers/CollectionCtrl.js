(function() {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);
    }

    angular
        .module('myMelody')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
