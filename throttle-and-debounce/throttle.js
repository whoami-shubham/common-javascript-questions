function throttle(fn, time) {
  let busy = false;
  return () => {
    if (!busy) {
      busy = true;
      fn();
      setTimeout(() => {
        busy = false;
      }, time);
    }
  };
}
