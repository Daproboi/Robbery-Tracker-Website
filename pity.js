/**
 * HyperChrome Pity Calculator - Simple & Smart
 * Based on actual Jailbreak mechanics
 */

class PityCalculator {
    constructor() {
        this.serverType = 'big';
        this.currentRobberies = 0;
        this.hyperchromesEarned = 0;
        this.lastDropAgo = 0;
        
        // Simple pity thresholds - common sense approach
        this.pityThresholds = {
            1: { robberies: 250, chance: 1.0 },      // 1% chance at 250 robberies
            2: { robberies: 500, chance: 0.5 },      // 0.5% chance at 500 robberies
            3: { robberies: 750, chance: 0.2 },      // 0.2% chance at 750 robberies
            4: { robberies: 1000, chance: 0.1 },     // 0.1% chance at 1000 robberies
            5: { robberies: 1500, chance: 0.05 }     // 0.05% chance at 1500 robberies
        };
        
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
                // Auto-calculate when server changes
                this.calculate();
            });
        });

        // Auto-calculate on input changes
        ['currentRobberies', 'hyperchromesEarned', 'lastDropAgo'].forEach(id => {
            document.getElementById(id).addEventListener('input', (e) => {
                this[id] = parseInt(e.target.value) || 0;
                this.saveData();
                // Auto-calculate for better UX
                this.calculate();
            });
        });
    }

    calculate() {
        // Get current pity based on server type
        const currentPity = this.getCurrentPity();
        
        // Determine current level intelligently
        const currentLevel = this.getCurrentLevel(currentPity);
        const levelData = this.pityThresholds[currentLevel];
        
        // Calculate pity percentage (progress to guaranteed drop)
        const pityPercentage = Math.min((currentPity / levelData.robberies) * 100, 100);
        
        // Calculate robberies needed for guaranteed drop
        const robberiesToGuaranteed = Math.max(levelData.robberies - currentPity, 0);
        
        // Calculate effective drop chance (base chance + pity bonus)
        const effectiveChance = Math.min(levelData.chance + (pityPercentage * 0.01), 50);
        
        // Update UI with intelligent results
        this.updateResults(currentLevel, levelData, pityPercentage, robberiesToGuaranteed, effectiveChance);
        this.updateProgressBar(pityPercentage);
        this.highlightCurrentLevel(currentLevel);
    }

    getCurrentPity() {
        if (this.serverType === 'big') {
            // Big servers: pity resets daily, use robberies since last drop
            return this.lastDropAgo;
        } else {
            // Small servers: pity persists, use total robberies
            return this.currentRobberies;
        }
    }

    getCurrentLevel(pity) {
        // Simple level determination - find highest level reached
        for (let level = 5; level >= 1; level--) {
            if (pity >= this.pityThresholds[level].robberies) {
                return level;
            }
        }
        return 1; // Default to level 1
    }

    updateResults(level, levelData, pityPercentage, robberiesToGuaranteed, effectiveChance) {
        // Update result values
        document.getElementById('currentLevel').textContent = `Level ${level}`;
        document.getElementById('dropChance').textContent = `${effectiveChance.toFixed(1)}%`;
        document.getElementById('robberiesToNext').textContent = robberiesToGuaranteed;
        document.getElementById('totalProgress').textContent = `${pityPercentage.toFixed(1)}%`;

        // Update descriptions intelligently
        document.querySelector('#currentLevel').nextElementSibling.textContent = `${levelData.chance}% base chance`;
        document.querySelector('#dropChance').nextElementSibling.textContent = robberiesToGuaranteed === 0 ? 'Guaranteed!' : 'Effective chance';
        document.querySelector('#robberiesToNext').nextElementSibling.textContent = robberiesToGuaranteed === 0 ? 'Drop ready!' : 'To guarantee';
        document.querySelector('#totalProgress').nextElementSibling.textContent = 'Pity progress';

        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.classList.add('show');
    }

    updateProgressBar(percentage) {
        document.getElementById('progressBar').style.width = `${percentage}%`;
        document.getElementById('progressPercentage').textContent = `${percentage.toFixed(1)}%`;
    }

    populatePityTable() {
        const tbody = document.getElementById('pityTableBody');
        tbody.innerHTML = Object.entries(this.pityThresholds).map(([level, data]) => `
            <tr data-level="${level}">
                <td>Level ${level}</td>
                <td>${data.robberies.toLocaleString()}</td>
                <td><span class="chance-badge ${this.getChanceBadgeClass(data.chance)}">${data.chance}%</span></td>
                <td>${this.getCategory(data.chance)}</td>
            </tr>
        `).join('');
    }

    highlightCurrentLevel(level) {
        document.querySelectorAll('.pity-table tr').forEach(tr => tr.classList.remove('highlight'));
        const currentRow = document.querySelector(`.pity-table tr[data-level="${level}"]`);
        if (currentRow) {
            currentRow.classList.add('highlight');
            currentRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    getCategory(chance) {
        if (chance >= 1.0) return 'Common';
        if (chance >= 0.5) return 'Uncommon';
        if (chance >= 0.2) return 'Rare';
        if (chance >= 0.1) return 'Very Rare';
        return 'Legendary';
    }

    getChanceBadgeClass(chance) {
        if (chance >= 1.0) return 'low';
        if (chance >= 0.5) return 'medium';
        if (chance >= 0.2) return 'high';
        return 'very-high';
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
