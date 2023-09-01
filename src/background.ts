chrome.action.onClicked.addListener(() => {})

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'open_random_tab':
      openRandomTab()
      break
    case 'close_and_open_random_tab':
      closeAndOpenRandomTab()
      break
  }
})

async function getCurrentTab() {
  let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  return tab
}

async function closeAndOpenRandomTab() {
  const currentTab = await getCurrentTab()
  if (currentTab && currentTab.id) {
    const windowId = currentTab.windowId
    chrome.tabs.remove(currentTab.id)
    openRandomTabFromWindow(windowId)
  }
}

async function openRandomTab() {
  const currentTab = await getCurrentTab()
  if (currentTab) {
    openRandomTabFromWindow(currentTab.windowId)
  }
}

async function openRandomTabFromWindow(windowId: number) {
  const currentWindowTabs = await chrome.tabs.query({ windowId })
  if (currentWindowTabs.length < 2) {
    return
  }

  const randomTab =
    currentWindowTabs[Math.floor(Math.random() * currentWindowTabs.length)]
  if (randomTab.id) {
    chrome.tabs.update(randomTab.id, { active: true })
  }
}
