console.log("Every Frame a Spider Starting!");

const { TwitterApi } = require("twitter-api-v2");
const config = require("./config.ts");

// console.log("debugging: loaded configs\n" + JSON.stringify(config, null, 4));

const client = new TwitterApi(config);

// TODO: Frame Picker
/*
    1. gets random num for num of frames remaining
    2. return number to reference for the tweet
 */
const pickFrame = (): number => {
  return -1337;
};

//TODO: Free Frame
/*
    1. take in path to frame
    2. delete frame at that path
    3. return success (true) / fail (false)
*/
const freeFrame = (path: string): boolean => {
  return false;
};

// TODO: generalize inside of postFrame function
const postFrame = async (pickFrame, freeFrame) => {
  const frameNum = pickFrame();
  const framePath = `./frames/remaining/${frameNum}`;

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

