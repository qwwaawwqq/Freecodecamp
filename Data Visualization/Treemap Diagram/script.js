const url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

const width = 960;
const height = 600;

const legendWidth = 500;
const legendHeight = 30;

const tooltip = d3.select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

const svg = d3.select('#treemap')
  .attr('width', width)
  .attr('height', height);

const legendSvg = d3.select('#legend')
  .attr('width', legendWidth)
  .attr('height', legendHeight);

d3.json(url)
  .then(data => {
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const treemap = d3.treemap()
      .size([width, height])
      .padding(1);

    treemap(root);

    const categories = data.children.map(d => d.name);
    const colors = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10);

    const tile = svg.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    tile.append('rect')
      .attr('class', 'tile')
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colors(d.data.category))
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`)
          .attr('data-value', d.data.value)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

    tile.append('text')
      .selectAll('tspan')
      .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
      .enter()
      .append('tspan')
      .attr('x', 4)
      .attr('y', (d, i) => 13 + i * 10)
      .text(d => d);

    const legend = legendSvg.selectAll('g')
      .data(categories)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${i * 100}, 0)`);

    legend.append('rect')
      .attr('class', 'legend-item')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', d => colors(d));

    legend.append('text')
      .attr('x', 25)
      .attr('y', 15)
      .text(d => d);
  })
  .catch(error => {
    console.log('Error:', error);
  });