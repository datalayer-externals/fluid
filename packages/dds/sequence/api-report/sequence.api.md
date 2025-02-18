## API Report File for "@fluidframework/sequence"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { BaseSegment } from '@fluidframework/merge-tree';
import { Client } from '@fluidframework/merge-tree';
import { Deferred } from '@fluidframework/core-utils';
import { IChannelAttributes } from '@fluidframework/datastore-definitions';
import { IChannelFactory } from '@fluidframework/datastore-definitions';
import { IChannelServices } from '@fluidframework/datastore-definitions';
import { IChannelStorageService } from '@fluidframework/datastore-definitions';
import { ICombiningOp } from '@fluidframework/merge-tree';
import { IEvent } from '@fluidframework/core-interfaces';
import { IEventThisPlaceHolder } from '@fluidframework/core-interfaces';
import { IFluidDataStoreRuntime } from '@fluidframework/datastore-definitions';
import { IFluidSerializer } from '@fluidframework/shared-object-base';
import { IJSONSegment } from '@fluidframework/merge-tree';
import { IMergeTreeDeltaCallbackArgs } from '@fluidframework/merge-tree';
import { IMergeTreeDeltaOpArgs } from '@fluidframework/merge-tree';
import { IMergeTreeGroupMsg } from '@fluidframework/merge-tree';
import { IMergeTreeInsertMsg } from '@fluidframework/merge-tree';
import { IMergeTreeMaintenanceCallbackArgs } from '@fluidframework/merge-tree';
import { IMergeTreeOp } from '@fluidframework/merge-tree';
import { IMergeTreeRemoveMsg } from '@fluidframework/merge-tree';
import { IRelativePosition } from '@fluidframework/merge-tree';
import { ISegment } from '@fluidframework/merge-tree';
import { ISegmentAction } from '@fluidframework/merge-tree';
import { ISequencedDocumentMessage } from '@fluidframework/protocol-definitions';
import { ISharedObjectEvents } from '@fluidframework/shared-object-base';
import { ISummaryTreeWithStats } from '@fluidframework/runtime-definitions';
import { ITelemetryContext } from '@fluidframework/runtime-definitions';
import { LocalReferencePosition } from '@fluidframework/merge-tree';
import { Marker } from '@fluidframework/merge-tree';
import { MergeTreeDeltaOperationType } from '@fluidframework/merge-tree';
import { MergeTreeDeltaOperationTypes } from '@fluidframework/merge-tree';
import { MergeTreeDeltaRevertible } from '@fluidframework/merge-tree';
import { MergeTreeMaintenanceType } from '@fluidframework/merge-tree';
import { MergeTreeRevertibleDriver } from '@fluidframework/merge-tree';
import { PropertiesManager } from '@fluidframework/merge-tree';
import { PropertySet } from '@fluidframework/merge-tree';
import { RangeStackMap } from '@fluidframework/merge-tree';
import { ReferencePosition } from '@fluidframework/merge-tree';
import { ReferenceType } from '@fluidframework/merge-tree';
import { Serializable } from '@fluidframework/datastore-definitions';
import { SharedObject } from '@fluidframework/shared-object-base';
import { SlidingPreference } from '@fluidframework/merge-tree';
import { SummarySerializer } from '@fluidframework/shared-object-base';
import { TextSegment } from '@fluidframework/merge-tree';
import { TypedEventEmitter } from '@fluid-internal/client-utils';

// @alpha
export function appendAddIntervalToRevertibles(interval: SequenceInterval, revertibles: SharedStringRevertible[]): SharedStringRevertible[];

// @alpha
export function appendChangeIntervalToRevertibles(string: SharedString, newInterval: SequenceInterval, previousInterval: SequenceInterval, revertibles: SharedStringRevertible[]): SharedStringRevertible[];

// @alpha
export function appendDeleteIntervalToRevertibles(string: SharedString, interval: SequenceInterval, revertibles: SharedStringRevertible[]): SharedStringRevertible[];

