import { existsSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function total(files) {
  return files.reduce((sum, file) => sum + statSync(file).size, 0);
}

function reduction(before, after) {
  return Number((((before - after) / before) * 100).toFixed(2));
}

const sourceHtml = ['html/index.html'];
const sourceCss = walk('css').filter((file) => extname(file) === '.css');
const sourceJs = walk('js').filter((file) => extname(file) === '.js');

const distFiles = walk('dist');
const distHtml = distFiles.filter((file) => extname(file) === '.html');
const distCss = distFiles.filter((file) => extname(file) === '.css');
const distJs = distFiles.filter((file) => extname(file) === '.js');

const metrics = {
  html: {
    sourceBytes: total(sourceHtml),
    buildBytes: total(distHtml),
    reductionPercent: reduction(total(sourceHtml), total(distHtml))
  },
  css: {
    sourceBytes: total(sourceCss),
    buildBytes: total(distCss),
    reductionPercent: reduction(total(sourceCss), total(distCss))
  },
  javascript: {
    sourceBytes: total(sourceJs),
    buildBytes: total(distJs),
    reductionPercent: reduction(total(sourceJs), total(distJs))
  }
};

const beforeTotal = metrics.html.sourceBytes + metrics.css.sourceBytes + metrics.javascript.sourceBytes;
const afterTotal = metrics.html.buildBytes + metrics.css.buildBytes + metrics.javascript.buildBytes;
metrics.total = {
  sourceBytes: beforeTotal,
  buildBytes: afterTotal,
  reductionPercent: reduction(beforeTotal, afterTotal)
};

console.log('BUILD_METRICS=' + JSON.stringify(metrics));
