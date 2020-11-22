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
        const numbers = json["data"].map(x => x[1])
        const dates = (json["data"].map(x => x[0])).map(x => x.split("-"))
        console.log(dates[0])
        const w = 1200;
        const h = 600;
        const padding = 100;
        const xAxisDomain = d3.scaleLinear()
            .domain(d3.extent(dates, d => d[0]))
            .range([padding, w - padding]);

        const xScale = d3.scaleLinear()
            .domain([0, dataset.length])
            .range([padding, w - padding]);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d[1])])
            .range([h - padding, padding])


        const h1 = d3.select("body")
            .append("h1")
            .attr("id", "title")
            .text("h1 tag here");
        const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("data-date", (d, i) => d[0])
            .attr("data-gdp", (d, i) => d[1])
            .attr("x", (d, i) => xScale(i))
            .attr("y", (d, i) => yScale(d[1]))
            .attr("width", "2")
            .attr("height", (d, i) => h - padding - yScale(d[1]))
            .attr("fill", "navy")
            .append("title")
            .attr("id", "tooltip")
            .text(d => d);

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






// get obj from xmlhr, use time as x-axis, gdp as x-axis.


