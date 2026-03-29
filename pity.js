/**
 * Advanced Pity Calculator
 * Professional pity tracking with mathematical modeling and predictions
 */

class AdvancedPityCalculator {
    constructor() {
        this.currentRobberies = 0;
        this.totalRobberies = 0;
        this.hyperchromesEarned = 0;
        this.lastDropDate = null;
        this.dropRate = 1.0; // Default 1% drop rate
        this.sessionHistory = [];
        
        // Actual Jailbreak pity system data
        this.pityLevels = [
            { level: 1, robberies: 0, chance: 0.01 },      // 1% at start
            { level: 2, robberies: 50, chance: 0.02 },     // 2% at 50
            { level: 3, robberies: 100, chance: 0.03 },    // 3% at 100
            { level: 4, robberies: 150, chance: 0.04 },     // 4% at 150
            { level: 5, robberies: 200, chance: 0.05 },     // 5% at 200
            { level: 6, robberies: 250, chance: 0.06 },     // 6% at 250
            { level: 7, robberies: 300, chance: 0.07 },     // 7% at 300
            { level: 8, robberies: 350, chance: 0.08 },     // 8% at 350
            { level: 9, robberies: 400, chance: 0.09 },     // 9% at 400
            { level: 10, robberies: 450, chance: 0.10 },     // 10% at 450
            { level: 11, robberies: 500, chance: 0.11 },     // 11% at 500
            { level: 12, robberies: 550, chance: 0.12 },     // 12% at 550
            { level: 13, robberies: 600, chance: 0.13 },     // 13% at 600
            { level: 14, robberies: 650, chance: 0.14 },     // 14% at 650
            { level: 15, robberies: 700, chance: 0.15 },     // 15% at 700
            { level: 16, robberies: 750, chance: 0.16 },     // 16% at 750
            { level: 17, robberies: 800, chance: 0.17 },     // 17% at 800
            { level: 18, robberies: 850, chance: 0.18 },     // 18% at 850
            { level: 19, robberies: 900, chance: 0.19 },     // 19% at 900
            { level: 20, robberies: 950, chance: 0.20 },     // 20% at 950
            { level: 21, robberies: 1000, chance: 0.21 },    // 21% at 1000
            { level: 22, robberies: 1100, chance: 0.22 },    // 22% at 1100
            { level: 23, robberies: 1200, chance: 0.23 },    // 23% at 1200
            { level: 24, robberies: 1300, chance: 0.24 },    // 24% at 1300
            { level: 25, robberies: 1400, chance: 0.25 },    // 25% at 1400
            { level: 26, robberies: 1500, chance: 0.26 },    // 26% at 1500
            { level: 27, robberies: 1600, chance: 0.27 },    // 27% at 1600
            { level: 28, robberies: 1700, chance: 0.28 },    // 28% at 1700
            { level: 29, robberies: 1800, chance: 0.29 },    // 29% at 1800
            { level: 30, robberies: 1900, chance: 0.30 },    // 30% at 1900
            { level: 31, robberies: 2000, chance: 0.31 },    // 31% at 2000
            { level: 32, robberies: 2100, chance: 0.32 },    // 32% at 2100
            { level: 33, robberies: 2200, chance: 0.33 },    // 33% at 2200
            { level: 34, robberies: 2300, chance: 0.34 },    // 34% at 2300
            { level: 35, robberies: 2400, chance: 0.35 },    // 35% at 2400
            { level: 36, robberies: 2500, chance: 0.36 },    // 36% at 2500
            { level: 37, robberies: 2600, chance: 0.37 },    // 37% at 2600
            { level: 38, robberies: 2700, chance: 0.38 },    // 38% at 2700
            { level: 39, robberies: 2800, chance: 0.39 },    // 39% at 2800
            { level: 40, robberies: 2900, chance: 0.40 },    // 40% at 2900
            { level: 41, robberies: 3000, chance: 0.41 },    // 41% at 3000
            { level: 42, robberies: 3100, chance: 0.42 },    // 42% at 3100
            { level: 43, robberies: 3200, chance: 0.43 },    // 43% at 3200
            { level: 44, robberies: 3300, chance: 0.44 },    // 44% at 3300
            { level: 45, robberies: 3400, chance: 0.45 },    // 45% at 3400
            { level: 46, robberies: 3500, chance: 0.46 },    // 46% at 3500
            { level: 47, robberies: 3600, chance: 0.47 },    // 47% at 3600
            { level: 48, robberies: 3700, chance: 0.48 },    // 48% at 3700
            { level: 49, robberies: 3800, chance: 0.49 },    // 49% at 3800
            { level: 50, robberies: 3900, chance: 0.50 }     // 50% at 3900
        ];
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateUI();
        this.loadHistory();
    }

