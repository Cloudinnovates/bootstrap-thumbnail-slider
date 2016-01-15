define(['domReady!', 'threesixty'], function() {

    var ThumbnailSlider = function(options) {

        this.options = Object.assign({
            elementSelector: '.thumbnail-slider',
            showcaseItemsSelector: '.showcase .item',
            thumbnailItemsSelector: '.thumbnails .item',
            threeSixtySelector: '.showcase .item .threesixty',
            activeSelector: 'active',
            activeIndex: 0
        }, options);

        this.element = document.querySelector(this.options.elementSelector);
        this.threeSixtyElement = this.options.threeSixtyElement;

        this.showcaseItems = this.nodeListToArray(
            this.element.querySelectorAll(this.options.showcaseItemsSelector)
        );

        this.thumbnailItems = this.nodeListToArray(
            this.element.querySelectorAll(this.options.thumbnailItemsSelector)
        );

        this.setThumbnailsClickHandler();
        this.setActive(this.options.activeIndex);
        this.setupThreeSixty();
    } || {};

    ThumbnailSlider.prototype.setupThreeSixty = function() {
        this.threeSixty = $(
            this.element.querySelector(this.options.threeSixtySelector)
        ).ThreeSixty({
            totalFrames: 50, // Total no. of image you have for 360 slider
            endFrame: 50, // end frame for the auto spin animation
            currentFrame: 1, // This the start frame for auto spin
            imgList: '.threesixty_images', // selector for image list
            progress: '.spinner', // selector to show the loading progress
            imagePath:'img/sequences/', // path of the image assets
            filePrefix: '', // file prefix if any
            ext: '.png', // extention for the assets
            navigation: false,
            responsive: true
        });
    };

    ThumbnailSlider.prototype.setThumbnailsClickHandler = function() {
        var self = this;

        // loop through all thumbnail items to attach click event handlers
        this.thumbnailItems.forEach(function(thumbnail, thumbnailIndex) {

            thumbnail.addEventListener('click', function(event) {

                if(event.currentTarget.classList.contains('active')) {
                    return false;
                }

                var dataType = event.currentTarget.getAttribute('data-type');

                switch (dataType) {
                    case 'video':

                        break;
                    case 'threesixty' :
                        if(self.threeSixty) { self.threeSixty.gotoAndPlay(0); }
                        break;
                    default:
                        self.pauseActiveYoutubeVideo();
                        break;
                }


                // filter out the selected item based on the list of thumbnail items
                if(self.thumbnailItems.indexOf(event.target)) {
                    self.setActive(thumbnailIndex);
                }

                // the index of the selected thumbnail matches with the index of the showcase index item
                self.showcaseItems.forEach(function(showcaseElement, showcaseIndex) {
                    if(showcaseIndex === thumbnailIndex) {
                        self.setActive(showcaseIndex);
                    }
                });
            });
        });
    };

    /**
     * set src attr to empty string and reset it with the old value: simulating pause youtube video
     */
    ThumbnailSlider.prototype.pauseActiveYoutubeVideo = function() {
        var activeIframe = document.querySelector('.showcase .item.active iframe');
        if(activeIframe) {
            var videoSrc = activeIframe.getAttribute('src');
            activeIframe.setAttribute('src', '');
            activeIframe.setAttribute('src', videoSrc);
        }
    };

    /**
     * Convert NodeListArray into regular JavaScript Array.prototype
     * @param nl NodeListArray
     * @returns {Array}
     */
    ThumbnailSlider.prototype.nodeListToArray = function(nl) {
        for(var a=[], l=nl.length; l--; a[l]=nl[l]);
        return a;
    };

    /**
     * Set active class on the thumbnail and showcase item
     * @param activeIndex
     */
    ThumbnailSlider.prototype.setActive = function(activeIndex) {
        this.resetAllActives();

        this.thumbnailItems.forEach(function(thumbElement, index) {
            if(activeIndex == index) {
                thumbElement.classList.add('active');
            }
        });

        this.showcaseItems.forEach(function(showcaseElement, index) {
            if(activeIndex == index) {
                showcaseElement.classList.add('active');
            }
        });
    };

    /**
     * Remove all .active class on showcase items and thumbnail items
     */
    ThumbnailSlider.prototype.resetAllActives = function() {

        this.thumbnailItems.forEach(function(thumbElement) {
            thumbElement.classList.remove('active');
        });

        this.showcaseItems.forEach(function(showcaseElement) {
            showcaseElement.classList.remove('active');
        });
    };

    return ThumbnailSlider;
});