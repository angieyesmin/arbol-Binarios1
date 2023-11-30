import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BinaryTreeView = ({ treeData }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (!treeData || !d3Container.current) return;

        // Borrar el contenedor
        d3.select(d3Container.current).selectAll("*").remove();
        const margin = { top: 50, right: 10, bottom: 50, left: 60 }; // Margen
        const width = 1060 - margin.left - margin.right;
        const height = 1200 - margin.top - margin.bottom; // Altura

        const svg = d3.select(d3Container.current)
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`) 
            .style("font", "10px sans-serif")
            .style("user-select", "none")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const treemap = d3.tree().size([height, width]); // Tamaño
        let nodes = d3.hierarchy(treeData, d => d.children);
        nodes = treemap(nodes);
        svg.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .join("path")
            .attr("class", "link")
            .attr("d", d => {
                return `M${d.x},${d.y}C${d.x},${(d.y + d.parent.y) / 2} ${d.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${d.parent.y}`;
            })
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5);

        // Nodos verticales
        const node = svg.selectAll(".node")
            .data(nodes.descendants())
            .join("g")
            .attr("class", d => `node ${d.children ? "node--internal" : "node--leaf"}`)
            .attr("transform", d => `translate(${d.x},${d.y})`);

        node.append("circle")
            .attr("r", 8) //Tamaño de los circulos

        node.append("text")
            .attr("dy", "0.20em")
            .attr("x", d => d.children ? -22 : 22) // Posición del texto
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .style("fill", "purple") // Color del texto
            .style("font-size", "12px"); // Tamaño del texto
    }, [treeData]);

    return <svg ref={d3Container} style={{ width: "80%", height: "auto" }} />;
};

export default BinaryTreeView;