document.addEventListener('DOMContentLoaded', () => {
    const BRAWLAPI_BASE_URL = 'https://api.brawlapi.com/v1'; // brawlapi.com
    const BRAWLIFY_API_BASE_URL = 'https://api.brawlify.com/v1'; // brawlify.com

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

    function initPlayerSearch() {
        const searchButton = document.getElementById('search-player-btn');
        const playerTagInput = document.getElementById('player-tag-input');
        const playerResults = document.getElementById('player-results');

        searchButton.addEventListener('click', () => {
            const playerTag = playerTagInput.value.trim();
            
            if (!playerTag) {
                playerResults.innerHTML = '<p class="info-text">Please enter a player tag</p>';
                return;
            }
            
            let formattedTag = playerTag;
            if (!playerTag.startsWith('#')) {
                formattedTag = '#' + playerTag;
            }
            
            playerResults.innerHTML = `
                <div class="player-stats">
                    <div class="player-stat-card">
                        <h4>Player Tag</h4>
                        <div class="stat-value">${formattedTag}</div>
                    </div>
                    <div class="player-stat-card">
                        <h4>Trophies</h4>
                        <div class="stat-value">24,568</div>
                    </div>
                    <div class="player-stat-card">
                        <h4>Level</h4>
                        <div class="stat-value">248</div>
                    </div>
                    <div class="player-stat-card">
                        <h4>3v3 Victories</h4>
                        <div class="stat-value">12,345</div>
                    </div>
                </div>
                <p class="api-credit">Note: This is placeholder data. Real API integration coming soon.</p>
            `;
        });

        playerTagInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    fetchBrawlers();
    fetchEvents();
    initPlayerSearch();
    initCollapsibleSections();
});
