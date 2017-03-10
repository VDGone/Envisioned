$.fn.gallery = function (columnsPerRow) {
    columnsPerRow = columnsPerRow || 4;

    var $gallery = $(this);
    var $selected = $gallery.children('.focus');
    var $galleryList = $gallery.children('.gallery-list');
    var $imageContainers = $galleryList.children('.image-container');
    var $currentImage = $selected.find('#current-image');
    var $previousImage = $selected.find('#previous-image');
    var $nextImage = $selected.find('#next-image');

    $imageContainers.each(function (index, element) {
        if (index % columnsPerRow == 0) {
            $(element).addClass('clearfix');
        }
    });

    $galleryList.on('click', 'img', function () {
        var $this = $(this);
        $galleryList.addClass('blurred')
        $('<div />').addClass('disabled-background').appendTo($gallery);

        apllySelected($this);
        $selected.show();
    });

    $currentImage.on('click', function () {
        $galleryList.removeClass('blurred');
        $selected.hide();
        $gallery.children('.disabled-background').remove();
    });

    $previousImage.on('click', function () {
        var $this = $(this);
        apllySelected($this);
    });

    $nextImage.on('click', function () {
        var $this = $(this);
        apllySelected($this);
    });

    $gallery.addClass('gallery');
    $selected.hide();

    function apllySelected($element) {
        var currentImageInfo = getImageInformation($element);
        setImageInformation($currentImage, currentImageInfo.src, currentImageInfo.index);
        var previousIndex = getPreviousIndex(currentImageInfo.index);
        var nextIndex = getNextIndex(currentImageInfo.index);
        var previousImage = getImageByIndex(previousIndex);
        var nextImage = getImageByIndex(nextIndex);
        var previousImageInfo = getImageInformation(previousImage);
        var nextImageInfo = getImageInformation(nextImage);
        setImageInformation($previousImage, previousImageInfo.src, previousImageInfo.index);
        setImageInformation($nextImage, nextImageInfo.src, nextImageInfo.index);
    }

    function getImageInformation($element) {
        return {
            src: $element.attr('src'),
            index: parseInt($element.attr('data-info'))
        }
    }

    function getImageByIndex(index) {
        return $gallery.find('img[data-info="' + index + '"]');
    }

    function setImageInformation($element, src, index) {
        $element.attr('src', src);
        $element.attr('data-info', index);
    }

    function getNextIndex(index) {
        index += 1;
        if (index > $imageContainers.length) {
            index = 1;
        }

        return index;
    }

    function getPreviousIndex(index) {
        index -= 1;
        if (index < 1) {
            index = $imageContainers.length;
        }

        return index;
    }

    return this;
};