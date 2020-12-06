// bar
const dateParser = d3.timeParse('%Y');
const xAccessor = (d) => dateParser(d[0]);


// bar 
 const xScale = d3
   .scaleTime()
   .domain(d3.extent(dataset, xAccessor))
   .range([0, dimensions.boundedWidth]);





   // scatter
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
     .attr('fill', 'black')
     .style('font-size', '1.4em');