// @alpha
export function appendIntervalPropertyChangedToRevertibles(interval: SequenceInterval, deltas: PropertySet, revertibles: SharedStringRevertible[]): SharedStringRevertible[];

// @alpha
export function appendSharedStringDeltaToRevertibles(string: SharedString, delta: SequenceDeltaEvent, revertibles: SharedStringRevertible[]): void;

// @public (undocumented)
export function createEndpointIndex(sharedString: SharedString): IEndpointIndex<SequenceInterval>;

// @public (undocumented)
export function createEndpointInRangeIndex(sharedString: SharedString): IEndpointInRangeIndex<SequenceInterval>;

// @public (undocumented)
export function createIdIntervalIndex<TInterval extends ISerializableInterval>(): IIdIntervalIndex<TInterval>;

// @public (undocumented)
export function createOverlappingIntervalsIndex(sharedString: SharedString): IOverlappingIntervalsIndex<SequenceInterval>;

// @public (undocumented)
export function createOverlappingSequenceIntervalsIndex(sharedString: SharedString): SequenceIntervalIndexes.Overlapping;

// @public (undocumented)
export function createStartpointInRangeIndex(sharedString: SharedString): IStartpointInRangeIndex<SequenceInterval>;

// @public (undocumented)
export type DeserializeCallback = (properties: PropertySet) => void;

// @alpha
export function discardSharedStringRevertibles(sharedString: SharedString, revertibles: SharedStringRevertible[]): void;

// @public
export function getTextAndMarkers(sharedString: SharedString, label: string, start?: number, end?: number): {
    parallelText: string[];
    parallelMarkers: Marker[];
};

// @public (undocumented)
export interface IEndpointIndex<TInterval extends ISerializableInterval> extends IntervalIndex<TInterval> {
    // (undocumented)
    nextInterval(pos: number): TInterval | undefined;
    // (undocumented)
    previousInterval(pos: number): TInterval | undefined;
}

// @public
export interface IEndpointInRangeIndex<TInterval extends ISerializableInterval> extends IntervalIndex<TInterval> {
    // (undocumented)
    findIntervalsWithEndpointInRange(start: number, end: number): TInterval[];
}

// @public (undocumented)
export interface IIdIntervalIndex<TInterval extends ISerializableInterval> extends IntervalIndex<TInterval>, Iterable<TInterval> {
    // (undocumented)
    [Symbol.iterator](): Iterator<TInterval>;
    // (undocumented)
    getIntervalById(id: string): TInterval | undefined;
}

// @public
export interface IInterval {
    // (undocumented)
    clone(): IInterval;
    compare(b: IInterval): number;
    compareEnd(b: IInterval): number;
    compareStart(b: IInterval): number;
    // @internal
    modify(label: string, start: SequencePlace | undefined, end: SequencePlace | undefined, op?: ISequencedDocumentMessage, localSeq?: number, useNewSlidingBehavior?: boolean): IInterval | undefined;
    // (undocumented)
    overlaps(b: IInterval): boolean;
    // @internal
    union(b: IInterval): IInterval;
}

