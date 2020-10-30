module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    // "@babel/preset-env",
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [ 
    "@babel/plugin-transform-arrow-functions", 
    "@babel/plugin-proposal-class-properties",
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "prismjs",
      {
        "languages": ["html", "css", "javascript", "php", "dart", "bash", "nginx", "sql"],
        "plugins": ["line-numbers"],
        "theme": "tomorrow-night"
      }
    ]
  ]
}
