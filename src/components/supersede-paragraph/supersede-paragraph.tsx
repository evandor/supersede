import { Component, Prop, h, State } from '@stencil/core';
//import { format } from '../../utils/utils';

@Component({
  tag: 'supersede-paragraph',
  styleUrl: 'supersede-paragraph.css',
  shadow: false
})
export class SupersedeParagraph {
  @Prop() userid: string = "1";
  @Prop() snippetname: string = "headline";
  @Prop() path: string;

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

  /*private getText(): string {
    return format(this.userid, this.textblock, this.last);
  }*/

  componentWillLoad() {
    //return fetch('https://jsonplaceholder.typicode.com/todos/' + this.userid)
    this.path = window.location.pathname;
    
    var backendurl = 'http://localhost:6204/api/websites/'+this.userid+'/' + btoa(this.path) + '/' + this.snippetname + window.location.search;
    return fetch(backendurl)
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
      return <div innerHTML={this.content.block}></div>;
    } else {
      //var code = "<a href='http://localhost:4200/websites/"+this.userid+"/"+ btoa(this.path) + "/" +this.content.id+"?name="+this.content.name+"'>"+this.content.block+"</a>"
      //return <input type="text" class='editable' value={this.content.block}></input>;
      return <div innerHTML={this.content.block}></div>;
    }
  }
}