// @public
export interface IIntervalCollection<TInterval extends ISerializableInterval> extends TypedEventEmitter<IIntervalCollectionEvent<TInterval>> {
    // (undocumented)
    [Symbol.iterator](): Iterator<TInterval>;
    // @deprecated
    add(start: SequencePlace, end: SequencePlace, intervalType: IntervalType, props?: PropertySet): TInterval;
    add({ start, end, props, }: {
        start: SequencePlace;
        end: SequencePlace;
        props?: PropertySet;
    }): TInterval;
    // (undocumented)
    attachDeserializer(onDeserialize: DeserializeCallback): void;
    // (undocumented)
    readonly attached: boolean;
    attachIndex(index: IntervalIndex<TInterval>): void;
    change(id: string, start: SequencePlace, end: SequencePlace): TInterval | undefined;
    changeProperties(id: string, props: PropertySet): any;
    // (undocumented)
    CreateBackwardIteratorWithEndPosition(endPosition: number): Iterator<TInterval>;
    // (undocumented)
    CreateBackwardIteratorWithStartPosition(startPosition: number): Iterator<TInterval>;
    // (undocumented)
    CreateForwardIteratorWithEndPosition(endPosition: number): Iterator<TInterval>;
    // (undocumented)
    CreateForwardIteratorWithStartPosition(startPosition: number): Iterator<TInterval>;
    detachIndex(index: IntervalIndex<TInterval>): boolean;
    // (undocumented)
    findOverlappingIntervals(startPosition: number, endPosition: number): TInterval[];
    gatherIterationResults(results: TInterval[], iteratesForward: boolean, start?: number, end?: number): void;
    // (undocumented)
    getIntervalById(id: string): TInterval | undefined;
    map(fn: (interval: TInterval) => void): void;
    // (undocumented)
    nextInterval(pos: number): TInterval | undefined;
    // (undocumented)
    previousInterval(pos: number): TInterval | undefined;
    removeIntervalById(id: string): TInterval | undefined;
}

// @public
export interface IIntervalCollectionEvent<TInterval extends ISerializableInterval> extends IEvent {
    (event: "changeInterval", listener: (interval: TInterval, previousInterval: TInterval, local: boolean, op: ISequencedDocumentMessage | undefined, slide: boolean) => void): any;
    (event: "addInterval" | "deleteInterval", listener: (interval: TInterval, local: boolean, op: ISequencedDocumentMessage | undefined) => void): any;
    (event: "propertyChanged", listener: (interval: TInterval, propertyDeltas: PropertySet, local: boolean, op: ISequencedDocumentMessage | undefined) => void): any;
}

// @public @sealed @deprecated (undocumented)
export interface IIntervalHelpers<TInterval extends ISerializableInterval> {
    // (undocumented)
    create(label: string, start: SequencePlace | undefined, end: SequencePlace | undefined, client: Client | undefined, intervalType: IntervalType, op?: ISequencedDocumentMessage, fromSnapshot?: boolean, useNewSlidingBehavior?: boolean): TInterval;
}

// @public @deprecated (undocumented)
export interface IJSONRunSegment<T> extends IJSONSegment {
    // (undocumented)
    items: Serializable<T>[];
}

// @internal (undocumented)
export interface IMapMessageLocalMetadata {
    // (undocumented)
    localSeq: number;
}

// @public
export interface InteriorSequencePlace {
    // (undocumented)
    pos: number;
    // (undocumented)
    side: Side;
}

// @public
export class Interval implements ISerializableInterval {
    constructor(start: number, end: number, props?: PropertySet);
    // @internal (undocumented)
    addProperties(newProps: PropertySet, collaborating?: boolean, seq?: number, op?: ICombiningOp): PropertySet | undefined;
    addPropertySet(props: PropertySet): void;
    // @internal (undocumented)
    auxProps: PropertySet[] | undefined;
    // (undocumented)
    clone(): Interval;
    compare(b: Interval): number;
    compareEnd(b: Interval): number;
    compareStart(b: Interval): number;
    // (undocumented)
    end: number;
    // (undocumented)
    getAdditionalPropertySets(): PropertySet[];
    getIntervalId(): string;
    // (undocumented)
    getProperties(): PropertySet;
    // @internal
    modify(label: string, start?: SequencePlace, end?: SequencePlace, op?: ISequencedDocumentMessage): Interval | undefined;
    // (undocumented)
    overlaps(b: Interval): boolean;
    properties: PropertySet;
    // @internal (undocumented)
    propertyManager: PropertiesManager;
    // @internal (undocumented)
    serialize(): ISerializedInterval;
    // (undocumented)
    start: number;
    // @internal
    union(b: Interval): Interval;
}

// @public
export interface IntervalIndex<TInterval extends ISerializableInterval> {
    add(interval: TInterval): void;
    remove(interval: TInterval): void;
}

