---
# Content index for search
# adapted from tipue-search
layout: null
---
{%- assign excluded_files = site.ccs_search.exclude.files -%}
const ccs_search = [
{%- for document in site.documents -%}
  {%- unless document.exclude_from_search == true or excluded_files contains document.path -%}
  {
    "title": {{ document.title | smartify | strip_html | normalize_whitespace | jsonify }},
	"chapter": {{ document.chapter | jsonify }},
    "text": {{ document.content | strip_html | normalize_whitespace | jsonify }},
    "url": {{ document.url | relative_url | jsonify }}
  }{%- unless forloop.last -%},{%- endunless -%}
{%- endfor -%}
];
