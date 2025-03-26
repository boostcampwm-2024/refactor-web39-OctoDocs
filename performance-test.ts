async function performanceTest(page) {
  await page.goto("https://octodocs.local");
  const element = await page.getByTestId("rf__node-4");

  // tanstack이 띄워져 있으면 제거
  const tanstackClose = await page.locator(
    'button[aria-label="Close tanstack query devtools"]'
  );
  if (tanstackClose) {
    await tanstackClose.click();
  }

  await element.scrollIntoViewIfNeeded();
  await element.click();
  const document = await page.locator('div[contenteditable="true"]');
  await document.waitFor({ state: "visible" }); // 요소가 보일 때까지 기다림
  await document.click();
  // "hello world"를 차례대로 입력
  await page.keyboard.type("h", { delay: 100 });
  await page.keyboard.type("e", { delay: 100 });
  await page.keyboard.type("l", { delay: 100 });
  await page.keyboard.type("l", { delay: 100 });
  await page.keyboard.type("o", { delay: 100 });
  await page.keyboard.type(" ");
  await page.keyboard.type("w", { delay: 100 });
  await page.keyboard.type("o", { delay: 100 });
  await page.keyboard.type("r", { delay: 100 });
  await page.keyboard.type("l", { delay: 100 });
  await page.keyboard.type("d", { delay: 100 });

  // await page.locator('input[type="text"]').fill(""); // 기존 값 지우기
  // Expect a title "to contain" a substring.
}

module.exports = { performanceTest };
