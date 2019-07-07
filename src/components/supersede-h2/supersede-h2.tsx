import {  Prop, h, State, Component } from '@stencil/core';
//import { format } from '../../utils/utils';

@Component({
  tag: 'supersede-h2',
  styleUrl: 'supersede-h2.css',
  shadow: false
})
export class SupersedeH2  {

  @Prop() userid: string = "1";
  @Prop() snippetname: string = "headline";
  @Prop() path: string;
  @Prop() class: string;

  content: any;

  readonly = true;

  timer: number;

  @State() time: number = Date.now();

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
    var d = document.createElement('textarea');
    //d.type ="text"
    d.value=originalElement.innerHTML
    var ctx = this;
    d.onblur = function() {
      ctx.sendUpdate(d.value)
      originalElement.innerHTML= d.value
      parentElement.replaceChild(originalElement, d);
    }
    d.focus();
    parentElement.replaceChild(d, originalElement);
  }

  sendUpdate(text) {
    var backendurl = 'http://localhost:6204/api/websites/'+this.userid+'/' + btoa(this.path) + '/' + this.snippetname ;
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
      body: '{"content": "'+text+'"}'
  })
  .then(response => response.json()); 

  }

  componentWillLoad() {
    console.log ("loc", window.location)
    console.log ("search", window.location.search)
    this.path = window.location.pathname;
    
    var backendurl = 'http://localhost:6204/api/websites/'+this.userid+'/' + btoa(this.path) + '/' + this.snippetname + window.location.search;
    console.log("backendurl", backendurl);
    return fetch(backendurl)
      .then(response => response.json())
      .then(data => {
        this.content = data;
        console.log("data", data);
        if (this.content.token != null && this.content.token != "") {
          console.log ("content set to read/write, token was", this.content.token)
          this.readonly = false;
        }
      });
  }

  render() { 
    if (this.readonly) {
      return <h2 class={this.class} innerHTML={this.content.block}></h2>;
    } else {
      return <h2 class={this.class}  innerHTML={this.content.block} 
        onClick={(me) => this.edit(me)}>
        </h2>;
    }
  }
}
