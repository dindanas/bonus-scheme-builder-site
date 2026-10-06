(function () {
  "use strict";

  const text = (element) => element && element.textContent.replace(/\s+/g, " ").trim();

  const replaceExactText = (from, to) => {
    document.querySelectorAll("button, p, span, h1, h2").forEach((element) => {
      if (text(element) === from) element.textContent = to;
    });
  };

  const downloadButton = () =>
    Array.from(document.querySelectorAll("button")).find(
      (button) => text(button) === "Download Excel"
    );

  const addSummaryExport = () => {
    const summaryTitle = Array.from(document.querySelectorAll("h1")).find(
      (heading) => text(heading) === "Your bonus scheme summary"
    );

    if (!summaryTitle || document.getElementById("summary-export")) return;

    const startOver = Array.from(document.querySelectorAll("button")).find(
      (button) => text(button) === "Start over"
    );
    if (!startOver) return;

    const card = document.createElement("section");
    card.id = "summary-export";
    card.setAttribute("aria-labelledby", "summary-export-title");
    card.style.cssText = [
      "margin: 2rem 0 1rem",
      "padding: 1.5rem",
      "border: 1px solid #c7ddd4",
      "border-radius: 1rem",
      "background: #e8f4ee",
      "text-align: center"
    ].join(";");
    card.innerHTML = [
      '<h2 id="summary-export-title" style="margin:0;color:#173b38;font-size:1.25rem;font-weight:700">Ready to share your scheme?</h2>',
      '<p style="margin:.55rem auto 1rem;max-width:38rem;color:#526b64;line-height:1.5">Download an Excel copy of the current scheme, including its assumptions and scenario results.</p>',
      '<button type="button" style="border:0;border-radius:.65rem;background:#173b38;color:#fff;padding:.75rem 1rem;font:inherit;font-weight:600;cursor:pointer">Download Excel</button>'
    ].join("");
    card.querySelector("button").addEventListener("click", () => downloadButton()?.click());
    startOver.parentElement.insertBefore(card, startOver);
  };

  const updateCopy = () => {
    replaceExactText("Try an example", "Use this as my starting point");
    replaceExactText("Try the example", "Use this example");
    replaceExactText("Build my own scheme", "Start my scheme from scratch");
    replaceExactText("Start building", "Start from scratch");
    replaceExactText("Edit setup", "Edit starting setup");
    replaceExactText("Edit your setup", "Edit starting setup");
    addSummaryExport();
  };

  new MutationObserver(updateCopy).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  updateCopy();
})();
