class MyPromise {
  constructor(cb) {
    this.value = null;
    this.state = "PENDING";
    this.onfulfilledList = [];
    this.onrejectedList = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    try {
      cb(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
  resolve(value) {
    if (this.state !== "PENDING") return;
    this.value = value;
    this.state = "RESOLVED";
    setTimeout(() => {
      this.onfulfilledList.forEach((cb) => {
        cb();
        this.onfulfilledList.shift();
      });
    }, 0);
  }
  reject(reason) {
    if (this.state !== "PENDING") return;
    this.value = reason;
    this.state = "REJECTED";
    setTimeout(() => {
      this.onrejectedList.forEach((cb) => {
        cb();
        this.onrejectedList.shift();
      });
    }, 0);
  }
  then(onfulfilled, onrejected) {
    return new MyPromise((resolve, reject) => {
      this.onfulfilledList.push(() => {
        const resolvedValue = onfulfilled?onfulfilled(this.value):null;
        if (resolvedValue instanceof MyPromise) {
          resolvedValue.then(resolve, reject);
        } else {
          resolve(resolvedValue);
        }
      });

      this.onrejectedList.push(() => {
        const rejectedValue = onrejected?onrejected(this.value):null;
        if (rejectedValue instanceof MyPromise) {
          rejectedValue.then(resolve, reject);
        } else {
          reject(rejectedValue);
        }
      });
    });
  }
}
