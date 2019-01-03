class History {
  constructor() {
    this.subscriptions = [];
    window.addEventListener('popstate', e => this.publish(e));
  }

  publish(e) {
    this.subscriptions.map(callback => callback(e));
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
    return () => (this.subscriptions = this.subscriptions.filter(fn => fn !== callback));
  }

  pushState(state, url) {
    window.history.pushState(state, null, url);
  }
}

export default History;
