let myWindowId = null

function nhc_toggleNinjaHackerCat() {
    browser.tabs.query({ windowId: myWindowId })
        .then(async tabs => {
            let found = false
            for (let tab of tabs) {
                if (tab.title
                    && (tab.title == "✔ Active Ninja Hacker Cat" ||
                        tab.title == "💤 Sleeping Ninja Hacker Cat")) {
                    found = true
                }
            }
            if (!found) {
                browser.tabs.create(
                    {
                        index: 0,
                        url: "/panel.html",
                        active: true
                    }
                )
                browser.browserAction.setIcon({
                    path: {
                        16: "/images/cat-default.png",
                        32: "/images/cat-default.png"
                    }
                })
            }
        })
}

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
    myWindowId = windowInfo.id
})

browser.browserAction.onClicked.addListener(nhc_toggleNinjaHackerCat);