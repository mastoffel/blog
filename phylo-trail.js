// Phylogenetic Tree Cursor Trail Easter Egg
(function() {
    let phyloMode = false;
    let keyBuffer = '';
    let branches = [];
    let mouseX = 0;
    let mouseY = 0;
    let lastBranchTime = 0;
    
    // Listen for "phylo" typing
    document.addEventListener('keydown', function(e) {
        // Add the key to buffer
        keyBuffer += e.key.toLowerCase();
        
        // Keep only last 10 characters
        if (keyBuffer.length > 10) {
            keyBuffer = keyBuffer.slice(-10);
        }
        
        // Check if "phylo" was typed
        if (keyBuffer.includes('phylo')) {
            togglePhyloMode();
            keyBuffer = ''; // Clear buffer after activation
        }
    });
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (phyloMode) {
            createBranch(mouseX, mouseY);
        }
    });
    
    function togglePhyloMode() {
        phyloMode = !phyloMode;
        
        if (phyloMode) {
            document.body.classList.add('phylo-mode');
            console.log('🌳 Phylogenetic mode activated! Move your cursor to grow the tree.');
        } else {
            document.body.classList.remove('phylo-mode');
            clearAllBranches();
            console.log('🌳 Phylogenetic mode deactivated.');
        }
    }
    
    function createBranch(x, y) {
        const now = Date.now();
        
        // Throttle branch creation
        if (now - lastBranchTime < 50) return;
        lastBranchTime = now;
        
        // Create branch element
        const branch = document.createElement('div');
        branch.className = 'phylo-branch';
        
        // Random chance for split branches
        if (Math.random() < 0.3) {
            branch.classList.add('split');
        }
        
        // Position the branch
        branch.style.left = (x - 1) + 'px';
        branch.style.top = (y - 10) + 'px';
        
        // Add random rotation for more organic look
        const rotation = (Math.random() - 0.5) * 30;
        branch.style.transform = `rotate(${rotation}deg)`;
        
        document.body.appendChild(branch);
        branches.push(branch);
        
        // Create nodes occasionally
        if (Math.random() < 0.2) {
            createNode(x, y);
        }
        
        // Start fade out after delay
        setTimeout(() => {
            branch.classList.add('fade');
        }, 500);
        
        // Remove element after transition
        setTimeout(() => {
            if (branch.parentNode) {
                branch.parentNode.removeChild(branch);
            }
            branches = branches.filter(b => b !== branch);
        }, 1300);
    }
    
    function createNode(x, y) {
        const node = document.createElement('div');
        node.className = 'phylo-node';
        
        // Position the node
        node.style.left = (x - 2) + 'px';
        node.style.top = (y - 2) + 'px';
        
        document.body.appendChild(node);
        
        // Start fade out after delay
        setTimeout(() => {
            node.classList.add('fade');
        }, 800);
        
        // Remove element after transition
        setTimeout(() => {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }, 1800);
    }
    
    function clearAllBranches() {
        branches.forEach(branch => {
            if (branch.parentNode) {
                branch.parentNode.removeChild(branch);
            }
        });
        branches = [];
        
        // Also clear any remaining nodes
        document.querySelectorAll('.phylo-node').forEach(node => {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', clearAllBranches);
})();