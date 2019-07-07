import { Component, Prop, h, State } from '@stencil/core';
import Backend from '../../services/backend';

@Component({
  tag: 'supersede-h1',
  styleUrl: 'supersede-h1.css',
  shadow: false
})
export class SupersedeH1 {

  @Prop() userid: string = "1";
  @Prop() snippetname: string = "headline";
  @Prop() path: string;
  @Prop() class: string;

  content: any;

  readonly = true;

  timer: number;

  @State() time: number = Date.now();

  public backendService: Backend = new Backend();

  componentDidLoad() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidUnload() {
    window.clearInterval(this.timer);
  }

  edit(mouseEvent) {

    var originalElement = mouseEvent.srcElement
    var parentElement = originalElement.parentNode
    var d = document.createElement('input');
    d.type = "text"
    d.value = originalElement.innerHTML
    var ctx = this;
    d.onblur = function () {
      ctx.sendUpdate(d.value)
      originalElement.innerHTML = d.value
      parentElement.replaceChild(originalElement, d);
    }
    d.focus();
    parentElement.replaceChild(d, originalElement);
  }

  sendUpdate(text) {
    var backendurl = 'http://localhost:6204/api/websites/' + this.userid + '/' + btoa(window.location.pathname) + '/' + this.snippetname;
    console.log("backendurl", backendurl);
    return fetch(backendurl, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, cors, *same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      //body: JSON.stringify('{"content": "'+text+'"}'), // body data type must match "Content-Type" header
      body: '{"content": "' + text + '"}'
    })
      .then(response => response.json());

  }

  componentWillLoad() {
    return fetch(this.backendService.getRetrieveUrl(document, window, this.snippetname))
      .then(response => response.json())
      .then(data => {
        this.content = data;
        if (this.content.token != null && this.content.token != "") {
          this.readonly = false;
        }
      });
  }

  render() {
    //const time = new Date(this.time).toLocaleTimeString();
    //return <div>Hello, World! I'm {this.getText()} - { time } - { this.content.block }</div>;
    if (this.readonly) {
      return <h1 innerHTML={this.content.block}></h1>;
    } else {
      //var code = "<a href='http://localhost:4200/websites/"+this.userid+"/"+ btoa(this.path) + "/" +this.content.id+"?name="+this.content.name+"'>"+this.content.block+"</a>"
      //return <input type="text" class='editable' value={this.content.block}></input>;
      return <h1 innerHTML={this.content.block}
        onClick={(me) => this.edit(me)}>
      </h1>;
    }
  }
}
