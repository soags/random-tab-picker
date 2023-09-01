chrome.action.onClicked.addListener(() => {})

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'open_random_tab':
      openRandomTab()
      break
    case 'close_and_open_random_tab':
      closeCurrentTabAndOpenRandomTab()
      break
  }
})

chrome.tabs.onUpdated.addListener(updateBadge)

chrome.tabs.onActivated.addListener(updateBadge)

function updateBadge() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    chrome.action.setBadgeText({
      text: tabs.length.toString()
    })
    chrome.action.setBadgeBackgroundColor({
      color: '#000000'
    })
  })
}

function closeCurrentTabAndOpenRandomTab() {
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true },
    ([activeTab]) => {
      if (!activeTab) return

      if (activeTab.id) {
        chrome.tabs.remove(activeTab.id)
        openRandomTab()
      }
    }
  )
}

function openRandomTab() {
  chrome.tabs.query({ lastFocusedWindow: true }, (tabs) => {
    if (tabs.length < 2) return

    const randomTab = tabs[Math.floor(Math.random() * tabs.length)]
    if (randomTab.id) {
      chrome.tabs.update(randomTab.id, { active: true })
    }
  })
}
