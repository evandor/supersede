
export default class Replace {


  handle(ctx, type, mouseEvent, cls) {
    var originalElement = mouseEvent.srcElement;
    var parentElement = originalElement.parentNode;
    var d = document.createElement(type);
    console.log("classname", cls);
    //d.type = "text"
    d.className = cls;
    d.value = originalElement.innerHTML;
    //var ctx = this;
    d.onblur = function () {
      ctx.sendUpdate(d.value);
      originalElement.innerHTML = d.value;
      parentElement.replaceChild(originalElement, d);
    };
    d.focus();
    parentElement.replaceChild(d, originalElement);

  }

  handle2(ctx, mouseEvent, cls) {
    var originalElement = mouseEvent.srcElement;
    //var parentElement = originalElement.parentNode;
    //var d = document.createElement(type);
    console.log("classname", cls);
    //d.type = "text"
    //var ctx = this;
    originalElement.onblur = function () {
      ctx.sendUpdate(originalElement.innerHTML);
      //parentElement.replaceChild(originalElement, d);
    };
    //parentElement.replaceChild(d, originalElement);

  }
}
