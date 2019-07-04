import { Component, Prop, h, State } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'supersede-paragraph',
  styleUrl: 'supersede-paragraph.css',
  shadow: true
})
export class SupersedeParagraph {
  @Prop() userid: string = "1";
  @Prop() textblock: string = "headline";
  @Prop() last: string;

  content: any;

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

  private getText(): string {
    return format(this.userid, this.textblock, this.last);
  }

  componentWillLoad() {
    console.log ("hier2", this.userid)
    //return fetch('https://jsonplaceholder.typicode.com/todos/' + this.userid)
    return fetch('http://localhost:6204/api/websites/'+this.userid+'/' + this.textblock)
      .then(response => response.json())
      .then(data => {
        this.content = data;
        console.log("data", data);
      });
  }

  render() { 
    const time = new Date(this.time).toLocaleTimeString();

    return <div>Hello, World! I'm {this.getText()} - { time } - { this.content.block }</div>;
  }
}
