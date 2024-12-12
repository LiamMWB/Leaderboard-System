namespace LeaderboardSystem {
    export let leaderboardHeadersContainer: HTMLElement | null;
    export let leaderboardEntriesContainer: HTMLElement | null;

    export let allLeaderboardHeaders: EntryHeaderItem[] = [];
    export let allLeaderboardEntriesElements: EntryItemElements[] = [];
    export let allLeaderboardEntries: EntryItem[] = [];

    // Random Number of Entries
    export let randomEntryAmount = Math.floor(Math.random() * (25 - 5) + 5);

    // Initialization
    document.addEventListener("DOMContentLoaded", init);

    function init() {
        leaderboardHeadersContainer = document.getElementById("leaderboardHeadersContainer");
        leaderboardEntriesContainer = document.getElementById("leaderboardEntriesContainer");

        // Generate all HTML Elements
        generateLeaderboardHeaderElements();
        generateLeaderboardEntryElements();
    }

    export function populateLeaderboard() {
        for (let i = 0; i < allLeaderboardEntries.length; i++) {
            const entry = allLeaderboardEntries[i];
            const entryElements = allLeaderboardEntriesElements[i];
            if(!entry || !entryElements) return;
            
            entryElements.positionElement.innerHTML = entry.position.toString();
            entryElements.gamertagElement.innerHTML = entry.gamerTag;
            entryElements.rankElement.innerHTML = entry.rank.toString();
            entryElements.scoreElement.innerHTML = entry.score.toString();
            entryElements.gamesPlayedElement.innerHTML = entry.gamesPlayed.toString();
            entryElements.timePlayedElement.innerHTML = entry.timePlayed.toString();   
        }
    }
}