let myWindowId = null

function nhc_toggleNinjaHackerCat() {
    browser.tabs.query({ windowId: myWindowId, pinned: true })
        .then(async tabs => {
            let found = false
            for (let tab of tabs) {
                if (tab.title == "Ninja Hacker Cat") {
                    found = true
                }
            }
            if (!found) {
                browser.tabs.create(
                    {
                        url: "/panel.html",
                        pinned: true,
                        active: true
                    }
                )
            }
        })
}

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
    myWindowId = windowInfo.id
})

browser.browserAction.onClicked.addListener(nhc_toggleNinjaHackerCat);