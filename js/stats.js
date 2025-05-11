document.addEventListener('DOMContentLoaded', () => {
    const BRAWLAPI_BASE_URL = 'https://api.brawlapi.com/v1'; // brawlapi.com
    const BRAWLIFY_API_BASE_URL = 'https://api.brawlify.com/v1'; // brawlify.com

    // fetch+display brawlers
    async function fetchBrawlers() {
        const brawlersGrid = document.getElementById('brawlers-grid');
        const loadingText = brawlersGrid.querySelector('.loading-text');
        try {
            const response = await fetch(`${BRAWLAPI_BASE_URL}/brawlers`);
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

    // fetch and display events
    async function fetchEvents() {
        const eventsSection = document.getElementById('events-section');
        const eventsGridContainer = document.getElementById('events-grid');
        const loadingText = eventsGridContainer.querySelector('.loading-text');

        try {
            const response = await fetch(`${BRAWLIFY_API_BASE_URL}/events`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (loadingText) {
                loadingText.remove();
            }

            eventsGridContainer.innerHTML = '';

            const credit = document.createElement('p');
            credit.className = 'api-credit';
            credit.innerHTML = 'Event stats powered by <a href="https://brawlify.com" target="_blank">Brawlify.com</a>';
            eventsSection.insertBefore(credit, eventsGridContainer);

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

                const timeDetails = document.createElement('p');
                const startTime = new Date(event.startTime).toLocaleString();
                const endTime = new Date(event.endTime).toLocaleString();
                timeDetails.textContent = `Starts: ${startTime} - Ends: ${endTime}`;
                timeDetails.className = 'event-time';
                
                card.appendChild(gameModeImage);
                card.appendChild(title);
                card.appendChild(mapImage);
                card.appendChild(timeDetails);
                return card;
            }

            if (data.active && data.active.length > 0) {
                const activeEventsTitle = document.createElement('h3');
                activeEventsTitle.textContent = 'Active Events';
                activeEventsTitle.className = 'event-type-title';
                eventsGridContainer.appendChild(activeEventsTitle);

                const activeCardsWrapper = document.createElement('div');
                activeCardsWrapper.className = 'event-cards-wrapper';
                data.active.forEach(event => {
                    activeCardsWrapper.appendChild(createEventCard(event));
                });
                eventsGridContainer.appendChild(activeCardsWrapper);
            }

            if (data.upcoming && data.upcoming.length > 0) {
                const upcomingEventsTitle = document.createElement('h3');
                upcomingEventsTitle.textContent = 'Upcoming Events';
                upcomingEventsTitle.className = 'event-type-title';
                eventsGridContainer.appendChild(upcomingEventsTitle);

                const upcomingCardsWrapper = document.createElement('div');
                upcomingCardsWrapper.className = 'event-cards-wrapper';
                data.upcoming.forEach(event => {
                    upcomingCardsWrapper.appendChild(createEventCard(event));
                });
                eventsGridContainer.appendChild(upcomingCardsWrapper);
            }

            if ((!data.active || data.active.length === 0) && (!data.upcoming || data.upcoming.length === 0)) {
                eventsGridContainer.innerHTML = '<p>No current or upcoming events found.</p>';
            }

        } catch (error) {
            console.error('Error fetching events:', error);
            if (document.getElementById('events-grid').querySelector('.loading-text')) {
                 document.getElementById('events-grid').querySelector('.loading-text').textContent = 'Failed to load events. See console for details.';
            } else if (eventsGridContainer.innerHTML === '') {
                eventsGridContainer.innerHTML = '<p>Failed to load events. See console for details.</p>';
            }
        }
    }

    async function fetchMaps() {
        const mapsGrid = document.getElementById('maps-grid');
        mapsGrid.innerHTML = '<p>Map loading implemented soon...</p>';
    }

    async function fetchGameModes() {
        const gameModesGrid = document.getElementById('gamemodes-grid');
        gameModesGrid.innerHTML = '<p>Game Mode loading implemented soon...</p>';
    }

    fetchBrawlers();
    fetchEvents();
    fetchMaps();
    fetchGameModes();
});
