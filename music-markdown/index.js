module.exports = function() {
    var public = {};
    var private = this;

    private.Mustache = require("mustache");

    private.template = 
`
## Albums listened to

{{#albums}}
**[{{artist}} - {{album}}]({{{url}}})**

Total track plays: {{trackPlayCount}}

{{/albums}}

## Tracks listened to

{{#tracks}}
**[{{artist}} - {{track}}]({{{url}}})**

Total track plays: {{trackPlayCount}}

{{/tracks}}`;

    public.renderMusic = function(music, callback) {
        var output = private.Mustache.render(private.template, music);
        callback(output);
    };

    return public;
};