/**
 * Created by Shweta on 9/10/2015.
 */
(function(){
    angular.module('app.collapsible', []);
    angular.module('app.collapsible').directive('collapsePanel',collapsePanelComponent );

    function collapsePanelComponent (){
        return {
            restrict : 'E',
            scope : {
                urlstring : '@',
                heading : '@'
            },
            templateUrl : 'src/collapsibles/collapsible_Panel_Partial.html',
            controller : collapseController,
            controllerAs : 'coCtrl',
            bindToController: true,
            link : function (scope, elem, attrs){
            }
        }// end of ddo
    }

    //collapseController.$inject= ['$scope'];
    function collapseController (){
        var coCtrl = this;

        coCtrl.isCollapsed = true;
        coCtrl.collapseContent = collapseContent;

        function collapseContent (){
            coCtrl.isCollapsed = ! coCtrl.isCollapsed;
        }
    }
})();