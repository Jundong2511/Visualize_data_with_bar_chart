// get a json file from url, parse into object, pass to d3, d3 use obj as dataset to make a bar chart
// "data": [ "1947-01-01",   243.1 ],

// get json file and parse it into obj.

const req = new XMLHttpRequest();
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
req.open("GET", url, true);
req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        const json = (JSON.parse(req.responseText));
        const dataset = json["data"]
        const dates = (json["data"].map(x => x[0])).map(x => x.split("-"))
        const w = 1000, h = 560, barW = w / 275

        const padding = 100;
        const yearsDate = dataset.map(x => new Date(x[0]))
        const xMax = new Date(d3.max(yearsDate))

        const xAxisDomain = d3.scaleTime()
            .domain([d3.min(yearsDate), xMax])
            .range([padding, w - padding])
        const xScale = d3.scaleLinear()
            .domain([0, dataset.length])
            .range([padding, w - padding]);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d[1])])
            .range([h - padding, padding])
        const svgContainer = d3.select('body')
            .append("div")
            .attr('class', 'container')
            .attr("x", w + 100)
            .attr('y', h + 100)
            .attr("width", w)
            .attr("height", h);
        const h1 = svgContainer
            .append("h1")
            .attr("id", "title")
            .text("US GDP from 1947 - 2015");

        const tooltip = svgContainer
            .append('div')
            .attr('id', 'tooltip')
            .style('opacity', 0);
        const svg = svgContainer
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        const gdpText = svg.append('text')
            .attr('id', 'gdp-text')
            .attr('transform', 'rotate(-90)')
            .attr("x", -300)
            .attr('y', 150)
            .text('Gross Domestic Product');
        const moreInfo = svg.append('text')
            .attr('id', 'more-info')
            .attr("x", 500)
            .attr('y', 550)
            .text('More info here: http://www.just_example.com');
        const monthToQ = {
            "01": "Q1", "04": "Q2",
            "07": "Q3", "10": "Q4",
        }
        const rect = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("data-date", (d, i) => d[0])
            .attr("data-gdp", (d, i) => d[1])
            .attr("x", (d, i) => xScale(i))
            .attr("y", (d, i) => yScale(d[1]))
            .attr("width", barW)
            .attr("height", (d, i) => h - padding - yScale(d[1]))
            .attr("fill", "#1E7BC6")
            .on('mouseover', (event, d) => {
                // const e = rect.nodes();
                // const o = e.indexOf(this);
                const year = (d[0].split("-"))[0]
                const month = (d[0].split("-"))[1]

                tooltip.transition()
                    .duration(0)
                    .style('opacity', 0.9);

                tooltip.html(
                    year + " " + monthToQ[month] + '<br>' + '$' + d[1] + " Billion"
                );
                tooltip.attr('data-date', d[0])
                    .style("left", event.pageX - 100 + "px")
                    .style("top", 300 + "px");
            })
            .on('mouseout', () => {
                tooltip.transition().duration(200).style('opacity', 0)
            })
        const xAxis = d3.axisBottom(xAxisDomain);
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);
        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);
    }
}
req.send()
