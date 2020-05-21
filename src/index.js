var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/** @jsxRuntime classic */

var _React = React,
    useState = _React.useState,
    useMemo = _React.useMemo,
    useEffect = _React.useEffect;


function Paths(_ref) {
  var contents = _ref.contents,
      onSelect = _ref.onSelect;


  return React.createElement(
    'select',
    { value: -1, onChange: function onChange(event) {
        return onSelect(contents[+event.target.value]);
      } },
    React.createElement(
      'option',
      { key: -1, value: '' },
      '2. select content'
    ),
    contents.map(function (contentOfPath, index) {
      return React.createElement(
        'option',
        { key: index, value: index },
        contentOfPath.name
      );
    })
  );
}

var DEFAULT_PATH = '/content/posts';
export default function ContentURL(_ref2) {
  var repos = _ref2.repos,
      getContent = _ref2.getContent,
      onContent = _ref2.onContent;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      repo_full_name = _useState2[0],
      setName = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      contents_of_repo = _useState4[0],
      setRepo = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      contents = _useState6[0],
      setContents = _useState6[1];

  var _useState7 = useState(DEFAULT_PATH),
      _useState8 = _slicedToArray(_useState7, 2),
      path = _useState8[0],
      setPath = _useState8[1];

  useEffect(function () {
    if (!repo_full_name) return;
    var contentsOfRepo = getContent(repo_full_name);
    contentsOfRepo.then(function (res) {
      console.log(res);
      setContents(res.content);
      setRepo(res.content);
    });
  }, [repo_full_name]);

  return React.createElement(
    'p',
    null,
    React.createElement(
      'span',
      null,
      '/repos'
    ),
    React.createElement(
      'span',
      null,
      '/'
    ),
    React.createElement(
      'select',
      { value: repo_full_name || -1, onChange: function onChange(event) {
          return setName(event.target.value);
        } },
      React.createElement(
        'option',
        { key: -1, value: '' },
        '1. select repo'
      ),
      repos.map(function (repo, i) {
        return React.createElement(
          'option',
          { key: i, value: repo.full_name },
          repo.full_name
        );
      })
    ),
    React.createElement(
      'span',
      null,
      '/contents'
    ),
    React.createElement(
      'span',
      null,
      path
    ),
    Array.isArray(contents) && React.createElement(Paths, { contents: contents, onSelect: function onSelect(childContent) {
        setPath(path + '/' + childContent.name);
        setContents(childContent.content);
      } }),
    path !== DEFAULT_PATH && React.createElement(
      'button',
      { onClick: function onClick() {
          setContents(contents_of_repo);
          setPath(DEFAULT_PATH);
        } },
      '2.1 \u91CD\u65B0\u9009\u62E9'
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          if (!repo_full_name || Array.isArray(contents)) {
            alert('请先完成 1. 和 2. ');
            return;
          }
          // console.log(contents);
          onContent(contents.url, contents.sha);
        } },
      '3. \u5F00\u59CB\u7F16\u8F91'
    )
  );
}