// @public
export interface IntervalLocator {
    interval: SequenceInterval;
    label: string;
}

// @public
export function intervalLocatorFromEndpoint(potentialEndpoint: LocalReferencePosition): IntervalLocator | undefined;

// @alpha
export const IntervalOpType: {
    readonly ADD: "add";
    readonly DELETE: "delete";
    readonly CHANGE: "change";
    readonly PROPERTY_CHANGED: "propertyChanged";
    readonly POSITION_REMOVE: "positionRemove";
};

// @alpha (undocumented)
export type IntervalOpType = (typeof IntervalOpType)[keyof typeof IntervalOpType];

// @alpha
export type IntervalRevertible = {
    event: typeof IntervalOpType.CHANGE;
    interval: SequenceInterval;
    start: LocalReferencePosition;
    end: LocalReferencePosition;
} | {
    event: typeof IntervalOpType.ADD;
    interval: SequenceInterval;
} | {
    event: typeof IntervalOpType.DELETE;
    interval: SequenceInterval;
    start: LocalReferencePosition;
    end: LocalReferencePosition;
} | {
    event: typeof IntervalOpType.PROPERTY_CHANGED;
    interval: SequenceInterval;
    propertyDeltas: PropertySet;
} | {
    event: typeof IntervalOpType.POSITION_REMOVE;
    intervals: {
        intervalId: string;
        label: string;
        startOffset?: number;
        endOffset?: number;
    }[];
    revertibleRefs: {
        revertible: IntervalRevertible;
        offset: number;
        isStart: boolean;
    }[];
    mergeTreeRevertible: MergeTreeDeltaRevertible;
};

// @internal
export const IntervalStickiness: {
    readonly NONE: 0;
    readonly START: 1;
    readonly END: 2;
    readonly FULL: 3;
};

// @internal
export type IntervalStickiness = (typeof IntervalStickiness)[keyof typeof IntervalStickiness];

// @public (undocumented)
export enum IntervalType {
    // @deprecated (undocumented)
    Nest = 1,
    // (undocumented)
    Simple = 0,
    SlideOnRemove = 2,
    // @internal
    Transient = 4
}

// @public (undocumented)
export interface IOverlappingIntervalsIndex<TInterval extends ISerializableInterval> extends IntervalIndex<TInterval> {
    // (undocumented)
    findOverlappingIntervals(start: SequencePlace, end: SequencePlace): TInterval[];
    gatherIterationResults(results: TInterval[], iteratesForward: boolean, start?: SequencePlace, end?: SequencePlace): void;
}

// @public
export interface ISequenceDeltaRange<TOperation extends MergeTreeDeltaOperationTypes = MergeTreeDeltaOperationTypes> {
    operation: TOperation;
    position: number;
    propertyDeltas: PropertySet;
    segment: ISegment;
}

// @public (undocumented)
export interface ISerializableInterval extends IInterval {
    // @internal (undocumented)
    addProperties(props: PropertySet, collaborating?: boolean, seq?: number): PropertySet | undefined;
    getIntervalId(): string | undefined;
    properties: PropertySet;
    // @internal (undocumented)
    propertyManager: PropertiesManager;
    // @internal (undocumented)
    serialize(): ISerializedInterval;
}

// @internal
export interface ISerializedInterval {
    end: number | "start" | "end";
    // (undocumented)
    endSide?: Side;
    intervalType: IntervalType;
    properties?: PropertySet;
    sequenceNumber: number;
    start: number | "start" | "end";
    // (undocumented)
    startSide?: Side;
    stickiness?: IntervalStickiness;
}

// @public (undocumented)
export interface ISharedIntervalCollection<TInterval extends ISerializableInterval> {
    // (undocumented)
    getIntervalCollection(label: string): IIntervalCollection<TInterval>;
}

