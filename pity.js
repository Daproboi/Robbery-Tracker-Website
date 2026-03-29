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
        this.baseDropRate = 0.01; // 1% base chance
        this.pityIncrement = 0.005; // 0.5% increase per 50 robberies without drop
        
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

    calculateDropChance(pity) {
        // Advanced pity system with increasing probability
        let chance = this.baseDropRate;
        
        // Add pity bonus
        if (pity > 50) {
            chance += this.pityIncrement * Math.floor(pity / 50);
        }
        
        // Cap at reasonable maximum (25%)
        chance = Math.min(chance, 0.25);
        
        // Apply user's personal drop rate modifier
        chance *= (this.dropRate / 100);
        
        return chance;
    }

    calculateEstimatedRobberies(dropChance) {
        if (dropChance <= 0) return 999;
        
        // Use negative binomial distribution for more accurate estimation
        const expectedValue = 1 / dropChance;
        const variance = (1 - dropChance) / (dropChance * dropChance);
        const standardDeviation = Math.sqrt(variance);
        
        // Return 95% confidence interval
        return Math.ceil(expectedValue + (1.96 * standardDeviation));
    }

    calculateConfidence(pity) {
        if (pity < 25) return 'Very Low';
        if (pity < 50) return 'Low';
        if (pity < 100) return 'Medium';
        if (pity < 200) return 'High';
        if (pity < 300) return 'Very High';
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
        
        // Calculate progress percentage (capped at 300 for display)
        const cappedPity = Math.min(currentPity, 300);
        const percentage = (cappedPity / 300) * 100;
        
        progressBar.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage.toFixed(0)}%`;
        
        // Update milestones
        this.updateMilestones(currentPity);
    }

    updateMilestones(currentPity) {
        const milestones = [0, 50, 100, 200, 300];
        
        milestones.forEach(robberies => {
            const milestoneEl = document.querySelector(`[data-robberies="${robberies}"] .milestone-dot`);
            const isCompleted = currentPity >= robberies;
            const isCurrent = currentPity >= robberies && currentPity < (milestones[milestones.indexOf(robberies) + 1] || 999);
            
            milestoneEl.className = 'milestone-dot';
            if (isCompleted) {
                milestoneEl.classList.add('completed');
            }
            if (isCurrent) {
                milestoneEl.classList.add('current');
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
