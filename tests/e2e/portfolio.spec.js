import { expect, test } from "@playwright/test";

const supportedViewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 720 },
];

test("mobile navigation works with pointer and keyboard input", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("./");

  const toggle = page.locator(".menu-toggle");
  await expect(toggle).toHaveAccessibleName("Open navigation menu");
  await toggle.tap();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#primary-navigation")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect(
    page.getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();

  await toggle.click();
  await page.mouse.click(8, 300);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await context.close();
});

test("project filters expose only matching cards and support arrow keys", async ({
  page,
}) => {
  await page.goto("./#projects");
  await expect(page.locator(".project-card:not([hidden])")).toHaveCount(4);
  await page.getByRole("button", { name: "Project Management" }).click();
  await expect(page.locator(".project-card:not([hidden])")).toHaveCount(1);
  await expect(page.locator(".project-card:not([hidden]) h3")).toHaveText(
    "Motorpool Management System",
  );

  const creative = page.getByRole("button", { name: "Creative Content" });
  await creative.focus();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("button", { name: "All", exact: true }),
  ).toBeFocused();
  await expect(page.locator(".project-card:not([hidden])")).toHaveCount(4);

  await page.getByRole("button", { name: "Creative Content" }).click();
  await expect(page.locator(".project-card:not([hidden])")).toHaveCount(2);
  await expect(page.locator(".project-card:not([hidden]) h3")).toHaveText([
    "Landing Pages",
    "Portfolio Website",
  ]);
});

test("command palette traps focus, closes with Escape, and restores focus", async ({
  page,
}) => {
  await page.goto("./");
  const trigger = page.getByRole("button", { name: /quick links/i });
  const dialog = page.getByRole("dialog", { name: "Go to a section" });

  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(page.getByLabel("Search destinations")).toBeFocused();

  const closeButton = page.getByRole("button", {
    name: "Close quick navigation",
  });
  const lastCommand = dialog.getByRole("button", { name: "GitHub profile" });
  await closeButton.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(lastCommand).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await page.keyboard.press("Control+k");
  await page.getByLabel("Search destinations").fill("case");
  await page.keyboard.press("Enter");
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#projects$/);
});

test("contact form keeps data local and uses native validation", async ({
  page,
}) => {
  await page.goto("./#contact");
  const form = page.locator("#contact-form");
  const initialUrl = page.url();

  await form.getByRole("button", { name: "Continue in Email" }).click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page).toHaveURL(initialUrl);
  await expect(form).toHaveAttribute(
    "action",
    "mailto:mjohnbenedictx@gmail.com",
  );
});

test("reduced motion disables animation and legacy motion layers are absent", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");

  await expect
    .poll(() =>
      page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    )
    .toBe("auto");
  await expect(page.locator("canvas, .custom-cursor, .loader")).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => document.getAnimations().length))
    .toBe(0);
});

for (const viewport of supportedViewports) {
  test(`has no project console errors or horizontal overflow at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    const messages = [];
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        messages.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) =>
      messages.push(`pageerror: ${error.message}`),
    );

    await page.setViewportSize(viewport);
    await page.goto("./");
    await page.locator("#footer").scrollIntoViewIfNeeded();

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth - document.body.clientWidth,
      document:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    }));

    expect(overflow.body).toBeLessThanOrEqual(0);
    expect(overflow.document).toBeLessThanOrEqual(0);
    expect(messages).toEqual([]);
  });
}

test("content and contact fallback remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("./");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Case studies with verified details." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "mjohnbenedictx@gmail.com" }),
  ).toHaveAttribute("href", "mailto:mjohnbenedictx@gmail.com");
  await context.close();
});

test("content images must declare dimensions and defer below-the-fold loading", async ({
  page,
}) => {
  await page.goto("./");
  const problems = await page.locator("main img").evaluateAll((images) =>
    images.flatMap((image) => {
      const issues = [];
      if (!image.hasAttribute("width") || !image.hasAttribute("height"))
        issues.push("missing dimensions");
      if (image.closest("section")?.id !== "hero" && image.loading !== "lazy")
        issues.push("not lazy loaded");
      return issues.map(
        (issue) => `${image.currentSrc || image.src}: ${issue}`,
      );
    }),
  );

  expect(problems).toEqual([]);
});