// @public
export interface ISharedSegmentSequenceEvents extends ISharedObjectEvents {
    // (undocumented)
    (event: "createIntervalCollection", listener: (label: string, local: boolean, target: IEventThisPlaceHolder) => void): any;
    // (undocumented)
    (event: "sequenceDelta", listener: (event: SequenceDeltaEvent, target: IEventThisPlaceHolder) => void): any;
    // (undocumented)
    (event: "maintenance", listener: (event: SequenceMaintenanceEvent, target: IEventThisPlaceHolder) => void): any;
}

// @public
export interface ISharedString extends SharedSegmentSequence<SharedStringSegment> {
    insertMarker(pos: number, refType: ReferenceType, props?: PropertySet): IMergeTreeInsertMsg | undefined;
    insertText(pos: number, text: string, props?: PropertySet): void;
    posFromRelativePos(relativePos: IRelativePosition): number;
}

// @public
export interface IStartpointInRangeIndex<TInterval extends ISerializableInterval> extends IntervalIndex<TInterval> {
    // (undocumented)
    findIntervalsWithStartpointInRange(start: number, end: number): TInterval[];
}

// @internal @deprecated
export interface IValueOpEmitter {
    // @deprecated
    emit(opName: IntervalOpType, previousValue: undefined, params: SerializedIntervalDelta, localOpMetadata: IMapMessageLocalMetadata): void;
}

// @alpha
export function revertSharedStringRevertibles(sharedString: SharedString, revertibles: SharedStringRevertible[]): void;

// @public
export class SequenceDeltaEvent extends SequenceEvent<MergeTreeDeltaOperationType> {
    constructor(opArgs: IMergeTreeDeltaOpArgs, deltaArgs: IMergeTreeDeltaCallbackArgs, mergeTreeClient: Client);
    readonly isLocal: boolean;
    // (undocumented)
    readonly opArgs: IMergeTreeDeltaOpArgs;
}

// @public
export abstract class SequenceEvent<TOperation extends MergeTreeDeltaOperationTypes = MergeTreeDeltaOperationTypes> {
    constructor(deltaArgs: IMergeTreeDeltaCallbackArgs<TOperation>, mergeTreeClient: Client);
    get clientId(): string | undefined;
    // (undocumented)
    readonly deltaArgs: IMergeTreeDeltaCallbackArgs<TOperation>;
    // (undocumented)
    readonly deltaOperation: TOperation;
    get first(): Readonly<ISequenceDeltaRange<TOperation>>;
    get last(): Readonly<ISequenceDeltaRange<TOperation>>;
    get ranges(): readonly Readonly<ISequenceDeltaRange<TOperation>>[];
}

// @public
export class SequenceInterval implements ISerializableInterval {
    constructor(client: Client,
    start: LocalReferencePosition,
    end: LocalReferencePosition, intervalType: IntervalType, props?: PropertySet, startSide?: Side, endSide?: Side);
    // @internal
    addPositionChangeListeners(beforePositionChange: () => void, afterPositionChange: () => void): void;
    // @internal (undocumented)
    addProperties(newProps: PropertySet, collab?: boolean, seq?: number, op?: ICombiningOp): PropertySet | undefined;
    // (undocumented)
    clone(): SequenceInterval;
    compare(b: SequenceInterval): number;
    compareEnd(b: SequenceInterval): number;
    compareStart(b: SequenceInterval): number;
    end: LocalReferencePosition;
    // (undocumented)
    readonly endSide: Side;
    getIntervalId(): string;
    // (undocumented)
    intervalType: IntervalType;
    // @internal
    modify(label: string, start: SequencePlace | undefined, end: SequencePlace | undefined, op?: ISequencedDocumentMessage, localSeq?: number, useNewSlidingBehavior?: boolean): SequenceInterval;
    // (undocumented)
    overlaps(b: SequenceInterval): boolean;
    // (undocumented)
    overlapsPos(bstart: number, bend: number): boolean;
    properties: PropertySet;
    // @internal (undocumented)
    propertyManager: PropertiesManager;
    // @internal
    removePositionChangeListeners(): void;
    // @internal (undocumented)
    serialize(): ISerializedInterval;
    start: LocalReferencePosition;
    // (undocumented)
    readonly startSide: Side;
    // @internal (undocumented)
    get stickiness(): IntervalStickiness;
    // @internal
    union(b: SequenceInterval): SequenceInterval;
}

