function Stopwatch() {
    let startTime, stopTime,  duration = 0, running = false;

    this.start = function () {
        if (running)
            throw new Error('Stopwatch is already started');

        startTime = new Date();
        running = true;
    };

    this.stop = function () {
        if (!running)
            throw new Error('Stopwatch has NOT yet been started');

        stopTime = new Date();
        duration += (stopTime - startTime) / 1000;
        running = false;
    };

    this.reset = function () {
        duration = 0;
    };

    Object.defineProperty(this, 'duration', {
        get: function() { return duration }
    })
}

const sw = new Stopwatch();




