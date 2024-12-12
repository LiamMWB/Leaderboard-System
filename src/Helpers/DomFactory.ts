namespace LeaderboardSystem {

    function createElement(tag: string, classNames: string[] = [], innerText: string = ""): HTMLElement | HTMLImageElement {
        const element = document.createElement(tag);
        if (classNames.length) element.classList.add(...classNames);
        if (innerText) element.innerText = innerText;

        return element;
    };

    // -------------------------------------------------------------------------------------------------------------------------- \\
    
    export function generateLeaderboardHeaderElements() {
        if (!leaderboardHeadersContainer) {
            console.error("leaderboardHeadersContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        leaderboardHeadersContainer.innerHTML = "";

        let currentLeaderboardHeaders: EntryHeaderItem[] = [];
        for (const key in HeaderType) {
            if (isNaN(Number(key))) {
                const value = HeaderType[key as keyof typeof HeaderType];
    
                // Generate Header Elements
                const headerContainerElement = document.createElement("div");
                const headerTextElement = document.createElement("div");
                const headerArrowImgElement = document.createElement("img") as HTMLImageElement;
                headerContainerElement.classList.add("header", key); // Use the enum key as a class
                headerTextElement.textContent = value; // Use the enum value as text

                headerContainerElement.append(headerTextElement, headerArrowImgElement);

                // Create a Header Item
                const newHeaderItem: EntryHeaderItem = 
                 ({
                    type: key,
                    sortOrder: value === HeaderType.score ? "descending" : undefined,
                    containerElement: headerContainerElement
                });

                currentLeaderboardHeaders.push(newHeaderItem);
                headerContainerElement.classList.toggle("is-Selected", value === HeaderType.score);

    
                // Append to the main container
                leaderboardHeadersContainer.appendChild(headerContainerElement);
            }
        }

        // Update leaderboard header items with new headers
        allLeaderboardHeaders = currentLeaderboardHeaders;

        // Assign Click Events
        allLeaderboardHeaders.forEach(header => {
            header.containerElement.addEventListener("click", () => {
                const slotIndex = allLeaderboardHeaders.findIndex(item => item.type === header.type);
                if (slotIndex === -1) {
                    console.warn("Header not found:", header.type);
                    return;
                }

                updateHeaders(allLeaderboardHeaders[slotIndex]);
            });
        });
    }  

    export function generateLeaderboardEntryElements() {
        if (!leaderboardEntriesContainer) {
            console.error("leaderboardEntriesContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        leaderboardEntriesContainer.innerHTML = "";
    
        let currentLeaderboardEntriesElements: EntryItemElements[] = [];
        for (let i = 0; i < randomEntryAmount; i++) {

            // Generate Entry Elements
            const entryContainerElement = createElement("div", ["leaderboard-entry-container"]);
            const entryPositionElement = createElement("div", ["entry", "position"]);
            const entryNameElement = createElement("div", ["entry", "gamerTag"]);
            const entryRankElement = createElement("div", ["entry", "rank"]);
            const entryScoreElement = createElement("div", ["entry", "score"]);
            const entryGamesElement = createElement("div", ["entry", "gamesPlayed"]);
            const entryTimeElement = createElement("div", ["entry", "timePlayed"]);

            // Assign Entry Elements
            currentLeaderboardEntriesElements.push(
                {
                    positionElement: entryPositionElement,
                    gamertagElement: entryNameElement,
                    rankElement: entryRankElement,
                    scoreElement: entryScoreElement,
                    gamesPlayedElement: entryGamesElement,
                    timePlayedElement: entryTimeElement
                }
            )

            entryContainerElement.append(entryPositionElement, entryNameElement, entryRankElement, entryScoreElement, entryGamesElement, entryTimeElement);

            // Append to the main container
            leaderboardEntriesContainer.append(entryContainerElement);
        }

        // Update leaderboard entries with new entries elements
        allLeaderboardEntriesElements = currentLeaderboardEntriesElements;
        
        // Create Leaderboard Entries
        generateLeaderboardEntries();
    }    
}