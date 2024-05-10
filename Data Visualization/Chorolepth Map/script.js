const educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

const width = 960;
const height = 600;

const canvas = d3.select('#canvas')
  .attr('width', width)
  .attr('height', height);

const tooltip = d3.select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

const legendWidth = 200;
const legendHeight = 30;
const legendColors = ['#e5f5e0', '#a1d99b', '#31a354', '#006d2c'];

const legend = d3.select('#legend')
  .attr('width', legendWidth)
  .attr('height', legendHeight)
  .selectAll('rect')
  .data(legendColors)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * 50)
  .attr('y', 0)
  .attr('width', 50)
  .attr('height', legendHeight)
  .attr('fill', d => d);

Promise.all([d3.json(educationUrl), d3.json(countyUrl)])
  .then(([educationData, countyData]) => {
    const counties = topojson.feature(countyData, countyData.objects.counties).features;
    const educationById = {};

    educationData.forEach(d => {
      educationById[d.fips] = d.bachelorsOrHigher;
    });

    const path = d3.geoPath();

    const color = d3.scaleQuantize()
      .domain(d3.extent(educationData, d => d.bachelorsOrHigher))
      .range(legendColors);

    canvas.selectAll('path')
      .data(counties)
      .enter()
      .append('path')
      .attr('class', 'county')
      .attr('data-fips', d => d.id)
      .attr('data-education', d => educationById[d.id])
      .attr('fill', d => {
        const value = educationById[d.id];
        return value ? color(value) : '#ccc';
      })
      .attr('d', path)
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`${d.properties.name}, ${d.id}<br>${educationById[d.id]}%`)
          .attr('data-education', educationById[d.id])
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });
  })
  .catch(error => {
    console.log('Error:', error);
  });