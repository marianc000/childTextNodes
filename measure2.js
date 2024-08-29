// measure2.js

function e(el, text) {
    const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (treeWalker.nextNode())
        nodes.push(treeWalker.currentNode);
    return nodes.filter(n => n.nodeValue.includes(text));
}
 
function g(el, text) {

    let iterator = document.evaluate(`//text()[contains(.,'${text}')]`, el, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE);
    const nodes = [];
    let node;

    while (node = iterator.iterateNext()) {
        nodes.push(node);
    }

    return nodes;
}

// function h(el, text) {

//     let iterator = document.evaluate(`//text()`, el, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE);
//     const nodes = [];

//     let node;

//     while (node = iterator.iterateNext()) {
//         nodes.push(node);
//     }

//     return nodes.filter(n => n.nodeValue.includes(text));
// }

const ways = { e, g  };


export function measure(el) {

    const results = Object.fromEntries(Object.values(ways).map(name => [name, []]));
    for (let i = 0; i < 10; i++) {
        Object.values(ways).forEach(func => {
            const start = performance.now();
            let r = func(el, 'year');
            results[func].push(performance.now() - start);
           // console.log(r.length)
            if (r.length !== 311) {
                throw 'wrong length ' + r.length;
            }
        })
    }

    return results;
}

