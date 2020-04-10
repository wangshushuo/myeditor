/**
 * 判断是不是边界
 * @param {string} str yaml配置的开始或结尾（边界）
 */
function isEdge(str) {
  return /^---/.test(str);
}

/**
 * 从内容中提取出yaml配置部分，其余部分为博客正文
 * @param {array} blogContentArray 博客内容（包括配置），以换行符分割为数组
 */
export function getBlogMeta(blogContentArray) {
  if (!Array.isArray(blogContentArray)) return;
  if (blogContentArray.length === 0) return;
  const FIRST_LINE = 0;
  if (!isEdge(blogContentArray[FIRST_LINE])) return;
  let END_LINE = 1;
  try {
    END_LINE = findMetaEnd(blogContentArray);
  } catch (error) {
    alert("内容错误，没有找到结尾的---")
  }
  const blogMeta = blogContentArray.slice(FIRST_LINE + 1, END_LINE - 1);
  const blogBody = blogContentArray.slice(END_LINE);
  return [blogMeta, blogBody];
}

/**
 * 从博客内容数组中找到配置信息的最后一行，用于分割博客
 * @param {array} blogContentArray 博客内容的数组
 */
function findMetaEnd(blogContentArray) {
  let i = 1;
  let max = blogContentArray.length;
  while (i < max) {
    if (isEdge(blogContentArray[i])) break;
    i++;
  }
  if (i === max) throw new Error("没有找到结尾的---")
  return i + 1;
}

/**
 * 将arrayItem行的文字内容提取出来，例如，将"- abc"或者"  - bcd "其中的“abc"、“bcd”提取出来
 * @param {string} content 被标记为arrayItem的行的内容
 */
function getItemContent(content) {
  const reg = /^( *- *)([^ ]+)/; // 匹配减号和空格
  const match = content.match(reg);
  if (!match) return "";
  if (!Array.isArray(match)) return "";
  if (match.length === 3) {
    return match[2];
  } else {
    return "";
  }
}


function arrayItem(content) {
  return { type: 'arrayItem', value: getItemContent(content) }
}

/**
 * 将一行标记为key与value，或数组的名字，或数组的item
 * @param {string} lineContent 一行的内容
 */
function isKeyThenSplit(lineContent) {
  const match = lineContent.match(/^(\w+) *: *(.*)/);
  if (!Array.isArray(match)) {
    return arrayItem(lineContent);
  }
  if (match[2] === "") {
    return {
      type: "arrayName",
      name: match[1],
    }
  }
  return {
    type: "nameAndValue",
    name: match[1],
    value: match[2]
  }
}

/**
 * 将yaml的字符串数组转化为js对象字面量
 * @param {array} metas yaml配置的内容的数组
 */
export function convertYaml(metas) {
  const typedMetaLine = metas.map(item => isKeyThenSplit(item));
  let currentArrayName = "";
  return typedMetaLine.reduce((memo, item, index) => {
    switch (item.type) {
      case "nameAndValue":
        memo[item.name] = item.value.replace(/^"/, "").replace(/"$/, "");
        if (item.name === 'toc') {
          memo['toc'] = item.value === 'true';
        }
        break;
      case "arrayName":
        currentArrayName = item.name;
        memo[item.name] = [];
        break;
      case "arrayItem":
        memo[currentArrayName].push(item.value)
        break;
      default:
        break;
    }
    return memo;
  }, {})
}

/**
 * 将yaml配置的js对象字面量转化为字符串数组
 * @param {object} meta yaml配置的对象
 */
export function deConvertYaml(meta) {
  const metaArray = Object.keys(meta).map(key => {
    const value = meta[key];
    if (Array.isArray(value)) {
      const values = value.map(v => `- ${v}`);
      values.unshift(key+':');
      return values.join('\n')
    }
    if (value === true) return key + ': true';
    if (value === false) return key + ': false';
    return `${key}: ${meta[key]}`
  })
  metaArray.unshift("---")
  metaArray.push("---");
  return metaArray
}