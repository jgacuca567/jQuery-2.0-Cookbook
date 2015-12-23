;(function ($) {
<<<<<<< HEAD
 
=======

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
    var name = 'imagecrop';
    Plugin.prototype = {
        defaults: {
            minWidth: 100,
            minHeight: 100
        }
    };
<<<<<<< HEAD
 
=======

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
    // The actual plugin constructor
    function Plugin(element, options) {
        var $scope = this;
        $scope.$element = $(element);
        $scope.element = element;
        $scope.options = $.extend({}, this.defaults, options);
        $scope.imageSelection = {
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            },
            top: 0,
            left: 0
        };
        var _frame;
        var _overlayLayer;
        var _selectionLayer;
        var _selectionOutline;
<<<<<<< HEAD
 
=======

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
        $scope.init = function () {
            //Has this element already been initialised?
            if (typeof $scope.$element.data("selection-x") != "undefined") {
                //Yes, so reuse the DOM elements...
                _frame = $(document).find('.crop-frame').css({
                    width: $scope.$element.width(),
                    height: $scope.$element.height()
                });
                _overlayLayer = $(document).find('.overlay-layer');
                _selectionLayer = $(document).find('.selection-layer');
                _selectionOutline = $(document).find('.selection-outline');
            } else {
                //No, lets initialise then...
                _frame = $("<div class='crop-frame'></div>").css({
                    width: $scope.$element.width(),
                    height: $scope.$element.height()
                });
                _overlayLayer = $("<div class='overlay-layer'></div>");
                _selectionLayer = $("<div class='selection-layer'></div>");
                _selectionOutline = $("<div class='selection-outline'></div>");
                //Wrap the image with the frame
                $scope.$element.wrap(_frame);
                _overlayLayer.insertAfter($scope.$element);
                _selectionLayer.insertAfter($scope.$element);
                _selectionOutline.insertAfter($scope.$element);
                /** EVENTS **/
                _selectionLayer.on("mousedown", $scope.onSelectionStart);
                _selectionLayer.on("mouseup", $scope.onSelectionEnd);
                _selectionOutline.on("mouseup", $scope.onSelectionEnd); //End selection on mouse up of outline so event is not stolen
                _selectionOutline.on("mousedown", $scope.onSelectionMove);
            }
            $scope.updateElementData();
            /** UPDATE THE OUTLINE BACKGROUND **/
            _selectionOutline.css({
                'background': 'url(' + $scope.$element.prop("src") + ')',
                'display': 'none'
            });
        };
<<<<<<< HEAD
 
=======

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
        /**
         * MAKING THE SELECTION
         */
        $scope.onSelectionStart = function(event) {
            $scope.imageSelection.start = $scope.getMousePosition(event);
            _selectionLayer.bind({
                mousemove: function(event) {
                    $scope.imageSelection.end = $scope.getMousePosition(event);
                    $scope.drawSelection();
                }
            });
        };
        $scope.onSelectionEnd = function() {
            _selectionLayer.unbind("mousemove");
            //Hide the element if it doesn't not meet the minimum specified dimensions
            if ($scope.getSelectionDimentions().width < $scope.options.minWidth || $scope.getSelectionDimentions().height < $scope.options.minHeight) {
                _selectionOutline.hide();
            }
            _selectionOutline.css({
                'z-index': 1001
            });
        };
        $scope.drawSelection = function() {
            _selectionOutline.show();
            //The smallest top value and the smallest left value are used to set the position of the element
            $scope.imageSelection.top = ($scope.imageSelection.end.y < $scope.imageSelection.start.y) ? $scope.imageSelection.end.y : $scope.imageSelection.start.y;
            $scope.imageSelection.left = ($scope.imageSelection.end.x < $scope.imageSelection.start.x) ? $scope.imageSelection.end.x : $scope.imageSelection.start.x;
            //Work out the background position
            _selectionOutline.css({
                position: 'absolute',
                top: $scope.imageSelection.top,
                left: $scope.imageSelection.left,
                width: $scope.getSelectionDimentions().width,
                height: $scope.getSelectionDimentions().height,
                'background-position': '-' + $scope.imageSelection.left + 'px -' + $scope.imageSelection.top + 'px'
            });
            $scope.updateElementData();
        };
<<<<<<< HEAD
 
=======

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
        /**
         * MOVING THE SELECTION
         */
        $scope.onSelectionMove = function() {
            //Prevent trigger the selection events
            _selectionOutline.addClass('dragging');
            _selectionOutline.on("mousemove mouseout", function(event){
                if ($(this).hasClass("dragging")) {
                    var left = ($scope.getMousePosition(event).x - ($(this).width() / 2));
                    //Don't allow the draggable element to over the parent's left and right
                    if (left < 0) left = 0;
                    if ((left + $(this).width()) > _selectionLayer.width()) left = (_selectionLayer.width() - $(this).outerWidth());
                    var top = ($scope.getMousePosition(event).y - ($(this).height() / 2));
                    //Don't allow the draggable element to go over the parent's top and bottom
                    if (top < 0) top = 0;
                    if ((top + $(this).height()) > _selectionLayer.height()) top = (_selectionLayer.height() - $(this).outerHeight());
                    $scope.imageSelection.left = left;
                    $scope.imageSelection.top = top;
                    //Set new position
                    $(this).css({
                        top: $scope.imageSelection.top,
                        left: $scope.imageSelection.left,
                        'background-position': '-' + $scope.imageSelection.left + 'px -' + $scope.imageSelection.top + 'px'
                    });
                }
            }).on("mouseup", function(){
                $(this).removeClass('dragging');
                $scope.updateElementData();
            });
        }
<<<<<<< HEAD
 
=======

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
        /**
         * HELPER FUNCTIONS
         */
        $scope.getMousePosition = function(event) {
            return {
                y: (event.pageY - _selectionLayer.offset().top),
                x: (event.pageX - _selectionLayer.offset().left)
            };
        };
        $scope.getSelectionDimentions = function() {
            //Work out the width and height based on the start and end positions
            var width = ($scope.imageSelection.end.x - $scope.imageSelection.start.x);
            var height = ($scope.imageSelection.end.y - $scope.imageSelection.start.y);
            //If any negatives turn them into positives
            if (height < 0) height = (height * -1);
            if (width < 0) width = (width * -1);
            return {
                width: width,
                height: height,
                x: $scope.imageSelection.start.x,
                y: $scope.imageSelection.start.y
            };
        }
        $scope.updateElementData = function() {
            $scope.$element.data({
              "selection-x": $scope.imageSelection.left,
              "selection-y": $scope.imageSelection.top,
              "selection-width": $scope.getSelectionDimentions().width,
              "selection-height": $scope.getSelectionDimentions().height
            });
        }
<<<<<<< HEAD
 
    }
 
=======

    }

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
    $.fn[name] = function (options) {
        return this.each(function () {
            new Plugin(this, options).init();
        });
    }
<<<<<<< HEAD
 
})(jQuery);
=======

})(jQuery);
>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
