/* Test writing post to developer's account */
const PollTest = async () => {
  const { data: createdTweet } = await client.v2.tweet(
    "did my twitter bot work?",
    {
      poll: { duration_minutes: 120, options: ["Absolutely", "For sure!"] },
    }
  );
  console.log("Tweet", createdTweet.id, ":", createdTweet.text);
};

