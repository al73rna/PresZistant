/**
 * Created by Aidin on 12/4/2015.
 */
    /* Implementation of simple selectors for ease of use */

(function(document,window){

    //a function to get outerHeight(height + margin + border) of an element
    function outerHeight(el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    }
    //id selector
    var byId = function (Id) {
        return document.getElementById(Id);
    };
    //class selector
    var byClass = function (className) {
        return document.getElementsByClassName(className);
    };
    //a function to array objects for iterating
    var arrayify = function ( a ) {
        return [].slice.call( a );
    };

    /* Implementation of presentation */
    var press = window.press = (function (pressId) {
        window.addEventListener("resize", scaleAgain);
        window.addEventListener("hashchange", hashChanged);
        var initialized; //checks if function is initialized
        var slideList = {};//a dictionary to store slides <name,slide>
        var pressNum;
        var presentationId = pressId || 'press'; //the root div id to implement the presentation

        var root = byId(presentationId); //the root div id to implement the presentation

        var slides = arrayify(byClass('slide')); //all the slides as array

        var currentSlide;//stores current slide
        var lastSlide;//stores last slide
        var firstSlide;//stores first slide


        //initializer

        var init = function () {
            if (initialized) return; //check if initialized before
            pressNum = window.performance.now().toString();
            pressNum = pressNum.replace(".","-");
            slides.forEach(function (el) {//Compile each slide in addSlide() method
                addSlide(el);
            });

            initSlides();//initialize transform for each slide

            //root style modification
            root.style.transformStyle = "preserve-3d";
            root.style.position = "absolute";
            root.transformOrigin = "left top 0px";
            root.style.top = "50%";
            root.style.left = "50%";
            document.getElementsByTagName("body")[0].style.height = window.outerHeight;


            initialized = true; //set initialized true to avoid another function callback

            //check if hash is set like "url#title"
            if(window.location.hash){
                document.body.scrollTop = 0;

                var el = slideList[window.location.hash.substr(1)];
                if(el){
                    Navigate(el,{notIsTransition:true}); //Navigate to hash id if id exists, without transition(notIsTransition)
                }
            }

        };
        //Set specific Slide style
        var initSlide = function(el){
            if(!slideList.hasOwnProperty(el.id)){
                addSlide(el); //add slide to slideList and slideNumberList with all of it's properties if it's not in slideList
            }

            var slide = slideList[el.id]; //get the slide information from slide list
            //set Transform property for a specific slide(el) by it's measurements
            el.style.transform = el.style.mozTransform = el.style.webkitTransform =
                "translate(-50%, -50%) translate3d(" + slide.x + "px," +
                + slide.y + "px," +
                + slide.z + "px" +
                ") rotate(" + slide.rotate + "deg) rotateX(" + slide.rotate_x + "deg) rotateY(" + slide.rotate_y + "deg) rotateZ(" + slide.rotate_z +
                "deg) scale(" + slide.scale + ")";
            //set slide styles
            el.style.position = "absolute";
            el.style.transformStyle = "preserve-3d";
            //add not-assigned class

        };
        //Add Slides in slideList
        var initSlides = function(){

            slides.forEach(function(slide){
                initSlide(slide);
                slide.classList.add("state-unknown");//add state-unknown class to all slides except slide 1
            });

            //set last slide's next to slide 1 and slide 1's previous to last slide
            lastSlide.next = firstSlide;
            firstSlide.previous = lastSlide;
            Navigate(firstSlide,{notIsTransition: true});



        };
        //Add Slide to SlideList
        var addSlide = function(el){
            //get steps
            var steps = getSteps(el);
            //adding an object which represents slide in slideList and slideNumberList
            var e = {
                id: el.id,
                animation_delay: el.dataset.animationdelay || 0,
                slide_delay: el.dataset.slidedelay || 0,
                x: el.dataset.x || 0,
                y: el.dataset.y || 0,
                z: el.dataset.z || 0,
                scale: el.dataset.scale || 1,
                rotate_x:  el.dataset.rotateX || 0,
                rotate_y: el.dataset.rotateY || 0,
                rotate_z: el.dataset.rotateZ || 0,
                rotate: el.dataset.rotate || 0,
                next: null, //next slide
                previous: null, //previous slide
                element: el, //DOM
                steps: steps[0],
                currentStep: null,
                nextStep: steps[1],
                firstStep: steps[1]
            };

            var count = Object.keys(slideList).length;
            if(count > 0) {
                e.previous = lastSlide;
                e.previous.next = e;
            }
            else{
                firstSlide = e;
            }
            //as you know slideList is a dictionary which keys are slide id s
            slideList[el.id] = e;
            lastSlide = e;

        };

        //initializing steps and returning an array of steps
        var getSteps = function(el){
            var steps = arrayify(el.getElementsByClassName("step"));
            steps.sort(function(a,b){
                if(a.dataset.level > b.dataset.level) return 1;
                if(a.dataset.level < b.dataset.level) return -1;
                return 0;
            });

            var result = {};

            var firstStep = null;
            var lastStep = null;
            steps.forEach(function(e,index){

                e.id = "step" + window.performance.now();
                e.id = e.id.replace(".","-");
                var step = {
                    id: e.id,
                    element : e,
                    next: null,
                    previous: null,
                    active: false,
                    level: e.dataset.level,
                    activate: function(){this.element.classList.add("active"); this.active = true;},
                    deactivate: function(){this.element.classList.remove("active"); this.active = false;}

                };
                if(index > 0){
                    step.previous = lastStep;
                    step.previous.next = step;
                } else firstStep = step;
                lastStep = step;
                result[step.id] = step;
            });

            return [result,firstStep];
        };
        //Next and Previous(step/slide)
        var next = function(){
            if(!nextStep()) nextSlide();
        };
        var previous = function () {
            if(!previousStep()) previousSlide();
        };
        //navigating to next slide
        var nextSlide = function(){
            Navigate(currentSlide.next);//navigate to next element
        };
        //show next step
        var nextStep = function(){
            if(currentSlide.nextStep) {
                do {
                    currentSlide.nextStep.activate();
                    currentSlide.currentStep = currentSlide.nextStep;
                    currentSlide.nextStep = currentSlide.nextStep.next;

                } while (currentSlide.nextStep && currentSlide.currentStep.level == currentSlide.nextStep.level);
                return true;
            }
            return false;
        };
        //Navigate to previous slide
        var previousSlide = function(){
            Navigate(currentSlide.previous); //navigate to previous element
        };
        //show previous step
        var previousStep = function(){
            if(currentSlide.currentStep){
                do {
                    currentSlide.currentStep.deactivate();
                    currentSlide.nextStep = currentSlide.currentStep;
                    currentSlide.currentStep = currentSlide.currentStep.previous;
                }while(currentSlide.currentStep && (currentSlide.currentStep.level == currentSlide.nextStep.level));
                return true;
            }
            return false;
        };
        var Navigate = function(el,option){
            option = (typeof option !== "object") ? {} : option; //option as an object: options for navigation
            //for now just notIsTransition for the time we want to disable transition in a navigation
            if(currentSlide != el) {

                var notIsTransition = option.notIsTransition || false;

                setClasses(el);//setting classes
                currentSlide = el; //set currentSlide to current navigated element
                navigateContainer(el, notIsTransition);//navigates container to slide's place

            }
            root.addEventListener("transitionend webkitTransitionEnd", function(){alert(1);}, false);
        };
        var setClasses = function(el){
            if(initialized) { //if it's first time, there is no currentSlide or previous and next
                var present = currentSlide || el;
                var previous = present.previous;
                var next = present.next;
                //removing last previous,next and present classes
                present.element.classList.remove("present");
                previous.element.classList.remove("previous");
                next.element.classList.remove("next");
                present.element.classList.add("state-unknown");
                previous.element.classList.add("state-unknown");
                next.element.classList.add("state-unknown");
            }
            //add it to new element and it's neighbours

            el.previous.element.classList.add("previous");
            el.previous.element.classList.remove("state-unknown","present","next");

            el.next.element.classList.add("next");
            el.next.element.classList.remove("state-unknown","present","previous");

            el.element.classList.add("present");
            el.element.classList.remove("state-unknown","previous","next");
        };

        var navigateContainer = function(el,notIsTransition){
            /*transition options*/
            var animationDelay = el.animation_delay || 500;
            var slideDelay = el.slide_delay || 1000;
            if(!notIsTransition)
                root.style.transition = "all "+slideDelay+"ms ease-in-out "+animationDelay+"ms";
            /*Perspective and scale*/
            var targetScale = 1/el.scale; //if element got "scale" times bigger, we should make the container smaller "1/scale" times
            var elementTrueHeight = outerHeight(el.element); //we need slide height to check if slide is bigger than window size
            var windowScale = 1; //the coefficient
            if(elementTrueHeight > window.innerHeight){ //if element could not fit the window so we should make it fit
                windowScale = (window.innerHeight-15)/elementTrueHeight; //this is the coefficient we should apply to scale
            }
            var TargetScale = targetScale * windowScale; //we apply the coefficient her
            var pers = 1000/TargetScale; //perspective should be in the same distance as before
            /*Translate3d*/
            var x = el.x || 0;
            var y = el.y || 0;
            var z = el.z || 0;
            /*Rotate*/
            var rotate =  el.rotate || 0;
            var rotateX = el.rotate_x || 0;
            var rotateY = el.rotate_y || 0;
            var rotateZ = el.rotate_z || 0;
            //apply changes(notice that every change should be in the inverse form of slide.transform)
            root.style.transform ="scale(" + TargetScale + ") perspective("+pers+"px) rotateZ("  + (-1 * rotateZ) + "deg) rotateY(" + (-1 * rotateY) +
                "deg) rotateX(" + (-1 * rotateX) + "deg) rotate("  + (-1*rotate) + "deg) translate3d(" + (-1*x) + "px," + (-1*y) + "px," + (-1*z) + "px)";

        };

        function scaleAgain(){
            navigateContainer(currentSlide);//resetting the scale and perspective on resize of window
        }
        //this function listens to hashchange event
        function hashChanged(){//support # for url. be carefull, it Scrolls to element.

            document.body.scrollTop = 0;
            var id = window.location.hash.substr(1);

            goTo(id);
        }
        //a very simple function for navigating to desired slide
        var goTo = function(id){
            if(slideList[id]) {
                Navigate(slideList[id]);
            }
            else{
                throw "no such a slide";
            }
        };

        //adding slide via selector
        var addNewSlide = function(el){
            if(Object.keys(slideList).length > 0) {
                var last = lastSlide; //storing lastSlide in another variable just in case
                lastSlide = currentSlide; //setting lastSlide to currentSlide because it's needed in initSlide()
                var next = currentSlide.next; //storing next slide too
                initSlide(el); //initialize element
                lastSlide.next = next; //setting added element next to currentSlide's next
                next.previous = lastSlide; //...
                if(currentSlide == last) root.appendChild(el);
                else root.insertBefore(el, currentSlide.next.next.element); //adding to Dom

                if (currentSlide != last) lastSlide = last; //set back the last slide if added one is not last
                Navigate(currentSlide.next); //navigate to new slide
            }
            else{
                initSlide(el);
                slide = slideList[el.id];
                slide.next = slide;
                slide.previous = slide;
                root.appendChild(el);
                Navigate(firstSlide);
            }
            /*sample
             var div = document.createElement("div");
             div.style.width = "500px";
             div.style.height = "500px";
             div.dataset.x = "1500";
             div.dataset.y = "500";
             div.dataset.scale = "5";
             div.classList.add("slide");
             div.style.background = "red";
             div.style.color = "white";
             div.innerHTML = "Hello";
             div.id = "hello";
             press.addSlide(div)
             */
        };

        //Adding Step to currentSlide
        var addStep = function(el,level,isAppend,slideId){
            var slide = slideList[slideId];
            if(!slide) slide = currentSlide;
            if(!level && !el.dataset.level) throw "level is not defined";
            if(!el.dataset.level) el.dataset.level = level;

            el.classList.add("step");
            var e = {
                element : el,
                next: null,
                previous: null,
                active: false,
                level: el.dataset.level,
                activate: function(){this.element.classList.add("active"); this.active = true;},
                deactivate: function(){this.element.classList.remove("active"); this.active = false;}
            };

            var ptr = slide.firstStep;
            if(ptr) {
                while (ptr.next && (e.level >= ptr.next.level)) ptr = ptr.next;
                e.previous = ptr;
                e.next = ptr.next;
                e.previous.next = e;

                if(e.next) e.next.previous = e;
                e.active = slide.currentStep != null && e.level <= slide.currentStep.level;
                if (e.active) e.activate();

                if (slide.currentStep == ptr) slide.nextStep = e;
            }
            else{
                slide.nextStep = e;
                slide.firstStep = e;
            }
            e.id = "step" + window.performance.now();
            e.id = e.id.replace(".","-");
            el.id = e.id;
            if(isAppend) slide.element.appendChild(el);
            slide.steps[e.id] = e;

            /* for example
             var div2 = document.createElement("div");
             div2.style.width = "100px";
             div2.style.height = "100px";
             div2.dataset.level = "3";
             div2.classList.add("step");
             div2.style.background = "green";
             div2.style.color = "black";
             div2.innerHTML = "Hello";
             div2.style.position = "absolute"
             div2.style.top = "0"
             div2.style.right = "0"
             press.addStep(div2)
             */
        };
        //removes a specific step
        var removeStep = function(el,slideId){
            var slide = slideList[slideId];
            if(!slide) slide = currentSlide;
            var step = slide.steps[el.id];
            if(!step) return false;
            if(step.previous) step.previous.next = step.next;
            if(step.next) step.next.previous = step.previous;
            if(slide.currentStep == step) slide.currentStep = step.previous;
            if(slide.nextStep == step) slide.nextStep = step.next;
            if(slide.firstStep == step) slide.firstStep = step.next;
            slide.element.removeChild(el);
            delete slide.steps[step.id];
        };
        //removes a specific slide
        var removeSlide = function(slideId){
            var el = slideList[slideId];
            if(!el) el = currentSlide;
            el.next.previous = el.previous;//link slide's neighbours together
            el.previous.next = el.next;
            root.removeChild(el.element);//removing element from root
            delete slideList[el.id];//removing from slideList



            if(currentSlide == el) { //Navigate if the removed slide was the currentSlide
                if(currentSlide.next == firstSlide) //if the firstSlide.next == lastSlide is removed Navigate backward
                    return el.previous;
                else
                    return el.next; //if it's not the lastSlide

            }

            if(el == el.next) { firstSlide = null; lastSlide = null; currentSlide = null;} //el == el.next means it's the only slide in the press
            else{
                if(el == firstSlide) firstSlide = el.next; //if el is not alone and it's firstSlide...
                if(el == lastSlide) lastSlide = el.previous; //same thing about lastSlide
            }

        };
        //getRawHtml for saving presentation
        var getRawHtml = function(template){
            var copiedRoot = root.cloneNode(true);
            copiedRoot.removeAttribute("style");
            while (copiedRoot.firstChild) {
                copiedRoot.removeChild(copiedRoot.firstChild);
            }
            var ptr = firstSlide;
            do{
                var e = ptr.element.cloneNode(true);
                e.style.transform = "";
                e.style.position = "";
                e.style.transformStyle = "";
                e.style.display = "";
                arrayify(e.getElementsByClassName('TextDiv')).forEach(function(e){
                    e.removeAttribute("contenteditable");
                });
                e.classList.remove("present","next","previous","state-unknown");
                arrayify(e.getElementsByClassName("step")).forEach(function(d){
                    d.classList.remove("active");
                    d.removeAttribute("id");
                });
                copiedRoot.appendChild(e);
                ptr = ptr.next;
            }while(ptr != firstSlide);


            //we need to wrap the copied page into one div to use the div's innerHtml(it will return whole copied page)
            var div = document.createElement("div");
            div.appendChild(copiedRoot);
            var result = template.replace("!$!",div.innerHTML);
            return result;
        };

        //gets currentSlide
        var getCurrentSlide = function(){
            return currentSlide;
        };
        var getSlideIdList = function(){
            var result = {};
            counter = 1;
            var ptr = firstSlide;
            do{
                result[counter] = ptr.id;
                counter++;
                ptr = ptr.next;
            }while(ptr != firstSlide);
            return result;
        };

        var getPresentationNumber = function(){
            return pressNum;
        };

        return(
        {
            init: init,
            initSlide: initSlide,
            next: next,
            previous: previous,
            goTo: goTo,
            addSlide: addNewSlide,
            removeSlide: removeSlide,
            addStep: addStep,
            removeStep: removeStep,
            getRawHtml: getRawHtml,
            getCurrentSlide: getCurrentSlide,
            nextStep: nextStep,
            previousStep: previousStep,
            nextSlide: nextSlide,
            previousSlide: previousSlide,
            getSlideIdList: getSlideIdList,
            getPresentationNumber: getPresentationNumber
        });
    })();



})(document, window);