module.exports = function(username, apiKey, secret) {
    var public = {};
    var private = this;

    private.options = {
        minimumAlbumPlayCount: 10,
        minimumTrackPlayCount: 3
    };

    private.username = username;
    private.apiKey = apiKey;
    private.secret = secret;

    private.LastFmApi = require('lastfmapi');

    public.getWeeklyStatsForUser = function(callback) {
        var result = {
            albums: [],
            tracks: []
        };

        var client = private.getClient();

        client.user.getWeeklyAlbumChart({
            user: private.username
        }, 
        function(error, data) {
            if (error) { throw error; }           

            data.album.forEach(function(album) {
                var playcount = parseInt(album.playcount);
                if (playcount < private.options.minimumAlbumPlayCount) { return; }

                result.albums.push({
                    trackPlayCount: album.playcount, 
                    artist: album.artist["#text"],
                    album: album.name
                });
            });
            
            private.processWeeklyResults(result, callback);
        });

        client.user.getWeeklyTrackChart({
            "user": private.username
        },
        function(error, data) {
            if (error) { throw error; }

            data.track.forEach(function(track) {
                var playcount = parseInt(track.playcount);
                if (playcount < private.options.minimumTrackPlayCount) { return; }

                result.tracks.push({
                    trackPlayCount: playcount, 
                    artist: track.artist["#text"],
                    track: track.name
                });
            });

            private.processWeeklyResults(result, callback);
        });
    };

    private.getClient = function() {
        return new private.LastFmApi({
            "api_key": private.apiKey,
            "secret": private.secret
        });
    };

    private.processWeeklyResults = function(result, callback) {
        if (result.albums.length > 0 && result.tracks.length > 0) {
            callback(result);
        }
    }

    return public;
};