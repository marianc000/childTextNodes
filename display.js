import { round } from "./math.js";

export function display(results) {
    const body = Object.entries(results).map(([k, v]) => `<tr><td class='name'>${k}</td>${v.map(n => `<td>${round(n)}</td>`).join('')}</tr>`).join('');

    document.body.innerHTML = `<table>${body}</table>`;
}