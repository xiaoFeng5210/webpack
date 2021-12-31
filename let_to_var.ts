import {parse} from "@babel/parser"
import traverse from "@babel/traverse"
import generate from "@babel/generator"

const code = `let a = 'let'; let b = 2`;
const ast = parse(code, {sourceType: 'module'});
console.log(ast);
// 遍历这个ast
traverse(ast, {
    // 当我每次进一个节点，我们就执行一个函数
    enter: item => {
        // 如果当前节点是一个声明
        if (item.node.type === 'VariableDeclaration') {
            if (item.node.kind === 'let') {
                item.node.kind = 'var'
            }
        }
    }
});
// 把ast 转变为代码
const result = generate(ast, {}, code);
console.log(result.code);