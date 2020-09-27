async function barChart() {
  // 1. Access data and create accessors for x and y coordinates
  const initialData = await d3.json(
    'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  const dataset = initialData.data;
  const dateParser = d3.timeParse('%Y');
  const xAccessor = (d) => dateParser(d[0]);
  const yAccessor = (d) => d[1];


  // 2. Draw chart`
  const width = 750;
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

  // TODO: Fix the d3.max portion of this function
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

  const barWidth = dimensions.boundedWidth / (dataset.length)

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
    .attr('data-date', 'thing')
    .attr('fill', 'cornflowerblue');
  
  // 5. Create axes
  
  const xAxisGenerator = d3.axisBottom().scale(xScale).ticks(14);

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
    .attr('fill', 'black')
    .style('font-size', '1.4em');
  
  const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(9);

  const yAxis = bounds.append('g').attr('id', 'y-axis').call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append('text')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)
    .attr('class', 'tick')
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .text('Gross Domestic Product')
    .style('transform', 'rotate(-90deg)')
    .style('text-anchor', 'middle');
}

barChart();
