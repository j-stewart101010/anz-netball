/*global define*/
define([
	'underscore',
        'config/config'
], function (_, Config) {

    var TileData = {
        content: '',
        worldWidth: Config.worldWidth
    };

    return TileData;
});