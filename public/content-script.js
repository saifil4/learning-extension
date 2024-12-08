chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getLanguage") {
    console.log("Content script received message: ", message);
    const lang = getPageLang();
    sendResponse({ language: lang });
  }
  return true; // Indicates you will send an asynchronous response
});

const getPageLang = () => {
  let pageLang = document.documentElement.lang;

  if (pageLang) {
    return `Page language: ${pageLang}`;
  } else {
    return "Page language is not set.";
  }
};
