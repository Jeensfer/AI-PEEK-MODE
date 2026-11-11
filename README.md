# AI Mode Peek

Select text on any web page and see **Google AI Mode**'s answer in a small window right next to your cursor. No new tab, and it uses your own signed-in Chrome profile.

## Install (any desktop Chromium browser: Chrome, Edge, Brave, Arc, Opera)

1. Click **Code → Download ZIP** on this page and unzip it.
2. Open `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the unzipped folder (the one containing `manifest.json`).
5. Reload any tabs that were already open.

## Use

- Select text, then click the 🔍 bubble that appears, or press **Alt+S**.
- A small window opens next to your cursor with Google AI Mode results.
- Click the toolbar icon to switch the extension on/off, or change:
  - **Open instantly on select**: skip the bubble and open the window as soon as you select text.
  - **Close when I click away**: close the window when you click back into another Chrome window.

## Known limitations

- Desktop browsers only. Chrome on Android and iOS doesn't support extensions.
- It doesn't work in Chrome's built-in PDF viewer, on `chrome://` pages, or on the Chrome Web Store, because Chrome blocks extensions there.
- Selections inside embedded iframes aren't detected.
- Sign in to Google in the browser profile where you installed it, otherwise AI Mode may ask you to sign in.
- AI Mode availability depends on your region and Google account.

## Privacy

The extension collects nothing and has no servers. When you trigger a search, the text you selected is sent to Google (`google.com/search?udm=50`) in a normal browser window, exactly as if you had typed it there. Your on/off preferences are stored locally in your browser.
