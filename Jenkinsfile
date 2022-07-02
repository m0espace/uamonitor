pipeline {
    agent none
    stages {
        stage('Deploy to server') {
            steps {
                sh 'docker-compose up --build --remove-orphans -d backend frontend'
            }
        }
    }
}