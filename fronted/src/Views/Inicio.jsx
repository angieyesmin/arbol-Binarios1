import React, { useState } from 'react';
import BinarySearchTree from './BinarySearchTree';
import BinaryTreeView from './BinaryTreeView';

function Inicio() {
    const [tree] = useState(new BinarySearchTree());
    const [addValue, setAddValue] = useState('');
    const [removeValue, setRemoveValue] = useState('');
    const [output, setOutput] = useState('');
    
    const convertToD3Format = (node) => { //verifica si el nodo es nulo
        if (!node) return null;
        let newNode = { name: node.value }; //contiene el valor del nodo actual
        if (node.left || node.right) {
            newNode.children = [];
            if (node.left) newNode.children.push(convertToD3Format(node.left));
            if (node.right) newNode.children.push(convertToD3Format(node.right));
        }
        return newNode;
    };
    //Agrega un valor al arbol
    const handleAdd = () => {
        if (!addValue.trim()) {
            return;
        }
        tree.add(parseInt(addValue, 10));
        setAddValue('');
        setOutput(`El valor añadido es: ${addValue}`);
    };
    //Elimina el valor del arbol
    const handleRemove = () => {
        if (!removeValue.trim()) {
            return;
        }
        tree.remove(parseInt(removeValue, 10));
        setRemoveValue('');
        setOutput(`El valor eliminado es: ${removeValue}`);
    };
    //Verifica si el valos se encuentra
    const handleContains = () => {
        const found = tree.contains(parseInt(addValue, 10));
        setOutput(found ? 'El valor existe' : 'El valor no existe');
    };
    //Muestra el tamaño del arbol
    const handleSize = () => {
        const size = tree.size();
        setOutput('El tamaño del árbol es: ' + size);
    };
    //Recorrido del arbol
    const handleTraverse = () => {
        const arr = tree.toArray();
        setOutput('El recorrido del árbol es: ' + arr.join(', '));
    };

    return (
        <>
                <div className="min-h-screen-xl flex flex-wrap items-center justify-between mx-auto p-10 bg-purple-100">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-4xl font-semibold whitespace-nowrapn text-purple-800 text-center">
                            Arbol Binario
                        </span>
                    </a>
                </div>

            <div className="px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-center gap-8">
                <label className="flex w-full relative">
                    <input
                        type="text"
                        value={addValue}
                        onChange={(e) => setAddValue(e.target.value)}
                        className="bg-transparent ring-1 ring-purple-300 w-full h-10 rounded peer px-5 transition-all outline-none"
                        required
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2">
                        Añadir valores
                    </span>
                </label>
                <button onClick={handleAdd} className="px-4 py-2 bg-teal-400 text-white rounded">Añadir</button>

                <label className="flex w-full relative">
                    <input
                        type="text"
                        value={removeValue}
                        onChange={(e) => setRemoveValue(e.target.value)}
                        className="bg-transparent ring-1 ring-purple-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                        required
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2">
                        Eliminar Valores
                    </span>
                </label>
                <button onClick={handleRemove} className="px-4 py-2 bg-teal-400 text-white rounded">Eliminar</button>
            </div>
            
            <div className="flex space-x-2 px-28 mt-2">
                <button onClick={handleContains} className="px-8 py-2 bg-purple-400 text-white rounded">Buscar valor</button>
                <button onClick={handleTraverse} className="px-8 py-2 bg-purple-400 text-white rounded">Recorrer valores</button>
                <button onClick={handleSize} className="px-4 py-2 bg-purple-400 text-white rounded">Tamaño del arbol</button>
            </div>
            <div className="mt-4 p-4 bg-purple-100 rounded mx-8">
                {output}
            </div>
            <BinaryTreeView treeData={convertToD3Format(tree.root)} />
        </>
    );
}

export default Inicio;