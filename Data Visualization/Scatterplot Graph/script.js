const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const width = 800;
    const height = 400;
    const padding = 40;

    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.Year - 1), d3.max(data, d => d.Year + 1)])
      .range([padding, width - padding]);

    const yScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.Seconds * 1000)))
      .range([padding, height - padding]);

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.Year))
      .attr('cy', d => yScale(new Date(d.Seconds * 1000)))
      .attr('r', 5)
      .attr('data-xvalue', d => d.Year)
      .attr('data-yvalue', d => new Date(d.Seconds * 1000))
      .on('mouseover', (event, d) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip.html(
          d.Name + ': ' + d.Nationality + '<br/>' +
          'Year: ' + d.Year + ', Time: ' + d.Time + (d.Doping ? '<br/><br/>' + d.Doping : '')
        )
          .attr('data-year', d.Year)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', 'translate(0, ' + (height - padding) + ')')
      .call(xAxis);

    svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + padding + ', 0)')
      .call(yAxis);

    const legend = svg.append('g')
      .attr('id', 'legend');

    legend.append('text')
      .attr('x', width - 200)
      .attr('y', height - 20)
      .text('No doping allegations');

    legend.append('text')
      .attr('x', width - 200)
      .attr('y', height - 5)
      .text('Riders with doping allegations');

    const tooltip = d3.select('body').append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);
  })
  .catch(error => console.log(error));