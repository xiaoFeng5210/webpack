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