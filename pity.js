// Logic from PROJECT_CODE_DUMP.txt [cite: 30028, 30033]
        const PUBLIC_THRESHOLDS = [179, 378, 608, 696, 1068];
        const SMALL_THRESHOLDS = [90, 189, 304, 348, 534];
        
        let currentServer = 'public';

        function setServer(type) {
            currentServer = type;
            document.getElementById('btnPublic').classList.toggle('active', type === 'public');
            document.getElementById('btnSmall').classList.toggle('active', type === 'small');
            runCalc('rolls');
        }

        function runCalc(source) { 
            const index = parseInt(document.getElementById('pityRate').value);
            const target = currentServer === 'public' ? PUBLIC_THRESHOLDS[index] : SMALL_THRESHOLDS[index];
            
            const rollInput = document.getElementById('userRolls'); 
            const percentInput = document.getElementById('userPercent'); 
            const pityOut = document.getElementById('pityOut'); 
            const barFill = document.getElementById('barFill'); 
            const statusBox = document.getElementById('rollsLeft'); 
            const subStatus = document.getElementById('subStatus');

            let rolls = 0, displayPerc = 0; 

            if (source === 'rolls') { 
                rolls = parseInt(rollInput.value) || 0; 
                displayPerc = (rolls / target) * 100; 
                percentInput.value = displayPerc > 0 ? displayPerc.toFixed(1) : ""; 
            } else { 
                const percent = parseFloat(percentInput.value) || 0; 
                rolls = Math.round((percent / 100) * target); 
                rollInput.value = rolls > 0 ? rolls : ""; 
                displayPerc = percent; 
            } 

            const clampedPerc = Math.min(displayPerc, 100); 
            pityOut.innerText = clampedPerc.toFixed(1) + "%"; 
            barFill.style.width = clampedPerc + "%"; 
            
            const remaining = target - rolls; 
            statusBox.innerText = remaining > 0 ? remaining + " Robberies Remaining" : "GUARENTEED DROP WINDOW"; 
            statusBox.style.color = remaining > 0 ? "var(--text-main)" : "var(--jailbreak-green)"; 
            subStatus.innerText = `Target Threshold: ${target} total robberies`;
        }