// @public @deprecated (undocumented)
export const sequenceIntervalHelpers: IIntervalHelpers<SequenceInterval>;

// @public
export namespace SequenceIntervalIndexes {
    export interface Overlapping extends IOverlappingIntervalsIndex<SequenceInterval> {
        findOverlappingIntervalsBySegoff(startSegoff: {
            segment: ISegment | undefined;
            offset: number | undefined;
        }, endSegoff: {
            segment: ISegment | undefined;
            offset: number | undefined;
        }): Iterable<SequenceInterval>;
    }
}

// @public
export class SequenceMaintenanceEvent extends SequenceEvent<MergeTreeMaintenanceType> {
    constructor(opArgs: IMergeTreeDeltaOpArgs | undefined, deltaArgs: IMergeTreeMaintenanceCallbackArgs, mergeTreeClient: Client);
    // (undocumented)
    readonly opArgs: IMergeTreeDeltaOpArgs | undefined;
}

// @public
export interface SequenceOptions {
    // (undocumented)
    [key: string]: boolean;
    intervalStickinessEnabled: boolean;
    mergeTreeReferencesCanSlideToEndpoint: boolean;
}

// @public
export type SequencePlace = number | "start" | "end" | InteriorSequencePlace;

// @internal
export type SerializedIntervalDelta = Omit<ISerializedInterval, "start" | "end" | "properties"> & Partial<Pick<ISerializedInterval, "start" | "end" | "properties">>;

// @public @deprecated (undocumented)
export class SharedIntervalCollection extends SharedObject implements ISharedIntervalCollection<Interval> {
    // (undocumented)
    readonly [Symbol.toStringTag]: string;
    constructor(id: string, runtime: IFluidDataStoreRuntime, attributes: IChannelAttributes);
    // (undocumented)
    protected applyStashedOp(): void;
    static create(runtime: IFluidDataStoreRuntime, id?: string): SharedIntervalCollection;
    static getFactory(): IChannelFactory;
    // (undocumented)
    getIntervalCollection(label: string): IIntervalCollection<Interval>;
    protected getIntervalCollectionPath(label: string): string;
    // (undocumented)
    protected loadCore(storage: IChannelStorageService): Promise<void>;
    // (undocumented)
    protected onDisconnect(): void;
    // (undocumented)
    protected processCore(message: ISequencedDocumentMessage, local: boolean, localOpMetadata: unknown): void;
    // (undocumented)
    protected reSubmitCore(content: any, localOpMetadata: unknown): void;
    // (undocumented)
    protected summarizeCore(serializer: IFluidSerializer): ISummaryTreeWithStats;
}

// @public @deprecated
export class SharedIntervalCollectionFactory implements IChannelFactory {
    // (undocumented)
    static readonly Attributes: IChannelAttributes;
    // (undocumented)
    get attributes(): IChannelAttributes;
    // (undocumented)
    create(runtime: IFluidDataStoreRuntime, id: string): SharedIntervalCollection;
    // (undocumented)
    load(runtime: IFluidDataStoreRuntime, id: string, services: IChannelServices, attributes: IChannelAttributes): Promise<SharedIntervalCollection>;
    // (undocumented)
    static readonly Type = "https://graph.microsoft.com/types/sharedIntervalCollection";
    // (undocumented)
    get type(): string;
}

