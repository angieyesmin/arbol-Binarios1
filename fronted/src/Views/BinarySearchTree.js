// Funcion del arbol binario
export default function BinarySearchTree() {
    this.root = null;
}
BinarySearchTree.prototype = {
    constructor: BinarySearchTree,
    // Añadir un arbol
    add: function(value) {
        var node = {
            value: value,
            left: null,
            right: null
        };
       var current;
        if (this.root === null) {
            this.root = node;
        } else {
            current = this.root;
            while (true) {
                if (value < current.value) {
                    if (current.left === null) {
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
                } else if (value > current.value) {
                    if (current.right === null) {
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }
                } else {
                    break;
                }
            }
        }
    },
    // Existencia del arbol
    contains: function(value) {
        var found = false;
        var current = this.root;

        while (!found && current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        return found;
    },
    // Recorrido del arbol
    traverse: function(process) {
        function inOrder(node) {
            if (node) {
                if (node.left !== null) {
                    inOrder(node.left);
                }
                process.call(this, node);
                if (node.right !== null) {
                    inOrder(node.right);
                }
            }
        }
        inOrder(this.root);
    },
    // Elimina un nodo
    remove: function(value) {
        var found = false,
            parent = null,
            current = this.root,
            childCount,
            replacement,
            replacementParent;

        while (!found && current) {
            if (value < current.value) {
                parent = current;
                current = current.left;
            } else if (value > current.value) {
                parent = current;
                current = current.right;
            } else {
                found = true;
            }
        }
        if (found) {
            childCount = 0;
            if (current.left !== null) childCount++;
            if (current.right !== null) childCount++;

            if (current === this.root) {
                switch (childCount) {
                    case 0:
                        this.root = null;
                        break;
                    case 1:
                        if (current.right === null) {
                            this.root = current.left;
                        } else {
                            this.root = current.right;
                        }
                        break;
                    case 2:
                        replacement = this.root.left;
                        replacementParent = null;
                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (replacementParent !== null) {
                            replacementParent.right = replacement.left;
                            replacement.right = this.root.right;
                            replacement.left = this.root.left;
                        } else {
                            replacement.right = this.root.right;
                        }
                        this.root = replacement;
                        break;
                }
            } else {
                switch (childCount) {
                    case 0:
                        if (current.value < parent.value) {
                            parent.left = null;
                        } else {
                            parent.right = null;
                        }
                        break;
                    case 1:
                        if (current.left === null) {
                            if (current.value < parent.value) {
                                parent.left = current.right;
                            } else {
                                parent.right = current.right;
                            }
                        } else {
                            if (current.value < parent.value) {
                                parent.left = current.left;
                            } else {
                                parent.right = current.left;
                            }
                        }
                        break;
                    case 2:
                        replacement = current.left;
                        replacementParent = current;

                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (replacementParent !== current) {
                            replacementParent.right = replacement.left;
                            replacement.left = current.left;
                        }
                        replacement.right = current.right;

                        if (current.value < parent.value) {
                            parent.left = replacement;
                        } else {
                            parent.right = replacement;
                        }
                        break;
                }
            }
        }
    },
    // Tamaño del arbol
    size: function() {
        var length = 0;
        this.traverse(function(node) {
            length++;
        });
        return length;
    },
    // Eliminar el nodo (con un arreglo)
    toArray: function() {
        var result = [];
        this.traverse(function(node) {
            result.push(node.value);
        });
        return result;
    },
    // Convierte el arreglo
    toString: function() {
        return this.toArray().toString();
    }
};
// Imprimir el arbol
var tree = new BinarySearchTree();
console.log("Añadir valores al arbol: 10, 20, 30");
tree.add(10);
tree.add(20);
tree.add(30);
console.log("Existe el valor 20 en el árbol?: " + tree.contains(20));
console.log("El tamaño del árbol es: " + tree.size());
console.log("El recorrido del arbol es: ");
tree.traverse(function(node) {
    console.log(node.value);
});
console.log("Elimina el nodo 10 del árbol");
tree.remove(10);
console.log("El tamaño del árbol es: " + tree.size());
console.log("El recorrido del árbol es: ");
console.log(tree.toArray());
console.log("El recorrido del árbol visualmente es: ");
console.log(tree.toString());
