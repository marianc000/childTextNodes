// measure.js

function a(el) {
    var nodes = [];

    function a0(el) {
        for (var i = 0; i < el.childNodes.length; i++) {
            var node = el.childNodes[i];
            if (node.nodeType == Node.TEXT_NODE) {
                nodes.push(node);
            } else a0(node);
        }
    }
    a0(el);
    return nodes;
}

function b(el) {
    return [...el.childNodes].flatMap(n => {
        if (n.nodeType === Node.TEXT_NODE) return n;
        return b(n);
    });
}

function c(el) {
    return [el, ...el.getElementsByTagName('*')].flatMap(el => [...el.childNodes]).filter(n => n.nodeType === Node.TEXT_NODE);
}

// function d(el) {
//     const nodes = [];
//     [el, ...el.getElementsByTagName('*')]
//         .forEach(el => nodes.push(...el.childNodes));
//     return nodes.filter(n => n.nodeType === Node.TEXT_NODE);
// }

function e(el) {
    const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (treeWalker.nextNode())
        nodes.push(treeWalker.currentNode);
    return nodes;
}

function f(el) {
    const nodeIterator = document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;

    while (node = nodeIterator.nextNode())
        nodes.push(node);
    return nodes;
}

function g(el) {
    let iterator = document.evaluate("//text()", el, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE);
    const nodes = [];
    let node;

    while (node = iterator.iterateNext()) {
        nodes.push(node);
    }

    return nodes;
}

const ways = { a, b, c, e, f, g };


export function measure(el) {

    const results = Object.fromEntries(Object.values(ways).map(name => [name, []]));
    for (let i = 0; i < 10; i++) {
        Object.values(ways).forEach(func => {
            const start = performance.now();
            let r = func(el);
            results[func].push(performance.now() - start);
            // console.log(r.length)
            if (r.length !== 100807) {
                throw 'wrong length ' + r.length;
            }
        })
    }

    return results;
}

