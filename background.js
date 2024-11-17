chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "translate") {
    const API_KEY = "AIzaSyDRo39mCsuVcAjtU4FS4MTnRp_nKsQqb8Q";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: message.text, // متنی که نیاز به ترجمه دارد
        target: "fa", // زبان مقصد
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.translations && data.data.translations.length > 0) {
          sendResponse({ translatedText: data.data.translations[0].translatedText });
        } else {
          sendResponse({ error: "Translation failed: Invalid API response" });
        }
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });

    // برای مدیریت درخواست async
    return true;
  }
});
