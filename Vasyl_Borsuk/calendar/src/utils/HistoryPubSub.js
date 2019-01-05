class HistoryPubSub {
    constructor() {
        this.subsribtions = []
        window.addEventListener("popstate", event => this.publish(event))
    }

    publish(event) {
        this.subsribtions.map(callback => callback(event))
    }

    subscribe(callback) {
        this.subsribtions.push(callback)
        return () => this.subsribtions = this.subsribtions.filter(
            (fn) => fn !== callback
        )
    }

    pushState(state, stateUrl) {
        window.history.pushState(state, "history", stateUrl)
    }
}

export default HistoryPubSub