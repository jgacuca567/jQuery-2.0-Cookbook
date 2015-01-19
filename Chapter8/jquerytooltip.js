/**
* Created with jQuery-2.0-Cookbook.
* User: jgacuca567
* Date: 2015-01-19
* Time: 5:49 PM
*/
;(function ($) {
 
    var name = 'tooltip';
    Plugin.prototype = {
        defaults: {
            'height': 30,
            'fadeInDelay': 200
        }
    };
 
    // The actual plugin constructor
    function Plugin(element, options) {
        var $scope = this;
        $scope.element = element;
        $scope.$element = $(element);
        $scope.options = $.extend({}, $scope.defaults, options) ;
        $scope.init = function() {
            //Plugin initialisation
            $scope._text = (typeof $scope.$element.data('title') != "undefined") ? $scope.$element.data('title') : $scope.$element.prop("title");
            //Only display the tooltip if a title has been specified
            if (typeof $scope._text != "undefined") {
                var $html = $("<div class='tooltip-frame'>"
                    +   "<div class='tooltip-arrow'></div>"
                    +   "<div class='tooltip-text'>" + $scope._text + "</div>"
                    + "</div>");
 
                $html.css({
                    'position': 'absolute',
                    'text-align': 'center',
                    'height': $scope.options.height,
                    'line-height': $scope.options.height + "px",
                    'left': $scope.$element.offset().left + $scope.$element.outerWidth() + 15,
                    'top': $scope.$element.offset().top + ($scope.$element.outerHeight() / 2) - ($scope.options.height / 2),
                    'background-color': 'rgba(0, 0, 0, 0.81)',
                    'color': '#FFF',
                    'padding': '0 10px 0 10px',
                    'border-radius': '5px',
                    'opact': 'none'
                }).find('.tooltip-arrow').css({
                        'width': 0,
                        'height': 0,
                        'border-top': '10px solid transparent',
                        'border-bottom': '10px solid transparent',
                        'border-right': '10px solid rgba(0, 0, 0, 0.81)',
                        'position': 'absolute',
                        'left': '-10px',
                        'top': (($scope.options.height / 2) - 10)
                    });
 
                $scope.$element.on("mouseover", function(){
                    $html.fadeIn($scope.options.fadeInDelay);
                    $scope.$element.after($html);
                }).on("mouseout", function(){
                    $html.remove();
                });
            }
        }
    }
 
    $.fn[name] = function (options) {
        return this.each(function () {
            new Plugin(this, options).init();
        });
    }
 
})(jQuery);