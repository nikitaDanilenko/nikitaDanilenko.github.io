const identity = a => a
const arrow = { asc: " ↑", desc: " ↓" }

const mkTable = function (data) {
    const parsedCSV = d3.csvParseRows(data)
    const header = parsedCSV[0]
    const values = parsedCSV.slice(1)
    let sortState = { index: 0, dir: "desc" }

    const table = d3.select("body").append("table")

    const rows = table
        .append("tbody")
        .selectAll("tr")
        .data(values)
        .enter()
        .append("tr")
        .sort((a, b) => d3.descending(a[0], b[0]))

    const ths = table
        .insert("thead", "tbody")
        .append("tr")
        .selectAll("th")
        .data(header)
        .enter()
        .append("th")
        .on("click", function (event, pos) {
            const index = header.indexOf(pos)
            const dir = event.shiftKey ? "asc" : "desc"
            const cmp = dir === "asc" ? d3.ascending : d3.descending
            rows.sort((a, b) => cmp(a[index], b[index]))
            sortState = { index, dir }
            renderHeaders()
        })

    const renderHeaders = () =>
        ths.text((d, i) => d + (sortState.index === i ? arrow[sortState.dir] : ""))

    renderHeaders()

    rows.selectAll("td")
        .data(identity)
        .enter()
        .append("td")
        .each(function (cell, i) {
            const td = d3.select(this)
            if (header[i] === "AppId" && cell) {
                td.append("a")
                    .attr("href", `https://store.steampowered.com/app/${cell}`)
                    .attr("target", "_blank")
                    .attr("rel", "noopener")
                    .text(cell)
            } else {
                td.text(cell)
            }
        })
}

d3.text("data.csv").then(mkTable)