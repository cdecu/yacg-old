
- https://indepth.dev/posts/1435/view-state-selector-design-pattern?s=09
- https://www.npmjs.com/package/angular-cli-ghpages?s=09

- npmjs.com/package/ngx-markdown



* Add Linting
- in index.html
<script src="https://unpkg.com/jsonlint@1.6.3/web/jsonlint.js"></script>
  
- in main.js
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

- in Options    
  gutters: ['CodeMirror-lint-markers'],
  lint: true,
