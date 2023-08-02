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
                sh '''
                    cd ./device/frontend/
                    npm install
                    CI=false npm run build
                '''
            }
        }
        stage('Build React App Image') {
            steps {
                sh '''
                cd ./device/frontend/
                docker build -t ${docker_repo}:front-server-0.1 .
                '''
            }
        }
        stage('Release React App Image') {
            steps {
                sh '''
                docker stop front-app
                docker rm front-app
                docker run -d -p 3000:3000 --name front-app ${docker_repo}:front-server-0.1

                yes | docker image prune -a
                '''
            }
        }
    }
}