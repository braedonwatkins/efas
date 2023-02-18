console.log("Every Frame a Spider Starting!");

import { getFrame } from "./ffmpeg";
import { getArr, getBorderIndex, removeFrame } from "./fs";
import { FrameInfo } from "./types";
import { twitterUpload, tumblrUpload } from "./uploads";

// DONE: Frame Picker
/*
    1. gets random num for num of frames remaining
    2. return number to reference for the tweet
 */
const pickFrameIndex = (arr: number[]): number => {
  const max = getBorderIndex(arr);
  const min = 0;

  let rand = Math.floor(Math.random() * (max - min + 1)) + min;

  return rand;
};

// // DONE: generalize inside of postFrame function
// // TODO: frame alt text maybe?
const postFrame = async () => {
  const arr = getArr();
  const frameIndex = await pickFrameIndex(arr);

  // TODO: ADD checking for failure here
  const frameNum = removeFrame(frameIndex, arr);

  // accounts for the +1 offset between my frames and stephen's
  let rawFrameNum = frameNum - 1;
  const framePath = await getFrame(rawFrameNum);

  const frame: FrameInfo = {
    num: frameNum,
    index: frameIndex,
    path: framePath,
  };

  try {
    await twitterUpload(frame);
  } catch (e) {
    console.log(e);
  }
  try {
    await tumblrUpload(frame);
  } catch (e) {
    console.log(e);
  }
};

//DONE: Execute
// postFrame(pickFrame, freeFrame);
postFrame();

