/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { MockHandle } from "@fluidframework/test-runtime-utils";
import { EmptyKey, MapTree } from "../../core";

import {
	isPrimitiveValue,
	applyTypesFromContext,
	ContextuallyTypedNodeDataObject,
	cursorFromContextualData,
	// Allow importing from this specific file which is being tested:
	/* eslint-disable-next-line import/no-internal-modules */
} from "../../feature-libraries/contextuallyTyped";
import { FieldKinds, TreeFieldSchema, jsonableTreeFromCursor } from "../../feature-libraries";
import { leaf, SchemaBuilder } from "../../domains";

describe("ContextuallyTyped", () => {
	it("isPrimitiveValue", () => {
		assert(isPrimitiveValue(0));
		assert(isPrimitiveValue(0.001));
		assert(isPrimitiveValue(NaN));
		assert(isPrimitiveValue(true));
		assert(isPrimitiveValue(false));
		assert(isPrimitiveValue(""));
		assert(!isPrimitiveValue({}));
		assert(!isPrimitiveValue(undefined));
		assert(!isPrimitiveValue(null));
		assert(!isPrimitiveValue([]));
		assert(!isPrimitiveValue(new MockHandle(5)));
	});

	it("applyTypesFromContext omits empty fields", () => {
		const builder = new SchemaBuilder({
			scope: "applyTypesFromContext",
			libraries: [leaf.library],
		});
		const numberSequence = SchemaBuilder.sequence(leaf.number);
		const numbersObject = builder.object("numbers", { numbers: numberSequence });
		const schema = builder.intoSchema(numberSequence);
		const mapTree = applyTypesFromContext({ schema }, new Set([numbersObject.name]), {
			numbers: [],
		});
		const expected: MapTree = { fields: new Map(), type: numbersObject.name, value: undefined };
		assert.deepEqual(mapTree, expected);
	});

	it("applyTypesFromContext omits empty primary fields", () => {
		const builder = new SchemaBuilder({
			scope: "applyTypesFromContext",
			libraries: [leaf.library],
		});
		const numberSequence = SchemaBuilder.sequence(leaf.number);
		const primaryObject = builder.object("numbers", { [EmptyKey]: numberSequence });
		const schema = builder.intoSchema(numberSequence);
		const mapTree = applyTypesFromContext({ schema }, new Set([primaryObject.name]), []);
		const expected: MapTree = { fields: new Map(), type: primaryObject.name, value: undefined };
		assert.deepEqual(mapTree, expected);
	});

	describe("cursorFromContextualData adds field", () => {
		it("for empty contextual data.", () => {
			const builder = new SchemaBuilder({
				scope: "cursorFromContextualData",
				libraries: [leaf.library],
			});
			const nodeSchema = builder.object("node", {
				foo: leaf.string,
			});

			const nodeSchemaData = builder.intoSchema(builder.optional(nodeSchema));
			const contextualData: ContextuallyTypedNodeDataObject = {};

			const generatedField = [
				{
					value: "x",
					type: leaf.string.name,
					fields: new Map(),
				},
			];
			const treeFromContextualData = jsonableTreeFromCursor(
				cursorFromContextualData(
					{
						schema: nodeSchemaData,
						fieldSource: () => (): MapTree[] => generatedField,
					},
					new Set([nodeSchema.name]),
					contextualData,
				),
			);

			assert.equal(treeFromContextualData.fields?.foo[0].value, "x");
		});

		it("for nested contextual data.", () => {
			const builder = new SchemaBuilder({
				scope: "Identifier Domain",
				libraries: [leaf.library],
			});

			const recursiveReference = () => nodeSchema;
			builder.fixRecursiveReference(recursiveReference);
			const nodeSchema = builder.object("node", {
				foo: builder.required(leaf.string),
				child: TreeFieldSchema.createUnsafe(FieldKinds.optional, [recursiveReference]),
			});

			const nodeSchemaData = builder.intoSchema(builder.optional(nodeSchema));
			const contextualData: ContextuallyTypedNodeDataObject = { child: {} };

			const generatedField = [
				{
					value: "x",
					type: leaf.string.name,
					fields: new Map(),
				},
			];

			const treeFromContextualData = jsonableTreeFromCursor(
				cursorFromContextualData(
					{
						schema: nodeSchemaData,
						fieldSource: () => (): MapTree[] => generatedField,
					},
					new Set([nodeSchema.name]),
					contextualData,
				),
			);

			assert.equal(treeFromContextualData.fields?.foo[0].value, "x");
			assert.equal(treeFromContextualData.fields?.child[0].fields?.foo[0].value, "x");
		});
	});

	// TODO: more tests
});
