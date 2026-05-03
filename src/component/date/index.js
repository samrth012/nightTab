import { state } from '../state';

import { node } from '../../utility/node';
import { ordinalWord } from '../../utility/ordinalWord';
import { ordinalNumber } from '../../utility/ordinalNumber';
import { wordNumber } from '../../utility/wordNumber';
import { trimString } from '../../utility/trimString';
import { isValidString } from '../../utility/isValidString';
import { complexNode } from '../../utility/complexNode';
import { clearChildNode } from '../../utility/clearChildNode';
import { ticker } from '../../utility/ticker';

import './index.css';

export const Date = function () {

  this.now;

  // Cached Intl.DateTimeFormat instances — created once, reused per tick.
  // Locale: undefined => runtime default (matches moment's default behaviour
  // which used English; users can change OS locale to localise weekdays/months).
  this.fmt = {
    weekdayLong: new Intl.DateTimeFormat(undefined, { weekday: 'long' }),
    monthLong: new Intl.DateTimeFormat(undefined, { month: 'long' })
  };

  // Cached signature of the visible date-config slice. Set by update();
  // assemble() only runs when this changes.
  this.lastConfigKey = null;

  this.bind = {};

  this.bind.tick = () => {

    // Shared ticker — see src/utility/ticker.js. One timer for clock + date,
    // aligned to wall-clock seconds, paused while the tab is hidden.
    ticker.subscribe(() => this.update());

  };

  this.element = {
    date: node('div|class:date'),
    day: node('span|class:date-item date-day'),
    dateOfMonth: node('span|class:date-item date-date'),
    month: node('span|class:date-item date-month'),
    year: node('span|class:date-item date-year')
  };

  this.string = {};

  this.string.day = () => {

    let value;

    switch (state.get.current().header.date.day.display) {

      case 'word':

        value = this.fmt.weekdayLong.format(this.now);

        if (state.get.current().header.date.day.length == 'short') {
          value = value.substring(0, 3);
        }

        break;

      case 'number':

        value = this.now.getDay();

        if (state.get.current().header.date.day.weekStart == 'monday') {
          if (value == 0) {
            value = 7;
          }
        } else if (state.get.current().header.date.day.weekStart == 'sunday') {
          value = value + 1;
        }

        break;

    }

    return value;

  };

  this.string.dateOfMonth = () => {

    let value;

    switch (state.get.current().header.date.date.display) {

      case 'word':

        if (state.get.current().header.date.date.ordinal) {
          value = ordinalWord(wordNumber(this.now.getDate()));
        } else {
          value = wordNumber(this.now.getDate());
        }

        break;

      case 'number':

        if (state.get.current().header.date.date.ordinal) {
          value = ordinalNumber(this.now.getDate());
        } else {
          value = String(this.now.getDate());
        }

        break;

    }

    return value;

  };

  this.string.month = () => {

    let value;

    switch (state.get.current().header.date.month.display) {

      case 'word':

        value = this.fmt.monthLong.format(this.now);
        if (state.get.current().header.date.month.length == 'short') {
          value = value.substring(0, 3);
        }

        break;

      case 'number':

        if (state.get.current().header.date.month.ordinal) {
          value = ordinalNumber(this.now.getMonth() + 1);
        } else {
          value = String(this.now.getMonth() + 1);
        }

        break;

    }

    return value;

  };

  this.string.year = () => {

    let value;

    switch (state.get.current().header.date.year.display) {

      case 'word':

        value = wordNumber(this.now.getFullYear());

        break;

      case 'number':

        value = String(this.now.getFullYear());

        break;

    }

    return value;

  };

  this.assemble = () => {

    clearChildNode(this.element.date);

    if (state.get.current().header.date.day.show) {
      this.element.date.appendChild(this.element.day);
    }

    if (state.get.current().header.date.date.show && state.get.current().header.date.month.show) {

      switch (state.get.current().header.date.format) {

        case 'date-month':

          if (state.get.current().header.date.date.show) {
            this.element.date.appendChild(this.element.dateOfMonth);
          }

          if (state.get.current().header.date.month.show) {
            this.element.date.appendChild(this.element.month);
          }

          break;

        case 'month-date':

          if (state.get.current().header.date.month.show) {
            this.element.date.appendChild(this.element.month);
          }

          if (state.get.current().header.date.date.show) {
            this.element.date.appendChild(this.element.dateOfMonth);
          }

          break;

      }

    } else {

      if (state.get.current().header.date.date.show) {
        this.element.date.appendChild(this.element.dateOfMonth);
      }

      if (state.get.current().header.date.month.show) {
        this.element.date.appendChild(this.element.month);
      }

    }

    if (state.get.current().header.date.year.show) {
      this.element.date.appendChild(this.element.year);
    }

    if (state.get.current().header.date.separator.show) {

      let separatorCharacter;

      if (isValidString(state.get.current().header.date.separator.text)) {
        separatorCharacter = trimString(state.get.current().header.date.separator.text);
      } else {
        separatorCharacter = '/';
      }

      let parts = this.element.date.querySelectorAll('span');

      if (parts.length > 1) {

        parts.forEach((item, i) => {
          if (i > 0) {

            let separator = complexNode({
              tag: 'span',
              text: separatorCharacter,
              attr: [{
                key: 'class',
                value: 'date-item date-separator'
              }]
            });

            this.element.date.insertBefore(separator, item);

          }
        });

      }

    }

  };

  this.update = () => {

    this.now = new globalThis.Date();

    // Only re-assemble when the visible date-config slice changes.
    // On a normal tick the key matches and the DOM teardown is skipped.
    const d = state.get.current().header.date;
    const configKey = d.day.show + '|' + d.date.show + '|' + d.month.show + '|' + d.year.show + '|'
      + d.format + '|' + d.separator.show + '|' + d.separator.text;

    if (configKey !== this.lastConfigKey) {
      this.assemble();
      this.lastConfigKey = configKey;
    }

    if (d.day.show) {
      this.element.day.innerHTML = this.string.day();
    }

    if (d.date.show) {
      this.element.dateOfMonth.innerHTML = this.string.dateOfMonth();
    }

    if (d.month.show) {
      this.element.month.innerHTML = this.string.month();
    }

    if (d.year.show) {
      this.element.year.innerHTML = this.string.year();
    }

  };

  this.update();

  this.bind.tick();

  this.date = () => {
    return this.element.date;
  };

};
