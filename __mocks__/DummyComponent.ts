import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-dummy-test',
  template: `<div>Hello World!</div>`,
})
export class DummyTestComponent {
  constructor(public injector: Injector) {}
}
