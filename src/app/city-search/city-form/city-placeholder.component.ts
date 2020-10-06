import { Component } from '@angular/core';

@Component({
  selector: 'app-city-placeholder',
  template: `
    <div class="wrapper">
      <div class="wrapper__checkbox-hint"></div>
      <div class="wrapper__text-hint"></div>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: grid;
        grid-template-columns: 1fr 6fr;
        grid-template-rows: 17px;
        gap: 0 5px;
        margin-top: 3px;
      }

      .wrapper div {
        background-color: #3f51b512;
        border-radius: 2px;
      }

      .wrapper__text-hint {
        margin: 1px 0;
      }
    `,
  ],
})
export class CityPlaceholderComponent {}
