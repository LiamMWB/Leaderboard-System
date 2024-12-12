"use strict";
var LeaderboardSystem;
(function (LeaderboardSystem) {
    function createElement(tag, classNames, innerText) {
        var _a;
        if (classNames === void 0) { classNames = []; }
        if (innerText === void 0) { innerText = ""; }
        var element = document.createElement(tag);
        if (classNames.length)
            (_a = element.classList).add.apply(_a, classNames);
        if (innerText)
            element.innerText = innerText;
        return element;
    }
    ;
    function generateLeaderboardHeaderElements() {
        if (!LeaderboardSystem.leaderboardHeadersContainer) {
            console.error("leaderboardHeadersContainer is not defined or not available.");
            return;
        }
        LeaderboardSystem.leaderboardHeadersContainer.innerHTML = "";
        var currentLeaderboardHeaders = [];
        for (var key in LeaderboardSystem.HeaderType) {
            if (isNaN(Number(key))) {
                var value = LeaderboardSystem.HeaderType[key];
                var headerContainerElement = document.createElement("div");
                var headerTextElement = document.createElement("div");
                var headerArrowImgElement = document.createElement("img");
                headerContainerElement.classList.add("header", key);
                headerTextElement.textContent = value;
                headerContainerElement.append(headerTextElement, headerArrowImgElement);
                var newHeaderItem = ({
                    type: key,
                    sortOrder: value === LeaderboardSystem.HeaderType.score ? "descending" : undefined,
                    containerElement: headerContainerElement
                });
                currentLeaderboardHeaders.push(newHeaderItem);
                headerContainerElement.classList.toggle("is-Selected", value === LeaderboardSystem.HeaderType.score);
                LeaderboardSystem.leaderboardHeadersContainer.appendChild(headerContainerElement);
            }
        }
        LeaderboardSystem.allLeaderboardHeaders = currentLeaderboardHeaders;
        LeaderboardSystem.allLeaderboardHeaders.forEach(function (header) {
            header.containerElement.addEventListener("click", function () {
                var slotIndex = LeaderboardSystem.allLeaderboardHeaders.findIndex(function (item) { return item.type === header.type; });
                if (slotIndex === -1) {
                    console.warn("Header not found:", header.type);
                    return;
                }
                LeaderboardSystem.updateHeaders(LeaderboardSystem.allLeaderboardHeaders[slotIndex]);
            });
        });
    }
    LeaderboardSystem.generateLeaderboardHeaderElements = generateLeaderboardHeaderElements;
    function generateLeaderboardEntryElements() {
        if (!LeaderboardSystem.leaderboardEntriesContainer) {
            console.error("leaderboardEntriesContainer is not defined or not available.");
            return;
        }
        LeaderboardSystem.leaderboardEntriesContainer.innerHTML = "";
        var currentLeaderboardEntriesElements = [];
        for (var i = 0; i < LeaderboardSystem.randomEntryAmount; i++) {
            var entryContainerElement = createElement("div", ["leaderboard-entry-container"]);
            var entryPositionElement = createElement("div", ["entry", "position"]);
            var entryNameElement = createElement("div", ["entry", "gamerTag"]);
            var entryRankElement = createElement("div", ["entry", "rank"]);
            var entryScoreElement = createElement("div", ["entry", "score"]);
            var entryGamesElement = createElement("div", ["entry", "gamesPlayed"]);
            var entryTimeElement = createElement("div", ["entry", "timePlayed"]);
            currentLeaderboardEntriesElements.push({
                positionElement: entryPositionElement,
                gamertagElement: entryNameElement,
                rankElement: entryRankElement,
                scoreElement: entryScoreElement,
                gamesPlayedElement: entryGamesElement,
                timePlayedElement: entryTimeElement
            });
            entryContainerElement.append(entryPositionElement, entryNameElement, entryRankElement, entryScoreElement, entryGamesElement, entryTimeElement);
            LeaderboardSystem.leaderboardEntriesContainer.append(entryContainerElement);
        }
        LeaderboardSystem.allLeaderboardEntriesElements = currentLeaderboardEntriesElements;
        LeaderboardSystem.generateLeaderboardEntries();
    }
    LeaderboardSystem.generateLeaderboardEntryElements = generateLeaderboardEntryElements;
})(LeaderboardSystem || (LeaderboardSystem = {}));
