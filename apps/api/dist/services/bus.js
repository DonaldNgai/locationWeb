import { EventEmitter } from "node:events";
class LocationBus extends EventEmitter {
    publishLocation(groupId, payload) {
        const enriched = {
            type: "location",
            data: { ...payload, groupId },
        };
        this.emit(groupId, enriched);
    }
    subscribe(groupId, listener) {
        this.on(groupId, listener);
        return () => this.off(groupId, listener);
    }
}
export const locationBus = new LocationBus();
