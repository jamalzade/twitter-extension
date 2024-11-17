let fontEnabled = false;
let readerModeEnabled = false;
let observer = null;

// تابع: اعمال فونت وزیر
function applyVazirFont() {
  const elements = document.querySelectorAll("body, div, p, span, a");
  elements.forEach((el) => {
    if (/[\u0600-\u06FF]/.test(el.textContent)) {
      el.style.fontFamily = "'Vazir', sans-serif";
      el.style.lineHeight = "1.8";
      el.style.fontSize = "16px";
      el.style.direction = "rtl";
      el.style.textAlign = "justify";
    }
  });
}

// تابع: بازنشانی فونت به حالت پیش‌فرض
function resetFont() {
  const elements = document.querySelectorAll("body, div, p, span, a");
  elements.forEach((el) => {
    el.style.fontFamily = "";
    el.style.lineHeight = "";
    el.style.fontSize = "";
    el.style.direction = "";
    el.style.textAlign = "";
  });
}

// تابع: فعال کردن حالت مطالعه
function enableReaderMode() {
  const nonTextElements = document.querySelectorAll("img, video, iframe, button, input, aside");
  nonTextElements.forEach((el) => (el.style.display = "none"));

  const textElements = document.querySelectorAll("body, div, p, span, a");
  textElements.forEach((el) => {
    el.style.fontFamily = "'Vazir', sans-serif";
    el.style.lineHeight = "1.8";
    el.style.fontSize = "18px";
    el.style.direction = "rtl";
    el.style.textAlign = "justify";
  });

  document.body.style.backgroundColor = "#f4f4f4";
  document.body.style.color = "#333";
}

// تابع: غیرفعال کردن حالت مطالعه
function disableReaderMode() {
  const allElements = document.querySelectorAll("*");
  allElements.forEach((el) => {
    el.style.display = "";
    el.style.fontFamily = "";
    el.style.lineHeight = "";
    el.style.fontSize = "";
    el.style.direction = "";
    el.style.textAlign = "";
  });

  document.body.style.backgroundColor = "";
  document.body.style.color = "";
}

// نظارت بر تغییرات DOM برای اعمال تغییرات جدید
function observeDynamicContent() {
  if (observer) {
    observer.disconnect();
  }

  observer = new MutationObserver(() => {
    if (fontEnabled) applyVazirFont();
    if (readerModeEnabled) enableReaderMode();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// مدیریت پیام‌ها از popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleFont") {
    fontEnabled = !fontEnabled;
    fontEnabled ? applyVazirFont() : resetFont();
    sendResponse({ status: fontEnabled });
  }

  if (message.action === "toggleReaderMode") {
    readerModeEnabled = !readerModeEnabled;
    readerModeEnabled ? enableReaderMode() : disableReaderMode();
    sendResponse({ status: readerModeEnabled });
  }

  if (message.action === "getStatus") {
    sendResponse({
      fontEnabled,
      readerModeEnabled,
    });
  }
});

// شروع نظارت بر تغییرات صفحه
observeDynamicContent();
