
export default class Replace {


  handle(ctx, type, mouseEvent, cls) {
    var originalElement = mouseEvent.srcElement;
    var parentElement = originalElement.parentNode;
    var d = document.createElement(type);
    //console.log("classname", d.)
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
}
