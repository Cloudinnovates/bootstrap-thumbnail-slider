requirejs.config({
    baseUrl: './',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        threesixty: 'bower_components/threesixty-slider/src/threesixty',
        domReady: 'bower_components/domReady/domReady'
    },
    shim: {
        jquery: {
            exports: ['$', 'jQuery']
        },
        bootstrap: ['jquery'],
        threesixty: ['jquery']
    }
});

define(['js/thumbnail.slider'], function(ThumbnailSlider) {
    new ThumbnailSlider()
        .setupThreeSixty({
            totalFrames: 50,
            endFrame: 50,
            currentFrame: 1,
            imgList: '.threesixty_images',
            progress: '.spinner',
            imagePath:'img/sequences/',
            ext: '.png'
        });
});