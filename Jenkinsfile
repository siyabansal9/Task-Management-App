pipeline {
    agent any  // Run on any available Jenkins agent

    environment {
        DOTENV = '.env'  // Path to your .env file
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/siyabansal9/Task-Management-App.git'
            }
        }

        stage('Load .env') {
            steps {
                echo 'Loading environment variables...'
                script {
                    def props = readFile(DOTENV).split("\n")
                    for (line in props) {
                        if (line.trim() && !line.startsWith("#")) {
                            def (key, value) = line.split("=", 2)
                            env[key] = value
                        }
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Prisma Migrations') {
            steps {
                echo 'Running Prisma migrations on NeonDB...'
                sh 'npx prisma migrate deploy'
            }
        }

        stage('Build') {
            steps {
                echo 'Building NestJS project...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Example deployment: run Node server in background
                sh 'nohup node dist/main.js &'
                echo 'App deployed and running!'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded ✅'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
        always {
            echo 'Pipeline finished 🔔'
        }
    }
}
