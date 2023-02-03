import { Frame, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// async function main() {
//   const frames = await prisma.frame.create({
//     data: { setId: 2, frameCount: 0 },
//   });
//   console.log(frames);
// }

// init for # frames = to MAX - MIN
// using 100 for now
const genNum = 100;
async function init() {
  // create frameset
  await prisma.frameSet.create({
    data: { id: 1, remaining: genNum },
  });
  let frameSet = await prisma.frameSet.findFirst();
  let id = frameSet!.id;

  for (let i = 1; i <= genNum; i++) {
    await prisma.frame.create({
      data: { setId: id, frameCount: i },
    });
  }
  console.log(frameSet);

  // create frames
  // set count on frameset
}

async function getRemaining(): Promise<number> {
  const remainingJSON = await prisma.frameSet.findFirst({
    where: {
      id: 1,
      NOT: {
        remaining: null,
      },
    },
    select: {
      remaining: true,
    },
  });

  return remainingJSON!.remaining!;
}

async function decRemaining(rem: number): Promise<number> {
  const remainingJSON = await prisma.frameSet.update({
    where: {
      id: 1,
    },
    data: {
      remaining: --rem,
    },
  });

  return remainingJSON!.remaining!;
}

async function getUsedFrames() {
  const remaining: number = await getRemaining();

  const usedFramesJSON = await prisma.frameSet.findUnique({
    where: {
      id: 1,
    },
    select: {
      frame: {
        where: {
          id: {
            gt: remaining,
          },
        },
      },
    },
  });

  const usedFrames = usedFramesJSON!.frame!;
  console.log("Used Frames: ", usedFrames);
  return usedFrames;
}

async function getRemainingFrames() {
  const remaining: number = await getRemaining();

  const remainingFramesJSON = await prisma.frameSet.findUnique({
    where: {
      id: 1,
    },
    select: {
      frame: {
        where: {
          id: {
            lte: remaining,
          },
        },
      },
    },
  });

  const remainingFrames = remainingFramesJSON!.frame!;
  console.log("Remaining Frames: ", remainingFrames);

  return remainingFrames;
}

async function getFrameById(queryId: number) {
  const frameJSON = await prisma.frame.findUnique({
    where: {
      id: queryId,
    },
  });

  return frameJSON!;
}

async function swapByIds(id1: number, id2: number) {
  const tempId = -420;
  const row1 = await prisma.frame.findFirst({ where: { id: id1 } });
  const row2 = await prisma.frame.findFirst({ where: { id: id2 } });

  if (!row1 || !row2) {
    throw new Error(
      `One of the rows with id ${id1} or ${id2} could not be found.`
    );
  }

  await prisma.frame.update({
    where: { id: id1 },
    data: { ...row1, id: tempId },
  });

  const ret = await prisma.frame.update({
    where: { id: id2 },
    data: row1,
  });

  await prisma.frame.update({
    where: { id: tempId },
    data: row2,
  });

  return ret;
}

async function selectFrame() {}

async function shuffleIteration(remaining: number): Promise<Frame> {
  //TODO: account for remaining === 0
  const randFrameNum = Math.floor(Math.random() * remaining + 1);

  // // get frame at rand & remaining
  // let randFrame = await getFrameById(randFrameNum);
  // let remFrame = await getFrameById(remaining);

  // hold temp & swap
  const randFrame = swapByIds(randFrameNum, remaining);

  // decrement remaining number
  await decRemaining(remaining);

  // return frame to pull
  return randFrame;
}

async function main() {
  // await init()
  //   .catch((e) => {
  //     console.error(e.message);
  //   })
  //   .finally(async () => {
  //     await prisma.$disconnect;
  //   });

  // await getRemainingFrames()
  //   .catch((e) => {
  //     console.error(e.message);
  //   })
  //   .finally(async () => {
  //     await prisma.$disconnect;
  //   });

  let rem = await getRemaining();

  let frame = await shuffleIteration(rem);
  console.log(frame, await getRemaining());

  // await getRemainingFrames();
  await getUsedFrames();
}
main();

// async function clear() {
//   await prisma.frame.deleteMany({});
//   await prisma.frameSet.deleteMany({});
// }

