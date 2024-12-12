"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var LeaderboardSystem;
(function (LeaderboardSystem) {
    function generateGamerTag() {
        var adjectives = [
            "Swift", "Shifty", "Mighty", "Stealthy", "Fierce", "Wild", "Epic", "Deadly", "Blazing", "Frozen", "Dark", "Shiny"
        ];
        var nouns = [
            "Panther", "Gam3r", "Dragon", "Raven", "Wolf", "Phoenix", "Domino", "Knight", "Wizard", "Titan", "Hunter", "Warrior"
        ];
        var suffixes = ["X", "99", "101", "007"];
        var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        var useSuffix = Math.random() > 0.5;
        var randomSuffix = useSuffix
            ? suffixes[Math.floor(Math.random() * suffixes.length)]
            : Math.floor(Math.random() * 10000);
        return "".concat(randomAdjective).concat(randomNoun).concat(randomSuffix);
    }
    LeaderboardSystem.generateGamerTag = generateGamerTag;
    function formatTimePlayed(totalMinutes) {
        var days = Math.floor(totalMinutes / (24 * 60));
        var hours = Math.floor((totalMinutes % (24 * 60)) / 60);
        var minutes = Math.floor(totalMinutes % 60);
        return "".concat(days, "d ").concat(hours, "h ").concat(minutes, "m");
    }
    LeaderboardSystem.formatTimePlayed = formatTimePlayed;
    function generateLeaderboardEntries() {
        var currentLeaderboardEntries = [];
        for (var i = 0; i < LeaderboardSystem.randomEntryAmount; i++) {
            currentLeaderboardEntries.push({
                position: 0,
                gamerTag: generateGamerTag(),
                rank: Math.floor(Math.random() * (500 - 25) + 25),
                score: Math.floor(Math.random() * (50000 - 5000) + 5000),
                gamesPlayed: Math.floor(Math.random() * (1000 - 25) + 25),
                timePlayed: formatTimePlayed(Math.random() * (25000 - 2500) + 2500)
            });
        }
        LeaderboardSystem.allLeaderboardEntries = assignPositions(currentLeaderboardEntries);
        LeaderboardSystem.populateLeaderboard();
    }
    LeaderboardSystem.generateLeaderboardEntries = generateLeaderboardEntries;
    function assignPositions(currentEntryList) {
        var sortedEntryList = currentEntryList.slice();
        sortedEntryList.sort(function (a, b) { return b.score - a.score; });
        sortedEntryList.forEach(function (item, index) {
            item.position = index + 1;
        });
        return sortedEntryList;
    }
    LeaderboardSystem.assignPositions = assignPositions;
    function sortEntries(sortBy, order) {
        if (sortBy === void 0) { sortBy = "score"; }
        if (order === void 0) { order = "descending"; }
        var sortedEntryList = LeaderboardSystem.allLeaderboardEntries.slice();
        sortedEntryList.sort(function (a, b) {
            var aValue = a[sortBy];
            var bValue = b[sortBy];
            if (typeof aValue === "number" && typeof bValue === "number") {
                return order === "descending" ? bValue - aValue : aValue - bValue;
            }
            if (typeof aValue === "string" && typeof bValue === "string") {
                return order === "descending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return 0;
        });
        LeaderboardSystem.allLeaderboardEntries = sortedEntryList;
        LeaderboardSystem.populateLeaderboard();
    }
    LeaderboardSystem.sortEntries = sortEntries;
    function updateHeaders(selectedHeader) {
        var index = LeaderboardSystem.allLeaderboardHeaders.findIndex(function (header) { return header.type === selectedHeader.type; });
        if (index !== -1) {
            LeaderboardSystem.allLeaderboardHeaders[index] = __assign(__assign({}, selectedHeader), { sortOrder: selectedHeader.sortOrder === "descending" ? "ascending" : "descending" });
        }
        else {
            console.warn("Header not found in allLeaderboardHeaders:", selectedHeader.type);
        }
        LeaderboardSystem.allLeaderboardHeaders.forEach(function (header) {
            header.containerElement.classList.remove("is-Selected");
        });
        LeaderboardSystem.allLeaderboardHeaders[index].containerElement.classList.add("is-Selected");
        LeaderboardSystem.allLeaderboardHeaders[index].containerElement.classList.toggle("ascending", LeaderboardSystem.allLeaderboardHeaders[index].sortOrder === "ascending");
        sortEntries(LeaderboardSystem.allLeaderboardHeaders[index].type, LeaderboardSystem.allLeaderboardHeaders[index].sortOrder);
    }
    LeaderboardSystem.updateHeaders = updateHeaders;
})(LeaderboardSystem || (LeaderboardSystem = {}));
