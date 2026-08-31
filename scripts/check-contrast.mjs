const palettePairs = [
  ["primary text on page", "#f1f5f9", "#060a12"],
  ["secondary text on page", "#a8b3c3", "#060a12"],
  ["muted text on page", "#748196", "#060a12"],
  ["secondary text on surface", "#a8b3c3", "#0b111d"],
  ["muted text on surface", "#748196", "#0b111d"],
  ["cyan accent on page", "#22d3ee", "#060a12"],
  ["button text on cyan", "#031015", "#22d3ee"],
];

const luminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const failures = [];

for (const [label, foreground, background] of palettePairs) {
  const first = luminance(foreground);
  const second = luminance(background);
  const ratio =
    (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);

  if (ratio < 4.5) {
    failures.push(`${label}: ${ratio.toFixed(2)}:1`);
  }
}

if (failures.length) {
  console.error(`WCAG AA contrast failures:\n${failures.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(
    `Checked ${palettePairs.length} text/background pairs: all meet WCAG AA.`,
  );
}
