pipeline {
    environment {
        docker_repo = "gugaro/kkumta"
        docker_key = credentials("Docker_Hub_Key")
        docker_image = ''
        ssh_target_host = "teamone@192.168.100.245"
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
                    ls -al
                    docker build --platform linux/arm/v8 -t ${docker_repo}:front-server-for-raspberry-0.1 .
                    docker push ${docker_repo}:front-sevrer-for-raspberry-0.1
                '''
            }
        }
        stage('Build Node Server Image') {
            steps {
                sh '''
                    cd ./device/backend/
                    docker build --platform linux/arm/v8 -t ${docker_repo}:back-server-0.1 .
                    docker push ${docker_repo}:back-sevrer-for-raspberry-0.1
                '''
            }
        }
        // stage('Deploy React App Image') {
        //     steps {
        //         sh '''
        //             docker stop front-app
        //             docker run -d --name front-app1 -p 3000:3000 --network=web-network --volumes-from front-app gugaro/kkumta:front-server-0.1
        //             docker rm front-app
        //             docker stop front-app1
        //             docker rename front-app1 front-app
        //             docker start front-app
        //         '''
        //     }
        // }
        // stage('Deploy Node Server Image') {
        //     steps {
        //         sh '''
        //             docker stop back-server
        //             docker run -d --name back-server1 -p 8085:8085 --network=web-network --volumes-from back-server gugaro/kkumta:back-server-0.1
        //             docker rm back-server
        //             docker stop back-server1
        //             docker rename back-server1 back-server
        //             docker start back-server
        //         '''
        //     }
        // }
        stage('deploy over ssh') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'Raspberry', 
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false, 
                                    excludes: '', 
                                    execCommand: '''
                                        docker stop front-app
                                        docker run -d --name front-app1 -p 3000:3000 --network=web-network --volumes-from front-app gugaro/kkumta:front-server-for-raspberry-0.1
                                        docker rm front-app
                                        docker stop front-app1
                                        docker rename front-app1 front-app
                                        docker start front-app

                                        docker stop back-server
                                        docker run -d --name back-server1 -p 8085:8085 --network=web-network --volumes-from back-server gugaro/kkumta:back-server-for-raspberry-0.1
                                        docker rm back-server
                                        docker stop back-server1
                                        docker rename back-server1 back-server
                                        docker start back-server
                                    ''', 
                                    execTimeout: 120000, 
                                    flatten: false, 
                                    makeEmptyDirs: false, 
                                    noDefaultExcludes: false, 
                                    patternSeparator: '[, ]+', 
                                    remoteDirectory: '', 
                                    remoteDirectorySDF: false, 
                                    removePrefix: '', 
                                    sourceFiles: ''
                                    )
                                ], 
                            usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false
                        )
                    ]
                )
            }
        }
    }
    // post {
    //     success {
    //     	script {
    //             def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
    //             def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
    //             mattermostSend (color: 'good', 
    //             message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
    //             endpoint: 'https://meeting.ssafy.com/hooks/f7i3ptr9hbg1md9r41p8ij9b9y', 
    //             channel: 'C101-Jenkins'
    //             )
    //         }
    //     }
    //     failure {
    //     	script {
    //             def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
    //             def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
    //             mattermostSend (color: 'danger', 
    //             message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
    //             endpoint: 'https://meeting.ssafy.com/hooks/f7i3ptr9hbg1md9r41p8ij9b9y', 
    //             channel: 'C101-Jenkins'
    //             )
    //         }
    //     }
    // }
}
