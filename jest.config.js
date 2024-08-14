module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transformIgnorePatterns: [
    "/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)",
  ],
  transform: {
    // process `*.js` files with `babel-jest`
    ".*\\.(js)$": "babel-jest",
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "./src/$1",
  },
};
