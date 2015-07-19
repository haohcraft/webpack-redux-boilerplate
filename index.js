delete process.env.BROWSER;

// Register babel to have ES6 support on the server
require("babel/register");

// Start the server app
if (process.env.NODE_ENV === "dev") {
    require("./webpack");
}

require("./server/server");

