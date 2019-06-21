async function barChart() {

  // 1. Access data
  const dataset = await d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json');

  const yAccessor = d => d.data[1];

  const parseDate = d3.timeParse("%Y-%m-%d");
  const xAccessor = d => parseDate(d.data[0]);

  // 2. Draw chart
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
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

    // 3. Create canvas
}

barChart()


