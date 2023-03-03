export function SVGDownloadHandler() {
    const svg = document.querySelector("#container svg");
    const oldHeight = svg.getAttribute("height");
    const oldWidth = svg.getAttribute("width");
    const oldViewBox = svg.getAttribute("viewBox");
    svg.setAttribute("height", "100cm");
    svg.setAttribute("width", "100cm");
    svg.setAttribute("viewBox", "-10 -10 100 100");

    const svgHTML = document.getElementById("container").innerHTML;
    const blob = new Blob([svgHTML.toString()]);
    const element = document.createElement("a");
    element.download = "child-bustPattern.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();

    svg.setAttribute("height", oldHeight);
    svg.setAttribute("width", oldWidth);
    svg.setAttribute("viewBox", oldViewBox);
}