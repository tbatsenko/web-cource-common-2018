class PubSub {
  publish(value, publishType) {
    this.subsribtions
      .filter(({ type }) => type === publishType)
      .map(({ callback }) => callback(value))
  }

  subscribe(callback, type) {
    this.subsribtions.push({ type, callback })

    return () =>
      (this.subsribtions = this.subsribtions.filter(
        ({ callback: fn }) => fn !== callback
      ))
  }

  constructor() {
    this.subsribtions = []
  }
}

export default PubSub
