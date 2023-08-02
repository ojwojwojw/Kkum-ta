pipeline {
    environment {
        docker_repo = "gugaro/kkumta"
        docker_key = credentials("Docker_Hub_Key")
        docker_image = ''
    }
    agent any
    tools {
        nodejs "node18"
    }
    stages {
        stage('Build React App') {
            steps {
                sh "ls -al"
                sh "cd ./device/frontend"
                sh "npm run build"
            }
        }
        stage('Build React App Image') {
            steps {
                sh "docker build -t ${docker_repo}:front-server-0.1 ."
            }
        }
    }
}