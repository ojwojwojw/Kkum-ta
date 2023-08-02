pipeline {
    agent any
    tools {
        nodejs "node18"
    }
    stages {
        stage('Checkout Application Git Branch') {
            steps{
                git credentiaslId: 'GitLab_C101',
                    url: "https://lab.ssafy.com/s09-webmobile3-sub2/S09P12C101.git"
                    branch: "origin/feat/Release/Pipeline_Test"
            }
            post {
                failure {
                    echo 'Repository clone failure'
                }
                success {
                    echo 'Repository clone success'
                }
            }
        }
    }
}