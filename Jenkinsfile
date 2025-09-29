pipeline {
    agent any

    environment {
        // Pull credentials from Jenkins Credentials Manager
        DATABASE_URL          = credentials('DATABASE_URL')
        JWT_SECRET            = credentials('JWT_SECRET')
        CLOUDINARY_CLOUD_NAME = credentials('CLOUDINARY_CLOUD_NAME')
        CLOUDINARY_API_KEY    = credentials('CLOUDINARY_API_KEY')
        CLOUDINARY_API_SECRET = credentials('CLOUDINARY_API_SECRET')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm install -force'
            }
        }

        stage('Prisma Migrations') {
            steps {
                echo 'Running Prisma migrations on NeonDB...'
                bat 'npx prisma migrate deploy -force'
            }
        }

        stage('Build') {
            steps {
                echo 'Building NestJS project...'
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Run the app in the background on Windows
                bat 'start /B node dist\\main.js'
                echo 'Application deployed and running!'
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully ✅'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
    }
}
