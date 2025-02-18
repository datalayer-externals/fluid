/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @deprecated This functionality was not intended for public export and will
 * be removed in a future release.
 */
export class Stack<T> {
	public items: T[] = [];
	public push(val: T) {
		this.items.push(val);
	}

	public empty() {
		return this.items.length === 0;
	}

	public top(): T | undefined {
		return this.items[this.items.length - 1];
	}

	public pop(): T | undefined {
		return this.items.pop();
	}
}
