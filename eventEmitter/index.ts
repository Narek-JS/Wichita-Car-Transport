interface IEventEmitter {
    events: Record<string, Array<(data: any) => void>>;
    subscribe: (eventName: string, callback: (data: any) => void) => void;
    publish: (eventName: string, data?: any) => void;
};

export const eventEmitter: IEventEmitter = {
    events: {},
    subscribe(event: string, callback: (data: any) => void) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },

    publish(event: string, data: any) {
        const eventCallbacks: Array<(data: any) => void> = this.events[event];
        if (eventCallbacks) {
            eventCallbacks.forEach((callback) => {
                callback(data);
            });
        }
    },
};