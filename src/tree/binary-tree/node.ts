/**
 * @file Binary Tree node
 * @version 0.2.0
 */

import type { BTNode } from "../types";
import { Stack } from "linear";

/**
 * Incorrect insertion of tree
 */
export class InvalidInsertion extends Error {
	/**
	 * initialize message to invalid insertion
	 */
	constructor() {
		super("invalid tree insertion. Node already exists");
	}
}

/**
 * Represents a element (node) of Binary Tree
 *
 * A node of binary tree is implemented using **dynamic node represensation**
 * which represents three disjoint subsets, called **left**, **right** and
 * **father**, each node holds some information called **data**
 */
export default class BinaryTreeNode<T> implements NonNullable<BTNode<T>> {
	/**
	 * Getter for data
	 * @type {T}
	 * @private
	 */
	#data: T;
	/**
	 * Getter for father node
	 * @type {T}
	 * @private
	 */
	#father: BTNode<T>;
	/**
	 * Getter for left subtree
	 * @type {T}
	 * @private
	 */
	#left: BTNode<T>;
	/**
	 * Getter for right subtree
	 * @type {T}
	 * @private
	 */
	#right: BTNode<T>;
	/**
	 * Node's level
	 * @type {number}
	 * @private
	 */
	#level: number;

	/**
	 * Creates a node tree with data and no subtree
	 *
	 * @param {T} data new data
	 */
	constructor(data: T) {
		this.#data = data;
		this.#father = this.#left = this.#right = null;
		this.#level = 0;
	}

	/**
	 * Getter for brother subtree
	 * @type {T}
	 * @return {T}
	 */
	get data(): T {
		return this.#data;
	}

	/**
	 * Returns father's node
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get father(): BTNode<T> {
		return this.#father;
	}

	/**
	 * Getter for brother subtree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get left(): BTNode<T> {
		return this.#left;
	}

	/**
	 * Getter for brother subtree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get right(): BTNode<T> {
		return this.#right;
	}

	/**
	 * Getter for brother subtree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get brother(): BTNode<T> {
		if (this.#father === null) {
			return null;
		}

		if (this.isLeft()) {
			return this.#father.right;
		}

		return this.#father.left;
	}

	/**
	 * Returns the root of the tree
	 * @type {BTNode<T>}
	 * @return {BTNode<T>}
	 */
	get root(): BTNode<T> {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let node: BTNode<T> = this;

		while (node.father !== null) {
			node = node.father;
		}

		return node;
	}

	/**
	 * creates a leaft to insert data in, for tree with no left son
	 * @throws {InvalidInsertion}
	 * @param {T} data
	 * @return {this}
	 */
	insertLeft(data: T): this {
		if (this.left) {
			throw new InvalidInsertion();
		}

		const left = (this.#left = new BinaryTreeNode(data));
		left.#father = this;
		left.#level = this.level() + 1;

		return this;
	}

	/**
	 * creates a leaf to insert data in, for tree with no right son
	 * @throws {InvalidInsertion}
	 * @param {T} data
	 * @return {this}
	 */
	insertRight(data: T): this {
		if (this.right) {
			throw new InvalidInsertion();
		}

		const right = (this.#right = new BinaryTreeNode(data));
		right.#father = this;
		right.#level = this.level() + 1;

		return this;
	}

	/**
	 * Checks whether the tree is the root node
	 * @return {boolean}
	 */
	isRoot(): boolean {
		return this.#father === null;
	}

	/**
	 * O(1). returns true whether tree has no sons, also known as a leaf
	 * @return {boolean}
	 */
	isLeaf(): boolean {
		return this.left === null && this.right === null;
	}

	/**
	 * returns true whether tree is right subtree or false otherwise
	 * @return {boolean}
	 */
	isRight(): boolean {
		return this.father?.right === this;
	}

	/**
	 * returns true whether tree is left subtree or false otherwise
	 * @return {boolean}
	 */
	isLeft(): boolean {
		return this.father?.left === this;
	}

	/**
	 * O(1). Calculates the level of the subtree
	 *
	 * The root of the tree has level 0, and the level of any other node in the
	 * tree is one more than the level of its father.
	 *
	 * @return {number}
	 */
	level(): number {
		return this.#level;
	}

	/**
	 * O(l). Checks whether the tree is ancestor of the tree
	 * @param {BTNode<T>} tree
	 * @return {boolean}
	 */
	ancestor(tree: BTNode<T>): boolean {
		let node = this.father;

		while (node !== null) {
			if (node === tree) {
				return true;
			}

			node = node.father;
		}

		return false;
	}

	/**
	 * Checks whether the tree is the root node
	 * @param {BTNode<T>} tree
	 * @return {boolean}
	 */
	descendant(tree: BTNode<T>): boolean {
		const visited = new Stack<BTNode<T>>();
		visited.push(this.left);
		visited.push(this.right);

		while (!visited.empty()) {
			const node = visited.pop();

			if (node === tree) {
				return true;
			}

			if (node?.left) visited.push(node.left);
			if (node?.right) visited.push(node.right);
		}

		return false;
	}
}
