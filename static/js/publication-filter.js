// Publication filter and reorder functionality
(function() {
    'use strict';

    // Type colors mapping
    const typeColors = {
        'journal': { bg: '#0820bf', text: '#fff', label: 'journal' },
        'conference': { bg: '#e22d30', text: '#fff', label: 'conference' },
        'workshop': { bg: '#006666', text: '#fff', label: 'workshop' },
        'chapter': { bg: '#038510', text: '#fff', label: 'book chapter' },
        'wip': { bg: '#006666', text: '#fff', label: 'WiP paper' },
        'thesis': { bg: '#038510', text: '#fff', label: 'thesis' }
    };

    let publications = [];
    let filteredPublications = [];
    let sortOrder = 'year-desc'; // Default: newest first
    let currentFilters = {
        year: 'all',
        type: 'all',
        search: ''
    };

    // Create filter controls HTML
    function createFilterControls() {
        const container = document.getElementById('publication-filters');
        if (!container) return;
        
        container.innerHTML = `
            <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center; margin-bottom: 10px;">
                <label for="filter-search" style="font-weight: bold;">Search:</label>
                <input type="text" id="filter-search" placeholder="Search by title, authors, venue..." style="flex: 1; min-width: 200px; padding: 5px;">
                
                <label for="filter-year" style="font-weight: bold;">Year:</label>
                <select id="filter-year" style="padding: 5px;">
                    <option value="all">All Years</option>
                </select>
                
                <label for="filter-type" style="font-weight: bold;">Type:</label>
                <select id="filter-type" style="padding: 5px;">
                    <option value="all">All Types</option>
                </select>
                
                <label for="sort-order" style="font-weight: bold;">Sort:</label>
                <select id="sort-order" style="padding: 5px;">
                    <option value="year-desc" selected>Year (Newest First)</option>
                    <option value="year-asc">Year (Oldest First)</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                </select>
                
                <button id="reset-filters" style="padding: 5px 15px; cursor: pointer;">Reset</button>
            </div>
            <div id="publication-count" style="font-style: italic; color: #666;"></div>
        `;
    }

    // Load publications from JSON
    async function loadPublications() {
        try {
            // Create filter controls first
            createFilterControls();
            
            const response = await fetch('/data/publications.json');
            if (!response.ok) {
                throw new Error('Failed to load publications');
            }
            publications = await response.json();
            filteredPublications = [...publications];
            renderPublications();
            initializeFilters();
        } catch (error) {
            console.error('Error loading publications:', error);
            const container = document.getElementById('publications-container');
            if (container) {
                container.innerHTML = '<p style="color: red;">Error loading publications. Please check that /data/publications.json exists and try again later.</p>';
            }
        }
    }

    // Highlight author name
    function highlightAuthor(authors) {
        return authors.replace(/Xiaotian Dai/g, '<u>Xiaotian Dai</u>');
    }

    // Render type tag
    function renderTypeTag(type) {
        const typeInfo = typeColors[type] || typeColors['journal'];
        return `<span style="color: ${typeInfo.text}; background: ${typeInfo.bg}">&nbsp;&nbsp;&nbsp;&nbsp;${typeInfo.label}&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
    }

    // Render links as HTML (matching original markdown format)
    function renderLinks(links) {
        if (!links || Object.keys(links).length === 0) return '';
        const linkItems = Object.entries(links).map(([label, url]) => {
            // Map link labels: Code -> GitHub
            const displayLabel = label === 'Code' ? 'GitHub' : label;
            // Escape HTML in URL to prevent XSS
            const finalUrl = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
            // Render link in format [Label](url) - matching the original markdown style
            return `<a href="${finalUrl}">[${displayLabel}]</a>`;
        });
        return linkItems.join(' | ');
    }

    // Render a single publication
    function renderPublication(pub) {
        const authorsHtml = highlightAuthor(pub.authors);
        const typeTag = renderTypeTag(pub.type);
        // Remove any asterisks from venueShort
        const venueShortClean = pub.venueShort ? pub.venueShort.replace(/^\*+|\*+$/g, '') : '';
        const venueInfo = venueShortClean ? `<strong>(${venueShortClean})</strong> ${pub.venue}` : pub.venue;
        const linksHtml = renderLinks(pub.links);
        const notesHtml = pub.notes ? `<br><em>${pub.notes}</em>` : '';
        
        return `
            <li class="publication-item" data-id="${pub.id}" data-year="${pub.year}" data-type="${pub.type}">
                ${typeTag} <br>
                <span style="font-size: 16px; font-weight: 800; color: #000000">${pub.title}</span><br>
                ${authorsHtml}<br>
                ${venueInfo}. ${pub.year}.${notesHtml ? notesHtml : ''} <br>
                ${linksHtml ? linksHtml + ' <br>' : ''}
            </li>
        `;
    }

    // Group publications by year
    function groupByYear(pubs) {
        const grouped = {};
        pubs.forEach(pub => {
            if (!grouped[pub.year]) {
                grouped[pub.year] = [];
            }
            grouped[pub.year].push(pub);
        });
        return grouped;
    }

    // Render all publications
    function renderPublications() {
        const container = document.getElementById('publications-list');
        if (!container) return;

        // Apply sorting
        let sorted = [...filteredPublications];
        if (sortOrder === 'year-desc') {
            sorted.sort((a, b) => b.year - a.year);
        } else if (sortOrder === 'year-asc') {
            sorted.sort((a, b) => a.year - b.year);
        } else if (sortOrder === 'title-asc') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'title-desc') {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        }

        // Only group by year if sorting by year, otherwise render directly
        let html = '';
        if (sortOrder.startsWith('year-')) {
            // Group by year
            const grouped = groupByYear(sorted);
            const years = Object.keys(grouped).sort((a, b) => {
                if (sortOrder === 'year-desc') return b - a;
                return a - b;
            });
            
            years.forEach(year => {
                html += `<h2>${year}</h2>\n<ul class="publications-list">\n`;
                grouped[year].forEach(pub => {
                    html += renderPublication(pub);
                });
                html += '</ul>\n';
            });
        } else {
            // Render directly in sorted order
            html += '<ul class="publications-list">\n';
            sorted.forEach(pub => {
                html += renderPublication(pub);
            });
            html += '</ul>\n';
        }

        container.innerHTML = html;
        
        // Make publication items draggable
        makeDraggable();
    }

    // Apply filters
    function applyFilters() {
        filteredPublications = publications.filter(pub => {
            // Year filter
            if (currentFilters.year !== 'all' && pub.year !== parseInt(currentFilters.year)) {
                return false;
            }
            
            // Type filter
            if (currentFilters.type !== 'all' && pub.type !== currentFilters.type) {
                return false;
            }
            
            // Search filter
            if (currentFilters.search) {
                const searchLower = currentFilters.search.toLowerCase();
                const searchable = `${pub.title} ${pub.authors} ${pub.venue} ${pub.venueShort || ''} ${pub.notes || ''}`.toLowerCase();
                if (!searchable.includes(searchLower)) {
                    return false;
                }
            }
            
            return true;
        });
        
        renderPublications();
        updateFilterCounts();
    }

    // Initialize filter controls
    function initializeFilters() {
        // Get unique years and types
        const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
        const types = [...new Set(publications.map(p => p.type))].sort();
        
        // Populate year filter
        const yearFilter = document.getElementById('filter-year');
        if (yearFilter) {
            yearFilter.innerHTML = '<option value="all">All Years</option>' +
                years.map(y => `<option value="${y}">${y}</option>`).join('');
            yearFilter.addEventListener('change', (e) => {
                currentFilters.year = e.target.value;
                applyFilters();
            });
        }
        
        // Populate type filter
        const typeFilter = document.getElementById('filter-type');
        if (typeFilter) {
            const formatTypeName = (type) => {
                if (type === 'wip') return 'WiP';
                return type.charAt(0).toUpperCase() + type.slice(1);
            };
            typeFilter.innerHTML = '<option value="all">All Types</option>' +
                types.map(t => `<option value="${t}">${formatTypeName(t)}</option>`).join('');
            typeFilter.addEventListener('change', (e) => {
                currentFilters.type = e.target.value;
                applyFilters();
            });
        }
        
        // Search filter
        const searchFilter = document.getElementById('filter-search');
        if (searchFilter) {
            searchFilter.addEventListener('input', (e) => {
                currentFilters.search = e.target.value;
                applyFilters();
            });
        }
        
        // Sort controls
        const sortSelect = document.getElementById('sort-order');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                sortOrder = e.target.value;
                renderPublications();
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                currentFilters = { year: 'all', type: 'all', search: '' };
                if (yearFilter) yearFilter.value = 'all';
                if (typeFilter) typeFilter.value = 'all';
                if (searchFilter) searchFilter.value = '';
                if (sortSelect) sortSelect.value = 'year-desc';
                sortOrder = 'year-desc';
                applyFilters();
            });
        }
        
        updateFilterCounts();
    }

    // Update filter counts
    function updateFilterCounts() {
        const countEl = document.getElementById('publication-count');
        if (countEl) {
            countEl.textContent = `${filteredPublications.length} of ${publications.length} publications`;
        }
    }

    // Make publications draggable for reordering
    function makeDraggable() {
        const items = document.querySelectorAll('.publication-item');
        let draggedElement = null;
        let draggedDataId = null;
        
        items.forEach((item) => {
            item.draggable = true;
            item.style.cursor = 'grab';
            item.setAttribute('title', 'Drag to reorder (within same year)');
            
            item.addEventListener('dragstart', (e) => {
                draggedElement = item;
                draggedDataId = parseInt(item.dataset.id);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', draggedDataId.toString());
                item.classList.add('dragging');
                item.style.opacity = '0.5';
            });
            
            item.addEventListener('dragend', () => {
                if (draggedElement) {
                    draggedElement.classList.remove('dragging');
                    draggedElement.style.opacity = '1';
                }
                draggedElement = null;
                draggedDataId = null;
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                if (draggedElement && draggedElement !== item) {
                    // Only allow reordering within the same year
                    const draggedYear = parseInt(draggedElement.dataset.year);
                    const targetYear = parseInt(item.dataset.year);
                    
                    if (draggedYear === targetYear) {
                        const rect = item.getBoundingClientRect();
                        const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
                        
                        if (next && item.nextSibling !== draggedElement) {
                            item.parentElement.insertBefore(draggedElement, item.nextSibling);
                        } else if (!next && item.previousSibling !== draggedElement) {
                            item.parentElement.insertBefore(draggedElement, item);
                        }
                    }
                }
            });
            
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedElement && draggedElement !== item && draggedDataId) {
                    const draggedYear = parseInt(draggedElement.dataset.year);
                    const targetYear = parseInt(item.dataset.year);
                    
                    // Only allow reordering within the same year
                    if (draggedYear === targetYear) {
                        // Find publications in the same year group
                        const yearGroup = filteredPublications.filter(p => p.year === draggedYear);
                        const draggedPub = publications.find(p => p.id === draggedDataId);
                        const targetPubId = parseInt(item.dataset.id);
                        
                        if (draggedPub) {
                            // Remove from current position
                            const draggedIndex = filteredPublications.findIndex(p => p.id === draggedDataId);
                            const targetIndex = filteredPublications.findIndex(p => p.id === targetPubId);
                            
                            if (draggedIndex !== -1 && targetIndex !== -1) {
                                // Reorder within the filtered list
                                filteredPublications.splice(draggedIndex, 1);
                                const newIndex = filteredPublications.findIndex(p => p.id === targetPubId);
                                filteredPublications.splice(newIndex, 0, draggedPub);
                                
                                // Re-render to apply changes
                                renderPublications();
                                saveOrder();
                            }
                        }
                    }
                }
            });
        });
    }

    // Save custom order to localStorage
    function saveOrder() {
        const items = document.querySelectorAll('.publication-item');
        const order = Array.from(items).map(item => parseInt(item.dataset.id));
        localStorage.setItem('publication-order', JSON.stringify(order));
        localStorage.setItem('publication-order-timestamp', Date.now().toString());
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPublications);
    } else {
        loadPublications();
    }
})();

