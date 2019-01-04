class HistoryPubSub {
  constructor() {
    this.subscriptions = [];
    window.addEventListener("popstate", event => {
      this.publish(event);
    });
  }

  publish(event) {
    this.subscriptions.map(callback => callback(event));
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
    return () => this.subscriptions = this.subscriptions.filter(
      (fn) => fn !== callback,
    );
  }

  pushState(state, stateUrl) {
    const index = this.subscriptions.length + 1;
    window.history.pushState(state, "history" + index.toString(), stateUrl);
  }
}

export default HistoryPubSub;