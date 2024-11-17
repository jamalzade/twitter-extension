// همگام‌سازی وضعیت دکمه‌ها هنگام باز کردن popup
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getStatus" }, (response) => {
    if (response) {
      document.getElementById("toggleFont").checked = response.fontEnabled;
      document.getElementById("toggleReaderMode").checked = response.readerModeEnabled;
    }
  });
});

// مدیریت تغییر وضعیت دکمه تغییر فونت
document.getElementById("toggleFont").addEventListener("change", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleFont" });
  });
});

// مدیریت تغییر وضعیت دکمه حالت مطالعه
document.getElementById("toggleReaderMode").addEventListener("change", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleReaderMode" });
  });
});
