import { FRAME_RATE, FRAME_NAME, FRAME_DIR, VIDEO_PATH } from "./const";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

// TODO: simplify by just ret seconds. realized after i didn't need to construct string. those damn interview problems threw me off.
export const numToStamp = (frameNum: number): string => {
  frameNum.toFixed(2);
  let time = {
    h: 0,
    m: 0,
    s: 0,
  };
  // 1 hours = 24f/s * 60s/m * 60m/h = 86400 f
  while (frameNum > 86400) {
    time.h++;
    frameNum -= 86400;
  }
  while (frameNum > 1440) {
    time.m++;
    frameNum -= 1440;
  }
  while (frameNum > 24) {
    time.s++;
    frameNum -= 24;
  }
  frameNum /= 24;
  time.s += frameNum;

  return `${String(time.h).padStart(2, "0")}:${String(time.m).padStart(
    2,
    "0"
  )}:${String(time.s).padStart(2, "0")}`;
};

export const getFrame = async (frameNum: number): Promise<string> => {
  //convert frame num to timestamp
  const frameStamp = numToStamp(frameNum);
  let retPath: string = "";

  let ret = new Promise((resolve, reject) => {
    ffmpeg(VIDEO_PATH)
      .on("filenames", (filenames: string[]) => {
        retPath = filenames[0].split("''")[0];
        console.log(`made file: ${retPath}`);
      })
      .on("progress", (progress) => {
        console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
      })
      .on("error", (err) => {
        console.log(`[ffmpeg] error: ${err.message}`);
        reject(err);
      })
      .on("end", () => {
        resolve(`${FRAME_DIR}/${retPath}`);
        return "[ffmpeg] finished";
      })
      .fps(FRAME_RATE)
      .screenshots({
        timestamps: [frameStamp],
        filename: FRAME_NAME,
        folder: FRAME_DIR,
      });
    // .output(`${FRAME_DIR}/${retPath}`);
  }).then((res) => {
    return `${res}`;
  });

  return ret;
};
