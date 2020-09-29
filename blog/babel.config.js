module.exports = {
    presets: [
      ["@babel/preset-env", { "modules": false }],
      ['@vue/app', {
        useBuiltIns: 'entry'
      }]
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
      ]
    ]
  }