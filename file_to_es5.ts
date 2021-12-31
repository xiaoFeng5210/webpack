import {parse} from "@babel/parser"
import * as babel from "@babel/core"
import * as fs from 'fs'

const code = fs.readFileSync('./test.js').toString();
const ast = parse(code, {sourceType: 'module'});
const result = babel.transformFromAstSync(ast, code, {
    presets: ['@babel/preset-env']
})
// 最后输出到一个文件里
fs.writeFileSync('./test.es5.js', result.code)
// console.log(result.code);