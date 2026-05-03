import { state } from '../state';

import { node } from '../../utility/node';
import { wordNumber } from '../../utility/wordNumber';
import { trimString } from '../../utility/trimString';
import { isValidString } from '../../utility/isValidString';
import { complexNode } from '../../utility/complexNode';
import { clearChildNode } from '../../utility/clearChildNode';
import { ticker } from '../../utility/ticker';

import './index.css';

export const Clock = function () {

  this.now;

  // Cached signature of the visible clock-config slice. Set by update();
  // assemble() only runs when this changes. Skips full DOM teardown on
  // every 1s tick when the user hasn't changed any setting.
  this.lastConfigKey = null;

  this.bind = {};

  this.bind.tick = () => {

    // Subscribe to the shared visibility-aware ticker rather than running
    // our own setInterval; one timer is shared with the date component.
    ticker.subscribe(() => this.update());

  };

  this.element = {
    clock: node('div|class:clock'),
    hour: node('span|class:clock-item clock-hour'),
    minute: node('span|class:clock-item clock-minute'),
    second: node('span|class:clock-item clock-second'),
    meridiem: node('span|class:clock-item clock-meridiem')
  };

  this.string = {};

  this.string.hour = () => {

    let value;

    switch (state.get.current().header.clock.hour.display) {

      case 'word':

        value = this.now.getHours();

        if (!state.get.current().header.clock.hour24.show && this.now.getHours() > 12) {
          value = value - 12;
        }

        if (!state.get.current().header.clock.hour24.show && this.now.getHours() == 0) {
          value = 12;
        }

        value = wordNumber(value);

        if (state.get.current().header.clock.hour24.show && this.now.getHours() > 0 && this.now.getHours() < 10) {
          value = 'Zero ' + value;
        }

        break;

      case 'number':

        value = this.now.getHours();

        if (!state.get.current().header.clock.hour24.show && this.now.getHours() > 12) {
          value = value - 12;
        }

        if (!state.get.current().header.clock.hour24.show && this.now.getHours() == 0) {
          value = 12;
        }

        if (state.get.current().header.clock.hour24.show && this.now.getHours() < 10) {
          value = '0' + value;
        }

        break;

    }

    return value;

  };

  this.string.minute = () => {

    let value;

    switch (state.get.current().header.clock.minute.display) {

      case 'word':

        value = wordNumber(this.now.getMinutes());

        if (this.now.getMinutes() > 0 && this.now.getMinutes() < 10) {
          value = 'Zero ' + value;
        }

        break;

      case 'number':

        value = this.now.getMinutes();

        if (this.now.getMinutes() < 10) {
          value = '0' + value;
        }

        break;

    }

    return value;

  };

  this.string.second = () => {

    let value;

    switch (state.get.current().header.clock.second.display) {

      case 'word':

        value = wordNumber(this.now.getSeconds());

        if (this.now.getSeconds() > 0 && this.now.getSeconds() < 10) {
          value = 'Zero ' + value;
        }

        break;

      case 'number':

        value = this.now.getSeconds();

        if (this.now.getSeconds() < 10) {
          value = '0' + value;
        }

        break;

    }

    return value;

  };

  this.string.meridiem = () => {

    return this.now.getHours() < 12 ? 'AM' : 'PM';

  };

  this.assemble = () => {

    clearChildNode(this.element.clock);

    if (state.get.current().header.clock.hour.show) {
      this.element.clock.appendChild(this.element.hour);
    }

    if (state.get.current().header.clock.minute.show) {
      this.element.clock.appendChild(this.element.minute);
    }

    if (state.get.current().header.clock.second.show) {
      this.element.clock.appendChild(this.element.second);
    }

    if (!state.get.current().header.clock.hour24.show && state.get.current().header.clock.meridiem.show) {
      this.element.clock.appendChild(this.element.meridiem);
    }

    if (state.get.current().header.clock.separator.show) {

      let separatorCharacter;

      if (isValidString(state.get.current().header.clock.separator.text)) {
        separatorCharacter = trimString(state.get.current().header.clock.separator.text);
      } else {
        separatorCharacter = ':';
      }

      let parts = this.element.clock.querySelectorAll('span');

      if (parts.length > 1) {

        parts.forEach((item, i) => {

          if (i > 0 && item != this.element.meridiem) {

            let separator = complexNode({
              tag: 'span',
              text: separatorCharacter,
              attr: [{
                key: 'class',
                value: 'clock-item clock-separator'
              }]
            });

            this.element.clock.insertBefore(separator, item);

          }
        });

      }

    }

  };

  this.update = () => {

    this.now = new Date();

    // Only re-assemble the DOM when the visible clock-config slice changes.
    // On a normal 1s tick, the key matches and we skip clearChildNode + the
    // querySelectorAll/insertBefore separator loop entirely.
    const c = state.get.current().header.clock;
    const configKey = c.hour.show + '|' + c.minute.show + '|' + c.second.show + '|'
      + c.hour24.show + '|' + c.meridiem.show + '|'
      + c.separator.show + '|' + c.separator.text;

    if (configKey !== this.lastConfigKey) {
      this.assemble();
      this.lastConfigKey = configKey;
    }

    if (c.hour.show) {
      this.element.hour.innerHTML = this.string.hour();
    }

    if (c.minute.show) {
      this.element.minute.innerHTML = this.string.minute();
    }

    if (c.second.show) {
      this.element.second.innerHTML = this.string.second();
    }

    if (!c.hour24.show && c.meridiem.show) {
      this.element.meridiem.innerHTML = this.string.meridiem();
    }

  };

  this.update();

  this.bind.tick();

  this.clock = () => {
    return this.element.clock;
  };

};
