// Shared 1-second ticker. Replaces multiple independent setInterval(1000)
// timers in components that update once per second (clock, date).
//
// - One timer for all subscribers, aligned to the wall-clock second so
//   visible "seconds" updates land on the right tick.
// - Pauses while the document is hidden and resumes on visibilitychange,
//   so a backgrounded new tab doesn't keep firing.
//
// Usage:
//   import { ticker } from '../../utility/ticker';
//   const unsubscribe = ticker.subscribe(() => { ... });

const subscribers = new Set();
let timer = null;
let alignTimeout = null;

const fire = () => {
  // Snapshot to a copy so a subscriber unsubscribing during iteration
  // doesn't skip subsequent ones.
  Array.from(subscribers).forEach((fn) => {
    try { fn(); } catch (_e) { /* never let one bad sub kill the loop */ }
  });
};

const start = () => {
  if (timer || alignTimeout) return;
  if (subscribers.size === 0) return;
  // Align to the next whole second.
  const ms = 1000 - (Date.now() % 1000);
  alignTimeout = setTimeout(() => {
    alignTimeout = null;
    fire();
    timer = setInterval(fire, 1000);
  }, ms);
};

const stop = () => {
  if (alignTimeout) { clearTimeout(alignTimeout); alignTimeout = null; }
  if (timer) { clearInterval(timer); timer = null; }
};

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      // Wake-up tick so the visible time isn't stale.
      fire();
      start();
    }
  });
}

export const ticker = {
  subscribe(fn) {
    subscribers.add(fn);
    start();
    return () => {
      subscribers.delete(fn);
      if (subscribers.size === 0) stop();
    };
  }
};
