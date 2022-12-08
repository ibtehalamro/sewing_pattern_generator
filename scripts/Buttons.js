export function SVGDownloadHandler() {
    const svg = document.getElementById("container").innerHTML;
    const blob = new Blob([svg.toString()]);
    const element = document.createElement("a");
    element.download = "child-bustPattern.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}