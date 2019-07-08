import {  Prop, h, State, Component } from '@stencil/core';
import Backend from '../../services/backend';
import Replace from "../../services/replace";
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
  @Prop() cls: string;

  content: any;

  readonly = true;

  timer: number;

  @State() time: number = Date.now();

  public backendService: Backend = new Backend();
  public replaceService: Replace = new Replace();

  clsPlusEditable() {
    return this.cls + " editable";
  }

  componentDidLoad() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidUnload() {
    window.clearInterval(this.timer);
  }

  edit(mouseEvent, cls) {
    this.replaceService.handle(this, 'textarea', mouseEvent, cls);
  }

  sendUpdate(text) {
    var backendurl = 'http://localhost:6204/api/websites/'+this.userid+'/' + btoa(this.path) + '/' + this.snippetname ;
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
    if (this.readonly) {
      return <h2 class={this.cls} innerHTML={this.content.block}></h2>;
    } else {
      return <h2 class={this.clsPlusEditable()} innerHTML={this.content.block}
        onClick={(me) => this.edit(me, this.cls)}>
        </h2>;
    }
  }
}
