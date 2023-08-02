pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('Checkout Application Git Branch') {
            steps{
                git credentialId: 'GitLab_C101',
                    url: "https://lab.ssafy.com/s09-webmobile3-sub2/S09P12C101.git"
                    branch: "*/develop"
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