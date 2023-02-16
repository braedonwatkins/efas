import { isProd } from "./config";
export const MAX_FRAME = 156018 + 1; // +1 offset for consistency w manual frames
export const MIN_FRAME = 1830 + 1; // +1 offset for consistency w manual frames

export const TOTAL_FRAME = MAX_FRAME - MIN_FRAME;
export const FRAME_RATE = 24;

export const PREFIX = "/home/ec2-user/bot";

let frame_dir, frame_list, video_path;

if (isProd) {
  frame_dir = `fs`;
  frame_list = `${PREFIX}/${frame_dir}/framelist.csv`;
  video_path = `${PREFIX}/spiderverse.mp4`;
} else {
  frame_dir = `./fs`;
  frame_list = `${frame_dir}/framelist.csv`;
  video_path = `./spiderverse.mp4`;
}
export const FRAME_DIR = frame_dir;
export const FRAME_LIST = frame_list;
export const VIDEO_PATH = video_path;

export const FRAME_NAME = "frame.png";

