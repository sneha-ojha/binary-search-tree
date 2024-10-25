const readline = require('readline');

// Helper function to generate an array of random numbers less than 100
const generateRandomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

// Binary Search Tree and Node classes from your provided code
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        const sortedUniqueArray = [...new Set(arr)].sort((a, b) => a - b);
        const buildSubTree = (array) => {
            if (array.length === 0) return null;
            const mid = Math.floor(array.length / 2);
            const root = new Node(array[mid]);
            root.left = buildSubTree(array.slice(0, mid));
            root.right = buildSubTree(array.slice(mid + 1));
            return root;
        };
        return buildSubTree(sortedUniqueArray);
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            if (!node.right) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    isBalanced(node = this.root) {
        const checkBalance = (node) => {
            if (!node) return { height: -1, balanced: true };
            const left = checkBalance(node.left);
            if (!left.balanced) return { height: 0, balanced: false };
            const right = checkBalance(node.right);
            if (!right.balanced) return { height: 0, balanced: false };
            const currentHeight = Math.max(left.height, right.height) + 1;
            const isBalanced = Math.abs(left.height - right.height) <= 1;
            return { height: currentHeight, balanced: isBalanced };
        };
        return checkBalance(node).balanced;
    }

    rebalance() {
        const sortedArray = this.inOrderTraversal(this.root);
        this.root = this.buildTree(sortedArray);
    }

    inOrderTraversal(node, result = []) {
        if (node) {
            this.inOrderTraversal(node.left, result);
            result.push(node.data);
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }

    preOrderTraversal(node, result = []) {
        if (node) {
            result.push(node.data);
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
        return result;
    }

    postOrderTraversal(node, result = []) {
        if (node) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push(node.data);
        }
        return result;
    }

    levelOrderTraversal(callback) {
        const height = this.getHeight(this.root);
        for (let i = 1; i <= height; i++) {
            this.printLevel(this.root, i, callback);
        }
    }

    printLevel(node, level, callback) {
        if (!node) return;
        if (level === 1) callback(node);
        else {
            this.printLevel(node.left, level - 1, callback);
            this.printLevel(node.right, level - 1, callback);
        }
    }

    getHeight(node) {
        if (!node) return -1;
        return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
}

// Function to print the tree traversals
const printTraversals = (tree) => {
    console.log("In-order Traversal:", tree.inOrderTraversal(tree.root));
    console.log("Pre-order Traversal:", tree.preOrderTraversal(tree.root));
    console.log("Post-order Traversal:", tree.postOrderTraversal(tree.root));
    console.log("Level-order Traversal:");
    tree.levelOrderTraversal(node => process.stdout.write(node.data + " "));
    console.log("\n");
};

// Driver script logic
const driverScript = () => {
    console.log("Creating a Binary Search Tree with random numbers...");
    const randomArray = generateRandomArray(15);
    const tree = new Tree(randomArray);

    console.log("Initial Tree Traversals:");
    printTraversals(tree);

    console.log("Is the tree balanced?", tree.isBalanced());

    console.log("Unbalancing the tree by adding numbers > 100...");
    tree.insert(150);
    tree.insert(200);
    tree.insert(250);

    console.log("After unbalancing, is the tree balanced?", tree.isBalanced());

    console.log("Rebalancing the tree...");
    tree.rebalance();

    console.log("After rebalancing, is the tree balanced?", tree.isBalanced());

    console.log("Final Tree Traversals:");
    printTraversals(tree);
};

// Run the driver script
driverScript();
