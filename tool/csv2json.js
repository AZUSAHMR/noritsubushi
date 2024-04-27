const fs = require("node:fs/promises");
const path = require("node:path");

const PUBLIC_PATH = path.join(__dirname, "../public");
const DATA_PATH = path.join(__dirname, "../data");
const LINE_PATH = path.join(DATA_PATH, "line");

(async() => {
    const lineData = {};

    for(const filename of await fs.readdir(LINE_PATH)) {
        const line = path.basename(filename,".csv");
        lineData[line] = Object.fromEntries(
            (await fs.readFile(path.join(LINE_PATH,filename)))
                .toString()
                .split("\n")
                .map(x => x.split(","))
                .map(x => [x[0],parseFloat(x[1])*1000])
        );
    }
    
    await fs.writeFile(
        path.join(PUBLIC_PATH,"line.json"),
        JSON.stringify(lineData)
    );
})().then(() => process.exit(0));
