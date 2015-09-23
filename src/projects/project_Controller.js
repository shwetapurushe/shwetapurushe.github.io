/**
 * Created by Shweta on 9/8/2015.
 * controlls the About partial
 */
(function (){
    angular.module('app.project', []);
    angular.module('app.about').controller('aboutPageController' , aboutPageController )

    function aboutPageController (){
        var aCtrl = this;

        aCtrl.interval = 5000;
        aCtrl.noWrapSlides = false;
        aCtrl.imagePath = "css/images/";
        aCtrl.slides = [
            {
                text : 'Data Analysis and Visualization',
                image :  aCtrl.imagePath+'Analyst.png'
            },
            {
                text: 'Metadata',
                image :  aCtrl.imagePath+'Metadata.png'
            },
            {
                text: 'Projects',
                image :  aCtrl.imagePath+'wa_Projects.jpg'
            },
            {
                text: 'Projects List',
                image :  aCtrl.imagePath+'WA_projects_listview.jpg'
            }
        ];

    };
})();