// @public (undocumented)
export abstract class SharedSegmentSequence<T extends ISegment> extends SharedObject<ISharedSegmentSequenceEvents> implements ISharedIntervalCollection<SequenceInterval>, MergeTreeRevertibleDriver {
    constructor(dataStoreRuntime: IFluidDataStoreRuntime, id: string, attributes: IChannelAttributes, segmentFromSpec: (spec: IJSONSegment) => ISegment);
    annotateRange(start: number, end: number, props: PropertySet, combiningOp?: ICombiningOp): void;
    // (undocumented)
    protected applyStashedOp(content: any): unknown;
    // (undocumented)
    protected client: Client;
    createLocalReferencePosition(segment: T, offset: number, refType: ReferenceType, properties: PropertySet | undefined, slidingPreference?: SlidingPreference, canSlideToEndpoint?: boolean): LocalReferencePosition;
    // (undocumented)
    protected didAttach(): void;
    getContainingSegment(pos: number): {
        segment: T | undefined;
        offset: number | undefined;
    };
    // (undocumented)
    getCurrentSeq(): number;
    getIntervalCollection(label: string): IIntervalCollection<SequenceInterval>;
    // (undocumented)
    getIntervalCollectionLabels(): IterableIterator<string>;
    getLength(): number;
    getPosition(segment: ISegment): number;
    // (undocumented)
    getPropertiesAtPosition(pos: number): PropertySet | undefined;
    // (undocumented)
    getRangeExtentsOfPosition(pos: number): {
        posStart: number | undefined;
        posAfterEnd: number | undefined;
    };
    // @deprecated (undocumented)
    getStackContext(startPos: number, rangeLabels: string[]): RangeStackMap;
    // @deprecated (undocumented)
    groupOperation(groupOp: IMergeTreeGroupMsg): void;
    // @internal
    protected guardReentrancy: <TRet>(callback: () => TRet) => TRet;
    // (undocumented)
    id: string;
    // (undocumented)
    protected initializeLocalCore(): void;
    insertAtReferencePosition(pos: ReferencePosition, segment: T): void;
    insertFromSpec(pos: number, spec: IJSONSegment): void;
    // (undocumented)
    protected loadCore(storage: IChannelStorageService): Promise<void>;
    // (undocumented)
    get loaded(): Promise<void>;
    protected loadedDeferred: Deferred<void>;
    localReferencePositionToPosition(lref: ReferencePosition): number;
    // (undocumented)
    protected onConnect(): void;
    // (undocumented)
    protected onDisconnect(): void;
    posFromRelativePos(relativePos: IRelativePosition): number;
    // (undocumented)
    protected processCore(message: ISequencedDocumentMessage, local: boolean, localOpMetadata: unknown): void;
    protected processGCDataCore(serializer: SummarySerializer): void;
    removeLocalReferencePosition(lref: LocalReferencePosition): LocalReferencePosition | undefined;
    // (undocumented)
    removeRange(start: number, end: number): IMergeTreeRemoveMsg;
    protected replaceRange(start: number, end: number, segment: ISegment): void;
    resolveRemoteClientPosition(remoteClientPosition: number, remoteClientRefSeq: number, remoteClientId: string): number | undefined;
    // (undocumented)
    protected reSubmitCore(content: any, localOpMetadata: unknown): void;
    // (undocumented)
    readonly segmentFromSpec: (spec: IJSONSegment) => ISegment;
    // @deprecated (undocumented)
    submitSequenceMessage(message: IMergeTreeOp): void;
    // (undocumented)
    protected summarizeCore(serializer: IFluidSerializer, telemetryContext?: ITelemetryContext): ISummaryTreeWithStats;
    walkSegments<TClientData>(handler: ISegmentAction<TClientData>, start?: number, end?: number, accum?: TClientData, splitRange?: boolean): void;
}

// @public @deprecated (undocumented)
export class SharedSequence<T> extends SharedSegmentSequence<SubSequence<T>> {
    constructor(document: IFluidDataStoreRuntime, id: string, attributes: IChannelAttributes, specToSegment: (spec: IJSONSegment) => ISegment);
    getItemCount(): number;
    getItems(start: number, end?: number): Serializable<T>[];
    // (undocumented)
    id: string;
    // (undocumented)
    insert(pos: number, items: Serializable<T>[], props?: PropertySet): void;
    // (undocumented)
    remove(start: number, end: number): void;
}

