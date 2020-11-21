// get a json file from url, parse into object, pass to d3, d3 use obj as dataset to make a bar chart


// get json file and parse it into obj.
var obj = {}
document.addEventlistener('DOMContentLoaded', function () {
    const req = new XMLHttpRequest();
    const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    req.open("GET", url, true);
    req.onload = fucntion(){
        const json = JSON.parse(req.responseText);
        let
    }
})




// get obj from xmlhr, use time as x-axis, gdp as x-axis.
const h1 = d3.select("body")
    .append("h1")
    .attr("id", "title")
    .text("this is a h1 tag");
const body = d3.select("body");
body.append(g)
    .attr("id", "x-axis");
body.append(g)
    .attr("id", "x-axis");

