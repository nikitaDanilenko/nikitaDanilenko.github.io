const identity = a => a

const mkTable = function (data) {
    const parsedCSV = d3.csvParseRows(data)
    const header = parsedCSV[0]
    const values = parsedCSV.slice(1)

    const table = d3.select("body").append("table")

    const rows = table
        .append("tbody")
        .selectAll("tr")
        .data(values)
        .enter()
        .append("tr")
        .sort((a, b) => d3.descending(a[0], b[0]))

    table
        .insert("thead", "tbody")
        .append("tr")
        .selectAll("th")
        .data(header)
        .enter()
        .append("th")
        .text(identity)
        .on("click", function (event, pos) {
            const index = header.indexOf(pos)
            const cmp = event.shiftKey ? d3.ascending : d3.descending
            rows.sort((a, b) => cmp(a[index], b[index]))
        })

    rows.selectAll("td")
        .data(identity)
        .enter()
        .append("td")
        .text(identity)
}

d3.text("data.csv").then(mkTable)