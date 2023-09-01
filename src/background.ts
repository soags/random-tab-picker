chrome.action.onClicked.addListener((currentTab: chrome.tabs.Tab) => {
  activeRandomTab(currentTab)
})

async function activeRandomTab(currentTab: chrome.tabs.Tab) {
  const windowTabs = await chrome.tabs.query({ windowId: currentTab.windowId })
  if (windowTabs.length < 2) {
    return
  }

  const randomTab = windowTabs[Math.floor(Math.random() * windowTabs.length)]
  if (!randomTab.id) {
    return
  }
  chrome.tabs.update(randomTab.id, { active: true })
}
