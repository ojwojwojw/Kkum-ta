pipeline {
    agent any
    tools {
        nodejs "node18"
    }
    stages {
        stage('Build React App') {
            steps {
                sh "cd ./Device/frontend"
                sh "ls -al"
            }
        }
    }
}