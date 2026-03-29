/**
 * Advanced Trade Calculator
 * Professional trade analysis with real-time market data
 */

class AdvancedTradeCalculator {
    constructor() {
        this.yourItems = [];
        this.theirItems = [];
        this.currentSide = null;
        this.allItems = [];
        this.filteredItems = [];
        this.selectedCategory = '';
        this.searchTerm = '';
        this.sortBy = 'value_desc';
        
        this.init();
    }

    async init() {
        try {
            // Show loading state
            this.showLoadingState();
            await this.loadItems();
            this.setupEventListeners();
            this.updateUI();
            this.hideLoadingState();
        } catch (error) {
            console.error('Failed to initialize calculator:', error);
            this.hideLoadingState();
            this.showError('Failed to load item database. Please refresh the page.');
        }
    }

    showLoadingState() {
        const modalItemsGrid = document.getElementById('modalItemsGrid');
        if (modalItemsGrid) {
            modalItemsGrid.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Loading item database...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        const modalItemsGrid = document.getElementById('modalItemsGrid');
        if (modalItemsGrid && this.filteredItems.length > 0) {
            this.renderModalItems();
        }
    }

    async loadItems() {
        try {
            // Initialize the API directly since init() requires a grid element
            await this.initializeAPI();
            
            // Wait for API to load items
            if (typeof db === 'undefined') {
                await new Promise(resolve => {
                    const checkDb = setInterval(() => {
                        if (typeof db !== 'undefined') {
                            clearInterval(checkDb);
                            resolve();
                        }
                    }, 100);
                    // Timeout after 10 seconds
                    setTimeout(() => {
                        clearInterval(checkDb);
                        resolve();
                    }, 10000);
                });
            }

            // Check if db is available
            if (typeof db === 'undefined') {
                throw new Error('Item database not available');
            }

            // Flatten all items from all categories
            this.allItems = [];
            for (const [category, items] of Object.entries(db)) {
                items.forEach(item => {
                    this.allItems.push({
                        ...item,
                        category: category,
                        id: `${category}_${item.name.replace(/\s+/g, '_')}`
                    });
                });
            }

            console.log(`Loaded ${this.allItems.length} items from ${Object.keys(db).length} categories`);
            this.populateCategoryFilter();
            this.filteredItems = [...this.allItems];
            
        } catch (error) {
            console.error('Error loading items:', error);
            throw error;
        }
    }

    async initializeAPI() {
        try {
            // Load the database directly like the API does
            const dataUrl = 'https://api.jbvalues.com/v1/itemdata';
            const rows = await this.fetchJbValuesJson(dataUrl);
            
            if (!Array.isArray(rows) || rows.length === 0) {
                throw new Error('API returned no items');
            }
            
            // Build the database using API's buildDatabase function
            if (typeof buildDatabase === 'function') {
                buildDatabase(rows);
            } else {
                // Fallback: build db manually
                window.db = {};
                rows.forEach(item => {
                    const name = item.displayName || item.name;
                    if (!name) return;

                    const cat = this.listCategoryLabel(item.section, item.category);
                    if (!window.db[cat]) window.db[cat] = [];

                    const details = item.details || {};
                    const cash = typeof item.value === 'number' ? item.value : 0;
                    const duped = typeof item.dupedValue === 'number' ? item.dupedValue : 0;

                    window.db[cat].push({
                        name,
                        image: (item.robloxImage && Number(item.robloxImage) > 0)
                            ? `https://www.roblox.com/Thumbs/Asset.ashx?width=420&height=420&assetId=${item.robloxImage}`
                            : (item.image || ''),
                        cash_value: cash,
                        duped_value: duped,
                        trend: item.trend || 'stable',
                        demand: (details.demand ?? item.demand) || 'Normal'
                    });
                });
            }
            
            console.log('API initialized successfully');
        } catch (error) {
            console.error('Failed to initialize API:', error);
            throw error;
        }
    }

    async fetchJbValuesJson(url) {
        const parseBody = async (res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        };

        try {
            const data = await parseBody(await fetch(url));
            return this.unwrapItemsArray(data);
        } catch (firstErr) {
            const firstMsg = firstErr instanceof Error ? firstErr.message : String(firstErr);
            try {
                const proxy = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
                const proxyRes = await fetch(proxy);
                if (!proxyRes.ok) {
                    throw new Error(`HTTP ${proxyRes.status}`);
                }
                const wrapped = await proxyRes.json();
                if (wrapped.contents == null || wrapped.contents === '') {
                    throw new Error('proxy returned empty contents');
                }
                const raw = typeof wrapped.contents === 'string'
                    ? JSON.parse(wrapped.contents)
                    : wrapped.contents;
                return this.unwrapItemsArray(raw);
            } catch (proxyErr) {
                const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
                const combined = new Error(
                    `Direct request failed (${firstMsg}). Proxy fallback failed (${proxyMsg}).`
                );
                combined.cause = { direct: firstErr, proxy: proxyErr };
                throw combined;
            }
        }
    }

    unwrapItemsArray(data) {
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.itemdata)) return data.itemdata;
        if (data && Array.isArray(data.items)) return data.items;
        if (data && Array.isArray(data.data)) return data.data;
        return [];
    }

    listCategoryLabel(section, fallbackCategory) {
        const raw = (section || fallbackCategory || 'Other').trim();
        const labels = {
            Vehicle: 'Vehicles',
            'Weapon Skin': 'Weapon Skins',
            Color: 'Hyperchromes',
            Texture: 'Textures',
            Drift: 'Drifts',
            Furniture: 'Furniture',
            Horn: 'Horns',
            Rim: 'Rims',
            Spoiler: 'Spoilers',
            'Tire Sticker': 'Tire Stickers',
            'Tire Style': 'Tire Styles',
        };
        return labels[raw] || raw;
    }

    populateCategoryFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        const categories = [...new Set(this.allItems.map(item => item.category))];
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    setupEventListeners() {
        // Search input
        document.getElementById('itemSearch').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterAndSortItems();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
            this.filterAndSortItems();
        });

        // Sort filter
        document.getElementById('sortFilter').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.filterAndSortItems();
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeItemPicker();
            }
        });

        // Click outside modal to close
        document.getElementById('itemPickerModal').addEventListener('click', (e) => {
            if (e.target.id === 'itemPickerModal') {
                this.closeItemPicker();
            }
        });

        // Prevent modal content clicks from closing modal
        document.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    filterAndSortItems() {
        // Filter by search term
        let filtered = this.allItems.filter(item => {
            const matchesSearch = !this.searchTerm || 
                item.name.toLowerCase().includes(this.searchTerm) ||
                item.category.toLowerCase().includes(this.searchTerm);
            
            const matchesCategory = !this.selectedCategory || 
                item.category === this.selectedCategory;
            
            return matchesSearch && matchesCategory;
        });

        // Sort items
        filtered.sort((a, b) => {
            switch (this.sortBy) {
                case 'value_desc':
                    return (b.cash_value || 0) - (a.cash_value || 0);
                case 'value_asc':
                    return (a.cash_value || 0) - (b.cash_value || 0);
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        this.filteredItems = filtered;
        this.renderModalItems();
    }

    renderModalItems() {
        const container = document.getElementById('modalItemsGrid');
        
        if (this.filteredItems.length === 0) {
            container.innerHTML = `
                <div class="loading-state">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>No items found matching your criteria</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredItems.map(item => `
            <div class="modal-item-card" onclick="calculator.addItem('${item.id}')" data-item-id="${item.id}">
                <div class="modal-item-image">
                    <img src="${item.image || 'https://via.placeholder.com/120x120/333/666?text=?'}" 
                         alt="${item.name}" 
                         onerror="this.src='https://via.placeholder.com/120x120/333/666?text=?'">
                </div>
                <div class="modal-item-name">${item.name}</div>
                <div class="modal-item-category">${item.category}</div>
                <div class="modal-item-value">$${(item.cash_value || 0).toLocaleString()}</div>
                <div class="modal-item-duped">Duped: $${(item.duped_value || 0).toLocaleString()}</div>
            </div>
        `).join('');
    }

    openItemPicker(side) {
        this.currentSide = side;
        document.getElementById('itemPickerModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset search and filters
        document.getElementById('itemSearch').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('sortFilter').value = 'value_desc';
        
        this.searchTerm = '';
        this.selectedCategory = '';
        this.sortBy = 'value_desc';
        
        this.filterAndSortItems();
        
        // Focus search input
        setTimeout(() => {
            document.getElementById('itemSearch').focus();
        }, 100);
    }

    closeItemPicker() {
        document.getElementById('itemPickerModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentSide = null;
    }

    addItem(itemId) {
        const item = this.allItems.find(i => i.id === itemId);
        if (!item) return;

        const items = this.currentSide === 'your' ? this.yourItems : this.theirItems;
        
        // Check if item already exists
        const exists = items.find(i => i.id === itemId);
        if (exists) {
            this.showNotification('Item already added to this side', 'warning');
            return;
        }

        items.push({...item});
        this.updateUI();
        this.closeItemPicker();
        this.showNotification(`Added ${item.name} to ${this.currentSide} side`, 'success');
    }

    removeItem(side, index) {
        const items = side === 'your' ? this.yourItems : this.theirItems;
        const removedItem = items[index];
        items.splice(index, 1);
        this.updateUI();
        this.showNotification(`Removed ${removedItem.name} from ${side} side`, 'info');
    }

    swapSides() {
        const temp = [...this.yourItems];
        this.yourItems = [...this.theirItems];
        this.theirItems = temp;
        this.updateUI();
        this.showNotification('Sides swapped', 'info');
    }

    clearAll() {
        if (this.yourItems.length === 0 && this.theirItems.length === 0) {
            this.showNotification('No items to clear', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear all items from both sides?')) {
            this.yourItems = [];
            this.theirItems = [];
            this.updateUI();
            this.showNotification('All items cleared', 'success');
        }
    }

    calculateTotals() {
        const yourTotal = this.yourItems.reduce((sum, item) => sum + (item.cash_value || 0), 0);
        const theirTotal = this.theirItems.reduce((sum, item) => sum + (item.cash_value || 0), 0);
        
        return {
            your: yourTotal,
            their: theirTotal,
            difference: yourTotal - theirTotal,
            absoluteDifference: Math.abs(yourTotal - theirTotal),
            total: yourTotal + theirTotal
        };
    }

    updateUI() {
        this.renderItems();
        this.updateStats();
        this.updateAnalysis();
    }

    renderItems() {
        // Render your items
        const yourContainer = document.getElementById('yourItems');
        yourContainer.innerHTML = [
            ...this.yourItems.map((item, index) => this.createItemCard(item, index, 'your')),
            '<div class="add-item-btn" onclick="calculator.openItemPicker(\'your\')"><i class="fas fa-plus"></i>Add Item</div>'
        ].join('');

        // Render their items
        const theirContainer = document.getElementById('theirItems');
        theirContainer.innerHTML = [
            ...this.theirItems.map((item, index) => this.createItemCard(item, index, 'their')),
            '<div class="add-item-btn" onclick="calculator.openItemPicker(\'their\')"><i class="fas fa-plus"></i>Add Item</div>'
        ].join('');
    }

    createItemCard(item, index, side) {
        return `
            <div class="item-card">
                <button class="item-remove" onclick="calculator.removeItem('${side}', ${index})">
                    <i class="fas fa-times"></i>
                </button>
                <div class="item-image">
                    <img src="${item.image || 'https://via.placeholder.com/80x80/333/666?text=?'}" 
                         alt="${item.name}" 
                         onerror="this.src='https://via.placeholder.com/80x80/333/666?text=?'">
                </div>
                <div class="item-name">${item.name}</div>
                <div class="item-value">$${(item.cash_value || 0).toLocaleString()}</div>
                <div class="item-category">${item.category}</div>
            </div>
        `;
    }

    updateStats() {
        const totals = this.calculateTotals();
        
        // Update values
        document.getElementById('yourValue').textContent = `$${totals.your.toLocaleString()}`;
        document.getElementById('theirValue').textContent = `$${totals.their.toLocaleString()}`;
        document.getElementById('totalValue').textContent = `$${totals.total.toLocaleString()}`;
        document.getElementById('tradeBalance').textContent = `$${totals.absoluteDifference.toLocaleString()}`;
        
        // Update item counts
        const totalItems = this.yourItems.length + this.theirItems.length;
        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('itemBreakdown').textContent = `${this.yourItems.length} vs ${this.theirItems.length}`;
        
        // Update fairness score
        const fairnessScore = totals.total > 0 ? Math.max(0, 100 - (totals.absoluteDifference / totals.total * 100)) : 100;
        document.getElementById('fairnessScore').textContent = `${fairnessScore.toFixed(1)}%`;
        
        // Update change indicators
        this.updateChangeIndicators(totals, fairnessScore);
    }

    updateChangeIndicators(totals, fairnessScore) {
        const totalChangeEl = document.getElementById('totalChange');
        const balanceStatusEl = document.getElementById('balanceStatus');
        const fairnessStatusEl = document.getElementById('fairnessStatus');
        
        if (totals.total === 0) {
            totalChangeEl.textContent = 'No items';
            totalChangeEl.className = 'stat-change neutral';
            balanceStatusEl.textContent = 'Fair Trade';
            balanceStatusEl.className = 'stat-change neutral';
        } else {
            if (totals.difference > 0) {
                totalChangeEl.textContent = `You're overpaying by $${totals.difference.toLocaleString()}`;
                totalChangeEl.className = 'stat-change negative';
                balanceStatusEl.textContent = 'You overpay';
                balanceStatusEl.className = 'stat-change negative';
            } else if (totals.difference < 0) {
                totalChangeEl.textContent = `They're overpaying by $${Math.abs(totals.difference).toLocaleString()}`;
                totalChangeEl.className = 'stat-change positive';
                balanceStatusEl.textContent = 'They overpay';
                balanceStatusEl.className = 'stat-change positive';
            } else {
                totalChangeEl.textContent = 'Perfectly balanced';
                totalChangeEl.className = 'stat-change positive';
                balanceStatusEl.textContent = 'Fair Trade';
                balanceStatusEl.className = 'stat-change positive';
            }
        }
        
        // Update fairness status
        if (fairnessScore >= 95) {
            fairnessStatusEl.textContent = 'Perfect';
            fairnessStatusEl.className = 'stat-change positive';
        } else if (fairnessScore >= 85) {
            fairnessStatusEl.textContent = 'Good';
            fairnessStatusEl.className = 'stat-change positive';
        } else if (fairnessScore >= 70) {
            fairnessStatusEl.textContent = 'Fair';
            fairnessStatusEl.className = 'stat-change neutral';
        } else {
            fairnessStatusEl.textContent = 'Unfair';
            fairnessStatusEl.className = 'stat-change negative';
        }
    }

    updateAnalysis() {
        const totals = this.calculateTotals();
        
        // Value difference
        const valueDiffEl = document.getElementById('valueDiff');
        valueDiffEl.textContent = `$${totals.absoluteDifference.toLocaleString()}`;
        
        if (totals.difference > 0) {
            valueDiffEl.className = 'analysis-value unfair';
            valueDiffEl.textContent = `You lose $${totals.difference.toLocaleString()}`;
        } else if (totals.difference < 0) {
            valueDiffEl.className = 'analysis-value unfair';
            valueDiffEl.textContent = `They lose $${Math.abs(totals.difference).toLocaleString()}`;
        } else {
            valueDiffEl.className = 'analysis-value fair';
            valueDiffEl.textContent = 'Perfectly balanced';
        }
        
        // Percentage difference
        const percentDiff = totals.total > 0 ? (totals.absoluteDifference / totals.total * 100) : 0;
        const percentDiffEl = document.getElementById('percentDiff');
        percentDiffEl.textContent = `${percentDiff.toFixed(1)}%`;
        percentDiffEl.className = percentDiff <= 10 ? 'analysis-value fair' : 'analysis-value unfair';
        
        // Recommendation
        const recommendationEl = document.getElementById('recommendation');
        if (totals.total === 0) {
            recommendationEl.textContent = 'Add items to analyze';
            recommendationEl.className = 'analysis-value neutral';
        } else if (percentDiff <= 5) {
            recommendationEl.textContent = 'Accept trade';
            recommendationEl.className = 'analysis-value fair';
        } else if (percentDiff <= 15) {
            recommendationEl.textContent = 'Negotiate slightly';
            recommendationEl.className = 'analysis-value neutral';
        } else if (totals.difference > 0) {
            recommendationEl.textContent = 'Ask for more';
            recommendationEl.className = 'analysis-value unfair';
        } else {
            recommendationEl.textContent = 'Great deal for you';
            recommendationEl.className = 'analysis-value fair';
        }
        
        // Risk level
        const riskEl = document.getElementById('riskLevel');
        if (totals.total === 0) {
            riskEl.textContent = 'None';
            riskEl.className = 'analysis-value neutral';
        } else if (percentDiff <= 5) {
            riskEl.textContent = 'Low';
            riskEl.className = 'analysis-value fair';
        } else if (percentDiff <= 15) {
            riskEl.textContent = 'Medium';
            riskEl.className = 'analysis-value neutral';
        } else {
            riskEl.textContent = 'High';
            riskEl.className = 'analysis-value unfair';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'var(--success)';
                notification.style.color = 'white';
                break;
            case 'warning':
                notification.style.background = 'var(--warning)';
                notification.style.color = 'white';
                break;
            case 'error':
                notification.style.background = 'var(--danger)';
                notification.style.color = 'white';
                break;
            default:
                notification.style.background = 'var(--surface-elevated)';
                notification.style.color = 'var(--text-primary)';
                notification.style.border = '1px solid var(--border)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }
}

// Global functions for onclick handlers
let calculator;

function openItemPicker(side) {
    calculator.openItemPicker(side);
}

function closeItemPicker() {
    calculator.closeItemPicker();
}

function swapSides() {
    calculator.swapSides();
}

function clearAll() {
    calculator.clearAll();
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    calculator = new AdvancedTradeCalculator();
});
