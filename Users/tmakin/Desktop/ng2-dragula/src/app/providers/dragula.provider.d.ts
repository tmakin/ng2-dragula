import { EventEmitter } from '@angular/core';
export declare class DragulaService {
    cancel: EventEmitter<any>;
    cloned: EventEmitter<any>;
    drag: EventEmitter<any>;
    dragend: EventEmitter<any>;
    drop: EventEmitter<any>;
    out: EventEmitter<any>;
    over: EventEmitter<any>;
    remove: EventEmitter<any>;
    shadow: EventEmitter<any>;
    dropModel: EventEmitter<any>;
    removeModel: EventEmitter<any>;
    private events;
    private bags;
    private modelTransformMap;
    add(name: string, drake: any): any;
    find(name: string): any;
    destroy(name: string): void;
    setOptions(name: string, options: any): void;
    registerModelTransform(model: any, modelTransform: DragulaTransformFunc): void;
    transformModel(sourceModel: any[], index: number, targetModel: any[], copy: boolean): any;
    private handleModels(name, drake);
    private setupEvents(bag);
    private domIndexOf(child, parent);
}
export declare type DragulaTransformFunc = (source: any) => any;
