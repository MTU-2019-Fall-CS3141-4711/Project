var mq = require("mithril-query");

var MainVideoContent = require("../../../../js/views/components/MainVideoContent/MainVideoContent");
var AnnotatedVideo = require("../../../../js/views/components/MainVideoContent/AnnotatedVideo");
var YTVideoPlayer = require("../../../../js/views/components/MainVideoContent/YTVideoPlayer");
var QueuedVIdeo = require("../../../../js/views/components/MainVideoContent/QueuedVideo");

describe("The main video", function(){
    describe("'s invidiual component", function(){
        describe("YTVideoPlayer", function(){

            var ytvpNode = mq(YTVideoPlayer);

            it("should render a div for the player", function(){
                ytvpNode.should.have([".video-player","#player"]);
            });
        });

        describe("AnnotatedVideo should wrap YTVideoPlayer", function(){

            var avNode = mq(AnnotatedVideo);

            it("should render a video player", function(){
                avNode.should.have(2, "div");
            });

            it("should render a canvas for drawing", function(){
                avNode.should.have(1, "canvas")
                avNode.should.have(".annotation-canvas");
            });

        });

        describe("VideoQueue", function(){

            var qvNode = mq(QueuedVIdeo);
            //TODO: write queue tests

        });
    });

    describe(",with all it's components,", function(){

        var mvcNode  = mq(MainVideoContent);

        it("should render everything in a wrapper", function(){
            mvcNode.should.have([".main-video-content"]);
        });

        it("should contain a video player",function(){
            mvcNode.should.have(".video-player");
        });
    });
});