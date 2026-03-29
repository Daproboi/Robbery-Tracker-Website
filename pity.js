/**
 * Hyperchrome Pity Calculator
 * Based on Jailbreak's actual pity system
 */

class PityCalculator {
    constructor() {
        this.serverType = 'big';
        this.currentRobberies = 0;
        this.hyperchromesEarned = 0;
        this.lastDropAgo = 0;
        
        // Actual Jailbreak pity system data
        this.pityLevels = [
            { level: 1, robberies: 0, chance: 0.01 },
            { level: 2, robberies: 50, chance: 0.02 },
            { level: 3, robberies: 100, chance: 0.03 },
            { level: 4, robberies: 150, chance: 0.04 },
            { level: 5, robberies: 200, chance: 0.05 },
            { level: 6, robberies: 250, chance: 0.06 },
            { level: 7, robberies: 300, chance: 0.07 },
            { level: 8, robberies: 350, chance: 0.08 },
            { level: 9, robberies: 400, chance: 0.09 },
            { level: 10, robberies: 450, chance: 0.10 },
            { level: 11, robberies: 500, chance: 0.11 },
            { level: 12, robberies: 550, chance: 0.12 },
            { level: 13, robberies: 600, chance: 0.13 },
            { level: 14, robberies: 650, chance: 0.14 },
            { level: 15, robberies: 700, chance: 0.15 },
            { level: 16, robberies: 750, chance: 0.16 },
            { level: 17, robberies: 800, chance: 0.17 },
            { level: 18, robberies: 850, chance: 0.18 },
            { level: 19, robberies: 900, chance: 0.19 },
            { level: 20, robberies: 950, chance: 0.20 },
            { level: 21, robberies: 1000, chance: 0.21 },
            { level: 22, robberies: 1100, chance: 0.22 },
            { level: 23, robberies: 1200, chance: 0.23 },
            { level: 24, robberies: 1300, chance: 0.24 },
            { level: 25, robberies: 1400, chance: 0.25 },
            { level: 26, robberies: 1500, chance: 0.26 },
            { level: 27, robberies: 1600, chance: 0.27 },
            { level: 28, robberies: 1700, chance: 0.28 },
            { level: 29, robberies: 1800, chance: 0.29 },
            { level: 30, robberies: 1900, chance: 0.30 },
            { level: 31, robberies: 2000, chance: 0.31 },
            { level: 32, robberies: 2100, chance: 0.32 },
            { level: 33, robberies: 2200, chance: 0.33 },
            { level: 34, robberies: 2300, chance: 0.34 },
            { level: 35, robberies: 2400, chance: 0.35 },
            { level: 36, robberies: 2500, chance: 0.36 },
            { level: 37, robberies: 2600, chance: 0.37 },
            { level: 38, robberies: 2700, chance: 0.38 },
            { level: 39, robberies: 2800, chance: 0.39 },
            { level: 40, robberies: 2900, chance: 0.40 },
            { level: 41, robberies: 3000, chance: 0.41 },
            { level: 42, robberies: 3100, chance: 0.42 },
            { level: 43, robberies: 3200, chance: 0.43 },
            { level: 44, robberies: 3300, chance: 0.44 },
            { level: 45, robberies: 3400, chance: 0.45 },
            { level: 46, robberies: 3500, chance: 0.46 },
            { level: 47, robberies: 3600, chance: 0.47 },
            { level: 48, robberies: 3700, chance: 0.48 },
            { level: 49, robberies: 3800, chance: 0.49 },
            { level: 50, robberies: 3900, chance: 0.50 }
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
        const currentLevel = this.getCurrentPityLevel(currentPity);
        const nextLevel = this.getNextLevel(currentLevel);
        const robberiesToNext = nextLevel ? nextLevel.robberies - currentPity : 0;
        const totalProgress = (currentPity / 3900) * 100;

        // Update results
        document.getElementById('currentLevel').textContent = currentLevel.level;
        document.getElementById('dropChance').textContent = `${(currentLevel.chance * 100).toFixed(0)}%`;
        document.getElementById('robberiesToNext').textContent = robberiesToNext;
        document.getElementById('totalProgress').textContent = `${totalProgress.toFixed(1)}%`;

        // Update progress bar
        const progressWithinLevel = currentLevel.robberies > 0 ? 
            ((currentPity - currentLevel.robberies) / (nextLevel ? nextLevel.robberies - currentLevel.robberies : 50)) * 100 : 
            (currentPity / 50) * 100;
        
        document.getElementById('progressBar').style.width = `${progressWithinLevel}%`;
        document.getElementById('progressPercentage').textContent = `${progressWithinLevel.toFixed(1)}%`;

        // Update result descriptions
        document.querySelector('#currentLevel').nextElementSibling.textContent = `${(currentLevel.chance * 100).toFixed(0)}% chance`;
        document.querySelector('#dropChance').nextElementSibling.textContent = 'Next robbery';
        document.querySelector('#robberiesToNext').nextElementSibling.textContent = 'Estimated';
        document.querySelector('#totalProgress').nextElementSibling.textContent = 'To max level';

        // Show results
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.classList.add('show');

        // Highlight current level in table
        this.highlightCurrentLevel(currentLevel.level);

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    getCurrentPity() {
        if (this.serverType === 'big') {
            // Big servers reset daily, so we use lastDropAgo
            return this.lastDropAgo;
        } else {
            // Small servers maintain pity, so we calculate from total
            return this.currentRobberies;
        }
    }

    getCurrentPityLevel(pity) {
        for (let i = this.pityLevels.length - 1; i >= 0; i--) {
            if (pity >= this.pityLevels[i].robberies) {
                return this.pityLevels[i];
            }
        }
        return this.pityLevels[0];
    }

    getNextLevel(currentLevel) {
        const currentIndex = this.pityLevels.findIndex(level => level.level === currentLevel.level);
        return currentIndex < this.pityLevels.length - 1 ? this.pityLevels[currentIndex + 1] : null;
    }

    getCategory(chance) {
        if (chance <= 0.05) return 'Very Low';
        if (chance <= 0.10) return 'Low';
        if (chance <= 0.20) return 'Medium';
        if (chance <= 0.30) return 'High';
        if (chance <= 0.40) return 'Very High';
        return 'Extremely High';
    }

    getChanceBadgeClass(chance) {
        if (chance <= 0.05) return 'low';
        if (chance <= 0.15) return 'medium';
        if (chance <= 0.30) return 'high';
        return 'very-high';
    }

    populatePityTable() {
        const tbody = document.getElementById('pityTableBody');
        tbody.innerHTML = this.pityLevels.map(level => `
            <tr data-level="${level.level}">
                <td>${level.level}</td>
                <td>${level.robberies.toLocaleString()}</td>
                <td><span class="chance-badge ${this.getChanceBadgeClass(level.chance)}">${(level.chance * 100).toFixed(0)}%</span></td>
                <td>${this.getCategory(level.chance)}</td>
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
