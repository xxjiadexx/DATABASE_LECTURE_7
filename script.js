class NoSQLDatabaseQuiz {
    constructor() {
        this.questions = this.initializeQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startTime = Date.now();
        this.timer = null;
        
        this.initializeElements();
        this.startQuiz();
        this.startTimer();
    }

    initializeElements() {
        this.elements = {
            currentQuestion: document.getElementById('current-question'),
            totalQuestions: document.getElementById('total-questions'),
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            progress: document.getElementById('progress'),
            questionType: document.getElementById('question-type'),
            difficulty: document.getElementById('difficulty'),
            questionText: document.getElementById('question-text'),
            cypherDisplay: document.getElementById('cypher-display'),
            graphDisplay: document.getElementById('graph-display'),
            databaseComparison: document.getElementById('database-comparison'),
            useCaseDisplay: document.getElementById('use-case-display'),
            codeBlock: document.getElementById('code-block'),
            optionsContainer: document.getElementById('options-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            quizContainer: document.getElementById('quiz-container'),
            resultsContainer: document.getElementById('results-container'),
            reviewContainer: document.getElementById('review-container'),
            finalScore: document.getElementById('final-score'),
            finalTotal: document.getElementById('final-total'),
            scorePercentage: document.getElementById('score-percentage'),
            timeTaken: document.getElementById('time-taken'),
            correctCount: document.getElementById('correct-count'),
            incorrectCount: document.getElementById('incorrect-count'),
            restartBtn: document.getElementById('restart-btn'),
            reviewBtn: document.getElementById('review-btn'),
            backToResults: document.getElementById('back-to-results'),
            reviewQuestions: document.getElementById('review-questions')
        };

        this.bindEvents();
    }

    bindEvents() {
        this.elements.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.elements.reviewBtn.addEventListener('click', () => this.showReview());
        this.elements.backToResults.addEventListener('click', () => this.showResults());
    }

    initializeQuestions() {
        return [
            {
                id: 1,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "Which database is mentioned as a popular Graph database?",
                options: [
                    "MongoDB",
                    "Neo4j",
                    "Redis",
                    "Cassandra"
                ],
                correct: 1,
                explanation: "Neo4j is mentioned as a popular graph database that excels at storing entities and relationships."
            },
            {
                id: 2,
                type: "Cypher Analysis",
                difficulty: "medium",
                question: "What does this Cypher command do?",
                cypherData: {
                    title: "Cypher CREATE Command",
                    commands: [
                        {
                            operation: "Create Node",
                            code: "CREATE (:Person {name: 'John', age: 30})"
                        }
                    ]
                },
                options: [
                    "Creates a relationship between two nodes",
                    "Creates a node with label 'Person' and properties name and age",
                    "Updates an existing person's age",
                    "Deletes a person node"
                ],
                correct: 1,
                explanation: "The CREATE command creates a new node with the label 'Person' and sets properties 'name' and 'age'."
            },
            {
                id: 3,
                type: "Cypher Analysis",
                difficulty: "hard",
                question: "What does this Cypher relationship creation command do?",
                cypherData: {
                    title: "Cypher Relationship Creation",
                    commands: [
                        {
                            operation: "Create Relationship",
                            code: "MATCH (n1:Person{name: 'John'}), (n2:Person{name: 'Jane'})\nCREATE (n1)-[:KNOWS]->(n2)"
                        }
                    ]
                },
                options: [
                    "Creates two new person nodes",
                    "Finds John and Jane, then creates a KNOWS relationship from John to Jane",
                    "Updates the relationship between John and Jane",
                    "Deletes the relationship between John and Jane"
                ],
                correct: 1,
                explanation: "This command first matches two existing Person nodes (John and Jane), then creates a directed KNOWS relationship from John to Jane."
            },
            {
                id: 4,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What type of database is Redis?",
                options: [
                    "Document Database",
                    "Graph Database",
                    "Key-Value Database",
                    "Column Database"
                ],
                correct: 2,
                explanation: "Redis is a key-value database that stores data as key-value pairs with simple query capabilities."
            },
            {
                id: 5,
                type: "Database Comparison",
                difficulty: "medium",
                question: "Which database type is best suited for storing hierarchical data with flexible schema?",
                comparisonData: {
                    title: "NoSQL Database Types Comparison",
                    types: [
                        {
                            name: "Document Database",
                            type: "document",
                            features: ["Store JSON/XML documents", "Rich querying", "Flexible schema"],
                            examples: ["MongoDB"],
                            useCases: ["Content management", "Product info"]
                        },
                        {
                            name: "Key-Value Database",
                            type: "key-value",
                            features: ["Store key-value pairs", "Simple queries", "High performance"],
                            examples: ["Redis"],
                            useCases: ["Session management", "Caching"]
                        },
                        {
                            name: "Column Database",
                            type: "column",
                            features: ["Column-oriented storage", "High compression", "Scalable"],
                            examples: ["Cassandra"],
                            useCases: ["OLAP", "Big data analytics"]
                        },
                        {
                            name: "Graph Database",
                            type: "graph",
                            features: ["Store entities and relationships", "Graph queries", "Complex relationships"],
                            examples: ["Neo4j"],
                            useCases: ["Social networks", "Recommendation systems"]
                        }
                    ]
                },
                options: [
                    "Key-Value Database",
                    "Document Database",
                    "Column Database",
                    "Graph Database"
                ],
                correct: 1,
                explanation: "Document databases are best for hierarchical data with flexible schemas, as they can store complex nested structures like JSON documents."
            },
            {
                id: 6,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "Which database is mentioned as a popular Column database?",
                options: [
                    "MongoDB",
                    "Neo4j",
                    "Cassandra",
                    "Redis"
                ],
                correct: 2,
                explanation: "Cassandra is mentioned as a popular column database that excels at scalable, column-oriented data storage."
            },
            {
                id: 7,
                type: "Cypher Analysis",
                difficulty: "medium",
                question: "What does this Cypher MATCH command return?",
                cypherData: {
                    title: "Cypher MATCH Command",
                    commands: [
                        {
                            operation: "Retrieve Data",
                            code: "MATCH (n:Person {name: 'John'})\nRETURN n"
                        }
                    ]
                },
                options: [
                    "All person nodes in the database",
                    "The person node with name 'John'",
                    "All relationships for John",
                    "The count of person nodes"
                ],
                correct: 1,
                explanation: "This MATCH command finds and returns the specific Person node that has the name property equal to 'John'."
            },
            {
                id: 8,
                type: "Use Case Analysis",
                difficulty: "medium",
                question: "Which NoSQL database type is most suitable for social network applications?",
                useCaseData: {
                    title: "NoSQL Database Use Cases",
                    cases: [
                        {
                            name: "Social Networks",
                            description: "Complex relationships between users, posts, and interactions",
                            industry: "Social Media"
                        },
                        {
                            name: "E-commerce",
                            description: "Product catalogs with varying attributes and user sessions",
                            industry: "Retail"
                        },
                        {
                            name: "Financial Services",
                            description: "Transaction processing and fraud detection",
                            industry: "Finance"
                        },
                        {
                            name: "IoT Applications",
                            description: "Sensor data collection and real-time analytics",
                            industry: "Technology"
                        }
                    ]
                },
                options: [
                    "Document Database",
                    "Key-Value Database",
                    "Column Database",
                    "Graph Database"
                ],
                correct: 3,
                explanation: "Graph databases are ideal for social networks because they excel at modeling and querying complex relationships between users, posts, and interactions."
            },
            {
                id: 9,
                type: "Multiple Choice",
                difficulty: "medium",
                question: "What is the main advantage of Column databases for big data analytics?",
                options: [
                    "Flexible schema design",
                    "High compression rate and scalability",
                    "Complex relationship modeling",
                    "Simple key-value operations"
                ],
                correct: 1,
                explanation: "Column databases offer high compression rates and excellent scalability, making them ideal for OLAP and big data analytics."
            },
            {
                id: 10,
                type: "Cypher Analysis",
                difficulty: "hard",
                question: "What does this Cypher UPDATE command do?",
                cypherData: {
                    title: "Cypher UPDATE Command",
                    commands: [
                        {
                            operation: "Update Node Property",
                            code: "MATCH (n:Person {name: 'John'})\nSET n.age = 31"
                        }
                    ]
                },
                options: [
                    "Creates a new person named John with age 31",
                    "Finds John and updates his age to 31",
                    "Deletes John's age property",
                    "Creates a relationship with age 31"
                ],
                correct: 1,
                explanation: "This command finds the Person node with name 'John' and updates (sets) the age property to 31."
            },
            {
                id: 11,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "Which programming language is used for querying Neo4j?",
                options: [
                    "SQL",
                    "Cypher",
                    "JavaScript",
                    "Python"
                ],
                correct: 1,
                explanation: "Cypher is the query language specifically designed for Neo4j graph database operations."
            },
            {
                id: 12,
                type: "Cypher Analysis",
                difficulty: "hard",
                question: "What does this Cypher relationship query return?",
                cypherData: {
                    title: "Cypher Relationship Query",
                    commands: [
                        {
                            operation: "Query Relationships",
                            code: "MATCH (:Person{name:'John'})-[:KNOWS]->(friend:Person)\nRETURN friend"
                        }
                    ]
                },
                options: [
                    "All person nodes in the database",
                    "John's node only",
                    "All people that John knows",
                    "All KNOWS relationships"
                ],
                correct: 2,
                explanation: "This query finds all Person nodes that John has a KNOWS relationship with and returns those friend nodes."
            },
            {
                id: 13,
                type: "Multiple Choice",
                difficulty: "medium",
                question: "Which use case is most suitable for Key-Value databases?",
                options: [
                    "Social network analysis",
                    "Content management systems",
                    "Session management and caching",
                    "Complex analytical queries"
                ],
                correct: 2,
                explanation: "Key-Value databases excel at session management and caching due to their simple structure and high performance for simple queries."
            },
            {
                id: 14,
                type: "Cypher Analysis",
                difficulty: "hard",
                question: "What does this Cypher DELETE command do?",
                cypherData: {
                    title: "Cypher DELETE Command",
                    commands: [
                        {
                            operation: "Delete Relationship",
                            code: "MATCH (:Person {name:'John'})-[r:KNOWS]->(:Person {name:'Jane'})\nDELETE r"
                        }
                    ]
                },
                options: [
                    "Deletes John and Jane nodes",
                    "Deletes only the KNOWS relationship between John and Jane",
                    "Deletes all KNOWS relationships",
                    "Updates the relationship properties"
                ],
                correct: 1,
                explanation: "This command finds the specific KNOWS relationship between John and Jane and deletes only that relationship, leaving the nodes intact."
            },
            {
                id: 15,
                type: "Multiple Choice",
                difficulty: "medium",
                question: "Which industries commonly use Neo4j according to the lecture?",
                options: [
                    "Only social media companies",
                    "Social networks, e-commerce, financial services, and logistics",
                    "Only financial institutions",
                    "Only technology companies"
                ],
                correct: 1,
                explanation: "Neo4j is used across various industries including social networks, e-commerce, financial services, and logistics where relationships and complex data structures are crucial."
            },
            {
                id: 16,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What does OLAP stand for in the context of Column databases?",
                options: [
                    "Online Analytical Processing",
                    "Online Application Programming",
                    "Optimal Load Analysis Protocol",
                    "Object-Oriented Language Access Point"
                ],
                correct: 0,
                explanation: "OLAP stands for Online Analytical Processing, which is a key use case for column databases due to their analytical capabilities."
            },
            {
                id: 17,
                type: "Graph Analysis",
                difficulty: "medium",
                question: "In a graph database, what represents the connections between entities?",
                graphData: {
                    title: "Graph Database Structure",
                    nodes: [
                        { name: "Person", type: "node" },
                        { name: "Company", type: "node" }
                    ],
                    relationships: [
                        { from: "Person", to: "Company", type: "WORKS_FOR" }
                    ]
                },
                options: [
                    "Nodes",
                    "Properties",
                    "Relationships/Edges",
                    "Labels"
                ],
                correct: 2,
                explanation: "In graph databases, relationships (also called edges) represent the connections between entities (nodes)."
            },
            {
                id: 18,
                type: "Multiple Choice",
                difficulty: "medium",
                question: "Which MongoDB library is mentioned for Python programming in Lab 5?",
                options: [
                    "mongoengine",
                    "pymongo",
                    "motor",
                    "mongokit"
                ],
                correct: 1,
                explanation: "The lecture mentions pymongo as the Python library used for connecting to and programming with MongoDB."
            },
            {
                id: 19,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What is the next topic mentioned after NoSQL databases?",
                options: [
                    "Database security",
                    "Database indexing",
                    "Database replication",
                    "Database backup"
                ],
                correct: 1,
                explanation: "The lecture mentions that the next topic will be database indexing, focusing on how to search faster."
            },
            {
                id: 20,
                type: "Database Comparison",
                difficulty: "hard",
                question: "Which combination of database features and use cases is correctly matched?",
                comparisonData: {
                    title: "Database Features and Use Cases",
                    types: [
                        {
                            name: "Document DB",
                            type: "document",
                            features: ["JSON/XML storage", "Rich querying", "Flexible schema"],
                            examples: ["MongoDB"],
                            useCases: ["Content management", "Product catalogs"]
                        },
                        {
                            name: "Graph DB",
                            type: "graph",
                            features: ["Entity-relationship storage", "Graph queries", "Complex relationships"],
                            examples: ["Neo4j"],
                            useCases: ["Social networks", "Fraud detection"]
                        }
                    ]
                },
                options: [
                    "Document DB: Simple key-value storage, Social networks",
                    "Graph DB: Column-oriented storage, E-commerce catalogs",
                    "Document DB: JSON/XML storage, Content management",
                    "Graph DB: High compression, Session management"
                ],
                correct: 2,
                explanation: "Document databases store JSON/XML documents with flexible schemas, making them ideal for content management and product catalogs with varying structures."
            }
        ];
    }

    createCypherDisplay(cypherData) {
        if (!cypherData) return '';
        
        let html = `<div class="cypher-title">${cypherData.title}</div>`;
        
        cypherData.commands.forEach(cmd => {
            html += `
                <div class="cypher-operation">
                    <h4>${cmd.operation}</h4>
                    <div class="cypher-command">${this.highlightCypher(cmd.code)}</div>
                </div>
            `;
        });
        
        return html;
    }

    createGraphDisplay(graphData) {
        if (!graphData) return '';
        
        let html = `<div class="graph-title">${graphData.title}</div>`;
        html += `<div class="graph-visualization">`;
        
        if (graphData.nodes && graphData.relationships) {
            graphData.nodes.forEach((node, index) => {
                html += `<div class="graph-node">${node.name}</div>`;
                if (index < graphData.nodes.length - 1) {
                    const rel = graphData.relationships[0];
                    html += `
                        <div class="graph-relationship">
                            <span class="graph-arrow">→</span>
                            <span class="graph-label">${rel.type}</span>
                            <span class="graph-arrow">→</span>
                        </div>
                    `;
                }
            });
        }
        
        html += `</div>`;
        return html;
    }

    createComparisonDisplay(comparisonData) {
        if (!comparisonData) return '';
        
        let html = `<div class="comparison-title">${comparisonData.title}</div>`;
        html += `<div class="comparison-grid">`;
        
        comparisonData.types.forEach(type => {
            html += `
                <div class="database-type ${type.type}">
                    <h3>${type.name}</h3>
                    <div class="features">
                        <h4>Features:</h4>
                        <ul>
                            ${type.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="examples">
                        <h4>Examples:</h4>
                        ${type.examples.map(example => `<span class="db-name">${example}</span>`).join('')}
                    </div>
                    <div class="examples">
                        <h4>Use Cases:</h4>
                        ${type.useCases.map(useCase => `<span class="db-name">${useCase}</span>`).join('')}
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        return html;
    }

    createUseCaseDisplay(useCaseData) {
        if (!useCaseData) return '';
        
        let html = `<div class="use-case-title">${useCaseData.title}</div>`;
        html += `<div class="use-case-grid">`;
        
        useCaseData.cases.forEach(useCase => {
            html += `
                <div class="use-case-item">
                    <h4>${useCase.name}</h4>
                    <p>${useCase.description}</p>
                    <div class="industry">${useCase.industry}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        return html;
    }

    highlightCypher(cypher) {
        let highlighted = cypher;
        
        // Highlight keywords
        const keywords = ['CREATE', 'MATCH', 'RETURN', 'SET', 'DELETE', 'WHERE'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="cypher-keyword">${keyword}</span>`);
        });
        
        // Highlight nodes
        highlighted = highlighted.replace(/\(([^)]+)\)/g, '<span class="cypher-node">($1)</span>');
        
        // Highlight relationships
        highlighted = highlighted.replace(/\[([^\]]+)\]/g, '<span class="cypher-relation">[$1]</span>');
        
        // Highlight properties
        highlighted = highlighted.replace(/\{([^}]+)\}/g, '<span class="cypher-property">{$1}</span>');
        
        // Highlight strings
        highlighted = highlighted.replace(/'([^']*)'/g, '<span class="cypher-value">\'$1\'</span>');
        
        return highlighted;
    }

    startQuiz() {
        this.elements.totalQuestions.textContent = this.questions.length;
        this.displayQuestion();
    }

    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        this.elements.currentQuestion.textContent = this.currentQuestionIndex + 1;
        this.elements.questionType.textContent = question.type;
        this.elements.difficulty.textContent = question.difficulty;
        this.elements.difficulty.className = `difficulty ${question.difficulty}`;
        this.elements.questionText.textContent = question.question;
        
        // Show/hide cypher display
        if (question.cypherData) {
            this.elements.cypherDisplay.style.display = 'block';
            this.elements.cypherDisplay.innerHTML = this.createCypherDisplay(question.cypherData);
        } else {
            this.elements.cypherDisplay.style.display = 'none';
        }
        
        // Show/hide graph display
        if (question.graphData) {
            this.elements.graphDisplay.style.display = 'block';
            this.elements.graphDisplay.innerHTML = this.createGraphDisplay(question.graphData);
        } else {
            this.elements.graphDisplay.style.display = 'none';
        }
        
        // Show/hide comparison display
        if (question.comparisonData) {
            this.elements.databaseComparison.style.display = 'block';
            this.elements.databaseComparison.innerHTML = this.createComparisonDisplay(question.comparisonData);
        } else {
            this.elements.databaseComparison.style.display = 'none';
        }
        
        // Show/hide use case display
        if (question.useCaseData) {
            this.elements.useCaseDisplay.style.display = 'block';
            this.elements.useCaseDisplay.innerHTML = this.createUseCaseDisplay(question.useCaseData);
        } else {
            this.elements.useCaseDisplay.style.display = 'none';
        }
        
        // Show/hide code block
        if (question.code) {
            this.elements.codeBlock.style.display = 'block';
            this.elements.codeBlock.innerHTML = this.highlightCypher(question.code);
        } else {
            this.elements.codeBlock.style.display = 'none';
        }
        
        // Display options
        this.elements.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <span class="option-label">${String.fromCharCode(65 + index)}</span>
                ${option}
            `;
            
            // Check if this option was previously selected
            const userAnswer = this.userAnswers[this.currentQuestionIndex];
            if (userAnswer !== undefined && userAnswer === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => this.selectOption(index));
            this.elements.optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        this.elements.prevBtn.disabled = this.currentQuestionIndex === 0;
        this.elements.nextBtn.textContent = this.currentQuestionIndex === this.questions.length - 1 ? 'Finish' : 'Next';
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.elements.progress.style.width = `${progress}%`;
    }

    selectOption(index) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked option
        document.querySelectorAll('.option')[index].classList.add('selected');
        
        // Store user answer
        this.userAnswers[this.currentQuestionIndex] = index;
        
        // Update score
        const question = this.questions[this.currentQuestionIndex];
        if (index === question.correct) {
            const previousAnswer = this.userAnswers[this.currentQuestionIndex];
            if (previousAnswer === undefined || previousAnswer !== question.correct) {
                this.score++;
                this.elements.score.textContent = this.score;
            }
        } else {
            const previousAnswer = this.userAnswers[this.currentQuestionIndex];
            if (previousAnswer === question.correct) {
                this.score--;
                this.elements.score.textContent = this.score;
            }
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    finishQuiz() {
        clearInterval(this.timer);
        this.calculateFinalScore();
        this.showResults();
    }

    calculateFinalScore() {
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });
    }

    showResults() {
        this.elements.quizContainer.style.display = 'none';
        this.elements.reviewContainer.style.display = 'none';
        this.elements.resultsContainer.style.display = 'block';
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        this.elements.finalScore.textContent = this.score;
        this.elements.finalTotal.textContent = this.questions.length;
        this.elements.scorePercentage.textContent = `${percentage}%`;
        this.elements.timeTaken.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.elements.correctCount.textContent = this.score;
        this.elements.incorrectCount.textContent = this.questions.length - this.score;
    }

    showReview() {
        this.elements.resultsContainer.style.display = 'none';
        this.elements.reviewContainer.style.display = 'block';
        
        this.elements.reviewQuestions.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            const reviewElement = document.createElement('div');
            reviewElement.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;
            
            let contentHTML = `
                <div class="review-question-text">
                    ${index + 1}. ${question.question}
                </div>
            `;
            
            if (question.cypherData) {
                contentHTML += `<div class="cypher-display">${this.createCypherDisplay(question.cypherData)}</div>`;
            }
            if (question.graphData) {
                contentHTML += `<div class="graph-display">${this.createGraphDisplay(question.graphData)}</div>`;
            }
            if (question.comparisonData) {
                contentHTML += `<div class="database-comparison">${this.createComparisonDisplay(question.comparisonData)}</div>`;
            }
            if (question.useCaseData) {
                contentHTML += `<div class="use-case-display">${this.createUseCaseDisplay(question.useCaseData)}</div>`;
            }
            if (question.code) {
                contentHTML += `<div class="code-block">${this.highlightCypher(question.code)}</div>`;
            }
            
            contentHTML += `
                <div class="review-answer user-answer">
                    Your answer: ${userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'} 
                    ${isCorrect ? '✓' : '✗'}
                </div>
                <div class="review-answer correct-answer">
                    Correct answer: ${question.options[question.correct]}
                </div>
                <div class="review-answer">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            
            reviewElement.innerHTML = contentHTML;
            this.elements.reviewQuestions.appendChild(reviewElement);
        });
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startTime = Date.now();
        
        this.elements.score.textContent = '0';
        this.elements.resultsContainer.style.display = 'none';
        this.elements.reviewContainer.style.display = 'none';
        this.elements.quizContainer.style.display = 'block';
        
        this.startQuiz();
        this.startTimer();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NoSQLDatabaseQuiz();
});
