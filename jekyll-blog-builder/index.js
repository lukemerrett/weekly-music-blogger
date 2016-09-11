var helpers = function() {
    var private = this;

    Date.prototype.isoDateOnly = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(), "-", private.padZero(mm), "-", private.padZero(dd)].join(""); // padding
    };
    
    Date.prototype.ukDateOnly = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [!dd[1] && "0", dd, "-", !mm[1] && "0", mm, "-", this.getFullYear()].join(""); // padding
    };

    private.padZero = function(datePart) {
        var toReturn = datePart;
        if (datePart < 10) {
            toReturn = "0" + datePart;
        }
        return toReturn
    };
}();

module.exports = function() {
    var public = {};
    var private = this;

    private.Mustache = require("mustache");

    private.template = 
`---

layout: post

title:  "{{blogTitle}}"

date:   {{dateString}}

tags: [{{tags}}]

---


{{postMarkdown}}`;

    public.buildBlogPost = function(model, callback) {
        private.validateModel(model);

        var filename = private.buildFilename(model);

        var output = private.Mustache.render(private.template, {
            blogTitle: model.blogTitle + " - " + model.date.ukDateOnly(),
            dateString: model.date.isoDateOnly(),
            tags: model.tags.join(", "),
            postMarkdown: model.postMarkdown
        });

        callback(filename, output);
    };

    private.validateModel = function(model) {
        private.validateProperty(model, "blogTitle");
        private.validateProperty(model, "date");
        private.validateProperty(model, "tags");
        private.validateProperty(model, "postMarkdown");
    };
    
    private.validateProperty = function(model, property) {
        if (!model[property]) {
            throw "Must provided model." + property;
        }
    }

    private.buildFilename = function(model) {
        var dateStamp = model.date.isoDateOnly();
        var blogTitle = model.blogTitle.toLowerCase().replace(/\s/g, "-");
        return dateStamp + "-" + blogTitle + "-" + dateStamp + ".markdown";
    };

    return public;
};
