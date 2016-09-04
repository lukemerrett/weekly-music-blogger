var helpers = function() {
    Date.prototype.isoDateOnly = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(), "-", !mm[1] && "0", mm, "-", !dd[1] && "0", dd].join(""); // padding
    };
    
    Date.prototype.ukDateOnly = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [!dd[1] && "0", dd, "-", !mm[1] && "0", mm, "-", this.getFullYear()].join(""); // padding
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

        var filename = model.date.isoDateOnly() + " - " + model.blogTitle + ".markdown";

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

    return public;
};
