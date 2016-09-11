var WeeklyMusic = require("weekly-music");
var MusicMarkdown = require("music-markdown");
var JekyllBlogBuilder = require("jekyll-blog-builder");
var config = require("./config.json");
var fs = require('fs');

var music = new WeeklyMusic(
    config.username, 
    config.apiKey, 
    config.secret);

var musicMarkdown = new MusicMarkdown();
var blogBuilder = new JekyllBlogBuilder();

music.getWeeklyStatsForUser(function(results) {
    musicMarkdown.renderMusic(results, function(markdown) {
        var currentDate = new Date();

        blogBuilder.buildBlogPost({
            blogTitle: "Coding Music",
            date: new Date(),
            tags: ["music"],
            postMarkdown: markdown
        }, function(filename, output) {
            var fullPath = buildFilePath(config.outputFolder, filename)
            fs.writeFile(fullPath, output, function(error) {
                if (error) { console.log(error);};
                console.log("Ouput successfully to " + fullPath);
            });
        });
    });
});

var buildFilePath = function (folder, filename) { 
    if (!folder.endsWith("/")) {
        folder = folder + "/";
    }
    return folder + filename;
};