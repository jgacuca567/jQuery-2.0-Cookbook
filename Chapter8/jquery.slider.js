/**
* Created with jQuery-2.0-Cookbook.
* User: jgacuca567
* Date: 2015-01-19
* Time: 6:10 PM
* To change this template use Tools | Templates.
*/
;(function ($) {
 
    var name = 'slider';
    Plugin.prototype = {
        defaults: {
            width: 600,
            height: 250
        }
    };
 
    // The actual plugin constructor
    function Plugin(element, options) {
        var $scope = this;
        $scope.$element = $(element);
        $scope.element = element;
        $scope.options = $.extend({}, this.defaults, options);
        $scope.init = function () {
            $scope.$element.addClass("slider-frame").css({
                width: $scope.options.width,
                height: $scope.options.height
            });
            $scope.$element.append('<ul class="slider-nav"></ul>');
            var _sliderItems = $scope.$element.find('div, img');
            _sliderItems.wrapAll("<div class='slider-content'></div>");
            $scope.$element.find('.slider-content').css({
                width: $scope.options.width * _sliderItems.length,
                position: 'relative'
            });
            _sliderItems.css({
                float: 'left',
                width: $scope.options.width,
                height: $scope.options.height
            });
            var _sliderNav = $scope.$element.find('.slider-nav');
            for (var i = 0; i < _sliderItems.length; i++) {
                _sliderNav.append("<li><a href='#" + i + "' " + ((i == 0) ? "class='active'" : "") + ">" + (i + 1) + "</a></li>");
            }
            _sliderNav.on("click", "li a", function(){
                var index = this.hash.replace("#", "");
                _sliderNav.find('li a').removeClass("active");
                $(this).addClass("active");
                $scope.$element.find('.slider-content').animate({
                    left: -(index * $scope.options.width) + "px"
                });
            });
        }
    }
 
    $.fn[name] = function (options) {
        return this.each(function () {
            new Plugin(this, options).init();
        });
    }
 
})(jQuery);