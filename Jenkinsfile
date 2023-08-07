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
        stage('Build React App - Device') {
            steps {
                sh '''
                    cd ./device/frontend/
                    npm install
                    CI=false npm run build
                '''
            }
        }
        stage('Build Node Server - Device') {
            steps {
                sh '''
                    cd ./device/backend/
                    npm install
                '''
            }
        }
        stage('Build React App - Web') {
            steps {
                sh '''
                    cd ./remote/frontend/
                    npm install
                    CI=false npm run build
                '''
            }
        }
        stage('Build Node Server - Web') {
            steps {
                sh '''
                    cd ./remote/back/
                    npm install
                '''
            }
        }
        stage('Build React App Image - Device') {
            steps {
                sh '''
                    cd ./device/frontend/
                    docker build -t ${docker_repo}:front-device-0.1 .
                '''
            }
        }
        stage('Build Node Server Image - Device') {
            steps {
                sh '''
                    cd ./device/backend/
                    docker build -t ${docker_repo}:back-device-0.1 .
                '''
            }
        }
        stage('Build React App Image - Web') {
            steps {
                sh '''
                    cd ./remote/frontend/
                    docker build -t ${docker_repo}:front-server-0.1 .
                '''
            }
        }
        stage('Build Node Server Image - Web') {
            steps {
                sh '''
                    cd ./remote/backend/
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
        stage('Deploy Web Front Image') {
            steps {
                sh '''
                    docker stop front-web-app
                    docker run -d --name front-web-app1 -p 3005:3005 --network=web-network --volumes-from front-web-app gugaro/kkumta:front-server-0.1
                    docker rm front-web-app
                    docker stop front-web-app1
                    docker rename front-web-app1 front-web-app
                    docker start front-web-app
                '''
            }
        }
        stage('Deploy Web Back Image') {
            steps {
                sh '''
                    docker stop back-web-server
                    docker run -d --name back-web-server1 -p 8090:8090 --network=web-network --volumes-from back-web-server gugaro/kkumta:back-server-0.1
                    docker rm back-web-server
                    docker stop back-web-server1
                    docker rename back-web-server1 back-web-server
                    docker start back-web-server
                '''
            }
        }
    }
    post {
        success {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good', 
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/f7i3ptr9hbg1md9r41p8ij9b9y', 
                channel: 'C101-Jenkins'
                )
            }
        }
        failure {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger', 
                message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/f7i3ptr9hbg1md9r41p8ij9b9y', 
                channel: 'C101-Jenkins'
                )
            }
        }
    }
}
