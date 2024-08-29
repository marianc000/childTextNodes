// html.js
const html = await fetch('htmlWithManyTags.html').then(r => r.text());

export const div = document.createElement('div');

div.innerHTML = html;