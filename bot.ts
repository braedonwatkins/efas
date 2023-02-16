console.log("Every Frame a Spider Starting!");

import { TwitterApi } from "twitter-api-v2";
import { config } from "./config";
import { getFrame } from "./ffmpeg";
import { getArr, getBorderIndex, removeFrame } from "./fs";

const client = new TwitterApi(config);

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
  const frameNum = removeFrame(frameIndex, arr);

  // accounts for the +1 offset between my frames and stephen's
  let rawFrameNum = frameNum - 1;
  const framePath = await getFrame(rawFrameNum);

  // You can use media IDs generated by v1 API to send medias!
  const mediaId = await client.v1.uploadMedia(`${framePath}`);

  const resPost = await client.v2.tweetThread([
    {
      text: `Frame: ${frameNum}`,
      media: { media_ids: [mediaId] },
    },
  ]);

  if (await resPost) {
    console.log("Tweet", resPost, ":", resPost);
  } else throw new Error("Could not complete your post");
  console.log("Your post is complete!");
};

//DONE: Execute
// postFrame(pickFrame, freeFrame);
postFrame();

