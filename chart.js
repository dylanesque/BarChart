/*
In the interest of full disclosure, this isn't technically passing all of the tests, but there's an 
inconsistency noted with user story #10 where the test is asking for a level of strictness that isn't 
specified in the user stories. See https://github.com/freeCodeCamp/freeCodeCamp/issues/39299 for details.
 */

async function barChart() {
  // 1. Access data and create accessors for x and y coordinates
  const initialData = await d3.json(
    'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  const dataset = initialData.data;
  const parseTime = d3.timeParse('%Y-%m-%d');
  const xAccessor = (d) => parseTime(d[0]);
  const yAccessor = (d) => d[1];

  // 2. Draw chart`
  const width = window.innerWidth * 0.9;
  let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 40,
      right: 10,
      bottom: 40,
      left: 50,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // 4. Create scales

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  // 3. Create canvas

  const wrapper = d3
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('visibility', 'hidden');

  const barWidth = dimensions.boundedWidth / dataset.length;

  const barRects = bounds
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * barWidth)
    .attr('y', (d) => yScale(yAccessor(d)))
    .attr('width', barWidth)
    .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
    .attr('class', 'bar')
    .attr('data-date',(d) => d[0])
    .attr('data-gdp', (d) => yAccessor(d))
    .attr('fill', 'cornflowerblue')
    .on('mouseover', onMouseOver)
    .on('mouseleave', onMouseLeave);

  function onMouseOver(d) {
    console.log(d[0])
    tooltip.transition().duration(200).style('visibility', 'visible');
    tooltip
      .html('Date: ' + d[0] + '<br> GDP: $ ' + d[1] + ' billion')
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px')
      .attr('data-date', d[0])
      .attr('data-gdp', d[1]);
  }

  function onMouseLeave() {
    tooltip.transition().duration(200).style('visibility', 'hidden');
  }

  // 5. Create axes

  const xAxisGenerator = d3.axisBottom().scale(xScale).ticks(12);
  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .attr('id', 'x-axis')
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);

  const xAxisLabel = xAxis
    .append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .attr('class', 'tick')
    .text('Year')
    .attr('fill', 'black')
    .style('font-size', '1.4em');

  const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(13);

  const yAxis = bounds.append('g').attr('id', 'y-axis').call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append('text')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)

    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .text('Gross Domestic Product')
    .style('transform', 'rotate(-90deg)')
    .style('text-anchor', 'middle');

    const axis = await document.querySelector('#x-axis');
  const ticks = await axis.querySelectorAll('.tick');

  for (let i = 0; i < ticks.length; i++) {
    console.log(ticks[i]);
    console.log(ticks[i].querySelector('text').innerHTML);
  }
}

barChart();
