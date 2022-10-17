const identity = function (a) {
    return a
}
const mkTable = function (data) {
    const parsedCSV = d3.csv.parseRows(data)

    const table = d3.select("body").append("table")
    const header = parsedCSV[0]
    const values = parsedCSV.slice(1)

    const headers = table
        .append("thead")
        .append("tr")
        .selectAll("th")
        .data(header)
        .enter()
        .append("th")
        .text(identity)
        .on("click", function (pos) {
            const index = header.findIndex(function (x) {
                return x === pos
            })
            if (d3.event.shiftKey) {
                rows.sort(function (a, b) {
                    return d3.ascending(b[index], a[index])
                })
            } else {
                rows.sort(function (a, b) {
                        return d3.descending(b[index], a[index]);
                    }
                )
            }
        })

    const rows =
        table
            .append("tbody")
            .selectAll("tr")
            .data(values)
            .enter()
            .append("tr")
            .sort(function (a, b) {
                return d3.descending(b[0], a[0])
            })
    rows
        .selectAll("td")
        .data(identity)
        .enter()
        .append("td")
        .text(identity)
}

d3.text("data.csv", mkTable)

window.onscroll = function () {
    stickyControlFunction()
};
const header = document.getElementById("navigationHeader");
const sticky = header.offsetTop;

function stickyControlFunction() {
    if (window.scrollY > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}