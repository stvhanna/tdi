// Type definitions for pg
// Project: https://github.com/brianc/node-postgres
// Definitions by: Phips Peter <http://pspeter3.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />


import events = require("events");
import stream = require("stream");

export declare function connect(connection: string, callback: (err: Error, client: Client, done: (err?: any) => void) => void): void;
export declare function connect(config: ClientConfig, callback: (err: Error, client: Client, done: (err?: any) => void) => void): void;
export declare function end(): void;

export interface ConnectionConfig {
    user?: string;
    database?: string;
    password?: string;
    port?: number;
    host?: string;
}

export interface Defaults extends ConnectionConfig {
    poolSize?: number;
    poolIdleTimeout?: number;
    reapIntervalMillis?: number;
    binary?: boolean;
    parseInt8?: boolean;
}

export interface ClientConfig extends ConnectionConfig {
    ssl?: boolean;
}

export interface QueryConfig {
    name?: string;
    text: string;
    values?: any[];
}

export interface QueryResult {
        command: string;
        rowCount: number;
        oid: number;
    rows: any[];
}

export interface ResultBuilder extends QueryResult {
    addRow(row: any): void;
}

export declare class Client extends events.EventEmitter {
    constructor(connection: string);
    constructor(config: ClientConfig);

    connect(callback?: (err: Error) => void): void;
    end(): void;

    query(queryText: string, callback?: (err: Error, result: QueryResult) => void): Query;
    query(config: QueryConfig, callback?: (err: Error, result: QueryResult) => void): Query;
    query(queryText: string, values: any[], callback?: (err: Error, result: QueryResult) => void): Query;

    copyFrom(queryText: string): stream.Writable;
    copyTo(queryText: string): stream.Readable;

    pauseDrain(): void;
    resumeDrain(): void;

    public on(event: "drain", listener: () => void): this;
    public on(event: "error", listener: (err: Error) => void): this;
    public on(event: "notification", listener: (message: any) => void): this;
    public on(event: "notice", listener: (message: any) => void): this;
    public on(event: string, listener: Function): this;
}

export declare class Query extends events.EventEmitter {
    public on(event: "row", listener: (row: any, result?: ResultBuilder) => void): this;
    public on(event: "error", listener: (err: Error) => void): this;
    public on(event: "end", listener: (result: ResultBuilder) => void): this;
    public on(event: string, listener: Function): this;
}

export declare class Events extends events.EventEmitter {
    public on(event: "error", listener: (err: Error, client: Client) => void): this;
    public on(event: string, listener: Function): this;
}

declare namespace types {
    function setTypeParser<T>(typeId: number, parser: (value: string) => T): void;
}
