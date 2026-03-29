/**
 * HyperChrome Pity Calculator
 * Based on actual Jailbreak HyperChrome system (5 levels only)
 */

class PityCalculator {
    constructor() {
        this.serverType = 'big';
        this.currentRobberies = 0;
        this.hyperchromesEarned = 0;
        this.lastDropAgo = 0;
        
        // Actual HyperChrome pity system - 5 levels only
        this.hyperChromeLevels = [
            { level: 1, robberies: 250, probability: 0.01 },    // 250 robberies for 100% pity, ~1% base chance
            { level: 2, robberies: 500, probability: 0.005 },   // 500 robberies for 100% pity, ~0.5% base chance
            { level: 3, robberies: 750, probability: 0.002 },   // 750 robberies for 100% pity, ~0.2% base chance
            { level: 4, robberies: 1000, probability: 0.001 },  // 1000 robberies for 100% pity, ~0.1% base chance
            { level: 5, robberies: 1500, probability: 0.0005 }   // 1500 robberies for 100% pity, ~0.05% base chance
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedData();
        this.populatePityTable();
    }

    setupEventListeners() {
        // Server selector
        document.querySelectorAll('.server-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.server-option').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.serverType = e.target.dataset.server;
                this.saveData();
            });
        });

        // Input fields
        document.getElementById('currentRobberies').addEventListener('input', (e) => {
            this.currentRobberies = parseInt(e.target.value) || 0;
            this.saveData();
        });

        document.getElementById('hyperchromesEarned').addEventListener('input', (e) => {
            this.hyperchromesEarned = parseInt(e.target.value) || 0;
            this.saveData();
        });

        document.getElementById('lastDropAgo').addEventListener('input', (e) => {
            this.lastDropAgo = parseInt(e.target.value) || 0;
            this.saveData();
        });
    }

    calculate() {
        const currentPity = this.getCurrentPity();
        const currentLevel = this.getCurrentHyperChromeLevel();
        const levelData = this.hyperChromeLevels[currentLevel - 1] || this.hyperChromeLevels[4]; // Default to level 5 if beyond
        
        // Calculate pity percentage (progress toward guaranteed drop)
        const pityPercentage = Math.min((currentPity / levelData.robberies) * 100, 100);
        
        // Calculate robberies needed for 100% pity
        const robberiesToMaxPity = Math.max(levelData.robberies - currentPity, 0);
        
        // Update results
        document.getElementById('currentLevel').textContent = `Level ${currentLevel}`;
        document.getElementById('dropChance').textContent = `${(levelData.probability * 100).toFixed(2)}%`;
        document.getElementById('robberiesToNext').textContent = robberiesToMaxPity;
        document.getElementById('totalProgress').textContent = `${pityPercentage.toFixed(1)}%`;

        // Update progress bar
        document.getElementById('progressBar').style.width = `${pityPercentage}%`;
        document.getElementById('progressPercentage').textContent = `${pityPercentage.toFixed(1)}%`;

        // Update result descriptions
        document.querySelector('#currentLevel').nextElementSibling.textContent = `${levelData.robberies} robberies for 100% pity`;
        document.querySelector('#dropChance').nextElementSibling.textContent = 'Base chance per robbery';
        document.querySelector('#robberiesToNext').nextElementSibling.textContent = 'More robberies needed';
        document.querySelector('#totalProgress').nextElementSibling.textContent = 'Pity progress';

        // Show results
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.classList.add('show');

        // Highlight current level in table
        this.highlightCurrentLevel(currentLevel);

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    getCurrentPity() {
        if (this.serverType === 'big') {
            // Big servers reset pity every 24 hours
            return this.lastDropAgo;
        } else {
            // Small servers maintain pity across restarts
            // Estimate current pity based on robberies since last drop
            return this.lastDropAgo || this.currentRobberies;
        }
    }

    getCurrentHyperChromeLevel() {
        // Determine current HyperChrome level based on hyperchromes earned
        // This is simplified - in reality, each color has its own level
        // For calculator purposes, we estimate average level
        if (this.hyperchromesEarned === 0) return 1;
        if (this.hyperchromesEarned <= 2) return 1;
        if (this.hyperchromesEarned <= 5) return 2;
        if (this.hyperchromesEarned <= 10) return 3;
        if (this.hyperchromesEarned <= 15) return 4;
        return 5;
    }

    calculateExpectedRobberies(baseProbability, currentPity, pityMultiplier) {
        // Complex calculation considering both base chance and increasing pity
        // This is a simplified version
        const effectiveProbability = baseProbability + (currentPity / pityMultiplier) * 0.01; // Pity adds small chance increase
        return Math.ceil(1 / Math.max(effectiveProbability, 0.0001));
    }

    getCategory(probability) {
        if (probability >= 0.001) return 'Common';
        if (probability >= 0.0005) return 'Rare';
        if (probability >= 0.0002) return 'Ultra Rare';
        return 'Legendary';
    }

    getChanceBadgeClass(probability) {
        if (probability >= 0.001) return 'low';
        if (probability >= 0.0005) return 'medium';
        if (probability >= 0.0002) return 'high';
        return 'very-high';
    }

    populatePityTable() {
        const tbody = document.getElementById('pityTableBody');
        tbody.innerHTML = this.hyperChromeLevels.map(level => `
            <tr data-level="${level.level}">
                <td>Level ${level.level}</td>
                <td>${level.robberies.toLocaleString()}</td>
                <td><span class="chance-badge ${this.getChanceBadgeClass(level.probability)}">${(level.probability * 100).toFixed(2)}%</span></td>
                <td>${this.getCategory(level.probability)}</td>
            </tr>
        `).join('');
    }

    highlightCurrentLevel(level) {
        // Remove all highlights
        document.querySelectorAll('.pity-table tr').forEach(tr => tr.classList.remove('highlight'));
        
        // Add highlight to current level
        const currentRow = document.querySelector(`.pity-table tr[data-level="${level}"]`);
        if (currentRow) {
            currentRow.classList.add('highlight');
            currentRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    saveData() {
        const data = {
            serverType: this.serverType,
            currentRobberies: this.currentRobberies,
            hyperchromesEarned: this.hyperchromesEarned,
            lastDropAgo: this.lastDropAgo
        };
        localStorage.setItem('pityCalculatorData', JSON.stringify(data));
    }

    loadSavedData() {
        try {
            const saved = localStorage.getItem('pityCalculatorData');
            if (saved) {
                const data = JSON.parse(saved);
                this.serverType = data.serverType || 'big';
                this.currentRobberies = data.currentRobberies || 0;
                this.hyperchromesEarned = data.hyperchromesEarned || 0;
                this.lastDropAgo = data.lastDropAgo || 0;

                // Update UI
                document.getElementById('currentRobberies').value = this.currentRobberies;
                document.getElementById('hyperchromesEarned').value = this.hyperchromesEarned;
                document.getElementById('lastDropAgo').value = this.lastDropAgo;
                
                // Update server selector
                document.querySelectorAll('.server-option').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.server === this.serverType);
                });
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Initialize calculator
let pityCalculator;

document.addEventListener('DOMContentLoaded', () => {
    pityCalculator = new PityCalculator();
});
