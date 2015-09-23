/**
 * Created by Shweta on 9/8/2015.
 * controlls the About partial
 */
(function (){
    angular.module('app.project', []);
    angular.module('app.project').controller('carouselController' , carouselController )

    function carouselController (){
        var pCtrl = this;
        pCtrl.blah = 'Shweta!!';

        pCtrl.interval = 5000;
        pCtrl.noWrapSlides = false;
        pCtrl.imagePath = "css/images/";
        pCtrl.slides = [
            {
                text : 'Data Analysis and Visualization',
                image :  pCtrl.imagePath+'Analyst.png'
            },
            {
                text: 'Metadata',
                image :  pCtrl.imagePath+'Metadata.png'
            },
            {
                text: 'Projects',
                image :  pCtrl.imagePath+'wa_Projects.png'
            },
            {
                text: 'Projects List',
                image :  pCtrl.imagePath+'WA_projects_listview.png'
            }
        ];

    };
})();