console.log("Every Frame a Spider Starting!");

const { TwitterApi } = require("twitter-api-v2");
const config = require("./config.ts");
const fs = require("fs");

const MAX_FRAME = 154556;
const MIN_FRAME = 367;

// console.log("debugging: loaded configs\n" + JSON.stringify(config, null, 4));

const client = new TwitterApi(config);

//TODO: Restructure!!
/*
  1. delete remaining/ and used/ directories
  2. delete reference to them i.e. .gitignore
  3. strip audio from video to take less space
  4. generate a .txt list of all frames MIN_FRAME - MAX_FRAME
  5. redo logic of all functions for the following workflow:
    0. check if list is empty
      0. if not empty continue
      1. if empty notify and stop running
    1. pick random frame 
    2. grab frame at its place on the list (w/ modulus)
      NOTE: the trick here is that we may not necessarily grab 
      the frame we asked for but we roll with whichever one we get
      make sure to reference this frame's #
    2. calculate time (down to milli) representing frame (fps=24)
    3. format time (HH:MM:SS.(mm))
    4. ffmpeg grab 1 frame at formatted time
      NOTE: make sure check to ensure no duping of millisecond edges
    6. freeFrame() simply subtracts from frame list now
*/

// DONE: Frame Picker
/*
    1. gets random num for num of frames remaining
    2. return number to reference for the tweet
 */
const pickFrame = (): number => {
  const max = MAX_FRAME + 1;
  const min = MIN_FRAME;

  let diff = max - min;

  let rand = Math.random();
  rand = Math.floor(rand * diff);
  rand += min;

  return rand;
};

//DONE: Free Frame
/*
    1. take in frame num
    2. move frame at that path to used
    3. return success (true) / fail (false)
*/
const freeFrame = (frameNum: number): boolean => {
  let oldPath: string = pathFrame("remaining", frameNum);
  let newPath: string = pathFrame("used", frameNum);

  fs.rename(oldPath, newPath, (err: string) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log(`${oldPath} has been successfully freed!`);
      return true;
    }
  });

  //TODO: find out why return false here always triggers
  //despite fs.rename(){} logic...
  return true;
  // return false; // if for some reason fs.rename doesn't trigger
};

//DONE: Path Frame
/*
  1. take in frame num & folder
  2. return string of frame at that path
*/
const pathFrame = (folder: string, frameNum: number): string => {
  return `./frames/${folder}/${frameNum}`;
};

// DONE: generalize inside of postFrame function
// TODO: frame alt text maybe?
const postFrame = async (
  pickFrame: () => number,
  freeFrame: (frameNum: number) => boolean
) => {
  const frameNum = pickFrame();
  const framePath = pathFrame("remaining", frameNum);

  const { data: createdTweet } = await client.v2.tweet(
    "Frame" + " " + frameNum.toString(),
    {
      //   poll: { duration_minutes: 120, options: ["Absolutely", "For sure!"] },
      //TODO: include image in post
    }
  );
  if (createdTweet) {
    console.log("Tweet", createdTweet.id, ":", createdTweet.text);

    const res = freeFrame(frameNum);
    if (res) {
      console.log("Frame", frameNum, "has been freed!");
    } else throw new Error("Frame not explicitly freed");
  } else throw new Error("Could not complete your post");
  console.log("Your post is complete!");
};

//DONE: Execute
// postFrame(pickFrame, freeFrame);
postFrame(pickFrame, freeFrame);

