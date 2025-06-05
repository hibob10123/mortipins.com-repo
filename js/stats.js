document.addEventListener('DOMContentLoaded', () => {
    const BRAWLAPI_BASE_URL = 'https://api.brawlapi.com/v1'; // brawlapi.com
    const BRAWLIFY_API_BASE_URL = 'https://api.brawlify.com/v1'; // brawlify.com

    let currentLeaderboardLimit = 10;
    const leaderboardIncrement = 10;

    function initCollapsibleSections() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const section = header.parentElement;
                const content = header.nextElementSibling;
                
                header.classList.toggle('active');
                
                content.classList.toggle('active');
            });
        });
    }

    // fetch+display brawlers
    async function fetchBrawlers() {
        const brawlersGrid = document.getElementById('brawlers-grid');
        const loadingText = brawlersGrid.querySelector('.loading-text');
        try {
            const response = await fetch('https://api.brawlapi.com/v1/brawlers');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (loadingText) {
                loadingText.remove();
            }

            if (data && data.list && Array.isArray(data.list)) {
                data.list.forEach(brawler => {
                    const card = document.createElement('div');
                    card.className = 'brawler-card card';

                    const img = document.createElement('img');
                    img.src = brawler.imageUrl; 
                    img.alt = brawler.name;
                    img.className = 'brawler-image';

                    const name = document.createElement('h3');
                    name.className = 'brawler-name card-title';
                    name.textContent = brawler.name;

                    card.appendChild(img);
                    card.appendChild(name);
                    brawlersGrid.appendChild(card);
                });
            } else {
                brawlersGrid.innerHTML = '<p>No brawlers found or API structure is different.</p>';
            }
        } catch (error) {
            console.error('Error fetching brawlers:', error);
            if (loadingText) {
                loadingText.textContent = 'Failed to load brawlers. See console for details.';
            } else {
                brawlersGrid.innerHTML = '<p>Failed to load brawlers. See console for details.</p>';
            }
        }
    }

    // Fetch and display events
    async function fetchEvents() {
        const activeEventsGrid = document.getElementById('active-events-grid');
        const upcomingEventsGrid = document.getElementById('upcoming-events-grid');
        const activeLoadingText = activeEventsGrid.querySelector('.loading-text');
        const upcomingLoadingText = upcomingEventsGrid.querySelector('.loading-text');

        try {
            const response = await fetch('https://api.brawlify.com/v1/events');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (activeLoadingText) activeLoadingText.remove();
            if (upcomingLoadingText) upcomingLoadingText.remove();

            activeEventsGrid.innerHTML = '';
            upcomingEventsGrid.innerHTML = '';

            const createApiCredit = () => {
                const credit = document.createElement('div');
                credit.className = 'api-credit';
                credit.innerHTML = 'Event stats powered by <a href="https://brawlify.com" target="_blank">Brawlify.com</a>';
                return credit;
            };

            activeEventsGrid.appendChild(createApiCredit());
            upcomingEventsGrid.appendChild(createApiCredit());

            function createEventCard(event) {  
                const card = document.createElement('div');
                card.className = 'event-card card';

                const title = document.createElement('h4');
                title.textContent = `${event.map.gameMode.name} on ${event.map.name}`;

                const mapImage = document.createElement('img');
                mapImage.src = event.map.imageUrl;
                mapImage.alt = event.map.name;
                mapImage.className = 'event-map-image';

                const gameModeImage = document.createElement('img');
                gameModeImage.src = event.map.gameMode.imageUrl;
                gameModeImage.alt = event.map.gameMode.name;
                gameModeImage.className = 'event-gamemode-icon';

                const timeDetails = document.createElement('div');
                timeDetails.className = 'event-time';
                
                const startTime = new Date(event.startTime).toLocaleString();
                const endTime = new Date(event.endTime).toLocaleString();
                timeDetails.textContent = `${startTime} - ${endTime}`;
                
                card.appendChild(gameModeImage);
                card.appendChild(title);
                card.appendChild(mapImage);
                card.appendChild(timeDetails);
                return card;
            }

            const activeCardsWrapper = document.createElement('div');
            activeCardsWrapper.className = 'event-cards-wrapper';

            // active events
            if (data.active && data.active.length > 0) {
                data.active.forEach(event => {
                    activeCardsWrapper.appendChild(createEventCard(event));
                });
                activeEventsGrid.appendChild(activeCardsWrapper);
            } else {
                activeEventsGrid.innerHTML = '<p>No active events found.</p>';
                activeEventsGrid.appendChild(createApiCredit());
            }

            const upcomingCardsWrapper = document.createElement('div');
            upcomingCardsWrapper.className = 'event-cards-wrapper';

            // upcoming events
            if (data.upcoming && data.upcoming.length > 0) {
                data.upcoming.forEach(event => {
                    upcomingCardsWrapper.appendChild(createEventCard(event));
                });
                upcomingEventsGrid.appendChild(upcomingCardsWrapper);
            } else {
                upcomingEventsGrid.innerHTML = '<p>No upcoming events found.</p>';
                upcomingEventsGrid.appendChild(createApiCredit());
            }

        } catch (error) {
            console.error('Error fetching events:', error);
            
            if (activeLoadingText) {
                activeLoadingText.textContent = 'Failed to load active events. See console for details.';
            } else if (activeEventsGrid.innerHTML === '') {
                activeEventsGrid.innerHTML = '<p>Failed to load active events. See console for details.</p>';
            }
            
            if (upcomingLoadingText) {
                upcomingLoadingText.textContent = 'Failed to load upcoming events. See console for details.';
            } else if (upcomingEventsGrid.innerHTML === '') {
                upcomingEventsGrid.innerHTML = '<p>Failed to load upcoming events. See console for details.</p>';
            }
        }
    }

    // Brawl Stars API Client for mortipins.com
    class BrawlStarsAPI {
        constructor() {
            this.baseUrl = 'https://enkeiserver.duckdns.org/api';
        }

        async request(endpoint) {
            try {
                const response = await fetch(`${this.baseUrl}${endpoint}`);
                if (!response.ok) throw new Error(`HTTP ${response.status} for ${this.baseUrl}${endpoint}`);
                return await response.json();
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }

        // Player methods
        async getPlayer(tag) {
            tag = tag.startsWith('#') ? tag.substring(1) : tag;
            return this.request(`/players/${tag}`);
        }
        async getPlayerBattles(tag) {
            tag = tag.startsWith('#') ? tag.substring(1) : tag;
            return this.request(`/players/${tag}/battlelog`);
        }

        // Game data methods
        async getCurrentMaps() { return this.request('/events/rotation'); }
        async getAllBrawlers() { return this.request('/brawlers'); }
        async getTopPlayers(limit = 50) { return this.request(`/rankings/global/players?limit=${limit}`); }

        // Club methods
        async getClub(tag) {
            tag = tag.startsWith('#') ? tag.substring(1) : tag;
            return this.request(`/clubs/${tag}`);
        }
        async getClubMembers(tag) {
            tag = tag.startsWith('#') ? tag.substring(1) : tag;
            return this.request(`/clubs/${tag}/members`);
        }
    }

    const brawlAPI = new BrawlStarsAPI();

    // Player Stats Card
    async function displayPlayerStats(playerTag) {
        const resultsDiv = document.getElementById('player-results');
        if (!resultsDiv) return;
        resultsDiv.innerHTML = '<p class="loading-text">Fetching player data...</p>'; 
        try {
            const player = await brawlAPI.getPlayer(playerTag);

            const clubInfoHTML = player.club 
                ? `<p class="player-club-info">Club: <span class="player-club-link" data-club-tag="${player.club.tag}">${player.club.name} (${player.club.tag})</span></p>`
                : '<p class="player-club-info">No club affiliation</p>';

            const playerCardHTML = `
            <div class="player-card">
                <h3>${player.name} ${player.tag}</h3>
                ${clubInfoHTML}
                <div class="stats-grid">
                    <div class="stat">
                        <span class="value">${player.trophies.toLocaleString()}</span>
                        <span class="label">Current Trophies</span>
                    </div>
                    <div class="stat">
                        <span class="value">${player.highestTrophies.toLocaleString()}</span>
                        <span class="label">Best Trophies</span>
                    </div>
                    <div class="stat">
                        <span class="value">${player.expLevel}</span>
                        <span class="label">Level</span>
                    </div>
                    <div class="stat">
                        <span class="value">${player.brawlers.length}</span>
                        <span class="label">Brawlers</span>
                    </div>
                    <div class="stat">
                        <span class="value">${player['3vs3Victories']}</span>
                        <span class="label">3v3 Wins</span>
                    </div>
                     <div class="stat">
                        <span class="value">${player.soloVictories}</span>
                        <span class="label">Solo Wins</span>
                    </div>
                     <div class="stat">
                        <span class="value">${player.duoVictories}</span>
                        <span class="label">Duo Wins</span>
                    </div>
                </div>
            </div>`;
            resultsDiv.innerHTML = playerCardHTML;
        } catch (error) {
            resultsDiv.innerHTML = `<div class="error">Player not found or API error. Please check the tag and try again.</div>`;
        }
    }

    // Club Stats Card
    async function displayClubStats(clubTag) {
        const resultsDiv = document.getElementById('club-results');
        if (!resultsDiv) return;
        resultsDiv.innerHTML = '<p class="loading-text">Fetching club data...</p>'; 
        try {
            const club = await brawlAPI.getClub(clubTag);
            const clubCardHTML = `
            <div class="club-result-card">
                <h3>${club.name} (${club.tag})</h3>
                <p class="club-description">Description: ${club.description ? club.description : 'N/A'}</p>
                <div class="club-stats-grid">
                    <div class="club-stat">
                        <span class="value">${club.trophies.toLocaleString()}</span>
                        <span class="label">Total Trophies</span>
                    </div>
                    <div class="club-stat">
                        <span class="value">${club.requiredTrophies.toLocaleString()}</span>
                        <span class="label">Required Trophies</span>
                    </div>
                    <div class="club-stat">
                        <span class="value">${club.members.length}</span>
                        <span class="label">Members</span>
                    </div>
                    <div class="club-stat">
                         <span class="value">${club.type}</span>
                        <span class="label">Type</span>
                    </div>
                </div>
                <div class="club-actions">
                    <button class="view-members-btn" data-club-tag="${club.tag}">View Members (${club.members.length})</button>
                </div>
                <div class="club-members-container" style="display: none;"></div>
            </div>`;
            resultsDiv.innerHTML = clubCardHTML;
        } catch (error) {
            resultsDiv.innerHTML = `<div class="error">Club not found or API error. Please check the tag and try again.</div>`;
        }
    }

    // Global Leaderboard
    async function displayLeaderboard() {
        const leaderboardDiv = document.getElementById('leaderboard-content');
        if (!leaderboardDiv) return;

        if (leaderboardDiv.innerHTML === '' || currentLeaderboardLimit === leaderboardIncrement) {
             leaderboardDiv.innerHTML = '<p class="loading-text">Loading leaderboard...</p>';
        }

        try {
            const rankings = await brawlAPI.getTopPlayers(currentLeaderboardLimit);

            let leaderboardHTML = '';
            if (currentLeaderboardLimit === leaderboardIncrement) {
                leaderboardHTML = '<div class="leaderboard">';
            } else {
                const existingLeaderboard = leaderboardDiv.querySelector('.leaderboard');
                if (existingLeaderboard) {
                    leaderboardDiv.innerHTML = '';
                    leaderboardHTML = '<div class="leaderboard">';
                } else {
                     leaderboardHTML = '<div class="leaderboard">';
                }
            }

            if (rankings && rankings.items && rankings.items.length > 0) {
                leaderboardHTML += rankings.items.map((player, index) => `
                    <div class="rank-item">
                        <span class="rank">#${index + 1}</span>
                        <span class="name">${player.name} (${player.tag})</span>
                        <span class="trophies">${player.trophies.toLocaleString()} 🏆</span>
                    </div>
                `).join('');
            } else if (currentLeaderboardLimit === leaderboardIncrement) {
                leaderboardHTML += '<p class="info-text">No players found in leaderboard.</p>';
            }
            leaderboardHTML += '</div>';

            leaderboardDiv.innerHTML = leaderboardHTML;

            if (rankings && rankings.items && rankings.items.length === currentLeaderboardLimit) {
                const viewMoreBtn = document.createElement('button');
                viewMoreBtn.id = 'view-more-leaderboard-btn';
                viewMoreBtn.className = 'search-btn view-more-btn';
                viewMoreBtn.textContent = `View More (Top ${currentLeaderboardLimit + leaderboardIncrement})`;
                leaderboardDiv.appendChild(viewMoreBtn);
            } else if (rankings && rankings.items && rankings.items.length < currentLeaderboardLimit && rankings.items.length > 0) {
                 leaderboardDiv.innerHTML += '<p class="info-text">No more players to load.</p>';
            }

        } catch (error) {
            leaderboardDiv.innerHTML = '<div class="error">Failed to load leaderboard.</div>';
        }
    }

    const leaderboardContentDiv = document.getElementById('leaderboard-content');
    if (leaderboardContentDiv) {
        leaderboardContentDiv.addEventListener('click', (event) => {
            if (event.target.id === 'view-more-leaderboard-btn') {
                currentLeaderboardLimit += leaderboardIncrement;
                const button = event.target;
                button.textContent = 'Loading...';
                button.disabled = true;
                displayLeaderboard();
            }
        });
    }

    fetchBrawlers();
    fetchEvents();

    const searchPlayerBtn = document.getElementById('search-player-btn');
    const playerTagInput = document.getElementById('player-tag-input');
    const searchClubBtn = document.getElementById('search-club-btn');
    const clubTagInput = document.getElementById('club-tag-input');
    const playerResultsDiv = document.getElementById('player-results');
    const clubResultsDiv = document.getElementById('club-results');

    if (searchPlayerBtn && playerTagInput) {
        searchPlayerBtn.addEventListener('click', () => {
            const playerTag = playerTagInput.value.trim();
            if (playerTag) {
                displayPlayerStats(playerTag);
            }
        });
        playerTagInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchPlayerBtn.click();
            }
        });
    }

    if (searchClubBtn && clubTagInput) {
        searchClubBtn.addEventListener('click', () => {
            const clubTag = clubTagInput.value.trim();
            if (clubTag) {
                displayClubStats(clubTag);
            }
        });
        clubTagInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchClubBtn.click();
            }
        });
    }

    // Event listener for clickable club links in player stats
    if (playerResultsDiv) {
        playerResultsDiv.addEventListener('click', (event) => {
            if (event.target.classList.contains('player-club-link')) {
                event.preventDefault();
                const clubTag = event.target.dataset.clubTag;
                if (clubTag && clubTagInput && searchClubBtn) {
                    clubTagInput.value = clubTag;
                    searchClubBtn.click();

                    const clubStatsSection = document.getElementById('club-stats-section');
                    const clubSectionContent = document.getElementById('club-stats-content');
                    const clubSectionHeader = clubStatsSection ? clubStatsSection.querySelector('.section-header') : null;

                    if (clubSectionContent && clubSectionHeader && !clubSectionContent.classList.contains('active')) {
                        clubSectionHeader.click();
                    }
                    
                    if (clubStatsSection) {
                        clubStatsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        });
    }

    if (clubResultsDiv) {
        clubResultsDiv.addEventListener('click', async (event) => {
            if (event.target.classList.contains('view-members-btn')) {
                event.preventDefault();
                const button = event.target;
                const clubTag = button.dataset.clubTag;
                const membersContainer = button.closest('.club-result-card').querySelector('.club-members-container');

                if (!clubTag || !membersContainer) return;

                if (membersContainer.style.display === 'none' || membersContainer.innerHTML.includes('loading-text')) {
                    membersContainer.innerHTML = '<p class="loading-text">Fetching members...</p>';
                    membersContainer.style.display = 'block';
                    button.textContent = 'Loading...';
                    button.disabled = true;

                    try {
                        const membersData = await brawlAPI.getClubMembers(clubTag);
                        let membersHTML = '<h4 class="club-members-header">Members</h4><ul class="club-member-list">';
                        if (membersData && membersData.items && membersData.items.length > 0) {
                            membersData.items.forEach((member, index) => {
                                membersHTML += `
                                    <li class="club-member-item">
                                        <span class="member-rank">#${index + 1}</span>
                                        <span class="member-name club-member-link" data-player-tag="${member.tag}">${member.name} (${member.tag})</span>
                                        <span class="member-role">${member.role}</span>
                                        <span class="member-trophies">${member.trophies.toLocaleString()} 🏆</span>
                                    </li>`;
                            });
                        } else {
                            membersHTML += '<li class="club-member-item no-members">No members found or data unavailable.</li>';
                        }
                        membersHTML += '</ul>';
                        membersContainer.innerHTML = membersHTML;
                        button.textContent = 'Hide Members';
                    } catch (error) {
                        membersContainer.innerHTML = '<p class="error">Failed to load members.</p>';
                        button.textContent = 'View Members (Error)';
                    } finally {
                        button.disabled = false;
                    }
                } else {
                    membersContainer.style.display = 'none';
                    membersContainer.innerHTML = ''; 
                    const clubData = await brawlAPI.getClub(clubTag); 
                    button.textContent = `View Members (${clubData.members.length})`;
                }
            } else if (event.target.classList.contains('club-member-link')) {
                event.preventDefault();
                const playerTag = event.target.dataset.playerTag;
                if (playerTag && playerTagInput && searchPlayerBtn) {
                    playerTagInput.value = playerTag;
                    searchPlayerBtn.click();

                    const playerStatsSection = document.getElementById('player-stats-section');
                    const playerSectionContent = document.getElementById('player-stats-content');
                    const playerSectionHeader = playerStatsSection ? playerStatsSection.querySelector('.section-header') : null;

                    if (playerSectionContent && playerSectionHeader && !playerSectionContent.classList.contains('active')) {
                        playerSectionHeader.click();
                    }
                    
                    if (playerStatsSection) {
                        playerStatsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        });
    }

    displayLeaderboard();

    initCollapsibleSections();
});