// @public
export class SharedString extends SharedSegmentSequence<SharedStringSegment> implements ISharedString {
    constructor(document: IFluidDataStoreRuntime, id: string, attributes: IChannelAttributes);
    annotateMarker(marker: Marker, props: PropertySet, combiningOp?: ICombiningOp): void;
    annotateMarkerNotifyConsensus(marker: Marker, props: PropertySet, callback: (m: Marker) => void): void;
    static create(runtime: IFluidDataStoreRuntime, id?: string): SharedString;
    // @deprecated
    findTile(startPos: number | undefined, tileLabel: string, preceding?: boolean): {
        tile: ReferencePosition;
        pos: number;
    } | undefined;
    static getFactory(): SharedStringFactory;
    getMarkerFromId(id: string): ISegment | undefined;
    getText(start?: number, end?: number): string;
    // (undocumented)
    getTextRangeWithMarkers(start: number, end: number): string;
    getTextWithPlaceholders(start?: number, end?: number): string;
    // (undocumented)
    id: string;
    insertMarker(pos: number, refType: ReferenceType, props?: PropertySet): IMergeTreeInsertMsg | undefined;
    insertMarkerRelative(relativePos1: IRelativePosition, refType: ReferenceType, props?: PropertySet): void;
    insertText(pos: number, text: string, props?: PropertySet): void;
    insertTextRelative(relativePos1: IRelativePosition, text: string, props?: PropertySet): void;
    // (undocumented)
    get ISharedString(): ISharedString;
    removeText(start: number, end: number): IMergeTreeRemoveMsg;
    replaceText(start: number, end: number, text: string, props?: PropertySet): void;
    protected rollback(content: any, localOpMetadata: unknown): void;
    searchForMarker(startPos: number, markerLabel: string, forwards?: boolean): Marker | undefined;
}

// @public (undocumented)
export class SharedStringFactory implements IChannelFactory {
    // (undocumented)
    static readonly Attributes: IChannelAttributes;
    // (undocumented)
    get attributes(): IChannelAttributes;
    // (undocumented)
    create(document: IFluidDataStoreRuntime, id: string): SharedString;
    // (undocumented)
    load(runtime: IFluidDataStoreRuntime, id: string, services: IChannelServices, attributes: IChannelAttributes): Promise<SharedString>;
    // (undocumented)
    static segmentFromSpec(spec: any): SharedStringSegment;
    // (undocumented)
    static Type: string;
    // (undocumented)
    get type(): string;
}

// @alpha
export type SharedStringRevertible = MergeTreeDeltaRevertible | IntervalRevertible;

// @public (undocumented)
export type SharedStringSegment = TextSegment | Marker;

// @public
export enum Side {
    // (undocumented)
    After = 1,
    // (undocumented)
    Before = 0
}

// @public @deprecated (undocumented)
export class SubSequence<T> extends BaseSegment {
    constructor(items: Serializable<T>[]);
    // (undocumented)
    append(segment: ISegment): void;
    // (undocumented)
    canAppend(segment: ISegment): boolean;
    // (undocumented)
    clone(start?: number, end?: number): SubSequence<T>;
    // (undocumented)
    protected createSplitSegmentAt(pos: number): SubSequence<T> | undefined;
    // (undocumented)
    static fromJSONObject<U>(spec: Serializable): SubSequence<U> | undefined;
    // (undocumented)
    static is(segment: ISegment): segment is SubSequence<any>;
    // (undocumented)
    items: Serializable<T>[];
    // (undocumented)
    removeRange(start: number, end: number): boolean;
    // (undocumented)
    toJSONObject(): IJSONRunSegment<T>;
    // (undocumented)
    toString(): string;
    // (undocumented)
    readonly type: string;
    // (undocumented)
    static readonly typeString: string;
}

```
