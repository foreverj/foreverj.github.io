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
window.onload = function(){
    var typewriter = require("typewriter");
    var header = document.getElementsByTagName("header")[0];
    var h = header.getElementsByTagName("h1")[0];

    var text = getMeta("tw:text");

    var tw = typewriter(h).withAccuracy(100)
    .withMinimumSpeed(9)
    .withMaximumSpeed(15)
    .build();

    tw.clear()
    .wait(500)
    .type(text, function(){
        document.querySelector('body').classList.add('active');
        document.querySelector('.content').classList.add('active');
    });

    //Adages
    var adage = getAdage();
    console.log(adage.sentence);
    console.log("By: ",adage.author);
}

var getAdage = function(){
  var adages = [
    {
      sentence: "It is poignant but fundamental that the flag protects those who hold it in contempt.",
      author: "Justice Anthony Kennedy"
    },
    {
        sentence: "At the beginning, time is the only luxury we have; at the end, time is the only luxury we strive.",
        author: "Anonymous"
    }
  ];
  var inx = Math.floor(Math.random()*adages.length);
  return adages[inx];
}
