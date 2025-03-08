class SearchInput {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'search-container';
        
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.className = 'search-input';
        this.input.placeholder = '问我任何问题...';
        
        this.searchIcon = document.createElement('div');
        this.searchIcon.className = 'search-icon';
        
        this.container.appendChild(this.input);
        this.container.appendChild(this.searchIcon);
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.input.addEventListener('focus', () => {
            this.container.classList.add('focused');
        });

        this.input.addEventListener('blur', () => {
            this.container.classList.remove('focused');
        });

        this.input.addEventListener('input', () => {
            if (this.input.value.length > 0) {
                this.container.classList.add('has-content');
            } else {
                this.container.classList.remove('has-content');
            }
        });
    }

    getElement() {
        return this.container;
    }
} 