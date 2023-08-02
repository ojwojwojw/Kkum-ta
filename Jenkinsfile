pipeline {
    agent any
    tools {
        gradle 'gradle_7.5.1'
        node 'node_18.14.1'
        npm 'npm_9.6.7'
    }
    enviroment {
        
    }
    stages {
        stage('Checkout Application Git Branch') {
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