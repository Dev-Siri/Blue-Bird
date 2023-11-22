import { querySelectorMemoized } from "../utils";

export default function head() {
  const observer = new MutationObserver(head);
  const titleElement = querySelectorMemoized("title");

  if (!document.title.endsWith("X")) return;

  observer.disconnect();

  if (document.title === "X") {
    if (location.pathname === "/messages")
      document.title = "Messages / Twitter";
    else document.title = "Twitter";
  } else {
    document.title = document.title.replace("/ X", "/ Twitter");
  }

  if (document.title === "X (@X) / Twitter")
    document.title = "Twitter (@twitter) / Twitter";

  // The check is a bit more specific to narrow down inaccuracies
  if (document.title.includes("Posts with replies by"))
    document.title = document.title.replace(
      "Posts with replies",
      "Tweets with replies"
    );

  if (document.title.includes("Media posts by"))
    document.title = document.title.replace("Media posts", "Media tweets");

  if (document.title.includes("Posts liked by"))
    document.title = document.title.replace("Posts liked", "Tweets liked");

  if (document.title.includes("Users who liked this post"))
    document.title = document.title.replace(
      "Users who liked this post",
      "Users who liked this tweet"
    );

  if (document.title.includes("Quotes of this post"))
    document.title = document.title.replace(
      "Quotes of this post",
      "Quotes of this tweet"
    );

  if (document.title.includes("Users who reposted this post"))
    document.title = document.title.replace(
      "Users who reposted this post",
      "Users who retweeted this tweet"
    );

  const postTitleRegex = /(^| )on [^\s:]+(?=[: ]|$)/g;
  document.title = document.title.replace(postTitleRegex, " on Twitter");

  const config = { childList: true };
  observer.observe(titleElement!, config);
}