    setupEventListeners() {
        // Auto-save on input changes
        document.getElementById('totalRobberiesInput').addEventListener('input', (e) => {
            this.totalRobberies = parseInt(e.target.value) || 0;
            this.saveData();
            this.updateUI();
        });

        document.getElementById('hyperchromesEarnedInput').addEventListener('input', (e) => {
            this.hyperchromesEarned = parseInt(e.target.value) || 0;
            this.saveData();
            this.updateUI();
        });

        document.getElementById('lastDropDate').addEventListener('change', (e) => {
            this.lastDropDate = e.target.value;
            this.saveData();
            this.updateUI();
        });

        document.getElementById('dropRateInput').addEventListener('input', (e) => {
            this.dropRate = parseFloat(e.target.value) || 1.0;
            this.saveData();
            this.updateUI();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        this.calculatePity();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.addRobbery();
                        break;
                    case 'd':
                        e.preventDefault();
                        this.resetData();
                        break;
                }
            }
        });
    }

    loadData() {
        try {
            const savedData = localStorage.getItem('pityCalculatorData');
            if (savedData) {
                const data = JSON.parse(savedData);
                this.totalRobberies = data.totalRobberies || 0;
                this.hyperchromesEarned = data.hyperchromesEarned || 0;
                this.lastDropDate = data.lastDropDate || null;
                this.dropRate = data.dropRate || 1.0;
                
                // Update input fields
                document.getElementById('totalRobberiesInput').value = this.totalRobberies;
                document.getElementById('hyperchromesEarnedInput').value = this.hyperchromesEarned;
                document.getElementById('lastDropDate').value = this.lastDropDate || '';
                document.getElementById('dropRateInput').value = this.dropRate;
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }

    saveData() {
        try {
            const data = {
                totalRobberies: this.totalRobberies,
                hyperchromesEarned: this.hyperchromesEarned,
                lastDropDate: this.lastDropDate,
                dropRate: this.dropRate,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem('pityCalculatorData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    calculatePity() {
        if (this.totalRobberies === 0) {
            this.showNotification('Please enter robbery count first', 'warning');
            return;
        }

        const results = this.performAdvancedCalculations();
        this.displayResults(results);
        this.addToHistory('calculation', results);
        this.showNotification('Pity calculated successfully!', 'success');
    }

    performAdvancedCalculations() {
        const currentPity = this.calculateCurrentPity();
        const dropChance = this.calculateDropChance(currentPity);
        const estimatedRobberies = this.calculateEstimatedRobberies(dropChance);
        const confidence = this.calculateConfidence(currentPity);
        const nextDropEstimate = this.calculateNextDropEstimate(estimatedRobberies);

        return {
            currentPity,
            dropChance,
            estimatedRobberies,
            confidence,
            nextDropEstimate,
            streak: this.calculateStreak(),
            averagePerDay: this.calculateAveragePerDay()
        };
    }

    calculateCurrentPity() {
        if (!this.lastDropDate) return this.totalRobberies;
        
        const lastDrop = new Date(this.lastDropDate);
        const robberiesSinceDrop = this.totalRobberies - this.getRobberiesAtDate(lastDrop);
        
        return Math.max(0, robberiesSinceDrop);
    }

    getRobberiesAtDate(date) {
        // This is a simplified calculation - in real implementation, 
        // you'd track exact robbery counts over time
        const daysSinceDrop = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        return Math.max(0, this.totalRobberies - (daysSinceDrop * 10)); // Assume 10 robberies/day avg
    }

    getCurrentPityLevel() {
        const currentPity = this.calculateCurrentPity();
        
        // Find the current pity level
        for (let i = this.pityLevels.length - 1; i >= 0; i--) {
            if (currentPity >= this.pityLevels[i].robberies) {
                return this.pityLevels[i];
            }
        }
        
        return this.pityLevels[0]; // Default to level 1
    }

    calculateDropChance(pity) {
        const currentLevel = this.getCurrentPityLevel();
        let baseChance = currentLevel.chance;
        
        // Apply user's personal drop rate modifier
        baseChance *= (this.dropRate / 100);
        
        return Math.min(baseChance, 0.50); // Cap at 50%
    }

    calculateEstimatedRobberies(dropChance) {
        if (dropChance <= 0) return 999;
        
        const currentPity = this.calculateCurrentPity();
        const currentLevel = this.getCurrentPityLevel();
        
        // Find next level or calculate based on current chance
        for (let i = 0; i < this.pityLevels.length; i++) {
            if (this.pityLevels[i].robberies > currentPity) {
                const nextLevel = this.pityLevels[i];
                return nextLevel.robberies - currentPity;
            }
        }
        
        // If at max level, use probability
        const expectedValue = 1 / dropChance;
        return Math.ceil(expectedValue);
    }

    calculateConfidence(pity) {
        const currentLevel = this.getCurrentPityLevel();
        
        if (currentLevel.level <= 5) return 'Very Low';
        if (currentLevel.level <= 10) return 'Low';
        if (currentLevel.level <= 20) return 'Medium';
        if (currentLevel.level <= 35) return 'High';
        if (currentLevel.level <= 45) return 'Very High';
        return 'Extremely High';
    }

    calculateNextDropEstimate(estimatedRobberies) {
        if (estimatedRobberies >= 999) return '99+';
        
        const now = new Date();
        const daysToNextDrop = Math.ceil(estimatedRobberies / 10); // Assume 10 robberies/day
        const nextDropDate = new Date(now.getTime() + (daysToNextDrop * 24 * 60 * 60 * 1000));
        
        return {
            robberies: estimatedRobberies,
            date: nextDropDate.toLocaleDateString(),
            days: daysToNextDrop
        };
    }

    calculateStreak() {
        // Calculate current streak based on recent activity
        const today = new Date();
        const recentData = this.sessionHistory.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            return (today - entryDate) < (7 * 24 * 60 * 60 * 1000); // Last 7 days
        });
        
        return recentData.length;
    }

    calculateAveragePerDay() {
        if (!this.lastDropDate) return 0;
        
        const daysSinceFirst = Math.floor((new Date() - new Date(this.lastDropDate)) / (1000 * 60 * 60 * 24));
        return daysSinceFirst > 0 ? (this.totalRobberies / daysSinceFirst).toFixed(1) : 0;
    }

    displayResults(results) {
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.style.display = 'block';
        
        // Update result cards
        document.getElementById('currentPity').textContent = results.currentPity;
        document.getElementById('dropChance').textContent = `${(results.dropChance * 100).toFixed(2)}%`;
        document.getElementById('estimatedRobberies').textContent = results.estimatedRobberies;
        document.getElementById('confidence').textContent = results.confidence;
        
        // Update confidence color
        const confidenceEl = document.getElementById('confidence');
        confidenceEl.className = 'result-value';
        if (results.confidence.includes('Very High') || results.confidence.includes('Extremely')) {
            confidenceEl.classList.add('good');
        } else if (results.confidence.includes('High')) {
            confidenceEl.classList.add('warning');
        } else {
            confidenceEl.classList.add('danger');
        }
        
        // Update next drop estimate
        if (results.nextDropEstimate) {
            document.getElementById('nextDropEst').textContent = `~${results.nextDropEstimate.days} days`;
            document.getElementById('dropConfidence').textContent = `${results.nextDropEstimate.date} est.`;
        }
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    updateUI() {
        // Update stats dashboard
        const results = this.performAdvancedCalculations();
        
        document.getElementById('currentStreak').textContent = results.streak;
        document.getElementById('pityPercentage').textContent = `${(results.dropChance * 100).toFixed(1)}%`;
        document.getElementById('totalRobberies').textContent = this.totalRobberies;
        document.getElementById('averageRobberies').textContent = `${results.averagePerDay} per day`;
        
        // Update progress bar
        this.updateProgressBar(results.currentPity);
        
        // Update status indicators
        this.updateStatusIndicators(results);
    }

    updateProgressBar(currentPity) {
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = document.getElementById('progressPercentage');
        
        // Get current level info
        const currentLevel = this.getCurrentPityLevel();
        
        // Calculate progress within current level
        const previousLevelRobberies = currentLevel.robberies;
        const nextLevelIndex = this.pityLevels.findIndex(level => level.level === currentLevel.level) + 1;
        const nextLevelRobberies = nextLevelIndex < this.pityLevels.length ? 
            this.pityLevels[nextLevelIndex].robberies : 
            this.pityLevels[this.pityLevels.length - 1].robberies;
        
        const progressWithinLevel = currentPity - previousLevelRobberies;
        const levelRange = nextLevelRobberies - previousLevelRobberies;
        const percentage = levelRange > 0 ? (progressWithinLevel / levelRange) * 100 : 100;
        
        progressBar.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage.toFixed(1)}%`;
        
        // Update milestones to show key pity levels
        this.updateMilestones(currentPity);
    }

    updateMilestones(currentPity) {
        // Key milestones from the actual pity system
        const keyMilestones = [
            { robberies: 0, label: 'Start' },
            { robberies: 100, label: '3%' },
            { robberies: 500, label: '11%' },
            { robberies: 1000, label: '21%' },
            { robberies: 2000, label: '31%' },
            { robberies: 3900, label: '50%' }
        ];
        
        keyMilestones.forEach((milestone, index) => {
            const milestoneEl = document.querySelector(`[data-robberies="${milestone.robberies}"]`);
            if (milestoneEl) {
                const dot = milestoneEl.querySelector('.milestone-dot');
                const labelEl = milestoneEl.querySelector('.milestone-label');
                const valueEl = milestoneEl.querySelector('.milestone-value');
                
                dot.className = 'milestone-dot';
                if (currentPity >= milestone.robberies) {
                    dot.classList.add('completed');
                }
                if (currentPity >= milestone.robberies && 
                    (index === keyMilestones.length - 1 || currentPity < keyMilestones[index + 1].robberies)) {
                    dot.classList.add('current');
                }
                
                labelEl.textContent = milestone.label;
                valueEl.textContent = milestone.robberies;
            }
        });
    }

    updateStatusIndicators(results) {
        // Update streak status
        const streakStatus = document.getElementById('streakStatus');
        streakStatus.textContent = results.streak > 0 ? `${results.streak} day streak` : 'No data';
        streakStatus.className = results.streak > 3 ? 'stat-change positive' : 'stat-change neutral';
        
        // Update pity status
        const pityStatus = document.getElementById('pityStatus');
        if (results.currentPity === 0) {
            pityStatus.textContent = 'Starting out';
        } else if (results.currentPity < 50) {
            pityStatus.textContent = 'Building pity';
        } else if (results.currentPity < 100) {
            pityStatus.textContent = 'Good chance';
        } else {
            pityStatus.textContent = 'Very likely soon';
        }
        pityStatus.className = 'stat-change neutral';
    }

    addRobbery() {
        this.totalRobberies += 1;
        document.getElementById('totalRobberiesInput').value = this.totalRobberies;
        this.saveData();
        this.updateUI();
        this.addToHistory('robbery', { count: 1, total: this.totalRobberies });
        this.showNotification('Robbery added!', 'success');
        
        // Animate the update
        this.animateValue('totalRobberies');
    }

    resetData() {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            this.totalRobberies = 0;
            this.hyperchromesEarned = 0;
            this.lastDropDate = null;
            this.dropRate = 1.0;
            
            // Clear inputs
            document.getElementById('totalRobberiesInput').value = '';
            document.getElementById('hyperchromesEarnedInput').value = '';
            document.getElementById('lastDropDate').value = '';
            document.getElementById('dropRateInput').value = '';
            
            // Clear results
            document.getElementById('resultsSection').style.display = 'none';
            
            this.saveData();
            this.updateUI();
            this.addToHistory('reset', {});
            this.showNotification('Data reset successfully', 'info');
        }
    }

    addToHistory(type, data) {
        const entry = {
            type,
            data,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        
        this.sessionHistory.unshift(entry);
        
        // Keep only last 50 entries
        if (this.sessionHistory.length > 50) {
            this.sessionHistory = this.sessionHistory.slice(0, 50);
        }
        
        this.saveHistory();
        this.renderHistory();
    }

    saveHistory() {
        try {
            localStorage.setItem('pityCalculatorHistory', JSON.stringify(this.sessionHistory));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    loadHistory() {
        try {
            const savedHistory = localStorage.getItem('pityCalculatorHistory');
            if (savedHistory) {
                this.sessionHistory = JSON.parse(savedHistory);
            }
        } catch (error) {
            console.error('Error loading history:', error);
        }
        
        this.renderHistory();
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.sessionHistory.length === 0) {
            historyList.innerHTML = `
                <div style="text-align: center; color: #6b7280; padding: 40px;">
                    <i class="fas fa-history" style="font-size: 2rem; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>No history yet</p>
                    <p style="font-size: 0.875rem; margin-top: 8px;">Start calculating pity to see your history here</p>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = this.sessionHistory.map(entry => {
            const date = new Date(entry.timestamp);
            const dateStr = date.toLocaleDateString();
            const timeStr = date.toLocaleTimeString();
            
            let icon, description, action;
            switch (entry.type) {
                case 'robbery':
                    icon = 'fa-plus';
                    description = `Added robbery (Total: ${entry.data.total})`;
                    action = 'add';
                    break;
                case 'calculation':
                    icon = 'fa-calculator';
                    description = `Calculated pity (${entry.data.currentPity} streak)`;
                    action = 'view';
                    break;
                case 'reset':
                    icon = 'fa-redo';
                    description = 'Reset all data';
                    action = 'info';
                    break;
                default:
                    icon = 'fa-circle';
                    description = 'Unknown action';
                    action = 'info';
            }
            
            return `
                <div class="history-item">
                    <div class="history-info">
                        <div class="history-date">${dateStr} ${timeStr}</div>
                        <div class="history-details">${description}</div>
                    </div>
                    <div class="history-actions">
                        <button class="history-btn" onclick="pityCalculator.viewHistoryEntry('${entry.id}')" title="View details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="history-btn" onclick="pityCalculator.deleteHistoryEntry('${entry.id}')" title="Delete entry">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    viewHistoryEntry(id) {
        const entry = this.sessionHistory.find(e => e.id == id);
        if (entry) {
            this.showNotification(`Entry: ${entry.type} - ${new Date(entry.timestamp).toLocaleString()}`, 'info');
        }
    }

    deleteHistoryEntry(id) {
        if (confirm('Delete this history entry?')) {
            this.sessionHistory = this.sessionHistory.filter(e => e.id != id);
            this.saveHistory();
            this.renderHistory();
            this.showNotification('History entry deleted', 'info');
        }
    }

    exportHistory() {
        if (this.sessionHistory.length === 0) {
            this.showNotification('No history to export', 'warning');
            return;
        }
        
        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `pity-history-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('History exported successfully', 'success');
    }

    generateCSV() {
        const headers = ['Date', 'Time', 'Type', 'Description', 'Total Robberies', 'Hyperchromes'];
        
        const rows = this.sessionHistory.map(entry => {
            const date = new Date(entry.timestamp);
            const dateStr = date.toLocaleDateString();
            const timeStr = date.toLocaleTimeString();
            
            let description = '';
            let totalRobberies = '';
            let hyperchromes = '';
            
            switch (entry.type) {
                case 'robbery':
                    description = `Added robbery`;
                    totalRobberies = entry.data.total || '';
                    break;
                case 'calculation':
                    description = `Pity calculation`;
                    totalRobberies = entry.data.currentPity || '';
                    hyperchromes = entry.data.hyperchromes || '';
                    break;
                case 'reset':
                    description = `Data reset`;
                    break;
            }
            
            return [dateStr, timeStr, entry.type, description, totalRobberies, hyperchromes].join(',');
        });
        
        return [headers.join(','), ...rows].join('\n');
    }

    animateValue(elementId) {
        const element = document.getElementById(elementId);
        element.style.transform = 'scale(1.2)';
        element.style.color = 'var(--success)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 300);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        `;
        
        // Set color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'var(--gradient-success)';
                notification.style.color = 'white';
                break;
            case 'warning':
                notification.style.background = 'var(--gradient-warning)';
                notification.style.color = 'white';
                break;
            case 'error':
                notification.style.background = 'var(--gradient-danger)';
                notification.style.color = 'white';
                break;
            default:
                notification.style.background = 'var(--surface-elevated)';
                notification.style.color = '#ffffff';
                notification.style.border = '1px solid var(--border)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the calculator
let pityCalculator;

document.addEventListener('DOMContentLoaded', () => {
    pityCalculator = new AdvancedPityCalculator();
});
