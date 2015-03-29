/**
* Created with jQuery-2.0-Cookbook.
* User: jgacuca567
* Date: 2015-01-19
* Time: 5:22 PM
* To change this template use Tools | Templates.
*/

;(function ($) {
    var name = 'pluginName';
    plugin.prototype = {
        defaults: {
<<<<<<< HEAD
            
        }
    };
    
=======

        }
    };

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
    //The Actual plugin constructor
    function Plugin(element, options){
        var $scope = this;
        $scope.$element = $(element);
        $scope.element = element;
        $scope.options = $.extend({}, this.defaults, options);
        $scope.init = function () {
<<<<<<< HEAD
            
=======

>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
        }
    }
    $.fn[name] = function(options){
        return this.each(function (){
            new Plugin(this, options).init();
        })
    }
<<<<<<< HEAD
})(jQuery);
=======
})(jQuery);
>>>>>>> 364a010d51aff80db452ecaf4edb55850c1e1f64
