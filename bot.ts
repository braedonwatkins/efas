console.log("Every Frame a Spider Starting!");

const { TwitterApi } = require("twitter-api-v2");
const config = require("./config.ts");

// console.log("debugging: loaded configs\n" + JSON.stringify(config, null, 4));

const client = new TwitterApi(config);

// DONE: Frame Picker
/*
    1. gets random num for num of frames remaining
    2. return number to reference for the tweet
 */
const pickFrame = (): number => {
  const max = 154556 + 1;
  const min = 367;

  let diff = max - min;

  let rand = Math.random();
  rand = Math.floor(rand * diff);
  rand += min;

  return rand;
};

//TODO: Free Frame
/*
    1. take in frame path
    2. move frame at that path to used
    3. return success (true) / fail (false)
*/
const freeFrame = (path: string): boolean => {
  return false;
};

//TODO: Path Frame
/*
  1. take in frame num & folder
  2. return string of frame at that path
*/
const pathFrame = (folder: string, frameNum: number): string =>
  `./frames/${folder}/${frameNum}`;

// TODO: generalize inside of postFrame function
const postFrame = async (pickFrame, freeFrame) => {
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
};

//TODO: Execute
// postFrame(pickFrame, freeFrame);

