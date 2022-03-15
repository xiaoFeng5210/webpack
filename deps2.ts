// 请确保你的 Node 版本大于等于 14
// 请先运行 yarn 或 npm i 来安装依赖
// 然后使用 node -r ts-node/register 文件路径 来运行，
// 如果需要调试，可以加一个选项 --inspect-brk，再打开 Chrome 开发者工具，点击 Node 图标即可调试
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import { readFileSync } from 'fs'
import { resolve, relative, dirname } from 'path';

// 设置根目录
const projectRoot = resolve(__dirname, 'project_1');
type DepRelation = {[key: string]: {deps: string[], code: string}}
// 初始化一个空的depRelation 用于收集依赖
const depRelation: DepRelation = {};

collectCodeAndDeps(resolve(projectRoot, 'index.js'))

function collectCodeAndDeps(filePath: string) {
  const key = getProjectPath(filePath)
  const code = readFileSync(filePath).toString()
  depRelation[key] = { deps: [], code }
  const ast = parse(code, {sourceType: 'module'})
  traverse(ast, {
      enter: path => {
          if (path.node.type === 'ImportDeclaration') {
              // path.node.source.value 往往是一个相对路径，如 ./a.js，需要先把它转为一个绝对路径
              const depAbsolutePath = resolve(dirname(filePath), path.node.source.value)
              // 然后转为项目路径
              const depProjectPath = getProjectPath(depAbsolutePath)
              // 把依赖写进depRelation
              depRelation[key].deps.push(depProjectPath)
              return collectCodeAndDeps(depAbsolutePath)
          }
      }
  })
}

// 获取文件相对于根目录的相对路径
function getProjectPath(path: string) {
    return relative(projectRoot, path).replace(/\\/g, '/')
}