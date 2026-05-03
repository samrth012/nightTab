# [![nightTab](asset/banner/banner-1400-560.png)](https://zombiefox.github.io/nightTab/)

A neutral new tab page accented with a chosen colour. Customise the layout, style, background and bookmarks in nightTab -- a custom start page.

| [See the demo in action](https://zombiefox.github.io/nightTab/) | [Install nightTab Extension](https://chrome.google.com/webstore/detail/nighttab/hdpcadigjkbcpnlcpbcohpafiaefanki) | [Install nightTab Add On](https://addons.mozilla.org/en-GB/firefox/addon/nighttab/) | [Buy me a coffee](https://www.buymeacoffee.com/zombieFox/) | [Join the community](https://www.reddit.com/r/nighttab/) |
|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| [<img src="./src/icon/icon-48.png" width="48px" height="48px">](https://zombiefox.github.io/nightTab/) | [![Chrome](asset/logo/chrome-48.png)](https://chrome.google.com/webstore/detail/nighttab/hdpcadigjkbcpnlcpbcohpafiaefanki) | [![Firefox](asset/logo/firefox-48.png)](https://addons.mozilla.org/en-GB/firefox/addon/nighttab/) | [![coffee](asset/logo/bymeacoffee-48.png)](https://www.buymeacoffee.com/zombieFox/) | [![Reddit](asset/logo/reddit-48.png)](https://www.reddit.com/r/nighttab/) |

| [Install nightTab for Safari](https://github.com/sa1ntsinner/nightTab/releases/latest) |
|:-------------:|
| [![Safari](asset/logo/safari-48.png)](https://github.com/sa1ntsinner/nightTab/releases/latest)

---

## macOS / Safari

This is a performance-improved build of [samrth012's Safari port](https://github.com/samrth012/nightTab) of [nightTab by zombieFox](https://github.com/zombieFox/nightTab). The changes compared to samrth012's build are small and low-risk:

- **Dropped moment.js** — replaced with native `Date` and `Intl.DateTimeFormat` (~−250 KB from the bundle)
- **Clock and date no longer rebuild the DOM every second** — only rebuild when the display settings actually change
- **Single shared timer** — one interval drives both clock and date, pauses when the tab is hidden
- **Debounced settings saves** — `localStorage` writes are throttled to ~500 ms instead of every keypress
- **Cross-browser API shim** — uses `browser.tabs` when available, falls back to `chrome.tabs`
- **WOFF2-only fonts** — dropped redundant TTF and WOFF files (~−680 KB from the bundle)

---

# Support

- [Project goals](https://github.com/zombieFox/nightTab/wiki/Project-goals)
- [Applying bookmark settings to all](https://github.com/zombieFox/nightTab/wiki/Applying-bookmark-settings-to-all)
- [Browser support](https://github.com/zombieFox/nightTab/wiki/Browser-support)
- [Cookies and cache](https://github.com/zombieFox/nightTab/wiki/Cookies-and-cache)
- [Data backup and restore](https://github.com/zombieFox/nightTab/wiki/Data-backup-and-restore)
- [Local background image](https://github.com/zombieFox/nightTab/wiki/Local-background-image)
- [Protected URLs](https://github.com/zombieFox/nightTab/wiki/Protected-URLs)
- [Recovering settings and bookmarks](https://github.com/zombieFox/nightTab/wiki/Recovering-settings-and-bookmarks)
- [Resetting when opening the browser](https://github.com/zombieFox/nightTab/wiki/Resetting-when-opening-the-browser)
- [Respecting your privacy](https://github.com/zombieFox/nightTab/wiki/Respecting-your-privacy)
- [Setting a background video or image](https://github.com/zombieFox/nightTab/wiki/Setting-a-background-video-or-image)
- [Setting nightTab as your Firefox homepage](https://github.com/zombieFox/nightTab/wiki/Setting-nightTab-as-your-Firefox-homepage)

# Development

When developing use:
- `npm start`

A development server will automatically open the project in your browser. Normally here: `http://localhost:8080`.


To build the project use:
- `npm run build`

A web ready folder will be created in `/dist/web/`.
A browser addon/extension ready zip will be created in `/dist/extension/`.

For the macOS/Safari build, see the [Building locally](#building-locally-macos) section above.

# Screenshots

[![nightTab Demo](asset/screenshot/screenshot-001.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-002.png)](https://zombiefox.github.io/nightTab/)

## Example nightTab setups:

- [Where to find these setups](https://github.com/zombieFox/nightTab/tree/main/asset/screenshot)
- [How to import these setups](https://github.com/zombieFox/nightTab/wiki/Data-backup-and-restore#restore-data)

[![nightTab Demo](asset/screenshot/screenshot-003.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-004.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-005.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-006.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-007.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-008.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-009.gif)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-010.png)](https://zombiefox.github.io/nightTab/)
[![nightTab Demo](asset/screenshot/screenshot-011.png)](https://zombiefox.github.io/nightTab/)
