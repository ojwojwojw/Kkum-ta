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
        stage('Build Node Server') {
            steps {
                sh '''
                    cd ./device/backend/
                    npm install
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
        stage('Build Node Server Image') {
            steps {
                sh '''
                    cd ./device/backend/
                    docker build -t ${docker_repo}:back-server-0.1 .
                '''
            }
        }
        stage('Deploy React App Image') {
            steps {
                sh '''
                    docker stop front-app
                    docker run -d --name front-app1 -p 3000:3000 --network=web-network --volumes-from front-app gugaro/kkumta:front-server-0.1
                    docker rm front-app
                    docker stop front-app1
                    docker rename front-app1 front-app
                    docker start front-app
                '''
            }
        }
        stage('Deploy Node Server Image') {
            steps {
                sh '''
                    docker stop back-server
                    docker run -d --name back-server1 -p 8085:8085 --network=web-network --volumes-from back-server gugaro/kkumta:back-server-0.1
                    docker rm back-server
                    docker stop back-server1
                    docker rename back-server1 back-server
                    docker start back-server
                '''
            }
        }
    }
}
