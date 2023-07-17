/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 484:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const axios = __nccwpck_require__(619);

async function webrequest(url, method, payload, headers, username, password) {
  const auth = username && password ? { username, password } : null;
  const config = {
    url,
    method,
    auth,
    data: payload,
    headers
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = webrequest;


/***/ }),

/***/ 426:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 619:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(426);
const webrequest = __nccwpck_require__(484);

async function main() {
  try {
    // inputs from action
    const url = core.getInput('url');
    const methodInput = core.getInput('method');
    const method = methodInput.toLowerCase();
    const payloadInput = core.getInput('payload');
    const payload = payloadInput ? JSON.parse(payloadInput) : null;
    const headersInput = core.getInput('headers');
    const headers = headersInput ? JSON.parse(headersInput) : null;
    const username = core.getInput('username');
    const password = core.getInput('password');

    // current time
    const time = new Date().toTimeString();

    // http request to external API
    const response = await webrequest(
      url,
      method,
      payload,
      headers,
      username,
      password
    );

    const statusCode = response.status;
    const data = response.data;
    const outputObject = {
      url,
      method,
      payload,
      time,
      statusCode,
      data
    };

    const consoleOutputJSON = JSON.stringify(outputObject, undefined, 2);
    console.log(consoleOutputJSON);


    const outputJSON = JSON.stringify(outputObject);
    core.setOutput('output', outputJSON);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();

})();

module.exports = __webpack_exports__;
/******/ })()
;