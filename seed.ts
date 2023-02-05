import fs from "fs";
const dir = "./fs";

// import * as defaults from "./bot";
import { MIN_FRAME, MAX_FRAME } from "./const";

if (process.argv[2] === "seed") {
  seed();
} else if (process.argv[2] === "delete") {
  rmdir();
} else if (process.argv[2] === "time") {
  timer();
} else {
  console.error(`seed.ts ${process.argv.slice(2, 3)} is invalid!`);
}

function seed() {
  let data = [];
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  for (let i = MIN_FRAME; i < MAX_FRAME; i++) {
    data.push({ id: i - MIN_FRAME, value: `Value ${i}` });
    if (data.length === 10000) {
      fs.appendFileSync(`${dir}/data.json`, JSON.stringify(data));
      data = [];
    }
  }

  if (data.length > 0) {
    fs.appendFileSync(`${dir}/data.json`, JSON.stringify(data));
  }
}

// TEST ~30ms
async function timer() {
  const start = Date.now();
  await seed();
  const end = Date.now();
  console.log(`Execution time: ${end - start} ms`);
  rmdir();
}

function rmdir() {
  fs.rm(dir, { recursive: true }, (e) => {
    if (e) console.error(e);
    else console.log(`successfully deleted ${dir}`);
  });
}

