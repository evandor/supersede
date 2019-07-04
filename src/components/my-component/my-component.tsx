import { Component, Prop, h, State } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop() userid: string = "1";
  @Prop() middle: string;
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
    return format(this.userid, this.middle, this.last);
  }

  componentWillLoad() {
    console.log ("hier2", this.userid)
    return fetch('https://jsonplaceholder.typicode.com/todos/' + this.userid)
      .then(response => response.json())
      .then(data => {
        this.content = data;
      });
  }

  render() { 
    const time = new Date(this.time).toLocaleTimeString();

    return <div>Hello, World! I'm {this.getText()} - { time } - { this.content.title }</div>;
  }
}
