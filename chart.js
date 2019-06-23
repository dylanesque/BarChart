async function barChart() {
  // 1. Access data
  const initialData = await d3.json(
    "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  );

  const dataset = initialData.data;
  console.log(dataset);

  const yAccessor = d => d[1];

  const parseDate = d3.timeParse("%Y-%m-%d");
  const xAccessor = d => parseDate(d[0]);

  // 2. Draw chart
  const width = 750;
  let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 40,
      right: 10,
      bottom: 40,
      left: 50
    }
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // 3. Create canvas

  const wrapper = d3
    .select("chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  // 4. Create scales

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

    const binsGenerator = d3.histogram()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(12);

    const bins = binsGenerator(dataset);


}

barChart();
