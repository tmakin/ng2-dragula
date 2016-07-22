import {Component, ViewEncapsulation} from '@angular/core';
import {SnippetExample} from './snippets';

@Component({
  selector: 'example-app',
  template: require('./example-app.html'),
  encapsulation: ViewEncapsulation.None,
  directives: [SnippetExample]
})
export class ExampleApp {}
