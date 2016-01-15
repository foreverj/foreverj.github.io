//Polyfill for textContent property
if (Object.defineProperty
  && Object.getOwnPropertyDescriptor
  && Object.getOwnPropertyDescriptor(Element.prototype, "textContent")
  && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
  (function() {
    var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
    Object.defineProperty(Element.prototype, "textContent",
     {
       get: function() {
         return innerText.get.call(this);
       },
       set: function(s) {
         return innerText.set.call(this, s);
       }
     }
   );
  })();
}

//Get meta function
function getMeta(name) {
   var metas = document.getElementsByTagName('meta');
   for (i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == name) {
         return metas[i].getAttribute("content");
      }
   }

    return null;
}

//Start the business
var typewriter = require("typewriter");
var header = document.getElementsByTagName("header")[0];
var h = header.getElementsByTagName("h1")[0];

var text = getMeta("tw:text");

var tw = typewriter(h).withAccuracy(100)
                    .withMinimumSpeed(9)
                    .withMaximumSpeed(15)
                    .build();

tw.clear()
    .waitRange(800,1000)
    .type(text, function(){
        document.querySelector('body').classList.add('active');
        document.querySelector('.content').classList.add('active');
    });

