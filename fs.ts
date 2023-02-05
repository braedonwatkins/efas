import fs from "fs";
import {
  FRAME_DIR,
  FRAME_LIST,
  MIN_FRAME,
  MAX_FRAME,
  TOTAL_FRAME,
} from "./const";

//TODO: FIX WEIRD INDEXING NONSENSE W TOTAL_FRAME

// CHECKED: Working
export const getArr = (): number[] => {
  let data = fs.readFileSync(`${FRAME_LIST}`, "utf-8");
  let arr = data.split(",").map((num) => Number(num));

  return arr;
};

//CHECKED: Working
export const getBorderIndex = (arr: number[]) => {
  const count = arr[TOTAL_FRAME + 1];
  const index = MAX_FRAME - count + 1;

  return index;
};

//CHECKED: Working
export const removeFrame = (frameNum: number, arr: number[]) => {
  arr[TOTAL_FRAME + 1]++;
  const index = getBorderIndex(arr);

  //TODO: fix weird cases but necessary for now
  if (index < frameNum || index < 0)
    throw new Error(
      `Logic error in frame selection. Undefined behavior could occur.\n frameNum: ${frameNum}\n index: ${index}`
    );

  let temp = frameNum;
  frameNum = arr[index];
  arr[index] = temp;

  // Write the CSV string to a file
  let csv = arr.join(",") + "\n";

  fs.writeFileSync(`${FRAME_LIST}`, csv);
};

//CHECKED: Working
export const getRemainingUsedFrames = (
  arr: number[]
): { rem: number[]; use: number[] } => {
  const index = getBorderIndex(arr);

  let remaining: number[] = arr.slice(0, index);
  let used: number[] = arr.slice(index, TOTAL_FRAME + 1);

  // console.log({ rem: remaining, use: used });
  return { rem: remaining, use: used };
};

//CHECKED: Working
const seed = () => {
  const arr: number[] = [];
  if (!fs.existsSync(FRAME_DIR)) {
    fs.mkdirSync(FRAME_DIR);
  }

  for (let i = MIN_FRAME; i <= MAX_FRAME; i++) {
    arr.push(i);
  }
  // Write the CSV string to a file
  arr.push(0); //NOTE: may need to be 1 just test
  let csv = arr.join(",") + "\n";

  fs.writeFileSync(`${FRAME_LIST}`, csv);
};

//CHECKED: Working
// TEST ~30ms
const timer = () => {
  const start = Date.now();
  seed();
  const end = Date.now();
  console.log(`Execution time: ${end - start} ms`);
  rmdir();
};

//CHECKED: Working
const rmdir = () => {
  fs.rm(FRAME_DIR, { recursive: true }, (e) => {
    if (e) console.error(e);
    else console.log(`successfully deleted ${FRAME_DIR}`);
  });
};

// Command Line Arguments:
if (process.argv[2] === "seed") {
  seed();
} else if (process.argv[2] === "delete") {
  rmdir();
} else if (process.argv[2] === "time") {
  timer();
} else {
  console.error(
    `seed.ts ${process.argv.slice(
      2,
      3
    )} is invalid! I hope you know what you're doing!`
  );
}

