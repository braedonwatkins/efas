import { TwitterApi } from "twitter-api-v2";

import { twitterConfig, tumblrConfig } from "./config";
import { FrameInfo } from "./types";

export const twitterUpload = async (frame: FrameInfo): Promise<FrameInfo> => {
  const client = new TwitterApi(twitterConfig);

  // You can use media IDs generated by v1 API to send medias!
  const mediaId = await client.v1.uploadMedia(`${frame.path}`);

  const resPost = await client.v2.tweetThread([
    {
      text: `Frame: ${frame.num}`,
      media: { media_ids: [mediaId] },
    },
  ]);

  if (await resPost) {
    console.log("Tweet", resPost, ":", resPost);
    return frame;
  } else throw new Error("Could not complete your post");
  console.log("Your post is complete!");
};

export const tumblrUpload = async (frame: FrameInfo): Promise<FrameInfo> => {
  return frame;
};

